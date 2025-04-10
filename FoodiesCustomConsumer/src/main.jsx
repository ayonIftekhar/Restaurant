import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Context from './Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Context>
    <App />
  </Context>
  </BrowserRouter>
)
