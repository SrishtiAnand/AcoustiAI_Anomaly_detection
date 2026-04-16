import React, { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import { useSimulation } from '../context/SimulationContext.jsx'
import { Mic, MicOff, Activity } from 'lucide-react'

export default function LiveWaveformGraph() {
  const { waveform, isListening, score, riskLevel } = useSimulation()

  const data = useMemo(() =>
    waveform.map((v, i) => ({ i, value: parseFloat(v.toFixed(4)) })),
    [waveform]
  )

  const strokeColor = riskLevel === 'CRITICAL' ? '#ff3366' : riskLevel === 'ELEVATED' ? '#ffdd00' : '#00ff88'
  const fillId = `wave-fill-${riskLevel}`

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={16} color="#00d4ff" />
          <span style={{ color: '#94a3b8', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Acoustic Signal — Real-time
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isListening ? (
            <>
              <Mic size={14} color="#00ff88" style={{ animation: 'pulse-neon 1.5s ease-in-out infinite' }} />
              <span style={{ color: '#00ff88', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>LISTENING…</span>
            </>
          ) : (
            <>
              <MicOff size={14} color="#475569" />
              <span style={{ color: '#475569', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}>MIC OFF</span>
            </>
          )}
        </div>
      </div>

      {/* Graph */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor={strokeColor} stopOpacity={0.25} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
            <XAxis dataKey="i" hide />
            <YAxis domain={[-1.2, 1.2]} tick={{ fill: '#334155', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
            <Tooltip
              contentStyle={{ background: '#0d1424', border: '1px solid #00ff8830', borderRadius: '6px', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
              labelStyle={{ color: '#64748b' }}
              itemStyle={{ color: strokeColor }}
              formatter={(v) => [v.toFixed(4), 'Amplitude']}
            />
            {/* Threshold lines */}
            <ReferenceLine y={0.65} stroke="#ff336640" strokeDasharray="6 4" label={{ value: 'CRITICAL', fill: '#ff336666', fontSize: 9, fontFamily: 'JetBrains Mono' }} />
            <ReferenceLine y={-0.65} stroke="#ff336640" strokeDasharray="6 4" />
            <ReferenceLine y={0.35} stroke="#ffdd0030" strokeDasharray="4 4" label={{ value: 'WARN', fill: '#ffdd0055', fontSize: 9, fontFamily: 'JetBrains Mono' }} />
            <ReferenceLine y={-0.35} stroke="#ffdd0030" strokeDasharray="4 4" />
            <Area
              type="monotone"
              dataKey="value"
              stroke={strokeColor}
              strokeWidth={1.8}
              fill={`url(#${fillId})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Score Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#64748b', fontSize: '10px', fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Anomaly Score</span>
          <span style={{ color: strokeColor, fontSize: '12px', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
            {(score * 100).toFixed(1)}%
          </span>
        </div>
        <div style={{ height: '4px', background: '#1e2d52', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '2px',
            width: `${score * 100}%`,
            background: `linear-gradient(90deg, #00ff88, ${strokeColor})`,
            transition: 'width 0.3s ease, background 0.3s ease',
            boxShadow: `0 0 8px ${strokeColor}60`,
          }} />
        </div>
      </div>
    </div>
  )
}
