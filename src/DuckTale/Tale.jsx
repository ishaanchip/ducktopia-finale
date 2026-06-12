import React, {useEffect, useState} from 'react'

import './Tale.css'



const Tale = ({setLevel}) => {

  const [levelComplete, setLevelComplete] = useState(false)
  //storing input data
  const [guess, setGuess] = useState([])


  //tracker upon level completion 
  useEffect(() =>{
    if (guess == "SCROOGE"){
        console.log('COMPLETE')
        setLevelComplete(true)
    }
  }, [guess])


  
  return (
    <div className='game'>
        <div className="game-content">
            <div className="input-shell">
                <a target='_blank' href="https://docs.google.com/document/d/1-AU5Ju4fzM-hqKEtI3i6oQ1ilcBfmBkq0GJuMO7isLI/edit?tab=t.0"><p className='link-text'>Click Here to View the Hints</p></a>
                <div className="tale-area">
                    <input id="guess" placeholder={'🐥🐤🦆🐥🐤🦆🐥🐤🦆🐥🐤🦆🐥🐤🦆🐥🐤🦆'} value={guess} onChange={(e) => {
                        setGuess(e.target.value.toUpperCase())
                        let isCorrect = e.target.value.toUpperCase() === "SCROOGE"
                        if (isCorrect){
                            e.target.blur()
                        }
                    }} className={guess =="SCROOGE" ? 'correct' : 'guess'}/>
                </div>
            </div>
            <div className="scene-supplementals">
                <h1>Level 7: A Duck’s Tale</h1>
                <p>Decipher the hints to unlock the key to the prize!</p>
            </div>
        </div>

        <div className="level-navigation">
            <button onClick={() =>{setLevel('level6')}}  className='prev'> PREVIOUS LEVEL</button>

            {levelComplete ?
            <button onClick={() =>{setLevel('prize')}} className='next'> REVEAL PRIZE</button>
            :
            <button onClick={() =>{setLevel('prize')}} disabled className='next'> REVEAL PRIZE</button>

            }
        </div>
    </div>
  )
}

export default Tale




