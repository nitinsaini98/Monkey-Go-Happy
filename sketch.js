var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running , monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var invisibleGround;
var survivalTime;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided = loadAnimation("sprite_4.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400);
  
  monkey = createSprite(120,300,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.12;
  monkey.addAnimation("collided",monkey_collided)
  
  ground = createSprite(400,340,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  visibleGround = createSprite(400,340,900,10);
  visibleGround.x = visibleGround.width/2;
  

  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  
  
  survivalTime = 0;
  score = 0;
}


function draw() {
  background("white");
  
  
  
  if(gameState === PLAY){
  if(keyDown("space")&& monkey.y >= 250) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(visibleGround);
  
  spawnObstacle();
  spawnFood();
    
   if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score = score + 2;
      } 
  
    stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100, 50);
  
  stroke("black");
  textSize(12);
  fill("black");
  text("Score: "+ score,400, 50);
    
   if(monkey.isTouching(obstacleGroup)){
      gameState = END;
      
      } 
  
    
  }
  
  else if (gameState === END) {
    
    monkey.changeAnimation("collided",monkey_collided);
    
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival Time: "+ survivalTime,100, 50);
    
    
    stroke("black");
    textSize(12);
    fill("black");
    text("Score: "+ score,400, 50);
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Game Over ! Press Shift Key to Restart",80,140)
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
    
     monkey.velocityY = 0;
    
    
    if(keyDown("Shift")){
       reset();
       
       }
    
  }
  
  
  
  drawSprites();
  
}

function spawnObstacle(){
  if (frameCount % 140 === 0){
   var obstacle = createSprite(450,300,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -10;
   obstacle.scale = 0.20;  
   obstacleGroup.add(obstacle);
   obstacle.debug = false;
   obstacle.setCollider("circle",1,1);
}
}

function spawnFood (){
  if (frameCount % 70 === 0){
   var banana = createSprite(450,150,10,40);
   banana.addImage(bananaImage);
   banana.velocityX = -10;
   banana.scale = 0.1;  
   FoodGroup.add(banana);
}
}

function reset(){
  gameState = PLAY;
  console.log("restarting the game");
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.changeAnimation("running", monkey_running);
  score = 0;
  survivalTime = 0;
}



