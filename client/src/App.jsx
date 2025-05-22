
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'

import './App.css'
import ChatScreen from './Page/ChatScreen'
import Login from './Page/Login'
import Signup from './Page/Signup'



function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ChatScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </Router>
      </AuthProvider>
        
    </>
  )
}

export default App
