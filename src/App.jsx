import React from 'react'
import Jokes from './components/Jokes'
import Navbar from './components/Navbar'
import './App.css'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Jokes />
    </div>
  )
}

export default App