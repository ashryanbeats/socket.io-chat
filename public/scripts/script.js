var socket = io();
var user = {};
var userId = "";
var height = 0;

// hide chat at first and show the user info modal
$(window).load(function(){
  $("#chat").hide();
  $('#modal-user-info').modal('show');
  //$("").focus
});

// Get the user's session id from the server
socket.on('client-register-id', function(theUserId) {
  if (!userId) {
    userId = theUserId;        
  }
  console.log("My user id: " + userId);
});

// when the user joins the chat, save their info and display the chat
$("#start-chat").click(function(event) {
  // Add info from the form to the user object
  user.userName = $("#user-name").val().trim();
  user.displayName = $("#display-name").val().trim();
  user.emotion = $("#user-emotion").val().toLowerCase().trim();
  
  // Emit an event and pass the user object
  socket.emit('update-user-info', user);

  // write to the database
  $.post("/", {userName: user.userName, displayName: user.displayName, emotion: user.emotion});

  // Show the chat window
  if ($("#chat").css("display") === "none") {
    $("#chat").show();
  }
});

// Submitting chat messages, they first go up to the server
$('form').submit(function(){
  var messageObject = {};
  var message = $('#m').val();
  messageObject.userId = userId;
  messageObject.message = message;

  socket.emit('chat message', messageObject);
  $('#m').val('');
  return false;
});


// Scrolling function to display chat messages that would go below the fold
function scroller() {
  $("#messages li").each(function(i, value) {
    height += parseInt($(this).height());
    console.log("Height: " + height);
  });

  $("body").scrollTop(height);
}

// Receiving messages, they all come down from the server
socket.on('chat message', function(nameObject) {
  if (nameObject.message !== "") {
    scroller();
    $('#messages').append($('<li>' + '<strong>' + nameObject.name + '</strong>' + ": " + nameObject.message + '</li>'));
  }
});

socket.on('new-connection', function(msg) {
  scroller();
  $('#messages').append($('<li class="system-message">').text(msg));
});

socket.on('new-disconnection', function(msg) {
  scroller();
  $('#messages').append($('<li class="system-message">').text(msg));
});

// User return key to submit the modal form
$("#modal-user-info").keyup(function(event) {
  if(event.keyCode === 13) {
    $("#start-chat").click();
  }
});