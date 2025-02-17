import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css'
import Home from './Home.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename="/3-in-a-row-game/">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/3-in-a-row-game/sample" element={<App apiUrl={'https://prog2700.onrender.com/threeinarow/sample'}/>}/>
        <Route path="/3-in-a-row-game/random" element={<App apiUrl={'https://prog2700.onrender.com/threeinarow/random'}/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
