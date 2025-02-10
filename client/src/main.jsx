import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import eruda from 'eruda';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
eruda.init();

import { ContextProvider } from './context/StoreContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>

)
