$(document).ready(function () {
  //User clicks start and it hides instructions screen
  $(".start").click(function () {
    $("#screenCover").hide()
  })


  // onclick function, array of moves
  // difficulty can scale the speed of the moving dot
  // continuous movement of the dot 
  // at a certain point will include teleportation of dot to a random location

  // left, right, up, down, up-right, up-left, down-left, down-right 
  // randomly decide direction => randomly decide number of units 
  //countious movement(ball should not pause)

  //onclick function for ball, that will change difficulty, which means speed varible used for movement speed will be decremented
  //speed in millieconds

  // cooldown function for teleportation, that will count down, would change depending on difficulty (i.e. higher difficulty lower cooldown on teleport)

  //preventing ball from leaving board, make it so that if the next movement was to take it out of bounds it would muiltlpe it by -1

  // Global Variables
  let speed = 500;

  // Functions 


  // DO THIS INFINITELY 
  // Randomly choose one of the movement functions 
  // Then call that function with a fixed amount (e.g. 100) for testing 
  // Then incorporate random distance 
  function loop() {
    setTimeout(function () {
      // Ray Onishi solution
      let ball = $("#movingElement");
      let board = $("#gameBoard");

      // Gets the relative position of the ball inside of the div 
      let top = ball.offset().top - board.offset().top;
      let left = ball.offset().left - board.offset().left;

      

      // Gets the horizontal distance and vertical distance to travel relative to the height and width of the board
      let hDistance = board.width() * 0.15;
      let vDistance = board.height() * 0.15;

      let randomNumber = Math.floor(Math.random() * movements.length);
      let direction = movements[randomNumber];
      console.log(direction);
      if (direction == "left") {
        if(left - hDistance < 2){
          moveRight(hDistance);
          console.log("AVOID LEFT EDGE");
        }
        else {
          moveLeft(hDistance)
        }
      } else if (direction == "right") {
        if(left + hDistance > 2 + board.width()){
          moveLeft(hDistance );
          console.log("AVOID RIGHT EDGE")
        }
        else {
          moveRight(hDistance)
        }
      } else if (direction == "up") {
        if(top - vDistance < 2){
          moveDown(vDistance);
          console.log("AVOID TOP EDGE")
        }
        else {
          moveUp(vDistance)
          // console.log("AVOID BOTTOM EDGE")
        }
      } else if (direction == "down") {
        if(top + vDistance > 2 + board.height()){
          moveUp(vDistance);
          console.log("AVOID BOTTOM EDGE")
        }
        else{
          moveDown(vDistance)
        }
      }
      console.log(randomNumber)
      loop();
    }, speed)
  }
  
  $(".start").click(function () {
    loop();
  })

  //movements/abilites
  let movements = ["left", "right", "up", "down"]
  function moveLeft(distance) {
    // console.log("left");
    $("#movingElement").animate({
      left: "-=" + distance
    }, speed)
    console.log("moveLeft")
  }

  function moveRight(distance) {
    $("#movingElement").animate({
      left: "+=" + distance
    }, speed)
  }

  function moveUp(distance) {
    $("#movingElement").animate({
      top: "-=" + distance
    }, speed)
  }

  function moveDown(distance) {
    $("#movingElement").animate({
      top: "+=" + distance
    }, speed)
  }




  //genral movement



  //teleport
















});