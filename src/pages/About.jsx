import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Cpu, Users, GitBranch, Zap, ExternalLink, Code, Mail } from 'lucide-react'

const TEAM = [
  { name: 'Srishti Anand', role: 'ML Engineer & Lead Developer', initials: 'SA', color: '#00ff88' },
  { name: 'Team Member 2', role: 'Signal Processing & DSP', initials: 'TM', color: '#00d4ff' },
  { name: 'Team Member 3', role: 'Frontend & UI/UX Engineer', initials: 'TM', color: '#bf00ff' },
  { name: 'Team Member 4', role: 'Industrial IoT & Hardware', initials: 'TM', color: '#ffdd00' },
]

const TECH_STACK = [
  { cat: 'AI / ML Models', items: ['CNN (ResNet-inspired)', 'LSTM Sequence Model', 'Transformer Attention Head', 'Ensemble Voting Classifier'], color: '#00ff88' },
  { cat: 'Signal Processing', items: ['MFCC Feature Extraction', 'Mel-Spectrogram', 'FFT / STFT', 'Bandpass Filtering'], color: '#00d4ff' },
  { cat: 'Frontend', items: ['React + Vite', 'Tailwind CSS v4', 'Recharts', 'Framer Motion'], color: '#bf00ff' },
  { cat: 'Backend / Infra', items: ['Python FastAPI', 'WebSocket Streaming', 'Redis Pub/Sub', 'Docker Containers'], color: '#ffdd00' },
]

const TIMELINE = [
  { phase: 'Research & Dataset', desc: 'Curated 50k+ labeled industrial acoustic samples across 12 defect categories', color: '#00d4ff' },
  { phase: 'Model Development', desc: 'Trained CNN + LSTM pipeline achieving 97.3% classification accuracy', color: '#00ff88' },
  { phase: 'AI Agent Design', desc: 'Built autonomous decision engine with rule-based + learned policy hybrid', color: '#bf00ff' },
  { phase: 'Digital Twin', desc: 'Implemented real-time virtual machine state reflection and visualization', color: '#ffdd00' },
  { phase: 'Full System Integration', desc: 'End-to-end pipeline from audio capture to technician alert under 100ms', color: '#ff3366' },
]

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export default function About() {
  return (
    <div style={{ background: '#080c14', minHeight: 'calc(100vh - 60px)' }}>
      {/* Hero */}
      <div style={{ position: 'relative', background: '#0d1424', borderBottom: '1px solid #00ff8815', padding: '80px 20px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '300px', background: 'radial-gradient(ellipse, #00ff8812 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '20px', background: '#00ff8812', border: '1px solid #00ff8830', color: '#00ff88', fontSize: '11px', fontFamily: 'JetBrains Mono', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '20px' }}>
            HACKATHON 2026
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#f1f5f9', marginBottom: '16px', lineHeight: 1.15 }}>
            About This Project
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.7', marginBottom: '28px' }}>
            <strong style={{ color: '#00ff88' }}>AcoustiAI</strong> is an end-to-end industrial acoustic intelligence system that detects mechanical defects in real time using deep learning on sound signals. Built for the Smart Manufacturing track, it replaces costly vibration sensors and scheduled maintenance with continuous AI-driven acoustic surveillance.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/demo" style={{ textDecoration: 'none' }}>
              <button id="about-demo-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '7px', background: '#00ff88', color: '#080c14', border: 'none', fontWeight: 700, fontSize: '13px', fontFamily: 'JetBrains Mono', cursor: 'pointer' }}>
                <Zap size={14} /> Live Demo
              </button>
            </Link>
            <button id="github-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '7px', background: 'transparent', color: '#e2e8f0', border: '1px solid #334155', fontWeight: 600, fontSize: '13px', fontFamily: 'JetBrains Mono', cursor: 'pointer' }}>
              <Code size={14} /> GitHub Repo
            </button>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Problem Statement */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: '64px' }}>
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '3px', height: '24px', background: 'linear-gradient(to bottom, #00ff88, #00d4ff)', borderRadius: '2px' }} />
            <h2 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 800 }}>The Problem</h2>
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { title: 'Hidden Failures', desc: 'Mechanical defects like bearing cracks and misalignment often develop silently, going undetected until catastrophic failure occurs.', color: '#ff3366' },
              { title: 'Expensive Sensors', desc: 'Traditional vibration monitoring systems cost $5,000–$50,000 per machine and require specialized installation.', color: '#ffdd00' },
              { title: 'Reactive Maintenance', desc: 'Most plants still rely on scheduled or reactive maintenance, leading to unplanned downtime averaging $260,000/hr in automotive.', color: '#00d4ff' },
            ].map(({ title, desc, color }) => (
              <div key={title} style={{ background: `${color}08`, border: `1px solid ${color}20`, borderRadius: '10px', padding: '20px' }}>
                <div style={{ color, fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>{title}</div>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6' }}>{desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: '64px' }}>
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '3px', height: '24px', background: 'linear-gradient(to bottom, #00d4ff, #bf00ff)', borderRadius: '2px' }} />
            <h2 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 800 }}>Technology Stack</h2>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {TECH_STACK.map(({ cat, items, color }) => (
              <motion.div key={cat} variants={fadeUp} style={{ background: '#0d1424', border: `1px solid ${color}20`, borderRadius: '10px', padding: '20px' }}>
                <div style={{ color, fontSize: '12px', fontWeight: 700, fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>{cat}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                      <span style={{ color: '#94a3b8', fontSize: '13px' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Development Timeline */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: '64px' }}>
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{ width: '3px', height: '24px', background: 'linear-gradient(to bottom, #ffdd00, #ff3366)', borderRadius: '2px' }} />
            <h2 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 800 }}>How We Built It</h2>
          </motion.div>
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '10px', top: '8px', bottom: '8px', width: '1px', background: 'linear-gradient(to bottom, #00ff88, #ff3366)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {TIMELINE.map(({ phase, desc, color }, i) => (
                <motion.div key={phase} variants={fadeUp} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ position: 'absolute', left: '5px', width: '11px', height: '11px', borderRadius: '50%', background: color, border: '2px solid #080c14', marginTop: '3px', boxShadow: `0 0 8px ${color}60` }} />
                  <div style={{ background: '#0d1424', border: `1px solid ${color}20`, borderRadius: '8px', padding: '14px 18px', flex: 1 }}>
                    <div style={{ color, fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Phase {i + 1}: {phase}</div>
                    <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5' }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: '48px' }}>
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '3px', height: '24px', background: 'linear-gradient(to bottom, #bf00ff, #00d4ff)', borderRadius: '2px' }} />
            <h2 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 800 }}>The Team</h2>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            {TEAM.map(({ name, role, initials, color }) => (
              <motion.div key={name} variants={fadeUp} whileHover={{ scale: 1.02 }} style={{ background: '#0d1424', border: `1px solid ${color}20`, borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `${color}20`, border: `2px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: '16px', fontWeight: 800, fontFamily: 'JetBrains Mono', flexShrink: 0 }}>
                  {initials}
                </div>
                <div>
                  <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 700 }}>{name}</div>
                  <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>{role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', padding: '40px', background: '#0d1424', border: '1px solid #00ff8820', borderRadius: '16px' }}>
          <h3 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Get In Touch</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Questions, feedback, or collaboration opportunities? Reach out!</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button id="contact-email-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '7px', background: 'transparent', border: '1px solid #00ff8840', color: '#00ff88', fontSize: '13px', fontFamily: 'JetBrains Mono', cursor: 'pointer' }}>
              <Mail size={14} /> Email Us
            </button>
            <button id="contact-github-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '7px', background: 'transparent', border: '1px solid #334155', color: '#94a3b8', fontSize: '13px', fontFamily: 'JetBrains Mono', cursor: 'pointer' }}>
              <Code size={14} /> GitHub
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
