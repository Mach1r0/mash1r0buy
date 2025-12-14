import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/navbar'
import Home from './pages/home'
import Footer from './components/footer/footer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App