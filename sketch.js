var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position, balloonPosition;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  balloon = createSprite(180,360,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.5;

  balloonPosition = database.ref('Balloon/position');
  balloonPosition.on("value",readPosition, showError);

  textSize(20); 
}

function draw() {
  background(bg);

  writePosition(LEFT_ARROW,0,-10,0);
  writePosition(RIGHT_ARROW,0,10,0);
  writePosition(UP_ARROW,-0.01,0,-10);
  writePosition(DOWN_ARROW,0.01,0,10);

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(key,scale,x,y) {
  if (keyDown(key)) {
    balloon.scale = balloon.scale + scale;

    database.ref('Balloon/position').set({
      'x': position.x+x,
      'y': position.y+y
   });
  }
}

function showError() {
  console.log("oof");
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}