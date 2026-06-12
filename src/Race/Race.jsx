import React, { useEffect, useState } from 'react'
import Phaser from 'phaser'

import './Race.css'

import { DUCK_SONG_CHARACTERS } from './helper'


let gameState = {
    carAccel:0
}

const Race = ({setLevel}) => {

  const [levelComplete, setLevelComplete]  = useState()
  
    
  //BOILERPLATE PHASER

  
  const sizes = {
    width:650,
    height:400
  }
  

  class GameScene extends Phaser.Scene{
    constructor(){
      super('race-scene') 
    }
  
    preload(){
      //loading in all images & content
      this.load.image('yellow', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247377/yellow_hgewcs.jpg') 
      this.load.image('car', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247163/car_jdwfjg.png')
      this.load.image('road', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247352/road_ngq8za.png') 
      this.load.image('teleporter', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247372/teleporter_cjbr2x.png')
      this.load.image('police', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247348/police_nrbdvu.png')

    }
  
    create(){
      gameState.active = true
  
      //declaring background
      this.add.image(0,0,'yellow').setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height)

      //creating player & components of player
      gameState.player = this.physics.add.sprite(130, 320, 'car').setScale(0.04)
      gameState.player.setCollideWorldBounds(true)
      gameState.player.setMaxVelocity(400, 400); 

      //creation of enemies
      gameState.enemy = this.physics.add.sprite(-150, 320, 'police').setScale(0.25)
      gameState.enemy.setCollideWorldBounds(true)



      //declaring floor(s)
      const floor = this.physics.add.staticGroup()
      floor.create(200, 370, 'road').setDisplaySize(1225, 55).refreshBody()
      this.physics.add.collider(gameState.player, floor) //making floor a barrier
      this.physics.add.collider(gameState.enemy, floor) //making floor a barrier

      //declaring safe zone
      gameState.end = this.physics.add.staticImage(sizes.width - 30, 315, 'teleporter').setDisplaySize(70, 50).refreshBody();


      //adding colliders
      this.physics.add.overlap(gameState.player, gameState.enemy, () =>{
        this.physics.pause()
        this.add.text(parseInt(sizes.width/2) - 150, parseInt(sizes.height/2), 'Game Over 🐣 (refresh to try again)', { fontSize: '14px', fill: '#000000' });


      })

      this.physics.add.collider(gameState.player, gameState.end, () => {
        this.physics.pause();
        this.add.text(parseInt(sizes.width/2) - 150, parseInt(sizes.height/2), 'Game Over 🐣 (YOU WON)', { fontSize: '14px', fill: '#000000' });
        gameState.active = false;
        console.log('COMPLETE')
        setLevelComplete(true)
      })



    }
  
    update(){
      if (gameState.active == true){
        if (gameState.carAccel != 0){
            gameState.enemy.setAccelerationX(5)
        }
        gameState.player.setAccelerationX(gameState.carAccel);
      }

    }
  }

  const config = {
    type:Phaser.WEBGL,
    width:sizes.width,
    height:sizes.height,
    parent:'phaser-container',
    physics:{
      default:'arcade',
      arcade:{
        gravity: { y: 400 },
        body:true,
      }
    },
    input: {
        keyboard: {
          target: window,
          captureSpace: false,
          captureLeft: false,
          captureRight: false,
          captureUp: false,
          captureDown: false
        }
      },
    scene: [GameScene]
  }


  useEffect(() =>{
    const game = new Phaser.Game(config)
    return () =>{
      game.destroy(true)
    }
  }, [])

  //typing logic
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentInput, setCurrentInput] = useState("")
  const [isCorrect, setIsCorrect ] = useState(true)
  const handleTyping = (inputPhrase) =>{
    let currentInputArray = inputPhrase.split('')
    for (let i = 0; i < currentInputArray.length; i++){
        if (currentInputArray[i] != DUCK_SONG_CHARACTERS[i]){
            gameState.carAccel = -30
            setIsCorrect(false)
            return false
        }
        setIsCorrect(true)
        gameState.carAccel = Math.sqrt(currentInputArray.length)
    }
  }


  return (
    <div className='game'>
      <div className="game-content">
        <div id="phaser-container" className='phaser-shell'/>
        <div className="scene-supplementals">
            <h1>Level 5: In a Quack	</h1>
            <p>Type in ’The Duck Song' to accelerate the duck’s car in order to help him escape the police and reach the teleportation device! Typing in the wrong characters will decelerate the car.</p>
            <h3>FUNCTIONALITY: </h3>
            <p>RED - Song is Typed Incorrectly</p>
        </div>
      </div>  
      <div className="typing-terminal">
        <p className='song-script'>{DUCK_SONG_CHARACTERS.map((character) =>{
            return character
        })}</p>
        <textarea className={isCorrect ? 'song-input' : 'song-input wrong'} value={currentInput} onChange={(e) =>{
            setCurrentInput(e.target.value)
            handleTyping(e.target.value)
        }} rows={15}  cols={50} placeholder='type here...' />
      </div>
      <div className="level-navigation">
            <button onClick={() =>{setLevel('level4')}}  className='prev'> PREVIOUS LEVEL</button>

            {levelComplete ?
            <button onClick={() =>{
                gameState.carAccel = 0
                setLevel('level6')
                }} className='next'> NEXT LEVEL</button>
            :
            <button onClick={() =>{setLevel('level6')}} disabled className='next'> NEXT LEVEL</button>

            }
        </div>
    </div>

  )
}

export default Race