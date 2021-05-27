var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var bg;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bg=loadImage("garden.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.26;

  //create feed the dog button here
  FeedFood=createButton("Feed the Food");
  FeedFood.position(650,95);
  FeedFood.mousePressed(DeductFood);

  //add food button here
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(bg);
  foodObj.display();

  //write code to read fedtime value from the database 
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1000){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

   
}
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var food_stock_val=foodObj.getFoodStock();
if (food_stock_val <= 0){
  foodObj.updateFoodStock(food_stock_val*0);
}
else{
  //foodObj.updateFoodStock(food_stock_val - 1);
  food_stock_val.deductFood();
}


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function DeductFood(){
foodS--;
database.ref('/').update({
  Food:foodS
})
}


