import React, { useEffect, useState } from 'react'
import Phaser from 'phaser'

import './Invader.css'


const Invader = ({setLevel}) => {

  const [levelComplete, setLevelComplete] = useState(false)

    
  //BOILERPLATE PHASER

  let gameState = {

  }
  
  const sizes = {
    width:650,
    height:400
  }
  



  class GameScene extends Phaser.Scene{
    constructor(){
      super('space-invader') 
    }
  
    preload(){
      //loading in all images & content
      this.load.image('yellow', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247377/yellow_hgewcs.jpg')


      this.load.image('duck_rocket', "https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247220/rocket-duck-1_ajfgkw.png")  
      this.load.image('hawk', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247342/hawk_k8j4to.png') 
      this.load.image('grass', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247331/grass_wt26kx.jpg') 
    }
  
    create(){
      gameState.active = true
      gameState.cursors = this.input.keyboard.createCursorKeys(); //enables keyboard inputs
      gameState.currentScore = 0
  
      //declaring background
      this.add.image(0,0,'yellow').setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height)

      //creating displays
      gameState.scoreText = this.add.text(parseInt(sizes.width/2) - 50, 20, `Score: ${gameState.currentScore}`, { fontSize: '15px', fill: '#000000' });

      //creating player & components of player
      gameState.player = this.physics.add.sprite(200, 270, 'duck_rocket').setScale(0.12)
      gameState.player.setCollideWorldBounds(true)
      gameState.player.setBounce(1)

      //creation of enemies
      const hawks = this.physics.add.group()
      hawks.setVelocityX(-100)
      gameState.enemy = hawks


      const createHawk = () =>{
        const yCoordinate = Math.random()*(sizes.height-75)
        const hawk = hawks.create(sizes.width - 50, yCoordinate, 'hawk').setScale(0.08)
        hawk.setVelocityX(-100)
        hawk.flipX = true
        gameState.currentScore += 10
        gameState.scoreText.setText(`Score: ${gameState.currentScore}`)
        
      }

      const hawkCreationLoop = this.time.addEvent({
        delay: 1500,
        callback: createHawk,
        callbackScope: this,
        loop: true,
      })


      //declaring floor(s)
      const floor = this.physics.add.staticGroup()
      floor.create(200, 370, 'grass').setDisplaySize(1200, 50).refreshBody()
      this.physics.add.collider(gameState.player, floor) //making floor a barrier

      //adding colliders

      //player enemy collider
      this.physics.add.collider(gameState.player, gameState.enemy, () =>{
        hawkCreationLoop.destroy()
        this.physics.pause()
        this.add.text(parseInt(sizes.width/2) - 190, parseInt(sizes.height/2)  -70, 'Game Over (Click to Play Again) 🐣', { fontSize: '22px', fill: '#000000' });


        //check to see if won
        if (gameState.currentScore >= 200){
            setLevelComplete(true)
        }

        //restart game
        this.input.on('pointerup', () =>{
            gameState.currentScore = 0; 
            this.scene.restart();
        });


      })





    }
  
    update(){
      
      if (gameState.active == true){
        //STARTER MOVEMENTS
    




        //UP MOVEMENTS
        if ( (gameState.cursors.up.isDown)){
            gameState.player.setVelocityY(-300)
        }

        //DOWN MOVEMENTS
        else if ((gameState.cursors.down.isDown)){
            gameState.player.setVelocityY(300)

        }
        else{

        }

        //HORIZONTAL MOVEMENTS
        if (gameState.cursors.right.isDown){
            //gameState.player.setVelocityX(200)

        }
        
        else if (gameState.cursors.left.isDown){
            //gameState.player.setVelocityX(-200)
        }

        else{
            // currentYVelocity = 0
            // gameState.player.setVelocityY(currentYVelocity)
        }


      }
      else if (gameState.active == false){

        

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
        gravity: { y: 0 },
        body:true,
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



  return (
    <div className='game'>
      <div className="game-content">
        <div id="phaser-container" className='phaser-shell'/>
            <div className="scene-supplementals">
                <h1 className='title'>Level 1: Airborne</h1>
                <p>Evade the hawks as you swiftly navigate the sky on your rocket ship. To pass this level, you need a score of 200 or more. </p>
                <h3>CONTROLS</h3>
                <p>UP ARROW - sets vertical velocity upwards</p>
                <p>DOWN ARROW - sets vertical velocity downwards</p>
            </div>
        </div>  
        <div className="level-navigation">
            <button disabled className='prev'> PREVIOUS LEVEL</button>

            {levelComplete ?
            <button onClick={() =>{setLevel('level2')}} className='next'> NEXT LEVEL</button>
            :
            <button onClick={() =>{setLevel('level2')}} disabled className='next'> NEXT LEVEL</button>

            }
        </div>
    </div>

  )
}

export default Invader