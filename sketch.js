var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;

function preload()
{
  //load images here
  backgroundImg = loadImage("images2/bg.png");
  dogImage = loadImage("images2/Dog.png");
  dogImage1 = loadImage("images2/Happy.png");
  foodImage = loadImage("images2/milk.png");
  bathImage = loadImage("images2/Wash Room.png");
  sleepImage = loadImage("images2/Bed Room.png");
  playImage = loadImage("images2/Living Room.png");
  walkImage = loadImage("images2/running.png");
  

}

function setup() {
  createCanvas(500,500);

  //Sprites

  food = createSprite(440,450,50,50);
  food.addImage(foodImage);
  food.scale = 0.15;


  dog = createSprite(250,250);
  dog.addImage(dogImage);
  dog.scale = 0.35;

  //Firebase
  database = firebase.database();

  //Reference for food
  foodRef = database.ref("Food");
  foodRef.on("value",read,console.log("error"));

  foodRef.set(30);


}


function draw() {  
  background(backgroundImg);
  drawSprites();
  
  //add styles here
  textSize(20);
  stroke("black");
  strokeWeight(3.5);
  fill("yellow");
  textFont("Impact")
  text("Bottles in the Stock: "+foodStock,130,430);
  textSize(20);
  fill("yellow");
  strokeWeight(2);
    text("Press up arrow key - To Feed  ,   Press space- To Bath ",50,40);
    text("Press Left arrow key - To Play , Press Right arrow key -To Sleep ",1 ,70);
    text("Press down arrow key - To Run ",80,100);

  decreaseFood();
  if(foodStock===0){
    foodStock = 30;
  }

  if(keyWentUp(DOWN_ARROW)){
    
    dog.addImage(walkImage);
    dog.scale = 0.45
    
    
  }

  if(keyWentUp(LEFT_ARROW)){
   
    dog.addImage(playImage);
    dog.scale = 1
    dog.x = 250-10;
    dog.y = 250-80; 
    
    
  }

  if(keyWentUp(RIGHT_ARROW)){
   
    

    dog.addImage(sleepImage);
    dog.scale = 1.1
    
    
  }

  if(keyCode === 32){
    
    

    dog.addImage(bathImage);
    dog.scale = 0.98;
 }

}

function read(data){
  foodStock = data.val();
}

function decreaseFood(){
  if(keyWentDown(UP_ARROW)){
  foodRef = database.ref("Food");
  foodStock = foodStock - 1;
  foodRef.set(foodStock);
  dog.addImage(dogImage1);
  
  dog.scale = 0.35;
 

  }
  
  if(keyWentUp(UP_ARROW)){
    
    foodStock = foodStock;
    dog.addImage(dogImage);
    fill("yellow");

    dog.scale = 0.35;
    dog.x=250;
    dog.y=250;
    food.x = 440;
    food.y = 450;
    food.scale = 0.15;
    
  }
}
