import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Cpu, FileText, Info, Home, Menu, X, Radio, Square, RotateCcw, Zap } from 'lucide-react'
import { useSimulation } from '../context/SimulationContext.jsx'

const NAV_LINKS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/demo', label: 'Dashboard', icon: Activity },
  { path: '/technician', label: 'Technician', icon: Cpu },
  { path: '/logs', label: 'Logs', icon: FileText },
  { path: '/about', label: 'About', icon: Info },
]

const MODE_COLORS = {
  AUTO: { color: '#00ff88', bg: '#00ff8820', border: '#00ff8840' },
  ADAPTIVE: { color: '#ffdd00', bg: '#ffdd0020', border: '#ffdd0040' },
  CRITICAL: { color: '#ff3366', bg: '#ff336620', border: '#ff336640' },
}

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { demoActive, setDemoActive, mode, isListening, score } = useSimulation()

  const modeStyle = MODE_COLORS[mode] || MODE_COLORS.AUTO

  return (
    <>
      <nav style={{
        background: 'linear-gradient(90deg, #080c14ee, #0d1424ee)',
        borderBottom: '1px solid #00ff8820',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '34px', height: '34px',
                background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={18} color="#080c14" strokeWidth={2.5} />
              </div>
              <div>
                <span style={{ color: '#00ff88', fontWeight: 800, fontSize: '16px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '-0.5px' }}>AcoustiAI</span>
                <span style={{ color: '#64748b', fontSize: '10px', display: 'block', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace' }}>SMART MFG INTELLIGENCE</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {NAV_LINKS.map(({ path, label, icon: Icon }) => {
                const active = location.pathname === path
                return (
                  <Link key={path} to={path} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 14px', borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '13px', fontWeight: active ? 600 : 400,
                    color: active ? '#00ff88' : '#94a3b8',
                    background: active ? '#00ff8812' : 'transparent',
                    border: active ? '1px solid #00ff8830' : '1px solid transparent',
                    transition: 'all 0.2s',
                  }}>
                    <Icon size={14} />
                    {label}
                  </Link>
                )
              })}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Mode Badge */}
              <div style={{
                padding: '4px 12px', borderRadius: '20px',
                background: modeStyle.bg, border: `1px solid ${modeStyle.border}`,
                color: modeStyle.color, fontSize: '11px', fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: modeStyle.color,
                  animation: 'pulse-neon 2s ease-in-out infinite',
                }} />
                {mode}
              </div>

              {/* Demo Toggle */}
              <button
                id="demo-toggle-btn"
                onClick={() => setDemoActive(!demoActive)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 14px', borderRadius: '6px', cursor: 'pointer',
                  border: demoActive ? '1px solid #00ff88' : '1px solid #334155',
                  background: demoActive ? '#00ff8820' : 'transparent',
                  color: demoActive ? '#00ff88' : '#64748b',
                  fontSize: '12px', fontWeight: 600,
                  fontFamily: 'JetBrains Mono, monospace',
                  transition: 'all 0.2s',
                }}
              >
                <Radio size={13} style={{ animation: demoActive ? 'pulse-neon 1.5s ease-in-out infinite' : 'none' }} />
                {demoActive ? 'LIVE' : 'DEMO OFF'}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ borderTop: '1px solid #00ff8815', overflow: 'hidden' }}
            >
              <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {NAV_LINKS.map(({ path, label, icon: Icon }) => (
                  <Link key={path} to={path} onClick={() => setMobileOpen(false)} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 14px', borderRadius: '6px',
                    textDecoration: 'none', color: location.pathname === path ? '#00ff88' : '#94a3b8',
                    background: location.pathname === path ? '#00ff8812' : 'transparent',
                    fontSize: '13px', fontWeight: 500,
                  }}>
                    <Icon size={15} />
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
