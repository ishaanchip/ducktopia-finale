import React, { useEffect, useState } from 'react'

import "./Binary.css"
import { binarySequenceGenerator } from './helper'

const Binary = ({setLevel}) => {

  const [levelComplete, setLevelComplete] = useState(false)  

  const [currentSequence, setCurrentSequence] = useState("")
  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [currentInput, setCurrentInput] = useState()
  const [questionCounter, setQuestionCounter] = useState(1)

  useEffect(() =>{
    if (currentSequence.length == 0){
        let temp = binarySequenceGenerator()
        setCurrentSequence(temp[0])
        setCurrentAnswer(temp[1])
    }
  }, [])


  useEffect(() =>{
    if (questionCounter > 10){
        console.log('COMPLETED')
        setLevelComplete(true)
    }
  }, [questionCounter])

  const handleAnswer = (answer) =>{
    if (answer == currentAnswer){
        setQuestionCounter((prev) => prev + 1)
        let temp = binarySequenceGenerator()
        setCurrentSequence(temp[0])
        setCurrentAnswer(temp[1])
        setCurrentInput("")
    }
  }




  
  return (
    <div className='game'>
        <div className="game-content">
            <div className="input-shell">
                <div className="binary-input-area">
                {currentSequence.length > 0
                    &&
                    <h1>{currentSequence}</h1>
                }
                <input value={currentInput} type="number" onChange={(e) =>{
                    setCurrentInput(e.target.value)
                    handleAnswer(e.target.value)
                }}/>
                <p>{questionCounter}/10</p>
                </div>

            </div>
            <div className="scene-supplementals">
                <h1 className='title'>Level 6: It’s Only 0s and 1s</h1>
                <p>Convert 10, 6 length binary sequences to their decimal form </p>
                <h3>FUNCTIONALITY: </h3>
                <p>If the answer is correct, it will automatically go to the next question.</p>
            </div>
        </div>
        
        <div className="level-navigation">
            <button onClick={() =>{setLevel('level5')}}  className='prev'> PREVIOUS LEVEL</button>

            {levelComplete ?
            <button onClick={() =>{setLevel('level7')}} className='next'> NEXT LEVEL</button>
            :
            <button onClick={() =>{setLevel('level7')}} disabled className='next'> NEXT LEVEL</button>

            }
        </div>


    </div>
  )
}

export default Binary