import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, CheckCircle, AlertCircle, XCircle, Lightbulb, Settings } from 'lucide-react'
import { useSimulation } from '../context/SimulationContext.jsx'

const STATUS_CONFIG = {
  AUTO: { color: '#00ff88', icon: CheckCircle, label: 'AUTO' },
  ADAPTIVE: { color: '#ffdd00', icon: Settings, label: 'ADAPTIVE' },
  'HUMAN REQUIRED': { color: '#ff3366', icon: AlertCircle, label: 'HUMAN REQUIRED' },
}

const DECISION_ICONS = {
  'Continue Operation': CheckCircle,
  'Reduce Load by 15%': Settings,
  'Adjust Speed -10%': Settings,
  'Schedule Maintenance': AlertCircle,
  'Stop Machine': XCircle,
  'Human Verification Required': AlertCircle,
}

export default function AIAgentPanel() {
  const { decision, recommendation, agentStatus, riskLevel, mode, setMode } = useSimulation()
  const statusCfg = STATUS_CONFIG[agentStatus] || STATUS_CONFIG.AUTO
  const StatusIcon = statusCfg.icon

  const decisionColor = riskLevel === 'CRITICAL' ? '#ff3366' : riskLevel === 'ELEVATED' ? '#ffdd00' : '#00ff88'
  const DecisionIcon = DECISION_ICONS[decision] || CheckCircle

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '8px', borderBottom: '1px solid #00d4ff15' }}>
        <Bot size={16} color="#00d4ff" />
        <span style={{ color: '#00d4ff', fontSize: '12px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>
          AI AGENT
        </span>
      </div>

      {/* Decision Engine */}
      <div style={{ background: '#111a2e', border: '1px solid #ffffff08', borderRadius: '8px', padding: '14px' }}>
        <div style={{ color: '#64748b', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
          Decision Engine
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={decision}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px', borderRadius: '6px',
              background: `${decisionColor}10`,
              border: `1px solid ${decisionColor}30`,
            }}
          >
            <DecisionIcon size={18} color={decisionColor} />
            <span style={{ color: decisionColor, fontSize: '14px', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
              {decision}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Recommendation */}
      <div style={{ background: '#111a2e', border: '1px solid #bf00ff20', borderRadius: '8px', padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Lightbulb size={13} color="#bf00ff" />
          <span style={{ color: '#64748b', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Recommendation
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={recommendation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5', fontStyle: 'italic' }}
          >
            "{recommendation}"
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Agent Status */}
      <motion.div
        animate={{ borderColor: `${statusCfg.color}30` }}
        style={{
          background: `${statusCfg.color}10`,
          border: `1px solid ${statusCfg.color}30`,
          borderRadius: '8px',
          padding: '12px 14px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StatusIcon size={15} color={statusCfg.color} />
          <span style={{ color: '#94a3b8', fontSize: '11px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Status</span>
        </div>
        <motion.span
          key={agentStatus}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ color: statusCfg.color, fontSize: '13px', fontWeight: 800, fontFamily: 'JetBrains Mono', letterSpacing: '0.075em' }}
        >
          {statusCfg.label}
        </motion.span>
      </motion.div>

      {/* Mode Selector */}
      <div style={{ background: '#111a2e', border: '1px solid #ffffff08', borderRadius: '8px', padding: '14px' }}>
        <div style={{ color: '#64748b', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
          Operation Mode Override
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['AUTO', 'ADAPTIVE', 'CRITICAL'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1, padding: '7px 4px', borderRadius: '5px', cursor: 'pointer',
                fontSize: '10px', fontFamily: 'JetBrains Mono', fontWeight: 700,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                border: mode === m
                  ? `1px solid ${m === 'AUTO' ? '#00ff88' : m === 'ADAPTIVE' ? '#ffdd00' : '#ff3366'}`
                  : '1px solid #1e2d52',
                background: mode === m
                  ? `${m === 'AUTO' ? '#00ff88' : m === 'ADAPTIVE' ? '#ffdd00' : '#ff3366'}20`
                  : 'transparent',
                color: mode === m
                  ? (m === 'AUTO' ? '#00ff88' : m === 'ADAPTIVE' ? '#ffdd00' : '#ff3366')
                  : '#475569',
                transition: 'all 0.2s',
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Last Action Feed */}
      <div style={{ background: '#111a2e', border: '1px solid #ffffff08', borderRadius: '8px', padding: '14px', flex: 1 }}>
        <div style={{ color: '#64748b', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
          Agent Log
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { action: 'CNN inference complete', time: '0ms', c: '#00d4ff' },
            { action: 'LSTM sequence analysis', time: '12ms', c: '#00d4ff' },
            { action: 'Risk score computed', time: '15ms', c: '#00ff88' },
            { action: 'Agent decision dispatched', time: '18ms', c: '#00ff88' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.c }} />
                <span style={{ color: '#64748b', fontSize: '11px' }}>{item.action}</span>
              </div>
              <span style={{ color: item.c, fontSize: '10px', fontFamily: 'JetBrains Mono' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
