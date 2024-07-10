import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './pages/SignUp';
import DashBoard from './pages/DashBoard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
      </Routes>
      
    </Router>
  )
}

export default App
