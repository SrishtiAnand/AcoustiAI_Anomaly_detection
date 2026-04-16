import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSimulation } from '../context/SimulationContext.jsx'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CheckCircle, RotateCcw, AlertTriangle, User, MapPin, Clock, Lightbulb, Shield, Cpu } from 'lucide-react'

export default function Technician() {
  const { waveform, prediction, riskLevel, recommendation, score, demoActive } = useSimulation()
  const [resolved, setResolved] = useState(false)
  const [action, setAction] = useState(null)
  const [notes, setNotes] = useState('')

  const signalData = waveform.slice(-40).map((v, i) => ({ i, value: parseFloat(v.toFixed(4)) }))

  const riskColor = riskLevel === 'CRITICAL' ? '#ff3366' : riskLevel === 'ELEVATED' ? '#ffdd00' : '#00ff88'

  const handleAction = (act) => {
    setAction(act)
    if (act === 'done') setResolved(true)
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', background: '#080c14', padding: '24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Shield size={18} color="#00d4ff" />
            <h1 style={{ color: '#f1f5f9', fontSize: '22px', fontWeight: 800 }}>Technician Dashboard</h1>
            <div style={{
              marginLeft: 'auto', padding: '4px 12px', borderRadius: '20px',
              background: resolved ? '#00ff8820' : `${riskColor}20`,
              border: `1px solid ${resolved ? '#00ff8840' : `${riskColor}40`}`,
              color: resolved ? '#00ff88' : riskColor,
              fontSize: '11px', fontWeight: 700, fontFamily: 'JetBrains Mono',
            }}>
              {resolved ? '✓ RESOLVED' : `RISK: ${riskLevel}`}
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: '13px' }}>Human-in-the-loop verification and machine control</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Machine Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Machine Info</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: Cpu, label: 'Machine ID', value: 'CNC-LATHE-012', color: '#00d4ff' },
                  { icon: MapPin, label: 'Location', value: 'Bay 4A — Plant Floor 2', color: '#bf00ff' },
                  { icon: Clock, label: 'Incident Time', value: new Date().toLocaleTimeString(), color: '#ffdd00' },
                  { icon: User, label: 'Operator', value: 'Alex Martinez', color: '#00ff88' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '6px', background: '#111a2e' }}>
                    <Icon size={14} color={color} />
                    <div>
                      <div style={{ color: '#475569', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>{label}</div>
                      <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 500, marginTop: '1px' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Issue Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className={riskLevel === 'CRITICAL' ? 'panel panel-red' : riskLevel === 'ELEVATED' ? 'panel panel-yellow' : 'panel'}
              style={{ padding: '20px', border: `1px solid ${riskColor}30` }}
            >
              <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Issue Details</div>
              <div style={{
                padding: '16px', borderRadius: '8px',
                background: `${riskColor}10`, border: `1px solid ${riskColor}20`,
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Machine #12</span>
                  <span style={{ color: riskColor, fontSize: '11px', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{riskLevel}</span>
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                  {prediction.defect !== 'Normal' ? prediction.defect : 'Elevated Vibration'}
                </div>
                <div style={{ color: '#64748b', fontSize: '12px' }}>
                  Confidence: <span style={{ color: riskColor, fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{prediction.confidence}%</span>
                </div>
                <div style={{ marginTop: '10px', height: '3px', background: '#1e2d52', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${score * 100}%`, background: `linear-gradient(90deg, #00ff88, ${riskColor})`, borderRadius: '2px', transition: 'width 0.5s' }} />
                </div>
              </div>
            </motion.div>

            {/* AI Suggestion */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Lightbulb size={14} color="#bf00ff" />
                <span style={{ color: '#bf00ff', fontSize: '12px', fontWeight: 700, fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI Suggestion</span>
              </div>
              <div style={{ background: '#bf00ff10', border: '1px solid #bf00ff20', borderRadius: '8px', padding: '14px' }}>
                <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6', fontStyle: 'italic' }}>"{recommendation}"</p>
              </div>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Check bearing alignment and lubrication', 'Inspect spindle for imbalance', 'Verify coupling tightness'].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#bf00ff', marginTop: '7px', flexShrink: 0 }} />
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Signal Snapshot */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="panel" style={{ padding: '20px', height: '240px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Signal Snapshot
              </div>
              <div style={{ height: 'calc(100% - 36px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={signalData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="techFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="20%" stopColor={riskColor} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={riskColor} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis dataKey="i" hide />
                    <YAxis domain={[-1.2, 1.2]} tick={{ fill: '#334155', fontSize: 9 }} />
                    <Tooltip contentStyle={{ background: '#0d1424', border: '1px solid #00ff8830', borderRadius: '6px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="value" stroke={riskColor} strokeWidth={1.5} fill="url(#techFill)" dot={false} isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
                Technician Actions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  id="inspection-done-btn"
                  onClick={() => handleAction('done')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 18px', borderRadius: '8px', cursor: 'pointer',
                    background: action === 'done' ? '#00ff8820' : 'transparent',
                    border: `1px solid ${action === 'done' ? '#00ff8860' : '#00ff8840'}`,
                    color: '#00ff88', fontSize: '13px', fontWeight: 600,
                    fontFamily: 'JetBrains Mono', transition: 'all 0.2s', width: '100%',
                  }}
                >
                  <CheckCircle size={16} />
                  Inspection Done
                </button>
                <button
                  id="restart-machine-btn"
                  onClick={() => handleAction('restart')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 18px', borderRadius: '8px', cursor: 'pointer',
                    background: action === 'restart' ? '#00d4ff20' : 'transparent',
                    border: `1px solid ${action === 'restart' ? '#00d4ff60' : '#00d4ff40'}`,
                    color: '#00d4ff', fontSize: '13px', fontWeight: 600,
                    fontFamily: 'JetBrains Mono', transition: 'all 0.2s', width: '100%',
                  }}
                >
                  <RotateCcw size={16} />
                  Restart Machine
                </button>
                <button
                  id="escalate-btn"
                  onClick={() => handleAction('escalate')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 18px', borderRadius: '8px', cursor: 'pointer',
                    background: action === 'escalate' ? '#ff336620' : 'transparent',
                    border: `1px solid ${action === 'escalate' ? '#ff336660' : '#ff336640'}`,
                    color: '#ff3366', fontSize: '13px', fontWeight: 600,
                    fontFamily: 'JetBrains Mono', transition: 'all 0.2s', width: '100%',
                  }}
                >
                  <AlertTriangle size={16} />
                  Escalate Issue
                </button>
              </div>

              <AnimatePresence>
                {action && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ marginTop: '14px', overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '12px 14px', borderRadius: '8px',
                      background: '#00ff8810', border: '1px solid #00ff8830',
                    }}>
                      <span style={{ color: '#00ff88', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
                        ✓ Action logged: {action === 'done' ? 'Inspection complete' : action === 'restart' ? 'Machine restart initiated' : 'Issue escalated to supervisor'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Notes */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="panel" style={{ padding: '20px', flex: 1 }}>
              <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Technician Notes
              </div>
              <textarea
                id="tech-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add inspection notes here..."
                style={{
                  width: '100%', minHeight: '120px', resize: 'vertical',
                  background: '#111a2e', border: '1px solid #1e2d52',
                  borderRadius: '8px', padding: '12px',
                  color: '#e2e8f0', fontSize: '13px', lineHeight: '1.6',
                  fontFamily: 'Inter, sans-serif', outline: 'none',
                }}
              />
              <button
                id="submit-notes-btn"
                style={{
                  marginTop: '10px', padding: '8px 18px', borderRadius: '6px',
                  background: '#00ff8820', border: '1px solid #00ff8840',
                  color: '#00ff88', fontSize: '12px', fontFamily: 'JetBrains Mono',
                  fontWeight: 600, cursor: 'pointer',
                }}
              >
                Submit Notes
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
