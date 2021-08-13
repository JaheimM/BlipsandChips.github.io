$(document).ready(function () {
  //audio for when user or AI places x or o
  let gearClick = new Audio("audio/gear click.mp3")
  let wrenchDrop = new Audio("audio/Wrench.mp3")

  $(".quad").attr('src', "images/tic_tac_toe/blank.png");


  let resetAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let availableNum = [];
  for (let i = 0; i < resetAvailable.length; i++) {
    availableNum[i] = resetAvailable[i];
  }
  let gameActive = false;
  firstTogo = false;//npc goes first, starts as false
  //when false it is the cpu's turn
  //when true it is the players
  let playerWinCount = 0;
  let npcWinCount = 0;
  /* 
  if (playerWinCount == 3) {
    $('.dialogue').html("Fine take the code and go!")
      $('.quad').hide()
      $('.start').css('pointer-events', 'none')
  }
   */

  //Hides the back button from user initially
  $(".congratulation-screen").hide()
  //3 player wins will end the game
  function win3Times() {
    if (playerWinCount == 3) {
      $("#ttt-main-screen").hide()
      $(".congratulation-screen").show()
      $('.dialogue').html("Fine take the code and go!")

      let code2 = 20
      sessionStorage.setItem("codeKey2", code2);
      $("#TTTCode").text(code2);

      return true;
      // show back button

      //this will return the number needed for the code
      // $('.quad').hide()
      // $('.start').css('pointer-events', 'none')
    }
  }

  // //changes x/o to pictures
  // if $(this).hasClass("X").each(function(){
  //   var txt = $(this).text();
  //   var img = '<img src="images/tic_tac_toe/blue x icon.png" alt="' + txt + '" />'
  //   var html = txt.replace("X", img); 
  //   $(this).html(html);
  // });

  // if $(this).hasClass("O").each(function(){
  //   var txt = $(this).text();
  //   var img = '<img src="images/tic_tac_toe/gold o icon.png" alt="' + txt + '" />'
  //   var html = txt.replace("O", img); 
  //   $(this).html(html);
  // });


  function winConditionCheck() {
    // $(selectorstuff).attr("src") == ....
    let flag = false;
    for (let i = 0; i < winConditions.length; i++) {
      console.log('test')
      if ($("#" + winConditions[i][0]).attr("src") == $("#" + winConditions[i][1]).attr("src") && $("#" + winConditions[i][1]).attr("src") == $("#" + winConditions[i][2]).attr("src") && ($("#" + winConditions[i][0]).attr("src") == "images/tic_tac_toe/gold o icon.png" || $("#" + winConditions[i][0]).attr("src") == "images/tic_tac_toe/blue x icon.png")) {
        gameActive = false;
        flag = true;
        //Conditional statement for if user wins or loses
        console.log(($("#" + winConditions[i][0]).attr("src")))
        console.log(firstturn(firstTogo));
        if (($("#" + winConditions[i][0]).attr("src") == "images/tic_tac_toe/gold o icon.png" && firstturn(firstTogo) == "O") || ($("#" + winConditions[i][0]).attr("src") == "images/tic_tac_toe/blue x icon.png" && firstturn(firstTogo) == "X")) {
          //$("#" + winConditions[i][0]).text() == firstturn(false) == "X" || $("#" + winConditions[i][0]).text() == firstturn(true) == "O"
          gearClick.muted = true;
          $(".dialogue").html("I won't allow you to win again.")
          firstturn(false);
          playerWinCount++;
          $('#player-w-l').html(playerWinCount)
          moves = 0;
          reset();//resets games
          win3Times();

        } else {
          $(".dialogue").html("Foolish human you will never beat me.")
          firstturn(true);
          npcWinCount++;
          $('#robot-w-l').html(npcWinCount)
          moves = 0;
          reset();//resets games
          win3Times();
        }
        return true;
      }
    }
    console.log(availableNum.length);
    console.log(moves);
    if (availableNum.length == 0 && !flag) {
        $(".dialogue").html("A TIE.")
        console.log("TIE DETECTED")
        console.log(flag);
        reset();
        moves = 0;
        gameActive=true;
      return true;
    }
    return false;
  }


  //let playerIsO = true;


  //the oppent goes first in TTT, after that the winner goes first
  function firstturn(firstTogo) {//chooses player letter used in tangent with who goes first
    //universal rule O goes first
    let playerletter = "";

    if (firstTogo == true) {
      return playerletter = "O";
      console.log("Player is O");
    } else {
      return playerletter = "X";
      console.log("Player is X");
    }
  }
  console.log("Player is " + firstturn(firstTogo));

  $('.start').click(function () {
    firstturn();
    gameActive = true;
    console.log(gameActive)
    $(".dialogue").html("Let's begin")
  })

  // Ray and Jahiem 
  const winConditions = [
    ["quad1", "quad2", "quad3"],
    ["quad1", "quad5", "quad9"],
    ["quad7", "quad8", "quad9"],
    ["quad4", "quad5", "quad6"],
    ["quad3", "quad5", "quad7"],
    ["quad1", "quad4", "quad7"],
    ["quad2", "quad5", "quad8"],
    ["quad3", "quad6", "quad9"]
  ]

  //Number of moves at start of game is 0
  let moves = 0;

  $('.quad').click(function () {


    if (gameActive) {
      // Referenced Juan and Ray Onishi tic-Tac-Toe code
      var hasBeenClicked = $(this).hasClass("X") || $(this).hasClass("O");
      // If the grid hasn't been clicked, then execute below
      if (!hasBeenClicked) {
        // let playerturn
        wrenchDrop.play()
        //if firstTogo is true, x goes first
        if (firstturn(firstTogo) == "X") {
          moves++;
          
          //NPC
          //again to start on your turn

          gameActive = false;
          if (!winConditionCheck()) {
            gearClick.muted = false;
            setTimeout(function () {
              $('#whosturn').html("Your Turn, you are " + firstturn(firstTogo));
              let cpuMove = Math.floor(Math.random() * availableNum.length);
              gearClick.play()
              // cpu chooses move
              // $('#quad' + availableNum[cpuMove]).text("O");
              // Give that grid the class X 
              $('#quad' + availableNum[cpuMove]).addClass("O");
              $('#quad' + availableNum[cpuMove]).attr('src',"images/tic_tac_toe/gold o icon.png");
              //add image here
              // $('#quad').attr('src',"images/tic_tac_toe/gold o icon.png");
              //removes number from available moves array called availableNum
              available(('quad' + availableNum[cpuMove]));
              winConditionCheck();
              gameActive = true;
            }, 1000)
          }


          // turn = !turn;
          console.log(firstTogo);
          moves++;//so it satrs on gearheads turn
          $('#whosturn').html("GearHead's Turn");
       /*    $(this).text("X");// Add in the X into the grid  */
          $(this).addClass("X");// Give that grid the class X
          $(this).attr('src',"images/tic_tac_toe/blue x icon.png");
          //removes number from available moves array called availableNum
          available($(this).attr('id'));
           // winConditionCheck();
          

        } else {
          // Player
          moves++;
          $('#whosturn').html("GearHead's Turn");
          // $(this).text("O");// Add in the O into the grid 
          $(this).addClass("O");// Give that grid the class O
          $(this).attr('src',"images/tic_tac_toe/gold o icon.png");
          //removes number from available moves array called availableNum
          available($(this).attr('id'));
          if (!winConditionCheck()) {
            //NPC
            moves++;
            gameActive = false;
            setTimeout(function () {
              $('#whosturn').html("Your Turn, you are " + firstturn(firstTogo));
              $('#whosturn').html("GearHead's Turn");
              let cpuMove = Math.floor(Math.random() * availableNum.length);
              // cpu chooses move
              $('#quad' + availableNum[cpuMove]).text("X");
              // Give that grid the class X 
              $('#quad' + availableNum[cpuMove]).addClass("X");
              $('#quad').attr('src',"images/tic_tac_toe/blue x icon.png");
              //removes number from available moves array called availableNum
              available(('quad' + availableNum[cpuMove]));
              winConditionCheck()
              gameActive = true;
            }, 1000)
          }

        }

        // if (moves == 9) {
        //   moves = 0;
        //   $('.dialogue').html("I will not stand for this! AGAIN!");
        //   console.log(moves);
        //   setTimeout(function () {
        //     $('.quad').removeClass("X")
        //     $('.quad').removeClass("O")
        //     $('.quad').text(".")
        //     moves = 0;
        //   }, 500)
        // }
        // else if(moves > 9){
        //   setTimeout(function () {
        //     $('.quad').removeClass("X")
        //     $('.quad').removeClass("O")
        //     $('.quad').text(".")
        //     moves = 0;
        //   }, 500)
        // }

      }
      //For Player/NPC win condition
      console.log(moves)
    }
  })



  function reset() { //resets game
    $('.quad').removeClass("X")
    $('.quad').removeClass("O")
    availableNum = [];
    for (let i = 0; i < resetAvailable.length; i++) {
      availableNum[i] = resetAvailable[i];
    }
    $(".quad").attr('src', "images/tic_tac_toe/blank.png");

  }

  // available($(this).attr('id'));

  function available(num) {
    // console.log("num");
    if (num == "quad1") {
      availableNum.splice(availableNum.indexOf(1), 1);
      console.log(availableNum);
      // console.log("num");
      console.log(availableNum);

      console.log("num is " + num);
    } if (num == "quad2") {
      availableNum.splice(availableNum.indexOf(2), 1);
      // console.log("2");
      console.log(availableNum);

      console.log("num is " + num);
    } if (num == "quad3") {
      availableNum.splice(availableNum.indexOf(3), 1);
      // console.log("3");
      console.log(availableNum);

      console.log("num is " + num);

    } if (num == "quad4") {
      availableNum.splice(availableNum.indexOf(4), 1);
      // console.log("4");
      console.log(availableNum);

      console.log("num is " + num);
    } if (num == "quad5") {
      availableNum.splice(availableNum.indexOf(5), 1);
      // console.log("5");
      console.log(availableNum);

      console.log("num is " + num);
    } if (num == "quad6") {
      availableNum.splice(availableNum.indexOf(6), 1);
      // console.log("6");
      console.log(availableNum);

      console.log("num is " + num);
    } if (num == "quad7") {
      availableNum.splice(availableNum.indexOf(7), 1);
      // console.log("7");
      console.log(availableNum);

      console.log("num is " + num);
    } if (num == "quad8") {
      availableNum.splice(availableNum.indexOf(8), 1);
      // console.log("8");
      console.log(availableNum);

      console.log("num is " + num);
    } if (num == "quad9") {
      availableNum.splice(availableNum.indexOf(9), 1);
      // console.log("9");
      console.log(availableNum.length);

      console.log("num is " + num);
    }
  }

  $("#ttt-main-screen").hide()
   $("#pink-return-arrow").hide() 
  // $("#returnHome").hide()

  $(".start").click(function () {
    $("#ttt-main-screen").show()
    $("#pink-return-arrow").show()
    // $("#returnHome").show()
    $("#screenCover").hide()
   
  })


});
