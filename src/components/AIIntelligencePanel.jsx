import React from 'react'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, TrendingUp, Waves } from 'lucide-react'
import { useSimulation } from '../context/SimulationContext.jsx'

const RISK_CONFIG = {
  NORMAL: { label: 'NORMAL', color: '#00ff88', bg: '#00ff8815', border: '#00ff8830' },
  ELEVATED: { label: 'ELEVATED', color: '#ffdd00', bg: '#ffdd0015', border: '#ffdd0030' },
  CRITICAL: { label: 'CRITICAL', color: '#ff3366', bg: '#ff336615', border: '#ff336630' },
}

export default function AIIntelligencePanel() {
  const { prediction, riskLevel, score, patterns, demoActive } = useSimulation()
  const risk = RISK_CONFIG[riskLevel] || RISK_CONFIG.NORMAL

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '8px', borderBottom: '1px solid #00ff8815' }}>
        <Brain size={16} color="#00d4ff" />
        <span style={{ color: '#00d4ff', fontSize: '12px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>
          AI INTELLIGENCE
        </span>
      </div>

      {/* Prediction Card */}
      <div style={{
        background: '#111a2e',
        border: `1px solid ${risk.border}`,
        borderRadius: '8px',
        padding: '14px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${risk.color}, transparent)`,
        }} />
        <div style={{ color: '#64748b', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
          Prediction
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ color: risk.color, fontSize: '20px', fontWeight: 800, fontFamily: 'JetBrains Mono' }}>
              {prediction.defect}
            </div>
            <div style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>Defect Type</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#e2e8f0', fontSize: '22px', fontWeight: 800, fontFamily: 'JetBrains Mono' }}>
              {prediction.confidence}%
            </div>
            <div style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>Confidence</div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div style={{ marginTop: '10px' }}>
          <div style={{ height: '3px', background: '#1e2d52', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${prediction.confidence}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                background: `linear-gradient(90deg, ${risk.color}88, ${risk.color})`,
                borderRadius: '2px',
              }}
            />
          </div>
        </div>

        {/* Raw Score */}
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#475569', fontSize: '10px', fontFamily: 'JetBrains Mono' }}>SCORE</span>
          <span style={{ color: risk.color, fontSize: '12px', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
            {prediction.rawScore.toFixed(4)}
          </span>
        </div>
      </div>

      {/* Risk Level */}
      <motion.div
        animate={{
          borderColor: risk.border,
          background: risk.bg,
        }}
        transition={{ duration: 0.4 }}
        style={{
          border: `1px solid ${risk.border}`,
          background: risk.bg,
          borderRadius: '8px',
          padding: '12px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={15} color={risk.color} />
          <span style={{ color: '#94a3b8', fontSize: '11px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Risk Level</span>
        </div>
        <motion.div
          key={riskLevel}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            color: risk.color, fontSize: '14px', fontWeight: 800,
            fontFamily: 'JetBrains Mono', letterSpacing: '0.1em',
          }}
        >
          {risk.label}
        </motion.div>
      </motion.div>

      {/* Score Gauge */}
      <div style={{ background: '#111a2e', border: '1px solid #ffffff08', borderRadius: '8px', padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <TrendingUp size={13} color="#64748b" />
          <span style={{ color: '#64748b', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Anomaly Score Gauge
          </span>
        </div>
        {/* Segmented bar */}
        <div style={{ display: 'flex', gap: '2px', height: '8px' }}>
          {Array.from({ length: 20 }).map((_, i) => {
            const threshold = (i + 1) / 20
            const filled = score >= threshold - 0.05
            const segColor = threshold <= 0.35 ? '#00ff88' : threshold <= 0.65 ? '#ffdd00' : '#ff3366'
            return (
              <div key={i} style={{
                flex: 1, borderRadius: '1px',
                background: filled ? segColor : '#1e2d52',
                opacity: filled ? 1 : 0.3,
                transition: 'background 0.3s ease',
              }} />
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ color: '#00ff88', fontSize: '9px', fontFamily: 'JetBrains Mono' }}>SAFE</span>
          <span style={{ color: '#ffdd00', fontSize: '9px', fontFamily: 'JetBrains Mono' }}>WARN</span>
          <span style={{ color: '#ff3366', fontSize: '9px', fontFamily: 'JetBrains Mono' }}>CRITICAL</span>
        </div>
      </div>

      {/* Pattern Detection */}
      <div style={{ background: '#111a2e', border: '1px solid #ffffff08', borderRadius: '8px', padding: '14px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <Waves size={13} color="#bf00ff" />
          <span style={{ color: '#64748b', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Pattern Detection
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {patterns.map((p, i) => (
            <motion.div
              key={`${p}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '8px',
                padding: '8px 10px', borderRadius: '6px',
                background: '#0d142488', border: '1px solid #bf00ff20',
              }}
            >
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#bf00ff', marginTop: '5px', flexShrink: 0 }} />
              <span style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.4' }}>{p}</span>
            </motion.div>
          ))}
        </div>
        {!demoActive && (
          <div style={{ color: '#334155', fontSize: '11px', fontFamily: 'JetBrains Mono', marginTop: '8px', textAlign: 'center' }}>
            Enable demo to see patterns
          </div>
        )}
      </div>
    </div>
  )
}
