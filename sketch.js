var bird, birdIMG,birdIMGded, bird2, feather, featherIMG, branch, branchIMG;
var invGround;
var slime, slimeIMG, slimeGroup;
var featherGroup, branchGroup, obstacleGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState;
var restart, restartIMG;
var topEdge;
var bg, bgIMG;

function preload(){
  bgIMG = loadImage("background.jpg");
  
  birdIMG = loadAnimation("Bird01.png", "Bird02.png", "Bird03.png", "Bird04.png", "Bird05.png", "Bird06.png", "Bird07.png", "Bird08.png", "Bird09.png");
  
  birdIMGded = loadImage("Bird01.png");
  
  featherIMG = loadImage("feather.png");
  
  slimeIMG = loadImage("slime.png");
  
  branchIMG = loadImage("Branch.png");
  
  restartIMG = loadImage("restart.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bg = createSprite(0,0,windowWidth,windowHeight);
  bg.addImage("bg", bgIMG);
  bg.x = bg.width/2;
  bg.scale = 5;
  
  topEdge = createSprite(0,0,windowWidth,10);
  topEdge.visible = false;
  
  invGround = createSprite(0, windowHeight - 20,windowWidth, 10);
  invGround.visible = false;
  
  bird = createSprite(windowWidth - (windowWidth - 100),200,20,20);
  bird.addAnimation("run", birdIMG);
  bird.scale = 0.5;
 
  bird2 = createSprite(bird.x, bird.y,20,20);
  bird2.addImage("run", birdIMGded);
  bird2.scale = 0.5;
  bird2.visible = false;
  
  restart = createSprite(windowWidth/2, windowHeight/2,20,20);
  restart.addImage("button", restartIMG);
  restart.visible = false;
  
  gameState = PLAY;
  score = 0;
  
  featherGroup = new Group();
  obstacleGroup = new Group();
  branchGroup = new Group();
  slimeGroup = new Group();
  
  bird.debug = true;
  bird.setCollider("circle", 50,5,80);
  
}

function draw() {
  background("lightBlue");

  textSize(50);
  text("EXPLORE !", windowWidth/2, windowHeight - (windowHeight- 200));
  
  camera.position.x = displayWidth/2;
  camera.position.y = bird.y;
  
  
  bg.velocityX = -2;

  if(bg.x<0){
    
    bg.x = windowWidth/2;
  }
  
  // bird.bounceOff(topEdge);
  
  bird2.y = bird.y;
  
  if(gameState === PLAY){
    
    bg.velocityX = -(6 + score/100);
    restart.visible = false;
    
    bird.velocityY = 5;
    bird.x = windowWidth - (windowWidth - 100);
    bird.collide(branchGroup);
    
    if((touches.length > 0 || keyDown("SPACE"))) {
      
        bird.velocityY = -10;
        touches = [];
      }
    
     if(frameCount % 100 === 0){
       feathers();
     }
    if(frameCount % 50 === 0){
      branchs();
    }
    
    if(bird.isTouching(featherGroup)){
      featherGroup.destroyEach();
      
      score = score + 1;
    }
    
    if(bird.isTouching(invGround)||bird.isTouching(slimeGroup)){
      gameState = END;
    }
       
 }
  
  if(gameState === END){
    bg.velocityX = 0;
    restart.visible = true;
    bird.visible = false;
    bird.velocityY = 0;
    
    bird2.visible = true;
    
    
    featherGroup.setVelocityXEach(0);
    branchGroup.setVelocityXEach(0);
    slimeGroup.setVelocityXEach(0);
    
    featherGroup.setLifetimeEach(-1);
    branchGroup.setLifetimeEach(-1);
    slimeGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      
        gameState = PLAY;
        score = 0;
        
        featherGroup.destroyEach();
        branchGroup.destroyEach();
        slimeGroup.destroyEach();
      
        bird.y = windowHeight/2;
        bird.visible = true;
        bird2.visible = false;
      
        touches = [];
      }
    
  }
  
 drawSprites();
  
  stroke("white");
  fill("white");
  textFont("Times New Roman");
  textSize(20);
  text("S C O R E : "+score, windowWidth - 200,windowHeight - (windowHeight- 50));
  
  textSize(50);
  text("EXPLORE !", windowWidth/2, windowHeight - (windowHeight + 200));
  

}
function feathers(){
  
  feather = createSprite(windowWidth,200,10,10);
  feather.addImage("point", featherIMG);
  feather.scale = 0.1;
  feather.velocityX = -5;
  feather.velocityX = -(6 + score/100);
  
  feather.y = Math.round(random(windowHeight - (windowHeight - 100),windowHeight - 100));
  
  feather.liftime = windowWidth/5;
  
  featherGroup.add(feather);
}

function branchs(){
  
  var num = Math.round(random(1,2));
  
  branch = createSprite(windowWidth,200,10,10);
  branch.addImage("branch", branchIMG);
  branch.scale = 0.1;
  branch.velocityX = -5;
  branch.velocityX = -(6 + score/100);
  
  branch.setCollider("rectangle",0,100,2000,10);
  branch.debug = true;
  
  branch.y = Math.round(random(windowHeight - (windowHeight - 100),windowHeight - 100));
  
  branch.liftime = windowWidth/5;
  
  branchGroup.add(branch);
  
  if(num === 1){
    slime = createSprite(branch.x + 10, branch.y + 30,10,10);
    slime.addImage("slime", slimeIMG);
    slime.velocityX = -5;
    slime.velocityX = -(6 + score/100);
    slime.scale = 0.1;
    
    slime.setCollider("rectangle",0,0,1000,50);
    slime.debug = true;
    
    slime.liftime = windowWidth/5;
    
    slimeGroup.add(slime);
    
  }
  
}