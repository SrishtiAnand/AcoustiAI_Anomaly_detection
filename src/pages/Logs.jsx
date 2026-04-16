import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSimulation } from '../context/SimulationContext.jsx'
import { FileText, Filter, Download, RefreshCw, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

const STATUS_CONFIG = {
  All:      { color: '#94a3b8', bg: '#94a3b815', border: '#94a3b830' },
  Normal:   { color: '#00ff88', bg: '#00ff8815', border: '#00ff8830' },
  Warning:  { color: '#ffdd00', bg: '#ffdd0015', border: '#ffdd0030' },
  Critical: { color: '#ff3366', bg: '#ff336615', border: '#ff336630' },
}

const ACTION_COLOR = {
  Monitoring:      '#64748b',
  'Load Adjusted': '#ffdd00',
  'Machine Stopped': '#ff3366',
}

export default function Logs() {
  const { events } = useSimulation()
  const [filter, setFilter] = useState('All')
  const [sortAsc, setSortAsc] = useState(false)

  const filtered = useMemo(() => {
    let list = filter === 'All' ? events : events.filter(e => e.status === filter)
    return sortAsc ? [...list].reverse() : list
  }, [events, filter, sortAsc])

  const counts = useMemo(() => ({
    Normal:   events.filter(e => e.status === 'Normal').length,
    Warning:  events.filter(e => e.status === 'Warning').length,
    Critical: events.filter(e => e.status === 'Critical').length,
  }), [events])

  const handleExport = () => {
    const csv = [
      'Time,Score,Status,Action',
      ...events.map(e => `${e.time},${e.score},${e.status},${e.action}`)
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'acoustai_events.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', background: '#080c14', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={18} color="#00d4ff" />
              <h1 style={{ color: '#f1f5f9', fontSize: '22px', fontWeight: 800 }}>Event Logs</h1>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                id="sort-btn"
                onClick={() => setSortAsc(!sortAsc)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 14px', borderRadius: '6px', cursor: 'pointer',
                  background: 'transparent', border: '1px solid #1e2d52',
                  color: '#64748b', fontSize: '12px', fontFamily: 'JetBrains Mono',
                }}
              >
                <RefreshCw size={12} />
                {sortAsc ? 'OLDEST FIRST' : 'NEWEST FIRST'}
              </button>
              <button
                id="export-btn"
                onClick={handleExport}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 14px', borderRadius: '6px', cursor: 'pointer',
                  background: '#00ff8815', border: '1px solid #00ff8840',
                  color: '#00ff88', fontSize: '12px', fontFamily: 'JetBrains Mono', fontWeight: 600,
                }}
              >
                <Download size={12} />
                EXPORT CSV
              </button>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: '13px', marginTop: '4px' }}>Full audit trail of all acoustic anomaly detections</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}
        >
          {[
            { label: 'Total Events', value: events.length, icon: FileText, color: '#00d4ff' },
            { label: 'Normal', value: counts.Normal, icon: CheckCircle, color: '#00ff88' },
            { label: 'Warnings', value: counts.Warning, icon: TrendingUp, color: '#ffdd00' },
            { label: 'Critical', value: counts.Critical, icon: AlertTriangle, color: '#ff3366' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{
              background: `${color}08`, border: `1px solid ${color}25`,
              borderRadius: '10px', padding: '16px',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
              </div>
              <div>
                <div style={{ color, fontSize: '24px', fontWeight: 800, fontFamily: 'JetBrains Mono' }}>{value}</div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>{label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}
        >
          {['All', 'Normal', 'Warning', 'Critical'].map(f => {
            const cfg = STATUS_CONFIG[f]
            const active = filter === f
            return (
              <button
                key={f}
                id={`filter-${f.toLowerCase()}-btn`}
                onClick={() => setFilter(f)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 16px', borderRadius: '20px', cursor: 'pointer',
                  background: active ? cfg.bg : 'transparent',
                  border: `1px solid ${active ? cfg.border : '#1e2d52'}`,
                  color: active ? cfg.color : '#475569',
                  fontSize: '12px', fontWeight: active ? 700 : 400,
                  fontFamily: 'JetBrains Mono', transition: 'all 0.2s',
                }}
              >
                {f !== 'All' && (
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: cfg.color }} />
                )}
                {f}
                {f !== 'All' && (
                  <span style={{ background: `${cfg.color}25`, padding: '1px 6px', borderRadius: '10px', fontSize: '10px' }}>
                    {counts[f]}
                  </span>
                )}
              </button>
            )
          })}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#334155', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
            <Filter size={12} />
            Showing {filtered.length} of {events.length} events
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="panel"
          style={{ overflow: 'hidden' }}
        >
          {/* Table Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '100px 100px 110px 1fr 120px',
            gap: '8px', padding: '12px 20px',
            borderBottom: '1px solid #00ff8815',
            background: '#0d142480',
          }}>
            {['TIME', 'SCORE', 'STATUS', 'ACTION', 'INDICATOR'].map(h => (
              <span key={h} style={{ color: '#334155', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          <div style={{ maxHeight: 'calc(100vh - 420px)', overflowY: 'auto' }}>
            <AnimatePresence>
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ padding: '48px', textAlign: 'center', color: '#334155', fontSize: '13px', fontFamily: 'JetBrains Mono' }}
                >
                  No events found. Enable Demo Mode to generate data.
                </motion.div>
              ) : (
                filtered.map((evt, i) => {
                  const cfg = STATUS_CONFIG[evt.status] || STATUS_CONFIG.Normal
                  const actionColor = ACTION_COLOR[evt.action] || '#64748b'
                  const scorePercent = Math.round(evt.score * 100)
                  return (
                    <motion.div
                      key={`${evt.time}-${i}`}
                      initial={i === 0 ? { opacity: 0, backgroundColor: `${cfg.color}15` } : false}
                      animate={{ opacity: 1, backgroundColor: 'transparent' }}
                      transition={{ duration: 0.5 }}
                      style={{
                        display: 'grid', gridTemplateColumns: '100px 100px 110px 1fr 120px',
                        gap: '8px', padding: '11px 20px',
                        borderBottom: '1px solid #ffffff05',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#ffffff05'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Time */}
                      <span style={{ color: '#475569', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>{evt.time}</span>
                      {/* Score */}
                      <span style={{ color: cfg.color, fontSize: '12px', fontFamily: 'JetBrains Mono', fontWeight: 600 }}>
                        {evt.score.toFixed(3)}
                      </span>
                      {/* Status badge */}
                      <span>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '5px',
                          padding: '2px 10px', borderRadius: '20px',
                          background: cfg.bg, border: `1px solid ${cfg.border}`,
                          color: cfg.color, fontSize: '10px', fontWeight: 700,
                          fontFamily: 'JetBrains Mono',
                        }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.color }} />
                          {evt.status}
                        </span>
                      </span>
                      {/* Action */}
                      <span style={{ color: actionColor, fontSize: '12px' }}>{evt.action}</span>
                      {/* Mini bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ flex: 1, height: '4px', background: '#1e2d52', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${scorePercent}%`, background: cfg.color, borderRadius: '2px' }} />
                        </div>
                        <span style={{ color: '#475569', fontSize: '10px', fontFamily: 'JetBrains Mono', flexShrink: 0 }}>{scorePercent}%</span>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
