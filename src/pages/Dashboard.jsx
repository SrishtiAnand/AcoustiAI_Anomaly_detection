import React from 'react'
import { motion } from 'framer-motion'
import { useSimulation } from '../context/SimulationContext.jsx'
import LiveWaveformGraph from '../components/LiveWaveformGraph.jsx'
import AIIntelligencePanel from '../components/AIIntelligencePanel.jsx'
import AIAgentPanel from '../components/AIAgentPanel.jsx'
import DigitalTwin from '../components/DigitalTwin.jsx'
import EventTicker from '../components/EventTicker.jsx'
import CriticalAlertModal from '../components/CriticalAlertModal.jsx'
import { Play, Square, RotateCcw, Radio, Wifi } from 'lucide-react'

export default function Dashboard() {
  const { demoActive, setDemoActive, mode, riskLevel, score, isListening } = useSimulation()

  const modeColors = {
    AUTO: '#00ff88',
    ADAPTIVE: '#ffdd00',
    CRITICAL: '#ff3366',
  }
  const modeColor = modeColors[mode] || '#00ff88'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)', overflow: 'hidden', background: '#080c14' }}>
      {/* Dashboard Header Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px',
        background: '#0d1424',
        borderBottom: '1px solid #00ff8815',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wifi size={13} color={isListening ? '#00ff88' : '#334155'} style={{ animation: isListening ? 'pulse-neon 1.5s ease-in-out infinite' : 'none' }} />
            <span style={{ color: isListening ? '#00ff88' : '#475569', fontSize: '11px', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
              {isListening ? 'ACQUIRING SIGNAL' : 'IDLE'}
            </span>
          </div>
          <div style={{ width: '1px', height: '16px', background: '#1e2d52' }} />
          <span style={{ color: '#475569', fontSize: '11px', fontFamily: 'JetBrains Mono' }}>
            Machine #12 — Bay 4A — Plant Floor 2
          </span>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            id="start-btn"
            onClick={() => setDemoActive(true)}
            disabled={demoActive}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '5px', cursor: demoActive ? 'not-allowed' : 'pointer',
              background: demoActive ? '#00ff8810' : '#00ff8820',
              border: `1px solid ${demoActive ? '#00ff8830' : '#00ff88'}`,
              color: demoActive ? '#00ff8860' : '#00ff88',
              fontSize: '11px', fontFamily: 'JetBrains Mono', fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            <Play size={12} />
            START
          </button>
          <button
            id="stop-btn"
            onClick={() => setDemoActive(false)}
            disabled={!demoActive}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '5px', cursor: !demoActive ? 'not-allowed' : 'pointer',
              background: 'transparent',
              border: `1px solid ${!demoActive ? '#1e2d52' : '#ff3366'}`,
              color: !demoActive ? '#334155' : '#ff3366',
              fontSize: '11px', fontFamily: 'JetBrains Mono', fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            <Square size={12} />
            STOP
          </button>
          <button
            id="reset-btn"
            onClick={() => { setDemoActive(false); setTimeout(() => setDemoActive(true), 200) }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '5px', cursor: 'pointer',
              background: 'transparent', border: '1px solid #1e2d52',
              color: '#475569', fontSize: '11px', fontFamily: 'JetBrains Mono', fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            <RotateCcw size={12} />
            RESET
          </button>

          {/* Demo badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', borderRadius: '5px',
            background: demoActive ? '#00d4ff15' : '#1e2d5220',
            border: `1px solid ${demoActive ? '#00d4ff40' : '#1e2d52'}`,
            color: demoActive ? '#00d4ff' : '#334155',
            fontSize: '11px', fontFamily: 'JetBrains Mono', fontWeight: 700,
          }}>
            <Radio size={11} style={{ animation: demoActive ? 'pulse-neon 1.5s ease-in-out infinite' : 'none' }} />
            DEMO {demoActive ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>

      {/* Main 3-panel grid */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '260px 1fr 260px',
        gridTemplateRows: '1fr 160px',
        gap: '8px', padding: '8px',
        minHeight: 0,
      }}>
        {/* LEFT PANEL — AI Intelligence */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="panel"
          style={{ padding: '16px', gridRow: '1', overflowY: 'auto' }}
        >
          <AIIntelligencePanel />
        </motion.div>

        {/* CENTER TOP — Waveform + Digital Twin */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ gridRow: '1', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: 0 }}
        >
          {/* Waveform */}
          <div className="panel" style={{ flex: 2, padding: '16px', minHeight: 0 }}>
            <LiveWaveformGraph />
          </div>

          {/* Digital Twin */}
          <div className="panel" style={{ flex: 1, padding: '16px', minHeight: 0, overflowY: 'auto' }}>
            <DigitalTwin />
          </div>
        </motion.div>

        {/* RIGHT PANEL — AI Agent */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="panel"
          style={{ padding: '16px', gridRow: '1', overflowY: 'auto' }}
        >
          <AIAgentPanel />
        </motion.div>

        {/* BOTTOM — Event Timeline spanning all columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="panel"
          style={{ gridColumn: '1 / -1', gridRow: '2', padding: '12px 16px', overflow: 'hidden' }}
        >
          <EventTicker />
        </motion.div>
      </div>

      <CriticalAlertModal />
    </div>
  )
}
