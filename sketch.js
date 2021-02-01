var monkey, monkey_running;
var ground;
var bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var survivalTime;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(500, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  foodGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;
  survivalTime = 0;

}


function draw() {

  background("white");

  if (gameState === PLAY) {
    spawnBananas();
    spawnObstacles();



    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);

    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;
    }

    survivalTime = survivalTime + Math.round(getFrameRate() / 60);

    if (monkey.isTouching(foodGroup)) {
      score = score + 1;
      foodGroup.destroyEach();
    }

    if (ground.x < 60) {
      ground.x = 400;
    }

    stroke("black");
    fill("black");
    textSize(15);
    text("Score:" + score, 400, 50);

    stroke("black");
    fill("black");
    textSize(15);
    text("Survival Time:" + survivalTime, 350, 100);

    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }


  } else if (gameState === END) {

    foodGroup.setVelocityEach(0);
    foodGroup.destroyEach();
    obstacleGroup.setVelocityEach(0);
    obstacleGroup.destroyEach();

    score = 0;
    survivalTime = 0;

    stroke("red");
    fill("red");
    textSize(20);
    text("Game Over", 240, 200);

    stroke("red");
    fill("red");
    textSize(20);
    text("Monkey Is Dead", 240, 250);
  }

  drawSprites();

}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(490, Math.round(random(300, 150)), 30, 30);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(10 + score / 5);
    banana.lifetime = 70;

    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(490, 305, 30, 30);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -(10 + score / 6);
    obstacle.lifetime = 70;

    monkey.depth = obstacle.depth + 1;
    obstacleGroup.add(obstacle);
  }
}