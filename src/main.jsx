import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'

import './index.css'
import App from './App.jsx'
import { prefersReducedMotion } from './lib/motion'

// Respect the OS "reduce motion" setting: fast-forward every GSAP tween so
// content still appears, but nothing visibly animates.
if (prefersReducedMotion()) {
  gsap.globalTimeline.timeScale(100)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
