import { Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { FormTask } from './pages/FormTask'

function App() {
  return (
    <Container className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<FormTask />} />
      </Routes>
    </Container>
  )
}

export default App
