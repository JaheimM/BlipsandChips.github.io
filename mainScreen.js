$(document).ready(function () {
  let password = "abc311fsf";

  let userCode = "";

  //Jahiem Mcleod
  //Adding audio

  const soundOne = new Audio("audio/cursor_style_2.mp3");
  const confirmSound = new Audio("audio/game-start.mp3");

  // Flashing sound
  setInterval(function () {
    $(".fade-in-out").fadeIn();
    $(".fade-in-out").fadeOut();
  }, 550);

  // Forces user to interact to activate audio
  if ($("#enter-screen").is(":visible")) {
    $(".options").hide();
    $("#game-title").hide();
  }

  $("#enter-screen").click(function () {
    $("#enter-screen").hide();
    $(".options").show();
    $("#game-title").show();
  });

  //On mouseover will play audio
  $(".up-select").click(function () {
    soundOne.play();
  });

  $(".down-select").click(function () {
    soundOne.play();
  });

  $(".game-selection[href]").click(function (e) {
    confirmSound.play();
    e.preventDefault();
    if (this.href) {
      let target = this.href;
      $(".main-screen").fadeOut("1000", function () {
        setTimeout(function () {
          window.location = target;
        }, 1000);
      });
    }
  });

  // Use array to hold all classes/options
  // Counter tracks option currently on screen or highlighted
  const options = [$("#speedTyping"), $("#TTT"), $("#dotChase")];

  let currentOption = 1;

  $(".up-select").hide();
  $("#TTT").hide();
  $("#dotChase").hide();
  $("#c-p-select").hide();

  function keyPress() {
    $(document).keyup(function (e) {
      let keyPressed = e.key;
      console.log(keyPressed);

      // If user presses enter, trigger click event to simulate entering a game
      // jquery ignores href using [0] will call the native DOM method
      if (keyPressed === "Enter" && options[0].is(":visible")) {
        confirmSound.play();
        $(".main-screen").fadeOut("1000", function () {
          setTimeout(function () {
            confirmSound.muted = true;
            $("#speedTyping")[0].click();
          }, 1000);
        });
      } else if (keyPressed === "Enter" && options[1].is(":visible")) {
        confirmSound.play();
        $(".main-screen").fadeOut("1000", function () {
          setTimeout(function () {
            confirmSound.muted = true;
            $("#TTT")[0].click();
          }, 1000);
        });
      } else if (keyPressed === "Enter" && options[2].is(":visible")) {
        confirmSound.play();
        $(".main-screen").fadeOut("1000", function () {
          setTimeout(function () {
            confirmSound.muted = true;
            $("#dotChase")[0].click();
          }, 1000);
        });
      } else if (keyPressed === "Enter" && $("#enter-screen").is(":visible")) {
        $("#enter-screen").hide();
        $(".options").show();
        $("#game-title").show();
      }

      // Key controls
      if (keyPressed === "ArrowUp" || keyPressed === "w") {
        soundOne.play();
        currentOption--;

        /*    $(document).keydown(function () {
          $(".up-select").addClass("hold-key");
        }); */

        if (currentOption == 1) {
          $(".up-select").hide();
          $("#speedTyping").show();
          $("#TTT").hide();
        } else if (currentOption === 2) {
          $(".up-select").show();
          $("#TTT").show();
          $("#dotChase").hide();
        } else if (currentOption === 3) {
          $("#TTT").hide();
          $("#dotChase").show();
          $("#c-p-select").hide();
          $(".down-select").show();
        } else {
          currentOption = 1;
        }
        console.log(currentOption);
      }

      if (keyPressed === "ArrowDown" || keyPressed === "s") {
        soundOne.play();
        currentOption++;
        if (currentOption === 2) {
          $(".up-select").show();
          $("#speedTyping").hide();
          $("#TTT").show();
        } else if (currentOption === 3) {
          $("#TTT").hide();
          $("#dotChase").show();
        } else if (currentOption === 4) {
          $("#dotChase").hide();
          $("#c-p-select").show();
          $(".down-select").hide();
        } else {
          currentOption = 4;
        }
        console.log(currentOption);
      }
    });
  }

  keyPress();

  $(".up-select").click(function () {
    currentOption--;
    if (currentOption == 1) {
      $(".up-select").hide();
      $("#speedTyping").show();
      $("#TTT").hide();
    } else if (currentOption === 2) {
      $(".up-select").show();
      $("#TTT").show();
      $("#dotChase").hide();
    } else if (currentOption === 3) {
      $("#TTT").hide();
      $("#dotChase").show();
      $("#c-p-select").hide();
      $(".down-select").show();
    }
    console.log(currentOption);
  });

  $(".down-select").click(function () {
    currentOption++;
    if (currentOption === 2) {
      $(".up-select").show();
      $("#speedTyping").hide();
      $("#TTT").show();
    } else if (currentOption === 3) {
      $("#TTT").hide();
      $("#dotChase").show();
    } else if (currentOption === 4) {
      $("#dotChase").hide();
      $("#c-p-select").show();
      $(".down-select").hide();
    }
    console.log(currentOption);
  });

  // Tamika Dantes
  //splash screen disappears once DOM is loaded
  //portal
  setTimeout(function () {
    $("#sp1").addClass("close-portal");
  }, 1000);

  //logo
  setTimeout(function () {
    $(".splash").addClass("display-none");
    $("#sp2").addClass("display-none");
  }, 4000);

  //hide/show code panel
  $("#code-panel").hide();

  $("#c-p-select").click(function () {
    $("#code-panel").toggle();
  });

  $("#resetStorage").click(function () {
    sessionStorage.clear();
  });

  //check if respective codes are in session storage
  if (sessionStorage.getItem("codeKey1")) {
    console.log(sessionStorage.getItem("codeKey1"));

    $("#codeFtPart").text(sessionStorage.getItem("codeKey1"));
    console.log("GOT CODE 1");
    // set some html element near the code panel that will now show the code from speed typing
  }

  if (sessionStorage.getItem("codeKey2")) {
    console.log(sessionStorage.getItem("codeKey2"));

    $("#codeScPart").text(sessionStorage.getItem("codeKey2"));
    console.log("GOT CODE 2");
    // set some html element near the code panel that will now show the code from speed typing
  }

  if (
    sessionStorage.getItem("codeKey2") &&
    sessionStorage.getItem("codeKey1")
  ) {
    password =
      sessionStorage.getItem("codeKey1") + sessionStorage.getItem("codeKey2");
    console.log(password);
  }

  //if user input is equal in size to the password, it will compare them, if correcet console tells, if not turns red for a second and deletes what user inputted

  //to put in a function
  // if(userInput == password){

  //  userInput = $("#num-text").text();
  //   console.log(userInput);
  // }

  $("#submit-btn").click(function () {
    if (userCode == password) {
      console.log("Password Correct");
      //num-text
      //num-display
      $("#num-text").css({ color: "green" });
      setTimeout(function () {
        $("#num-text").css({ color: "white" });
      }, 1000);

      $("#num-display").css({
        "background-color": "greenyellow",
        "border-color": "darkgreen",
      });
      setTimeout(function () {
        $("#num-display").css({
          "background-color": "#148985",
          "border-color": "white",
        });
      }, 1000);
    } else {
      console.log("Password Incorrect");
      userCode = "";
      $("#num-text").text("****");

      $("#num-display").css({
        "background-color": "#ec4c3b",
        "border-color": "#fa9b90",
        color: "#fa9b90",
      });
      setTimeout(function () {
        $("#num-display").css({
          "background-color": "#148985",
          "border-color": "white",
          color: "white",
        });
      }, 1000);

      $("#num-text").css({ color: "red" });
      setTimeout(function () {
        $("#num-text").css({ color: "white" });
      }, 1000);
    }
  });

  $("#clear-btn").click(function () {
    userCode = "";
    $("#num-text").text("****");
  });

  $(".numButton").click(function () {
    if (userCode.length != 4) {
      userCode += $(this).text();
      $("#num-text").text(userCode);
    } else {
      // Let the user know somehow that 4 is the cap and they've reached that cap
    }
  });

  //code note
  //codeKey1-codeKey2-codeKey3

  //numbers appear in input field when their respective button is clicked
  // $("#num1").click(function(){
  //   $("#num-display").html("1").css("font-size", "350%").css("font-family", "pixelated");
  // })

  // $("#num2").click(function(){
  //   $("#num-display").html("2").css("font-size", "350%").css("font-family", "pixelated");
  // })
});
