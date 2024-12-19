import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Web3Provider } from './Web3Provider'
import './index.css'
import App from './App'

/*
  No need to modify anything here as everything is as it should be
*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </StrictMode>,
)