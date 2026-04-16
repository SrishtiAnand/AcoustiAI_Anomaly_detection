import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, UserCheck, Cpu } from 'lucide-react'
import { useSimulation } from '../context/SimulationContext.jsx'

export default function CriticalAlertModal() {
  const { showCriticalAlert, dismissAlert } = useSimulation()

  return (
    <AnimatePresence>
      {showCriticalAlert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: '#ff336615',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={dismissAlert}
        >
          <motion.div
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1a0810, #0d1424)',
              border: '1px solid #ff336660',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '420px',
              width: '90%',
              boxShadow: '0 0 60px #ff336640, 0 0 120px #ff336615',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated top border */}
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, transparent, #ff3366, transparent)',
              }}
            />

            {/* Close */}
            <button onClick={dismissAlert} style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'none', border: 'none', color: '#64748b', cursor: 'pointer',
            }}>
              <X size={18} />
            </button>

            {/* Icon */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: '#ff336620',
                border: '2px solid #ff336660',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <AlertTriangle size={28} color="#ff3366" />
            </motion.div>

            {/* Title */}
            <h2 style={{
              textAlign: 'center', color: '#ff3366', fontWeight: 800,
              fontSize: '20px', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.05em', marginBottom: '8px',
            }}>
              CRITICAL ANOMALY
            </h2>
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>
              Severe acoustic anomaly detected in Machine #12
            </p>

            {/* Status pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                { label: 'Machine Stopped', color: '#ff3366', icon: Cpu },
                { label: 'Technician Assigned', color: '#ffdd00', icon: UserCheck },
                { label: 'Escalation Triggered', color: '#ff3366', icon: AlertTriangle },
              ].map(({ label, color, icon: Icon }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: '8px',
                  background: `${color}12`, border: `1px solid ${color}30`,
                }}>
                  <Icon size={14} color={color} />
                  <span style={{ color, fontSize: '13px', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Dismiss */}
            <button
              onClick={dismissAlert}
              className="btn-danger"
              style={{ width: '100%', padding: '12px', fontSize: '13px' }}
            >
              Acknowledge & Dismiss
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
