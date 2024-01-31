import { App } from './App'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './components/nav/NavBar.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
