$(document).ready(function () {
  //makes newpool varible equal to prisonerPool
  
  //audio for when user types in wrong id
  let wrongAudio = new Audio('audio/Wrong.mp3')
  let correctAudio = new Audio('audio/correct.wav')
  let accessGranted = new Audio('audio/Access granted.mp3')
  
  // todo: 
  //punish the player for wrong entires by reducing the time ?
  // Universal Varibles
  let timer = 0; //placeholder number;
  
  $("#timer").text(timer);
  //timer should start when start button is clicked
  $(".start").click(function(){
    accessGranted.play()
    freshGame();

    // let intervalVar = setInterval(function(){
      
    //   if(timer <= 0 ){
        
    //     endCondition(intervalVar);
    //   }
    //   //update the timer html 
    //   $("#timer").text(timer);
      

    //     timer--;
    //   }, 1000);
    //as long as timer != 0, it will count down
    $("#speed-typing-main-screen").show()
    $("#screenCover").hide()
  })

 
  // clearInterval(intervalVar)
  let newPool = [];
  let prisonerID = "";
  let freedPrisoners = 0;
  let miniumumFreed = 3;//miniumum prisoners need to win the game
  let prisonerPool = [
    //1
    {idNum: "GA-8273-B", specices: "Garblovians", homePlanet: "Glaagablaaga", crime: "Redacted", img: "images/speed_typing/prisoners/Garblovians.png"},

    //2
    {idNum: "ZG-9897-V", specices: "Zigerions", homePlanet: "Zigerion", crime: "Redacted", img: "images/speed_typing/prisoners/Zigerions.png"},

    //3
    {idNum: "ME-8392-C", specices: "Meeseeks", homePlanet: "Mr. Meeseeks Box", crime: "Redacted", img: "images/speed_typing/prisoners/Meeseeks.png"},
    
    //4
    {idNum: "FL-7584-X", specices: "Flansians", homePlanet: "Flansia", crime: "Redacted", img: "images/speed_typing/prisoners/Flansians.png"},
    
    //5
    {idNum: "SH-8556-K", specices: "Shipzuvians", homePlanet: "Shipzuvia", crime: "Redacted", img: "images/speed_typing/prisoners/Shipzuvians.png"},
    
    //6
    {idNum: "HA-9677-S", specices: "Hambrosians", homePlanet: "Haamden", crime: "Redacted", img: "images/speed_typing/prisoners/Hambrosians.png"},
    
    //7
    {idNum: "ZB-5983-U", specices: "Zombodians", homePlanet: "Zombodia", crime: "Redacted", img: "images/speed_typing/prisoners/Zombodians.png"},
    
    //8
    {idNum: "KZ-8247-L", specices: "Kozbians", homePlanet: "Kozbia", crime: "Redacted", img: "images/speed_typing/prisoners/Kozbians.png"},
    
    //9
    {idNum: "ZE-4992-A", specices: "Zerillians", homePlanet: "Zerillia", crime: "Redacted", img: "images/speed_typing/prisoners/Zerillians.png"},
    
    //10
    {idNum: "BP-4839-R", specices: "Borpocians", homePlanet: "Borpocia", crime: "Redacted", img: "images/speed_typing/prisoners/Borpocians.png"},
    
    //11
    {idNum: "DR-7865-N", specices: "Drumbloxians", homePlanet: "Drumbloxia", crime: "Redacted", img: "images/speed_typing/prisoners/Drumbloxians.png"},
    
    //12
    {idNum: "SM-3456-E", specices: "Smarkians", homePlanet: "Smarkia", crime: "Redacted", img: "images/speed_typing/prisoners/Smarkians.png"},
    
    //13
    {idNum: "QU-2254-T", specices: "Quadropians", homePlanet: "Quadropia", crime: "Redacted", img: "images/speed_typing/prisoners/Quadropians.png"},
    
    //14
    {idNum: "BL-7623-D", specices: "Boobloosians", homePlanet: "Boobloosia", crime: "Redacted", img: "images/speed_typing/prisoners/Boobloosians.png"},
    
    //15
    {idNum: "KR-5828-P", specices: "Korblockians", homePlanet: "Korblockia", crime: "Redacted", img: "images/speed_typing/prisoners/Korblockians.png"},
    
    //16
    {idNum: "PR-7579-M", specices: "Pripudlians", homePlanet: "Pripudlia", crime: "Redacted", img: "images/speed_typing/prisoners/Pripudlians.png"}];

  for(let i = 0;i<prisonerPool.length;i++){
    newPool[i] = prisonerPool[i];
  }
  let currentPrisonerIndex = Math.floor(Math.random() * newPool.length);
  // console.log(prisonerPool[currentPrisonerIndex].idNum)

  //remove prisoner from pool 
  function removeFromArray(index) {
    newPool.splice(index, 1)
  }

  //enables user input
  $("#prisoner-id-info").prop('disabled', false);

  //Hides the back button from user initially
  $(".congratulation-screen").hide()
  
  function endCondition(intervalVar){
    clearInterval(intervalVar);//stops timer
    //no hard limit player is allowed to free as much aliens as they wanted
    //game ends when timer hits 0
    //miniumum amount of freed prisoners scales with difficulty eg: easy- free 6 prisoners
    //after game expires(timer == 0, and miniumumFreed is reached) give code
    //if miniumumFreed is not reached restart game
    if(timer <= 0){
      if(freedPrisoners >= miniumumFreed){
        //should allow player to go back to home screen, and disable game interactions
        //codePopup cannot be canceled and will force the player to press a <button> to go back home
        //when code is implented player receives it here
        $("#prisoner-id-info").prop('disabled', false);
        $(".congratulation-screen").show()
        $("#lost").text("You've Won!")
        $("#win").text("Here's the code!")
         $("#homeBtn").show()
        $(".reset").hide();
       $(".congratulation-screen").toggleClass('toggle')

       //generates random code and saves it in session storage
      //  let code1 = Math.floor(Math.random() * 10);
      let code1 = 10
       sessionStorage.setItem("codeKey1", code1);
       $("#spCode").text(code1);
      }
      else {
        // lose condition freedPrisoners is not reached
        console.log("timer = 0");
        $("#prisoner-id-info").prop('disabled', false);
        //make a lose screen
        $(".congratulation-screen").show()
        $(".reset").click(function(){
          $(".congratulation-screen").toggle();
          // intervalVar
          freshGame();
        });

        
        
      }
    }   
  }

  //Id checking
  var idValue = $("#prisoner-id-info").val();

  //Setting images when changed
  // Jahiem Mcleod & Hakeem & Tamika
  $("#picture").attr("src", newPool[currentPrisonerIndex].img)
  $("#species-info").text(newPool[currentPrisonerIndex].specices)
  $("#home-planet-info").text(newPool[currentPrisonerIndex].homePlanet)
  $("#wanted-for-info").text(newPool[currentPrisonerIndex].crime)
  $("#prisoner-id-on-pic").html(newPool[currentPrisonerIndex].idNum)

  console.log(idValue);

  // ("#prisoner-id-info").innerhtml;
  //On keydown send the value to console

  $("#prisoner-id-info").keydown(function () {
    console.log($("#prisoner-id-info").val())

    //turns info and borders back to green
    $("#inmate-pic").css("border-color", "greenyellow")
    $("#inmate-info-screen").css({"background-color": "#2cc551", "border-color": "greenyellow", "color": "white"});
    $(".prisoner-id").css({"border-color": "greenyellow", "color": "white"});
  })
  function newPrisoner() {
    $("#prisoner-id-on-pic").html(newPool[currentPrisonerIndex].idNum)

    //Id checking
    var idValue = $("#prisoner-id-info").val();

    //Setting images when changed
    // Jahiem Mcleod & Hakeem & Tamika
    $("#picture").attr("src", newPool[currentPrisonerIndex].img)
    $("#species-info").text(newPool[currentPrisonerIndex].specices)
    $("#home-planet-info").text(newPool[currentPrisonerIndex].homePlanet)
    $("#wanted-for-info").text(newPool[currentPrisonerIndex].crime)
  }

 //If try-again button is pressed reset the game
 /*  $("#reset").click(function() {
   timer = 30;
   freedPrisoners = 0
   // reset prisonerpool
   // example
   for (let i = 0; i < resetAvailable.length; i++) {
    prisonerPool[i] = resetAvailable[i];
  }

}) */

  //timer settings

  // class name{
  //   job:
  //   pay:
  // }

  //function will restart game, by refilling prisoner array, and reseting time, as well as toggling screen pop-up
  function freshGame(){
    newPool = [];

    //refill array
    for(let i=0; i<prisonerPool.length; i++){
      newPool[i] = prisonerPool[i];
    }
    //reset Varibles
    timer = 30;
    freedPrisoners = 0;
    
    //toggle pop-up
      let intervalVar = setInterval(function(){
      
      if(timer <= 0 ){
        
        endCondition(intervalVar);
      }
      //update the timer html 
      $("#timer").text(timer);
      

        timer--;
      }, 1000);
    // $(".congratulation-screen").toggle();
  }



  //prevent page reload on pressing enter
  $("#disableDefault").submit(function (event) {
    event.preventDefault();
    // On submit error testing
    // .val() => return the value 
    // .val(string) => sets value to the string 
    // .text() => returns the text in the html 
    // .text(string) => sets text in html to the string 
    let userInput = $("#prisoner-id-info").val().toUpperCase()
    // let prisonerId = prisonerPool[i].idNum
    console.log(newPool[currentPrisonerIndex].idNum)
    if (userInput == newPool[currentPrisonerIndex].idNum) {
      // then choose a new alien to display 
      // and clear the old alien 
      // use a global variable to keep track of the alien that is currently in use 
      // e.g. somewhere earlier initialize some variable called alien to a random alein 
      // then assign it here once you choose 
      // console.log(prisonerPool)
      console.log("correct")
      freedPrisoners++;//player has freed the current prisoner
      removeFromArray(currentPrisonerIndex);
      endCondition();
      $("#prisoner-id-info").val("");
      correctAudio.play()
      currentPrisonerIndex = Math.floor(Math.random() * newPool.length);
      // Update html for new alien here
      newPrisoner();
    } else {
      console.log("error")
      $("#prisoner-id-info").val("");

      //turns info and borders red
      $("#inmate-pic").css("border-color", "#fa9b90")
      wrongAudio.play()
      $("#inmate-info-screen").css({"background-color": "#ec4c3b", "border-color": "#fa9b90", "color": "#fa9b90"});
      $(".prisoner-id").css({"border-color": "#fa9b90", "color": "#fa9b90"});
      setTimeout(function(){
         $("#inmate-pic").css("border-color", "greenyellow")
    $("#inmate-info-screen").css({"background-color": "#2cc551", "border-color": "greenyellow", "color": "white"});
    $(".prisoner-id").css({"border-color": "greenyellow", "color": "white"});
      }, 1000)
    }
    console.log("FORM SUBMITTED")
  })

// Prvents copy and paste(test)

$('body').bind('copy',function(e) { e.preventDefault(); return false; });

 $('body').bind('paste',function(e) { e.preventDefault(); return false; });























});