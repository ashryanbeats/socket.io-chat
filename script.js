// var socket = io();
// var user = {};
// var userId = "";

// // hide chat at first and show the user info modal
// $(window).load(function(){
//   $("#chat").hide();  
//   $('#modal-user-info').modal('show');
// });

// // Get the user's session id from the server
// socket.on('client-register-id', function(theUserId) {
//   if (!userId) {
//     userId = theUserId;        
//   }
//   console.log("My user id: " + userId);
// });

// // when the user joins the chat, save their info and display the chat
// $("#start-chat").click(function(event) {
//   // Add info from the form to the user object
//   user.name = $("#user-name").val().trim();
//   user.emotion = $("#user-emotion").val().toLowerCase().trim();
//   // Emit an event and pass the user object
//   socket.emit('update-user-info', user);

//   // Show the chat window
//   if ($("#chat").css("display") === "none") {
//     $("#chat").show();
//   }
// });

// // Submitting chat messages, they first go up to the server
// $('form').submit(function(){
//   var messageObject = {};
//   var message = $('#m').val();
//   messageObject.userId = userId;
//   messageObject.message = message;

//   socket.emit('chat message', messageObject);
//   $('#m').val('');
//   return false;
// });

// // Receiving messages, they all come down from the server
// socket.on('chat message', function(nameObject) {

//   $('#messages').append($('<li>' + '<strong>' + nameObject.name + '</strong>' + ": " + nameObject.message + '</li>'));
// });

// socket.on('new-connection', function(msg) {
//   if (msg !== null) {
//     $('#messages').append($('<li>').text(msg));
//   }
// });

// socket.on('new-disconnection', function(msg) {
//   $('#messages').append($('<li>').text(msg));
// });

// $("#modal-user-info").keyup(function(event) {
//   if(event.keyCode === 13) {
//     $("#start-chat").click();
//   }
// });