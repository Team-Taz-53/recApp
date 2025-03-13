import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppAlpha from './AppAlpha'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppAlpha />
  </StrictMode>,
)
