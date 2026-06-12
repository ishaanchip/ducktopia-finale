import React, {useEffect, useState} from 'react'

import './Lane.css'

import { POSSIBLE_OPTIONS } from './helper'


const Lane = ({setLevel}) => {


  const [levelComplete, setLevelComplete] = useState(false)

  //storing input data
  const [students, setStudents] = useState([])
  const [studentIds, setStudentIds] = useState([]) //stores all input id boxes that were completed

  const [student1, setStudent1] = useState("")
  const [student2, setStudent2] = useState("")
  const [student3, setStudent3] = useState("")
  const [student4, setStudent4] = useState("")

  //verifying user input
  const handleStudentInput = (nameGuess, id) =>{
    let updatedGuess = nameGuess.toUpperCase()
    if (POSSIBLE_OPTIONS.includes(updatedGuess) && !students.includes(updatedGuess)){
        setStudents([...students, updatedGuess])
        setStudentIds([...studentIds, id])
        return true
    }
    return false
  }

  //tracker upon level completion [if 4 students typed in, level complete]
  useEffect(() =>{
    if (students.length == 4){
        console.log('COMPLETE')
        setLevelComplete(true)
    }
  }, [students])


  
  return (
    <div className='game'>
        <div className="game-content">
            <div className='input-shell'>
                <div className="name-input-area">
                    <input id="student1" placeholder={'STUDENT 1'} value={student1} onChange={(e) => {
                        setStudent1(e.target.value.toUpperCase())
                        let isCorrect = handleStudentInput(e.target.value.toUpperCase(), 'student1')
                        if (isCorrect){
                            e.target.blur()
                        }
                    }} className={studentIds.includes('student1') ? 'correct' : 'guess'}/>
                    <input id="student2" placeholder={'STUDENT 2'} value={student2} onChange={(e) => {
                        setStudent2(e.target.value.toUpperCase())
                        let isCorrect = handleStudentInput(e.target.value.toUpperCase(), 'student2')
                        if (isCorrect){
                            e.target.blur()
                        }
                    }} className={studentIds.includes('student2') ? 'correct' : 'guess'}/>
                    <input id="student3" placeholder={'STUDENT 3'} value={student3} onChange={(e) => {
                        setStudent3(e.target.value.toUpperCase())
                        let isCorrect = handleStudentInput(e.target.value.toUpperCase(), 'student3')
                        if (isCorrect){
                            e.target.blur()
                        }
                    }} className={studentIds.includes('student3') ? 'correct' : 'guess'}/>
                    <input id="student4" placeholder={'STUDENT 4'} value={student4} onChange={(e) => {
                        setStudent4(e.target.value.toUpperCase())
                        let isCorrect = handleStudentInput(e.target.value.toUpperCase(), 'student4')
                        if (isCorrect){
                            e.target.blur()
                        }
                    }} className={studentIds.includes('student4') ? 'correct' : 'guess'}/>
                </div>
            </div>
            <div className="scene-supplementals">
                <h1 className='title'>Level 2: Memory Lane</h1>
                <p>Type in the full name of  4 graduating seniors from 5th block AP CSP (2023 - 2024). </p>
                <p> How well do you remember your beloved students?</p>
                <h3>FUNCTIONALITY</h3>
                <p>GREEN - Student's Name is Correct</p>
                <p>RED - Student's Name Not Found</p>
            </div>
            

        </div>
        <div className="level-navigation">
            <button onClick={() =>{setLevel('level1')}}  className='prev'> PREVIOUS LEVEL</button>

            {levelComplete ?
            <button onClick={() =>{setLevel('level3')}} className='next'> NEXT LEVEL</button>
            :
            <button onClick={() =>{setLevel('level3')}} disabled className='next'> NEXT LEVEL</button>

            }
        </div>


    </div>
  )
}

export default Lane