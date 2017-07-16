var playing = false; //dependent on whether 2 players have the site open
var wins = 0;
var losses = 0;
var Player1; // first person to load page
var Player2; // opponent
var playernum = [];

  var config = {
    apiKey: "AIzaSyAcecPEr4pyMlwWWTn8vrm49y3Qnn5ceRg",
    authDomain: "gorilla-guns-karate.firebaseapp.com",
    databaseURL: "https://gorilla-guns-karate.firebaseio.com",
    projectId: "gorilla-guns-karate",
    storageBucket: "gorilla-guns-karate.appspot.com",
    messagingSenderId: "866623365674"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var players = database.ref("/players");
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var playersRef = database.ref(".info/players")

var p1name = "empty";

players.set(p1name);
var name;

database.ref("/players").on("value", function(snapshot) {
    p1name = snapshot.val().p1name;
});

connectedRef.on("value", function(snap) {

  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

connectionsRef.on("value", function(snap) {

  if (snap.numChildren()== 2) {
    $("#options").empty();
    $("#players").empty();
    askName();
  } else if (snap.numChildren() > 2) {
    $("#players").html("<p id='players'><strong><span id='connected-viewers'></span></strong> players are wanting to play!</p>");
    $("#options").html("<p id='waiting'>Too Many Players Trying to Play</p>");
    $("#connected-viewers").html(snap.numChildren());
  } else {
    $("#players").empty();
    $("#options").html("<p id='waiting'>Waiting on another player</p>");
    // data.child('chat').onDisconnect().set({});
  }
});

function askName () {
  $("#options").append("<div class='form-group'><p id='please' for='player-name'>Please Enter Your Name</p><input class='form-control' id='player-name' type='text'></div><button class='dotbutton' id='submit' type='submit'>Submit</button>");
}

$(document).on("click", "#submit", function(snapshot) {
  event.preventDefault();
  name = $("#player-name").val();
    addPlayer(name);
});

players.on("value", function(snapshot){
  var sv = snapshot.val();
  // console.log("Sv");
  // console.log(sv);
  var keys = Object.keys(sv);
  var playercount = keys.length;
  // console.log("keys");
  // console.log(keys);
  // console.log(sv[keys].name);
  if (playercount == 2) {
    $("#options").empty();
    game();
  }

});

  function addPlayer(name) {
        players.push({
          name: name,
          choice: "",
          wins: 0,
          losses: 0,
          ties: 0
        });
  }

function game() {
  players.on("value", function(snapshot){
    var sv = snapshot.val();
    var keys = Object.keys(sv);
    var Player1 = sv[keys[0]];
    var Player2 = sv[keys[1]];
    console.log(Player1);
    console.log(Player2);
    $("#player1").html(sv[keys[0]].name + "'S SCORE: ");
    $("#player2").html(sv[keys[1]].name + "'S SCORE: ");
    $("#player1wins").html(sv[keys[0]].wins);
    $("#player2wins").html(sv[keys[1]].wins);
  });
  var options = ["images/rock.png", "images/paper.png","images/scissors.png"];
  var playing = true;
    for (i=0; i<options.length; i++) {
      var choice = $("#options").append("<img class='button' id='choice" + [i] + "' data-attr='" + [i] + "' src='" + options[i] + "'></img>");
    }
}
$(document).on("click", ".button", function() {
    var i = $(this).attr("data-attr");
    $("#options").empty();   
    database.ref("/players").on("value", function(snapshot) {
      var sv = snapshot.val();
      console.log(sv);
      var keys = Object.keys(sv);
      var Player1 = sv[keys[0]];
      var Player2 = sv[keys[1]];
      var Player1id = keys[0];
      var Player2id = keys[1];
      console.log("choice?");
      console.log(sv.Player1id);
      console.log(keys);
      console.log(playersRef.Player1id.choice);
      // Player1.update({choice: i});
  });
    // Player1.update({choice: i});
    // setChoice(i);
  });

function setChoice() {

}
