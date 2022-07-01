var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
// estados do jogo: play | end
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 6;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage('ghost',ghostImg);
  ghost.scale=0.3;
}

function draw() {
  background(200);

  if (gameState === "play") {
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY += 0.8;
    
    if (keyDown("right_arrow")) {
      ghost.x += 3;
    }
  
    if (keyDown("left_arrow")) {
      ghost.x -= 3;
    }
    
    createDoors();
  
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (ghost.y>600){
      gameState = "end";
    }
    
  } else if (gameState === "end") {
    ghost.destroy();
    background("black");
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }

  

  drawSprites();
}
function createDoors(){
  if(frameCount%80===0){
    door = createSprite(200,-50);
    door.addImage(doorImg);

    climber = createSprite(200,10);
    climber.addImage(climberImg);

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    invisibleBlock.debug = true;

    ghost.depth = door.depth;
    ghost.depth += 1;

    door.x = Math.round(random(120,400));
    climber.x= door.x;
    invisibleBlock.x = door.x;
    
    door.velocityY = 6;
    climber.velocityY = 6;
    invisibleBlock.velocityY = 6;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
