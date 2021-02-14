var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  //LOADING IMAGES
  doorImg = loadImage('door.png')
  ghostImg = loadImage('ghost-jumping.png')
  towerImg = loadImage('tower.png')
}

function setup(){
  createCanvas(600,600)
  
  //Creating tower
  tower = createSprite(300,300,600,600);
  tower.addImage('cover',towerImg);
  
  //create ghost
  ghost = createSprite(300,300,20,20);
  ghost.addImage('jump',ghostImg);
  ghost.scale = 0.5;
  
  doorsgroup = createGroup();
}

function draw(){
  background('black')
  
  if (gameState === "play") {
   if(keyDown('space')){
     ghost.velocityY = -5;
   }
   if(keyDown('right_arrow')){
      ghost.x = ghost.x + 5;
   }
   if(keyDown('left_arrow')){
     ghost.x = ghost.x - 5;
   }
    
    //gravity 
    ghost.velocityY = ghost.velocityY + 1; 
    
    // resetting tower position
     tower.velocityY = 4;
    
  if(tower.y > 400){
    tower.y = 300;
  }  
    
    //creating doors
    spawnDoors()    
    
    //ending the game
    if(ghost.isTouching(doorsgroup)||ghost.y>600){
      gameState = 'end';
      ghost.velocityY = 0
      ghost.destroy();
    }
 }
  
   // game end 
 if (gameState === "end"){
      fill('yellow');
      textSize(40);
      text('Game Over!',200,200);
      tower.destroy();
      doorsgroup.destroyEach();
  
 }
 
  drawSprites()
}

//creation doors definition
function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 200 === 0) {
    var door = createSprite(200, -50);
    door.addImage('create',doorImg);
    door.velocityY = 3;
    door.x = Math.round(random(100,500));
    door.lifetime = 550;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    doorsgroup.add(door)
  }
}



