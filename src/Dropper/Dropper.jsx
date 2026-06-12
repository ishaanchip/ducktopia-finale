import React, { useEffect, useState } from 'react'
import Phaser from 'phaser'

import './Dropper.css'


const Dropper = ({setLevel}) => {
  
  const [levelComplete, setLevelComplete] = useState(false)  
    
  //BOILERPLATE PHASER

  let gameState = {
    currentXVelocity:0
  }
  
  
  const sizes = {
    width:650,
    height:400
  }
  


  class GameScene extends Phaser.Scene{
    constructor(){
      super('dropper-game') //NAME SCENE HERE
    }
  
    preload(){
      //loading in all images & content
      this.load.image('duck', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247309/duck_f4qpem.png')
      this.load.image('yellow', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247377/yellow_hgewcs.jpg') 
      this.load.image('grass', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247331/grass_wt26kx.jpg') 
      this.load.image('cup', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247300/cup_ho4x4m.png') 
      this.load.image('egg', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247318/egg_pm9k28.png') 
      this.load.image('soda', 'https://res.cloudinary.com/dsrfbwrcb/image/upload/v1781247363/soda_mbliag.png') 

    }
  
    create(){
      gameState.active = true
      gameState.cursors = this.input.keyboard.createCursorKeys(); //enables keyboard inputs
  
      //declaring background
      this.add.image(0,0,'yellow').setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height)

      //creating player & components of player
      gameState.player = this.physics.add.sprite(parseInt(sizes.width/2) -50, 100, 'duck').setScale(0.4)
      gameState.player.setCollideWorldBounds(true)
      gameState.player.body.setAllowGravity(false)
      gameState.player.setBounce(1)

      //creation of tools
      const eggs = this.physics.add.group()
      gameState.tool = eggs

      const createEgg = () =>{
        if (gameState.currentXVelocity != 0){
            const xCoordinate = gameState.player.x
            const egg = eggs.create(xCoordinate - 20, 130, 'egg').setScale(0.2)
            egg.setVelocityX(gameState.currentXVelocity)
        }
        
      }

      const eggCreationLoop = this.time.addEvent({
        delay: 500,
        callback: createEgg,
        callbackScope: this,
        loop: true,
      })


      //creation of end goal
      gameState.cup = this.physics.add.sprite(parseInt(sizes.width/2) -50, 325, 'cup').setScale(0.7)
      gameState.cup.setCollideWorldBounds(true)
      gameState.cup.setBounce(1)
      gameState.cup.setVelocityX(500)
      
      
      
      gameState.soda= this.physics.add.sprite(parseInt(sizes.width/2) -50, 305, 'soda').setScale(0.2)
      gameState.soda.body.setAllowGravity(false)
      gameState.soda.setCollideWorldBounds(true)
      gameState.soda.setVelocityX(500)
      gameState.soda.setBounce(1)
      this.physics.add.collider(gameState.cup, gameState.soda)


      //declaring floor(s)
      const floor = this.physics.add.staticGroup()
      floor.create(200, 370, 'grass').setDisplaySize(1200, 50).refreshBody()
      this.physics.add.collider(gameState.player, floor) //making floor a barrier
      this.physics.add.collider(gameState.cup, floor) //making floor a barrier

      //adding colliders
    this.physics.add.collider(gameState.tool, gameState.soda, () =>{
        eggCreationLoop.destroy()
        this.physics.pause()
        this.add.text(parseInt(sizes.width/2) - 230, parseInt(sizes.height/2), 'Game Over (Click to Play Again) 🐣', { fontSize: '26px', fill: '#000000' });

        //check to see if won
        console.log('COMPLETE')
        setLevelComplete(true)
        

        //restart game
        this.input.on('pointerup', () =>{
            this.scene.restart();
        });


        })



    }
  
    update(){
      
      if (gameState.active == true){
        gameState.soda.x = gameState.cup.x - 5;
        gameState.soda.y = gameState.cup.y - 20;
        //STARTER MOVEMENTS


        //UP MOVEMENTS
        if ( (gameState.cursors.up.isDown || gameState.cursors.space.isDown)){

        }

        //DOWN MOVEMENTS
        else if ((gameState.cursors.down.isDown)){

        }

        //HORIZONTAL MOVEMENTS
        if (gameState.cursors.right.isDown){
            gameState.currentXVelocity = 200
            gameState.player.setVelocityX(200)
        }
        
        else if (gameState.cursors.left.isDown){
            gameState.currentXVelocity = -200
            gameState.player.setVelocityX(-200)

        }

        else{

        }


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
        gravity: { y: 300 },
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
                <h1 className='title'>Level 3: Fire in the Hole!</h1>
                <p>Move the duck to drop its eggs. To pass this level, one needs to drop an egg directly into the soda cup. </p>
                <h3>CONTROLS</h3>
                <p>LEFT ARROW - sets horizontal velocity leftwards</p>
                <p>RIGHT ARROW - sets horizontal velocity rightwards</p>
            </div>
        </div>  
        <div className="level-navigation">
            <button onClick={() =>{setLevel('level2')}}  className='prev'> PREVIOUS LEVEL</button>

            {levelComplete ?
            <button onClick={() =>{setLevel('level4')}} className='next'> NEXT LEVEL</button>
            :
            <button onClick={() =>{setLevel('level4')}} disabled className='next'> NEXT LEVEL</button>

            }
        </div>
    </div>
    )
}

export default Dropper