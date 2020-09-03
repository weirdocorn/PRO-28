const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bucketEdge1, bucketEdge2, bucketEdge3, box;
var ball, ground, invisibleGround;
var paperImg, dustbinImg;

var gameState = "onSling";

function preload(){
	paperImg = loadImage("Pictures/crumpled paper image.png");
	dustbinImg = loadImage("Pictures/dustbin image.png");
}

function setup() {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world;

	ground=createSprite(width/2, height-35, width, 10);
	ground.shapeColor=color(255);

	invisibleGround = createSprite(width/2, height-35-3, width, 10)
	invisibleGround.visibile = false;

	bucketEdge1 = createSprite(750, 650, 50, 5);
	bucketEdge2 = createSprite(775, 625, 5, 50);
	bucketEdge3 = createSprite(725, 625, 5, 50);
	box = createSprite(750, 625);
	box.addImage(dustbinImg);
	box.scale = 0.2

	ball = createSprite(25, 640, 10, 10);
	ball.addImage(paperImg);
	ball.scale = 0.2;
	ball.velocityX = 2;
	ball.velocityY = 0;

    slingshot = new Launcher(ball.body,{x:25, y:620});

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  strokeWeight("white");
  text("Press the arrows to move the ball in the bucket",300, 350);

  ball.collide(bucketEdge1);
  ball.collide(bucketEdge2);
  ball.collide(bucketEdge3); 
  
  move(ball);

  drawSprites();
}

function move(ball1){
	if(keyCode === UP_ARROW){
		ball.velocityX = 0;
		ball1.velocityY = -2;
	}
	if(keyCode === DOWN_ARROW){
		ball1.velocityX = 0;
		ball1.velocityY = 2;
	}
	if(keyCode === RIGHT_ARROW){
		ball1.velocityX = 2;
		ball1.velocityY = 0;
	}
	if(keyCode === LEFT_ARROW){
		ball1.velocityX = -2;
		ball1.velocityY = 0;
	}
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}

function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}