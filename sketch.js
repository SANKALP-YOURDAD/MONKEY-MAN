  
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground;
var survivalTime = 0;
var jungle;
var jungleImg;

function preload(){
  jungleImg = loadImage("jungle.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,350);
  
  
  jungle = createSprite(300,300,600,400);
  jungle.addImage(jungleImg);
  jungle.velocityX = -4;
  jungle.x = jungle.width/2;
  
  monkey = createSprite(30,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,1200,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  

  
  
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {
  background("white");
  
  
 ground.visible = false;
  
  if(jungle.x<0){
    jungle.x = jungle.width/2;
  }
  
    if(ground.x<0){
   ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 200){
    monkey.velocityY = -12;
  }
  
  if(FoodGroup.isTouching(monkey)){
    score = score + 2;
    FoodGroup.destroyEach();
    
    switch(score){
      case 10 : monkey.scale = 0.12;
        break;
        
      case 20 : monkey.scale = 0.14;
        break;
        
        case 30 : monkey.scale = 0.16;
        break;
        
        case 40 : monkey.scale = 0.18;
        break;
        
        default : break;
        
    }
  }
  
  if(obstacleGroup.isTouching(monkey)){
   monkey.scale = 0.1;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  
  food();
  
  obstacle();
  
  drawSprites();
   stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time : " + survivalTime,100,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score : " + score,500,50);
}


function food() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

function obstacle(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(600,327);
    obstacle.scale = 0.1;
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}



