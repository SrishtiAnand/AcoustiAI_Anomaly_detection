import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SimulationProvider } from './context/SimulationContext.jsx'
import Navbar from './components/Navbar.jsx'
import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Technician from './pages/Technician.jsx'
import Logs from './pages/Logs.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <SimulationProvider>
      <div style={{ minHeight: '100vh', background: '#080c14' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<Dashboard />} />
          <Route path="/technician" element={<Technician />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </SimulationProvider>
  )
}
