import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'

const SimulationContext = createContext(null)

const DEFECT_TYPES = ['Normal', 'Crack', 'Bearing Failure', 'Misalignment', 'Imbalance', 'Looseness']
const DECISIONS = ['Continue Operation', 'Reduce Load by 15%', 'Adjust Speed -10%', 'Schedule Maintenance', 'Stop Machine', 'Human Verification Required']
const PATTERNS = [
  'High vibration detected every 3 min',
  'Unstable above speed 130 RPM',
  'Resonance frequency drift: +12Hz',
  'Harmonic distortion increasing',
  'Intermittent spike pattern (2.3s interval)',
  'Amplitude envelope widening',
]

function generateWaveformPoint(t, anomalyLevel) {
  const base = Math.sin(t * 0.08) * 0.3
  const harmonic = Math.sin(t * 0.2) * 0.15
  const noise = (Math.random() - 0.5) * 0.2
  const spike = anomalyLevel > 0.6 ? (Math.random() > 0.85 ? (Math.random() - 0.5) * anomalyLevel * 2 : 0) : 0
  return base + harmonic + noise + spike
}

export function SimulationProvider({ children }) {
  const [demoActive, setDemoActive] = useState(false)
  const [mode, setMode] = useState('AUTO')
  const [waveform, setWaveform] = useState(Array(80).fill(0))
  const [score, setScore] = useState(0.12)
  const [prediction, setPrediction] = useState({
    defect: 'Normal',
    confidence: 98,
    rawScore: 0.12,
  })
  const [riskLevel, setRiskLevel] = useState('NORMAL')
  const [decision, setDecision] = useState('Continue Operation')
  const [recommendation, setRecommendation] = useState('All systems nominal. Continue monitoring.')
  const [agentStatus, setAgentStatus] = useState('AUTO')
  const [patterns, setPatterns] = useState([PATTERNS[0], PATTERNS[1]])
  const [events, setEvents] = useState([
    { time: '23:30:01', score: 0.10, status: 'Normal', action: 'Monitoring' },
    { time: '23:30:15', score: 0.14, status: 'Normal', action: 'Monitoring' },
    { time: '23:30:42', score: 0.22, status: 'Normal', action: 'Monitoring' },
  ])
  const [showCriticalAlert, setShowCriticalAlert] = useState(false)
  const [twinState, setTwinState] = useState('normal') // normal | vibrating | critical
  const [isListening, setIsListening] = useState(false)

  const tickRef = useRef(0)
  const intervalRef = useRef(null)
  const phaseRef = useRef(0)
  const anomalyCycleRef = useRef(0)

  const getStatusFromScore = (s) => {
    if (s < 0.35) return 'Normal'
    if (s < 0.65) return 'Warning'
    return 'Critical'
  }

  const computeRiskLevel = (s) => {
    if (s < 0.35) return 'NORMAL'
    if (s < 0.65) return 'ELEVATED'
    return 'CRITICAL'
  }

  const tick = useCallback(() => {
    tickRef.current += 1
    phaseRef.current += 1
    anomalyCycleRef.current += 1

    // Every ~6 seconds simulate an anomaly burst (at 30fps → 180 ticks)
    const anomalyPhase = (anomalyCycleRef.current % 220) / 220
    let anomalyLevel = 0.1
    if (anomalyPhase > 0.55 && anomalyPhase < 0.75) {
      anomalyLevel = 0.3 + Math.sin((anomalyPhase - 0.55) / 0.2 * Math.PI) * 0.7
    }

    const newPoint = generateWaveformPoint(phaseRef.current, anomalyLevel)
    setWaveform(prev => [...prev.slice(1), newPoint])

    const newScore = Math.min(0.99, Math.max(0.01, anomalyLevel * 0.85 + (Math.random() - 0.5) * 0.06))
    setScore(newScore)

    const status = getStatusFromScore(newScore)
    const risk = computeRiskLevel(newScore)
    setRiskLevel(risk)

    let defect = 'Normal'
    let confidence = 97
    if (newScore > 0.35 && newScore < 0.65) {
      defect = DEFECT_TYPES[Math.floor(newScore * 5) + 1] || 'Imbalance'
      confidence = Math.round(60 + newScore * 30)
    } else if (newScore >= 0.65) {
      defect = DEFECT_TYPES[1 + Math.floor(Math.random() * 3)]
      confidence = Math.round(80 + newScore * 18)
    }

    setPrediction({ defect, confidence: Math.min(99, confidence), rawScore: newScore })

    // Update digital twin state
    if (risk === 'CRITICAL') setTwinState('critical')
    else if (risk === 'ELEVATED') setTwinState('vibrating')
    else setTwinState('normal')

    // Update agent decision
    if (risk === 'CRITICAL') {
      setDecision('Stop Machine')
      setRecommendation('Critical anomaly detected. Machine stopped. Technician assigned.')
      setAgentStatus('HUMAN REQUIRED')
      setMode('CRITICAL')
      // Show alert popup
      if (anomalyPhase > 0.6 && anomalyPhase < 0.63) {
        setShowCriticalAlert(true)
        setTimeout(() => setShowCriticalAlert(false), 5000)
      }
    } else if (risk === 'ELEVATED') {
      setDecision(DECISIONS[1 + Math.floor(newScore * 3)])
      setRecommendation(`Reduce machine speed by ${Math.round(8 + newScore * 12)}%. Monitor vibration closely.`)
      setAgentStatus('ADAPTIVE')
      setMode('ADAPTIVE')
    } else {
      setDecision('Continue Operation')
      setRecommendation('All systems nominal. Acoustic signature within safe range.')
      setAgentStatus('AUTO')
      setMode('AUTO')
    }

    // Log event every ~40 ticks
    if (tickRef.current % 40 === 0) {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false })
      setEvents(prev => [{
        time: timeStr,
        score: parseFloat(newScore.toFixed(3)),
        status,
        action: risk === 'CRITICAL' ? 'Machine Stopped' : risk === 'ELEVATED' ? 'Load Adjusted' : 'Monitoring',
      }, ...prev].slice(0, 100))

      // Rotate patterns
      if (risk !== 'NORMAL') {
        const p1 = PATTERNS[Math.floor(Math.random() * PATTERNS.length)]
        const p2 = PATTERNS[Math.floor(Math.random() * PATTERNS.length)]
        setPatterns([p1, p2])
      }
    }
  }, [])

  useEffect(() => {
    if (demoActive) {
      setIsListening(true)
      intervalRef.current = setInterval(tick, 80) // ~12 fps for smooth chart
    } else {
      setIsListening(false)
      clearInterval(intervalRef.current)
      // Reset to idle
      setWaveform(Array(80).fill(0))
      setScore(0.12)
      setPrediction({ defect: 'Normal', confidence: 98, rawScore: 0.12 })
      setRiskLevel('NORMAL')
      setTwinState('normal')
      setDecision('Continue Operation')
      setRecommendation('Demo mode inactive. Enable Demo to start simulation.')
      setAgentStatus('AUTO')
      setMode('AUTO')
    }
    return () => clearInterval(intervalRef.current)
  }, [demoActive, tick])

  const dismissAlert = () => setShowCriticalAlert(false)

  return (
    <SimulationContext.Provider value={{
      demoActive, setDemoActive,
      mode, setMode,
      waveform,
      score,
      prediction,
      riskLevel,
      decision,
      recommendation,
      agentStatus,
      patterns,
      events,
      showCriticalAlert, dismissAlert,
      twinState,
      isListening,
    }}>
      {children}
    </SimulationContext.Provider>
  )
}

export function useSimulation() {
  const ctx = useContext(SimulationContext)
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider')
  return ctx
}
