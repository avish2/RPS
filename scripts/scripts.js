var playing = false; //dependent on whether 2 players have the site open
var wins = 0;
var losses = 0;
var Player1; // first person to load page
var Player2; // opponent

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
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

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
  	game();
  } else if (snap.numChildren() > 2) {
  	$("#players").html("<p id='players'><strong><span id='connected-viewers'></span></strong> players are wanting to play!</p>");
  	$("#options").html("<p id='waiting'>Too Many Players Trying to Play</p>");
  	$("#connected-viewers").html(snap.numChildren());
  } else {
  	$("#players").empty();
  	$("#options").html("<p id='waiting'>Waiting on another player</p>");
  }
});

function game() {
	var p1initWins = 0;
	var p2initWins = 0;
	var p1wins = p1initWins;
	var p2wins = p2initWins;
	var p1choice; //id of selected R P or S
	var p2choice;

	var options = ["images/rock.png", "images/paper.png","images/scissors.png"];
	var playing = true;
		for (i=0; i<options.length; i++) {
			var choice = $("#options").append("<img class='button' id='choice" + [i] + "' src='" + options[i] + "'></img>");
		}
	database.ref("/playerData").on("value", function(snapshot) {

		  if (snapshot.child("p1choice").exists() && snapshot.child("p2choice").exists()) {
		    p1choice = snapshot.val().p1choice;
		    p2choice = snapshot.val().p2choice;
		    $("#highest-bidder").html(snapshot.val().highBidder);
		    $("#highest-price").html("$" + snapshot.val().highPrice);
		  }
	});
}
