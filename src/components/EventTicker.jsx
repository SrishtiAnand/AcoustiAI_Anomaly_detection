import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSimulation } from '../context/SimulationContext.jsx'
import { Clock } from 'lucide-react'

const STATUS_STYLE = {
  Normal:   { color: '#00ff88', bg: '#00ff8810' },
  Warning:  { color: '#ffdd00', bg: '#ffdd0010' },
  Critical: { color: '#ff3366', bg: '#ff336610' },
}

export default function EventTicker() {
  const { events } = useSimulation()
  const containerRef = useRef(null)

  // Auto-scroll to top (newest event)
  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0
  }, [events.length])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Clock size={13} color="#64748b" />
        <span style={{ color: '#64748b', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Event Timeline
        </span>
        <div style={{
          marginLeft: 'auto',
          padding: '2px 8px', borderRadius: '10px',
          background: '#00ff8812', border: '1px solid #00ff8830',
          color: '#00ff88', fontSize: '10px', fontFamily: 'JetBrains Mono', fontWeight: 700,
        }}>
          {events.length} events
        </div>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: '80px 80px 90px 1fr',
        gap: '8px', padding: '6px 10px',
        borderBottom: '1px solid #00ff8815',
        marginBottom: '4px',
      }}>
        {['TIME', 'SCORE', 'STATUS', 'ACTION'].map(h => (
          <span key={h} style={{ color: '#334155', fontSize: '9px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
        ))}
      </div>

      {/* Scrollable events */}
      <div
        ref={containerRef}
        style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: '2px' }}
      >
        {events.map((evt, i) => {
          const style = STATUS_STYLE[evt.status] || STATUS_STYLE.Normal
          return (
            <motion.div
              key={`${evt.time}-${i}`}
              initial={i === 0 ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid', gridTemplateColumns: '80px 80px 90px 1fr',
                gap: '8px', padding: '6px 10px', borderRadius: '4px',
                background: i === 0 ? style.bg : 'transparent',
                border: i === 0
                  ? `1px solid ${style.color}30`
                  : '1px solid transparent',
                transition: 'background 0.3s',
              }}
            >
              <span style={{ color: '#475569', fontSize: '11px', fontFamily: 'JetBrains Mono' }}>{evt.time}</span>
              <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'JetBrains Mono' }}>{evt.score.toFixed(3)}</span>
              <span style={{
                color: style.color, fontSize: '10px', fontFamily: 'JetBrains Mono', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: style.color, flexShrink: 0 }} />
                {evt.status}
              </span>
              <span style={{ color: '#64748b', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {evt.action}
              </span>
            </motion.div>
          )
        })}
        {events.length === 0 && (
          <div style={{ textAlign: 'center', color: '#334155', fontSize: '12px', fontFamily: 'JetBrains Mono', padding: '20px' }}>
            No events yet. Enable Demo Mode to start.
          </div>
        )}
      </div>
    </div>
  )
}
