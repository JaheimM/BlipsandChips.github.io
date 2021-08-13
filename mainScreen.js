$(document).ready(function(){
  let password = "abc311fsf";
  
  let userCode = "";

  //Jahiem Mcleod
  //Adding audio
  const soundOne = new Audio('audio/cursor_style_2.mp3');
  const confirmSound = new Audio('audio/confirm_style_2_echo_001.mp3')
  

  //On mouseover will play audio
  $('.game-selection').mouseover(function(){
    soundOne.play()
  })

  $('#c-p-select').mouseover(function(){
    soundOne.play()
  })

  $('.game-selection').click(function(){
    confirmSound.play()
  })

  // Tamika Dantes
  //splash screen disappears once DOM is loaded
  //portal
  setTimeout(function(){
    $("#sp1").addClass("close-portal");
  }, 1000);

  //logo
  setTimeout(function(){
    $(".splash").addClass("display-none");
    $("#sp2").addClass("display-none");
  }, 4000);

  //hide/show code panel
  $("#code-panel").hide();

  $("#c-p-select").click(function(){
    
    $("#code-panel").toggle();
  })

  $("#resetStorage").click(function() { 
    sessionStorage.clear();
  })
  
  //check if respective codes are in session storage
  if (sessionStorage.getItem("codeKey1")){
    console.log(sessionStorage.getItem("codeKey1"));
    
    $("#codeFtPart").text(sessionStorage.getItem("codeKey1"));
    console.log("GOT CODE 1")
    // set some html element near the code panel that will now show the code from speed typing 
  }

  if (sessionStorage.getItem("codeKey2")){
    console.log(sessionStorage.getItem("codeKey2"));
    
    $("#codeScPart").text(sessionStorage.getItem("codeKey2"));
    console.log("GOT CODE 2")
    // set some html element near the code panel that will now show the code from speed typing 
  }
  
  if(sessionStorage.getItem("codeKey2") && sessionStorage.getItem("codeKey1")){
   password = sessionStorage.getItem('codeKey1') + sessionStorage.getItem("codeKey2");
   console.log(password);
  }

  //if user input is equal in size to the password, it will compare them, if correcet console tells, if not turns red for a second and deletes what user inputted 

  

  //to put in a function
  // if(userInput == password){

//  userInput = $("#num-text").text();
//   console.log(userInput);
  // }
  
  $("#submit-btn").click(function(){
    if(userCode == password){
      console.log("Password Correct")
      //num-text
      //num-display
      $("#num-text").css({ "color": "green"});
      setTimeout(function(){
         $("#num-text").css({ "color": "white"});
      }, 1000)

     $("#num-display").css({"background-color": "greenyellow", "border-color": "darkgreen"});
      setTimeout(function(){
        $("#num-display").css({"background-color": "#148985", "border-color": "white"});
      }, 1000)
      
    }else{
      console.log("Password Incorrect")
      userCode = "";
      $("#num-text").text("****")  
      
      $("#num-display").css({"background-color": "#ec4c3b", "border-color": "#fa9b90", "color": "#fa9b90"});
      setTimeout(function(){
        $("#num-display").css({"background-color": "#148985", "border-color": "white", "color": "white"});
      }, 1000)
    
      $("#num-text").css({ "color": "red"});
      setTimeout(function(){
         $("#num-text").css({ "color": "white"});
      }, 1000)
    }

  });

  $("#clear-btn").click(function(){
    userCode = "";
    $("#num-text").text("****")
  })
 
  $(".numButton").click(function(){
    if(userCode.length != 4){
      userCode += $(this).text();
      $("#num-text").text(userCode)
    }
    else {
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