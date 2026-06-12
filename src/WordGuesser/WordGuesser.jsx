import React, {useEffect, useState} from 'react'

import './WordGuesser.css'



const WordGuesser = ({setLevel}) => {

  const [levelComplete, setLevelComplete] = useState(false)  


  //storing input data
  const [guess, setGuess] = useState([])


  //tracker upon level completion 
  useEffect(() =>{
    if (guess == "NUANCED"){
        console.log('COMPLETE')
        setLevelComplete(true)
    }
  }, [guess])


  
  return (
    <div className='game'>
        <div className="game-content">
            <div className="input-shell">
                <div className="word-input-area">
                    <input id="guess" placeholder={'🐥🐤🦆🐥🐤🦆🐥🐤🦆🐥🐤🦆🐥🐤🦆🐥🐤🦆'} value={guess} onChange={(e) => {
                        setGuess(e.target.value.toUpperCase())
                        let isCorrect = e.target.value.toUpperCase() === "NUANCED"
                        if (isCorrect){
                            e.target.blur()
                        }
                    }} className={guess =="NUANCED" ? 'correct' : 'guess'}/>
                </div>
            </div>
            <div className="scene-supplementals">
                <h1 className='title'>Level 4: Flashback</h1>
                <p>Describe this test in one, seven letter word (only one right answer) </p>
                <h3>FUNCTIONALITY</h3>
                <p>GREEN - Word is Correct</p>
                <p>RED - Word Not Found</p>
            </div>

        </div>
        <div className="level-navigation">
            <button onClick={() =>{setLevel('level3')}}  className='prev'> PREVIOUS LEVEL</button>

            {levelComplete ?
            <button onClick={() =>{setLevel('level5')}} className='next'> NEXT LEVEL</button>
            :
            <button onClick={() =>{setLevel('level5')}} disabled className='next'> NEXT LEVEL</button>

            }
        </div>

    </div>
  )
}

export default WordGuesser