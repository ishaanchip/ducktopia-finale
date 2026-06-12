import { useEffect, useState } from 'react'
import Phaser from 'phaser'

import './App.css'

import Invader from './SpaceInvader/Invader'
import Lane from './MemoryLane/Lane'
import WordGuesser from './WordGuesser/WordGuesser'
import Race from './Race/Race'
import Dropper from './Dropper/Dropper'
import Binary from './Binary/Binary'
import Tale from './DuckTale/Tale'
import Prize from './Prize/Prize'

function App() {

  const [level, setLevel] = useState(() =>{
    return localStorage.getItem('current_level') || "level1"
  })

  useEffect(() => {
    localStorage.setItem('current_level', level)
  }, [level])

  return (
    <div className="app">
      <div className='game-browser'>
      {
        level === "level1" ? 
        <Invader setLevel={setLevel} /> :

        level === "level2" ? 
        <Lane setLevel={setLevel} /> :

        level === "level3" ? 
        <Dropper setLevel={setLevel} /> :

        level === "level4" ? 
        <WordGuesser setLevel={setLevel} /> :

        level === "level5" ? 
        <Race setLevel={setLevel} /> :

        level === "level6" ? 
        <Binary setLevel={setLevel} /> :
        level === "level7" ? 
        <Tale setLevel={setLevel} />:

        <Prize setLevel={setLevel}/>
      }
      </div>
      <div className='ducktopia-title-screen'>
        <img src="https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781270536/Untitled_-_June_12__2026_at_09.21.05-removebg-preview_frjkbm.png" alt="DUCKTOPIA_LOGO"/>
        <h3>7 Levels - 3 Interactive Games - 1 Prize</h3>
        <h4 className='size-warning'>BIGGER SCREEN REQUIRED</h4>
        <p>created by ishaan chiplunkar</p>
      </div>
    </div>
  )
}

export default App
