import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSimulation } from '../context/SimulationContext.jsx'
import { Cpu, Thermometer, Zap, Gauge } from 'lucide-react'

const TWIN_CONFIG = {
  normal: {
    color: '#00ff88',
    glow: '0 0 40px #00ff8840, 0 0 80px #00ff8820',
    ringColor: '#00ff88',
    label: 'NORMAL',
    bodyGradient: 'linear-gradient(180deg, #0f2a1a 0%, #0d1424 100%)',
    pulseScale: [1, 1.02, 1],
    pulseDuration: 3,
  },
  vibrating: {
    color: '#ffdd00',
    glow: '0 0 40px #ffdd0040, 0 0 80px #ffdd0020',
    ringColor: '#ffdd00',
    label: 'VIBRATING',
    bodyGradient: 'linear-gradient(180deg, #2a2300 0%, #0d1424 100%)',
    pulseScale: [1, 1.04, 0.98, 1.03, 1],
    pulseDuration: 0.4,
  },
  critical: {
    color: '#ff3366',
    glow: '0 0 60px #ff336650, 0 0 120px #ff336625',
    ringColor: '#ff3366',
    label: 'CRITICAL',
    bodyGradient: 'linear-gradient(180deg, #2a0010 0%, #0d1424 100%)',
    pulseScale: [1, 1.06, 0.96, 1.05, 1],
    pulseDuration: 0.25,
  },
}

export default function DigitalTwin() {
  const { twinState, score, demoActive } = useSimulation()
  const cfg = TWIN_CONFIG[twinState] || TWIN_CONFIG.normal

  const metrics = [
    { label: 'Vibration', value: demoActive ? (score * 12.4 + 0.3).toFixed(1) : '0.3', unit: 'mm/s', icon: Gauge, color: cfg.color },
    { label: 'Temperature', value: demoActive ? (42 + score * 18).toFixed(1) : '42.0', unit: '°C', icon: Thermometer, color: score > 0.65 ? '#ff3366' : '#00d4ff' },
    { label: 'RPM', value: demoActive ? Math.round(1200 - score * 200) : '1200', unit: 'rpm', icon: Zap, color: '#bf00ff' },
    { label: 'Load', value: demoActive ? (78 - score * 25).toFixed(0) : '78', unit: '%', icon: Cpu, color: cfg.color },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #00ff8815' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={14} color="#00d4ff" />
          <span style={{ color: '#00d4ff', fontSize: '11px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>
            DIGITAL TWIN — MACHINE #12
          </span>
        </div>
        <div style={{
          padding: '3px 10px', borderRadius: '20px',
          background: `${cfg.color}20`, border: `1px solid ${cfg.color}40`,
          color: cfg.color, fontSize: '10px', fontWeight: 700,
          fontFamily: 'JetBrains Mono', letterSpacing: '0.1em',
          animation: twinState === 'critical' ? 'pulse-neon 0.8s ease-in-out infinite' : 'none',
        }}>
          {cfg.label}
        </div>
      </div>

      {/* Machine Visualization */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 0', flex: '0 0 auto' }}>
        {/* Outer ring */}
        <div style={{ position: 'relative', width: '160px', height: '160px' }}>
          {/* Animated rings */}
          {[1, 0.7, 0.45].map((opacity, i) => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1 + i * 0.02, 1] }}
              transition={{ rotate: { duration: 8 + i * 4, repeat: Infinity, ease: 'linear' }, scale: { duration: 2 + i, repeat: Infinity } }}
              style={{
                position: 'absolute',
                top: `${i * 14}%`,
                left: `${i * 14}%`,
                right: `${i * 14}%`,
                bottom: `${i * 14}%`,
                borderRadius: '50%',
                border: `1px solid ${cfg.ringColor}`,
                opacity: opacity * 0.5,
              }}
            />
          ))}

          {/* Machine body */}
          <motion.div
            animate={{ scale: cfg.pulseScale, boxShadow: cfg.glow }}
            transition={{ duration: cfg.pulseDuration, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '20%', left: '20%', right: '20%', bottom: '20%',
              borderRadius: '12px',
              background: cfg.bodyGradient,
              border: `2px solid ${cfg.color}60`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '4px',
            }}
          >
            {/* Machine icon - stylized */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              {/* Rotary indicator */}
              <motion.div
                animate={{ rotate: demoActive ? 360 : 0 }}
                transition={{ duration: demoActive ? (twinState === 'critical' ? 0.5 : twinState === 'vibrating' ? 1.2 : 2.5) : 0, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  border: `3px solid ${cfg.color}`,
                  borderTopColor: 'transparent',
                }}
              />
              {/* Center dot */}
              <div style={{
                position: 'absolute',
                width: '10px', height: '10px',
                borderRadius: '50%',
                background: cfg.color,
                boxShadow: `0 0 10px ${cfg.color}`,
              }} />
            </div>
            {/* Bars */}
            <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
              {[0.4, 0.7, 1.0, 0.7, 0.4].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: demoActive ? [h, h + score * 0.6, h] : 1 }}
                  transition={{ duration: 0.3 + i * 0.1, repeat: Infinity, delay: i * 0.05 }}
                  style={{
                    width: '4px', height: `${h * 20}px`,
                    background: cfg.color,
                    borderRadius: '2px',
                    opacity: 0.8,
                    transformOrigin: 'bottom',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {metrics.map(({ label, value, unit, icon: Icon, color }) => (
          <div key={label} style={{
            background: '#111a2e', border: '1px solid #ffffff08',
            borderRadius: '8px', padding: '10px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
              <Icon size={11} color={color} />
              <span style={{ color: '#475569', fontSize: '9px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              <span style={{ color, fontSize: '18px', fontWeight: 800, fontFamily: 'JetBrains Mono' }}>{value}</span>
              <span style={{ color: '#475569', fontSize: '10px', fontFamily: 'JetBrains Mono' }}>{unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
