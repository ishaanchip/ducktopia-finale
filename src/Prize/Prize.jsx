import React from 'react'
import "./Prize.css"

const Prize = ({setLevel}) => {
  return (
    <div className='game'>
        <div className="game-content">
            <div className="input-shell">
                <div className="prize-area">
                    <img src="https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781275809/Untitled_-_June_12__2026_at_09.21.05__1_-removebg-preview_r0onfq.png" alt="Scrooge McDuck"/>
                    <h1>Unlock the Chest</h1>
                </div>

            </div>
            <div className="scene-supplementals">
                <h1 className='title'>Prize: Scrooge McDuck</h1>
                <p>Congratulations, Mrs.Harris! You are now a 2x Ducktopia Champion. How does it feel?</p>
            </div>
        </div>
        
        <div className="level-navigation">
            <button onClick={() =>{setLevel('level7')}}  className='prev'> PREVIOUS LEVEL</button>
            <button onClick={() =>{setLevel('level1')}} className='next'> PLAY AGAIN</button>
        </div>


    </div>
  )
}

export default Prize