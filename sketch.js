var ball;
var position;
var database;

function setup(){
    database = firebase.database()
    console.log(database)
    createCanvas(500,500);
    ball = createSprite(400,400,10,10);
    ball.shapeColor = "red";

    position = database.ref('ball/position');
    position.on("value",readPosition,showError);
}


function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    })
    
}

function readPosition(data){
   position = data.val()
   ball.x = position.x
   ball.y = position.y
   console.log(position.x) 
}

function showError(){
    console.log("error in writing to the database");
}