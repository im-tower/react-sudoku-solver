import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard'
import GameUI from './components/GameUI'

function App() {

  return (
    <div className='app-container'>
      <GameBoard />
      <GameUI />
    </div>
  )
}

export default App
