//creating the variables trex and the ground
var trex ,trex_running;
var trex_collided;
var ground, groundImage;
var invisibleGround;
var cloud, cloudImage;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var score =  0;
var obstacleGroup, cloudGroup;
// declaring gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover, gameoverImage, restartImage, restart;
var jumpSound, dieSound, checkpointSound;

function preload(){
  //loading the ground image
  groundImage = loadImage ("ground2.png");
  //loading the trex animation
  trex_running = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  //loading the trex's image when collided
  trex_collided = loadAnimation ("trex_collided.png")
  //loading the cloud image
  cloudImage = loadImage ("cloud.png");
  //loading the obsacle images
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");

  gameoverImage = loadImage ("gameOver.png");
  restartImage = loadImage ("restart.png");

  jumpSound = loadSound ("jump.mp3");
  dieSound = loadSound ("die.mp3");
  checkpointSound = loadSound ("checkPoint.mp3");
}


function setup(){
  
  //creating the canvas for our game
  createCanvas(600,200);
  
  //create a trex sprite
  trex = createSprite(60, 170);
  //giving the animation to the trex
  trex.addAnimation("trexRunning", trex_running);
  trex.addAnimation("trexCollided", trex_collided);
  trex.debug = true;
  trex.setCollider("rectangle", 0, 0, 200, trex.height);
  //scaling down the trex
  trex.scale = 0.4;

  //setting the position of the ground sprite
  ground = createSprite(300, 170, 800, 10);
  // giving the ground its image
  ground.addImage("ground", groundImage);
  //making the ground move to the left
  ground.velocityX = -4;
  
  //making the invisible ground
  invisibleGround = createSprite( 300, 174, 800, 10);
  //making the ground for the trex invisible
  invisibleGround.visible = false;
  
  //printing a whole number in the console
  var ran = Math.round(random(1, 20));
  console.log(ran);

  //creating groups for obstacles and clouds
  obstacleGroup = new Group();
  cloudGroup = new Group();

  gameover = createSprite(300, 80)
  gameover.addImage("gameover text", gameoverImage)
  gameover.scale = 0.5

  restart = createSprite(300, 110)
  restart.addImage("restart image", restartImage)
  restart.scale = 0.5


}

function draw(){
  
  //making the background of the game black, it also clears tracing
  background("white");

  text("Score: "+score, 500, 50);

  //making the trex collide with the ground
  trex.collide(invisibleGround);


  // setting up conditions for the gamestate "play"
  if(gameState===PLAY){
    // calculating a score
    score = score + Math.round (frameCount/360);

    //making the trex jump whenever the spacebar is pressed
    if(keyDown("space")&&trex.y>150){
       // giving the trex a jump velocity
      trex.velocityY = -12;
      //giving a sound to the trex when it jumps
      jumpSound.play();
        }  

    //gravity
    trex.velocityY = trex.velocityY + 0.8;

    //making the ground infinite
    if(ground.x <0){
      ground.x = ground.width/2;
    } 

    //calling function cloud
    spawnObstacles();
    spawnClouds();

    //making the gamestate end when trex touches obstacle
    if(trex.isTouching(obstacleGroup)){
     // gameState = END;
      //making a sound when the trex is in the end state
      //dieSound.play();
      trex.velocityY = -12

    }

    ground.velocityX = -(4+score/100);

    restart.visible = false
    gameover.visible = false

    if(score% 100===0&&score>0  ){
      checkpointSound.play();
    }
  }
 
  //setting up an else condition for gamestate end
  else if(gameState===END){
    //making the ground stop on gamestate end
    ground.velocityX = 0;
    // making clouds and clouds stop on gamestate end
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    //changing the animation of the trex when it collides and making it stop
  
    trex.changeAnimation("trexCollided", trex_collided);
    trex.velocityY = 0;
    //making the text visible when the game ends
    restart.visible = true
    gameover.visible = true

  }




  
  drawSprites();
}

function spawnClouds(){

  //making the clouds spawn after 60fps/second
  if(frameCount%60===0){
    //creating the sprite for the cloud
    cloud = createSprite(600, 70);
    //add the image to the cloud
    cloud.addImage("cloud", cloudImage);
    //scaling down the cloud to be smaller
    cloud.scale = 0.3;
    //making the speed of the clouds
    cloud.velocityX = -4;
    //making the cloud spawn in random positions
    cloud.y = Math.round(random(40, 100));
    //setting a time limit for each cloud
    cloud.lifetime = 155;
    //adding sprites in the cloud group
    cloudGroup.add(cloud);
    //making the trex dpeth the same as the cloud depth
    trex.depth = cloud.depth;
    //increasing the trex depth by one
    trex.depth = trex.depth + 1;
    //trex.depth += 1
    
  
  }
}



function spawnObstacles(){

  //making the clouds spawn after 60fps/second
  if(frameCount%60===0){
    //creating the sprite for the cloud
    obstacle = createSprite(600, 150);
    //add the image to the cloud
    
    var ran = Math.round(random(1,6));
    //adding images depending on the random number generated
    switch(ran){
      case 1: obstacle.addImage(obstacle1);
      break;

      case 2: obstacle.addImage(obstacle2);
      break;

      case 3: obstacle.addImage(obstacle3);
      break;

      case 4: obstacle.addImage(obstacle4);
      break;

      case 5: obstacle.addImage(obstacle5);
      break;

      case 6: obstacle.addImage(obstacle6);
      break;

      default: break;
    }
    //scaling down the cloud to be smaller
    obstacle.scale = 0.5;
    //making the speed of the clouds    
    obstacle.velocityX = -(4+score/100);
    //setting a time limit for each obstacle
    obstacle.lifetime = 155;
    //adding sprites in the obstacles group
    obstacleGroup.add(obstacle);
  }
}