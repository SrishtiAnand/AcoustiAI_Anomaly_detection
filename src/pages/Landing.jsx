import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Mic, Brain, Shield, TrendingDown, DollarSign, Clock, BarChart2, ChevronRight, ArrowRight, Cpu, Eye, GitBranch, Users } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

function Section({ children, id, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', ...style }}
    >
      {children}
    </motion.section>
  )
}

const FLOW_STEPS = [
  { icon: Mic, label: 'Capture Sound', description: 'Industrial microphone array captures high-frequency acoustic emissions', color: '#00d4ff' },
  { icon: BarChart2, label: 'Extract Features', description: 'MFCC, Mel-spectrogram, and FFT feature extraction pipeline', color: '#bf00ff' },
  { icon: Brain, label: 'AI Detection', description: 'CNN + LSTM model classifies defect type with confidence scoring', color: '#00ff88' },
  { icon: Zap, label: 'Smart Decision', description: 'AI agent evaluates risk and dispatches automated or manual response', color: '#ffdd00' },
  { icon: Users, label: 'Human Verification', description: 'Technician dashboard for review, override, and escalation', color: '#ff3366' },
]

const FEATURES = [
  { icon: Mic, title: 'Real-Time Monitoring', description: 'Continuous acoustic surveillance at 44.1kHz with sub-second anomaly detection latency.', color: '#00d4ff' },
  { icon: Brain, title: 'CNN + LSTM Model', description: 'Deep learning pipeline trained on 50k+ labeled industrial defect signals.', color: '#00ff88' },
  { icon: Zap, title: 'AI Agent Decisions', description: 'Autonomous decision engine selects optimal corrective action in milliseconds.', color: '#ffdd00' },
  { icon: Cpu, title: 'Digital Twin', description: 'Real-time virtual machine replica reflects live operational state and predicted failure modes.', color: '#bf00ff' },
  { icon: Eye, title: 'Predictive Maintenance', description: 'Failure forecasting up to 72 hours in advance using temporal acoustic patterns.', color: '#ff3366' },
  { icon: GitBranch, title: 'Human-in-the-Loop', description: 'Technician workflow integration ensures critical decisions include expert oversight.', color: '#00d4ff' },
]

const IMPACTS = [
  { icon: TrendingDown, value: '73%', label: 'Defect Reduction', description: 'Catch defects before they propagate to final product', color: '#00ff88' },
  { icon: BarChart2, value: '2.4×', label: 'Efficiency Gain', description: 'Optimized uptime via predictive rather than reactive maintenance', color: '#00d4ff' },
  { icon: DollarSign, value: '60%', label: 'Cost Savings', description: 'Reduced unplanned downtime and emergency maintenance spend', color: '#ffdd00' },
  { icon: Clock, value: '<100ms', label: 'Response Time', description: 'From acoustic event to AI decision to operator alert', color: '#bf00ff' },
]

export default function Landing() {
  return (
    <div style={{ background: '#080c14', overflow: 'hidden' }}>
      {/* ── HERO ── */}
      <div style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Background grid */}
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(ellipse, #00ff8815 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '60%', left: '20%',
          width: '300px', height: '300px',
          background: 'radial-gradient(ellipse, #00d4ff10 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '80%',
          width: '250px', height: '250px',
          background: 'radial-gradient(ellipse, #bf00ff10 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px', maxWidth: '900px' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '20px',
              background: '#00ff8815', border: '1px solid #00ff8840',
              color: '#00ff88', fontSize: '12px', fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em',
              marginBottom: '28px',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', animation: 'pulse-neon 1.5s ease-in-out infinite' }} />
            HACKATHON 2026 — SMART MANUFACTURING TRACK
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #ffffff 0%, #00ff88 50%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI-Powered Acoustic Intelligence for Smart Manufacturing
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              color: '#64748b',
              marginBottom: '12px',
              fontWeight: 300,
              letterSpacing: '0.02em',
            }}
          >
            Detect. Predict. Act —{' '}
            <span style={{ color: '#00ff88', fontWeight: 700 }}>in Real-Time</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ color: '#475569', fontSize: '15px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}
          >
            Industrial-grade acoustic anomaly detection using CNN + LSTM deep learning, autonomous AI agents, and real-time digital twin visualization.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/demo" id="hero-live-demo-btn" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px #00ff8840' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px', borderRadius: '8px',
                  background: '#00ff88', color: '#080c14',
                  border: 'none', fontSize: '15px', fontWeight: 800,
                  fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                <Zap size={16} />
                Live Demo
              </motion.button>
            </Link>
            <Link to="/demo" id="hero-dashboard-btn" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.04, background: '#00ff8812' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px', borderRadius: '8px',
                  background: 'transparent', color: '#e2e8f0',
                  border: '1px solid #334155', fontSize: '15px', fontWeight: 600,
                  fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                View Dashboard
                <ChevronRight size={16} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Floating metric pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '56px', flexWrap: 'wrap' }}
          >
            {[
              { label: 'Accuracy', value: '97.3%', color: '#00ff88' },
              { label: 'Latency', value: '<100ms', color: '#00d4ff' },
              { label: 'Defect Types', value: '12+', color: '#bf00ff' },
              { label: 'Uptime', value: '99.9%', color: '#ffdd00' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                padding: '8px 18px', borderRadius: '8px',
                background: `${color}10`, border: `1px solid ${color}30`,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <span style={{ color, fontSize: '20px', fontWeight: 800, fontFamily: 'JetBrains Mono' }}>{value}</span>
                <span style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', color: '#334155' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '10px', fontFamily: 'JetBrains Mono', letterSpacing: '0.2em' }}>SCROLL</span>
            <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, #334155, transparent)' }} />
          </div>
        </motion.div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background: '#0d1424', borderTop: '1px solid #00ff8815', borderBottom: '1px solid #00ff8815' }}>
        <Section id="how-it-works">
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#00ff88', fontSize: '11px', fontFamily: 'JetBrains Mono', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              System Architecture
            </span>
            <h2 style={{ color: '#f1f5f9', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginTop: '12px' }}>
              How It Works
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '12px', maxWidth: '560px', margin: '12px auto 0' }}>
              A complete 5-stage pipeline from raw sound to intelligent action — in under 100ms.
            </p>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0', overflowX: 'auto', paddingBottom: '20px' }}>
            {FLOW_STEPS.map(({ icon: Icon, label, description, color }, i) => (
              <React.Fragment key={label}>
                <motion.div
                  variants={fadeUp}
                  style={{ flex: '0 0 180px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 12px' }}
                >
                  {/* Step number */}
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: `${color}15`, border: `2px solid ${color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '12px', position: 'relative',
                  }}>
                    <Icon size={24} color={color} />
                    <div style={{
                      position: 'absolute', top: '-4px', right: '-4px',
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: color, color: '#080c14',
                      fontSize: '10px', fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'JetBrains Mono',
                    }}>
                      {i + 1}
                    </div>
                  </div>
                  <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{label}</div>
                  <div style={{ color: '#64748b', fontSize: '12px', lineHeight: '1.5' }}>{description}</div>
                </motion.div>

                {/* Arrow between steps */}
                {i < FLOW_STEPS.length - 1 && (
                  <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', paddingTop: '20px', opacity: 0.4 }}>
                    <ArrowRight size={20} color="#64748b" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Section>
      </div>

      {/* ── FEATURES ── */}
      <Section id="features">
        <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '54px' }}>
          <span style={{ color: '#00d4ff', fontSize: '11px', fontFamily: 'JetBrains Mono', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Capabilities
          </span>
          <h2 style={{ color: '#f1f5f9', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginTop: '12px' }}>
            Core Features
          </h2>
        </motion.div>
        <motion.div
          variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}
        >
          {FEATURES.map(({ icon: Icon, title, description, color }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ translateY: -4, boxShadow: `0 8px 32px ${color}15` }}
              style={{
                background: 'linear-gradient(135deg, #0d142488, #111a2e88)',
                border: `1px solid ${color}20`,
                borderRadius: '12px', padding: '24px',
                cursor: 'default', transition: 'box-shadow 0.3s',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: `${color}15`, border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '14px',
              }}>
                <Icon size={20} color={color} />
              </div>
              <h3 style={{ color: '#f1f5f9', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{title}</h3>
              <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6' }}>{description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '14px', color, fontSize: '12px', fontWeight: 600 }}>
                Learn more <ChevronRight size={13} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── IMPACT ── */}
      <div style={{ background: '#0d1424', borderTop: '1px solid #00ff8815', borderBottom: '1px solid #00ff8815' }}>
        <Section id="impact">
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '54px' }}>
            <span style={{ color: '#ffdd00', fontSize: '11px', fontFamily: 'JetBrains Mono', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Business Value
            </span>
            <h2 style={{ color: '#f1f5f9', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginTop: '12px' }}>
              Real-World Impact
            </h2>
          </motion.div>
          <motion.div
            variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}
          >
            {IMPACTS.map(({ icon: Icon, value, label, description, color }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                style={{
                  background: `${color}08`, border: `1px solid ${color}25`,
                  borderRadius: '12px', padding: '28px 22px', textAlign: 'center',
                }}
              >
                <Icon size={28} color={color} style={{ margin: '0 auto 12px', display: 'block' }} />
                <div style={{ color, fontSize: '42px', fontWeight: 900, fontFamily: 'JetBrains Mono', letterSpacing: '-1px' }}>{value}</div>
                <div style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: 700, margin: '6px 0' }}>{label}</div>
                <div style={{ color: '#64748b', fontSize: '12px', lineHeight: '1.5' }}>{description}</div>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </div>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '500px', height: '300px',
          background: 'radial-gradient(ellipse, #00ff8812 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900,
            color: '#f1f5f9', marginBottom: '16px',
          }}>
            Ready to See It in Action?
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
            Launch the live demo and experience real-time acoustic AI monitoring — no setup required.
          </p>
          <Link to="/demo" id="cta-start-btn" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px #00ff8840' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '18px 44px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                color: '#080c14', border: 'none',
                fontSize: '17px', fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              <Zap size={18} />
              Start Live Monitoring
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
