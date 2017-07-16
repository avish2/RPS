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
var data = database.ref("data");
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
// var playersRef = database.ref("/players");
var playersRef = data.child("players");
// var player1Ref = playersRef.child("1");
// var player2Ref = playersRef.child("2");
// var playerChoices = database.ref("/playerChoices");
var gameObject = {
      p1name: "null",
      p1choice: "",
      p1wins: 0,
      p1losses: 0,
      p2name: "null",
      p2wins: 0,
      p2losses: 0,
      ties: 0,
      turn: 0,
};
// var p1wins = 0;
// var p2wins = 0;
var p1choice = ""; //id of selected R P or S
var p2choice = "";
var player1Exists;
var player2Exists;
var name;

data.onDisconnect().update({turn: 0});


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
    data.child('chat').onDisconnect().set({});
  }
});


database.ref("/data/players").on("value", function(snapshot) {
  var sv = snapshot.val();
  var players = Object.keys(sv);
  console.log(players);
  p1name = players[0].p1name;
  // console.log(snapshot);
  // console.log(snapshot.key());
// database.on('value', function(snapshot){
  // console.log(snapshot);
  // gameObject.p2name = snapshot.val().p2name;
  // console.log(gameObject.p1name);
  // step = snapshot.child('players').child('2');
  // gameObject.p2name = step.val('p2name');
  // player2Exists = snapshot.child('players').child('2').exists();
  });

function game() {
 
  var options = ["images/rock.png", "images/paper.png","images/scissors.png"];
  var playing = true;
    for (i=0; i<options.length; i++) {
      var choice = $("#options").append("<img class='button' id='choice" + [i] + "' src='" + options[i] + "'></img>");
    }
}
function askName (snapshot) {
    playersRef.set({
      p1name: "null",
      p1choice: "",
      p1wins: 0,
      p1losses: 0,
      p2name: "null",
      p2choice: "",
      p2wins: 0,
      p2losses: 0,
      ties: 0
    });
  $("#options").append("<div class='form-group'><p id='please' for='player-name'>Please Enter Your Name</p><input class='form-control' id='player-name' type='text'></div><button class='dotbutton' id='submit' type='submit'>Submit</button>");
}

$(document).on("click", "#submit", function(snapshot) {
  event.preventDefault();
  name = $("#player-name").val();
  // playersRef.on("value", function(snapshot) {
    whichPlayer(name);
  // });
});
  //if(player1)!=""){}

  function whichPlayer(name) {
    console.log(gameObject);
    // alert(Object.values(player1Ref));
     if(playersRef.p1name != "null") {
      // if(player1Ref.p1name == "null" || player1Ref.p1name == undefined ){
        gameObject.p1name = name;
        playersRef.push({
          p1name: name,
          p1choice: '',
          p1wins: 0,
          p1losses: 0,
        })
          // if (gameObject.p2name !== "null") {
          //   data.update({turn: 1});
          //   game();
          // }
        // return false;
        // console.log(p1name);
        // console.log(p2name);

      } else {
        gameObject.p2name = name;
        playersRef.push({
          p2name: name,
          p2choice: "",
          p2wins: 0,
          p2losses: 0,
          ties: 0
        });
        // if (gameObject.p1name !== "null") {
        //   data.update({turn: 1});
        //   game();
        // }
      }

  }
  // function sendChat(chat){
  //   if(player1Exists && player2Exists){
  //     if(gameObject.userId == '1'){
  //       data.child('chat').push({message: gameObject.name + ': ' + chat});
  //       var log = $('#chat-window');
  //       log.animate({ scrollTop: log.prop('scrollHeight')}, 1000);
  //     } else if(gameObject.userId == '2'){
  //       data.child('chat').push({message: gameObject.name2 + ': ' + chat});
  //       var log = $('#chat-window');
  //       log.animate({ scrollTop: log.prop('scrollHeight')}, 1000);
  //     }
  //   } else{
  //     return;
  //   }
  // }

 // var myDataRef = new Firebase('https://thanhchat.firebaseio.com');
 //      $('#messageInput').keypress(function (e) {
 //        if (e.keyCode == 13) {
 //          var name = $('#nameInput').val();
 //          var text = $('#messageInput').val();
 //          myDataRef.push({name: name, text: text});
 //          $('#messageInput').val('');
 //        }
 //      });
 //      myDataRef.on('child_added', function(snapshot) {
 //        var message = snapshot.val();
 //        displayChatMessage(message.name, message.text);
 //      });
 //      function displayChatMessage(name, text) {
 //        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
 //        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
 //      };
