import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles.css'
import 'flyonui/flyonui'
import 'material-symbols'

document.documentElement.setAttribute('data-theme', 'light')
document.documentElement.style.colorScheme = 'light'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
