var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
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

  ghost = createSprite(200,200,50,50);
  ghost.addImage('ghost',ghostImg);
  ghost.scale=0.3;
}

function draw() {
  background(200);
  
  if(tower.y > 400){
    tower.y = 300
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY += 0.8;    
  createDoors();
  drawSprites();
}
function createDoors(){
  if(frameCount%80===0){
    door = createSprite(200,-50);
    door.addImage(doorImg);

    climber = createSprite(200,10);
    climber.addImage(climberImg);

    door.x = Math.round(random(120,400));
    door.velocityY = 6;

    climber.x= door.x;
    climber.velocityY = 6;

    climber.lifetime = 800;
    climbersGroup.add(climber);

    door.lifetime = 800;
    doorsGroup.add(door);
  }
}

