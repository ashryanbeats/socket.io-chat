var app = require("express")(); // look this up
var express = require("express");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var morgan = require("morgan");
var path = require("path");

var people = {};

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});



// app.configure(function() {
//   app.use(app.static(__dirname + '/styles'));
//   app.use(app.static(__dirname + '/scripts'));
// });

io.on('connection', function(socket) {
  var userId = socket.id;
	
  io.emit('client-register-id', userId);
	
	socket.on('disconnect', function(){
      // if the user id exists
      if (people[userId]) {
        var msgNewDissconnection = people[userId].name + ' disconnected ; ;';
        io.emit('new-disconnection', msgNewDissconnection);
      }
    	console.log('User disconnected: ', userId);

      // Delete the user from the people object
      delete people[userId];

      console.log("People logged in after user disconnect");
      console.log(people);
  });

	socket.on('update-user-info', function(user) {
    var msgNewConnection;
    var nameChange = false;
    var emotionChange = false;

    // If the user doesn't exist
    if(people.hasOwnProperty(userId) === false) {
      // Write the data recieved from the client to the people obj at the property named userId (socket.id)
      people[userId] = user;
      msgNewConnection = people[userId].name + ' connected and is feeling ' + people[userId].emotion + "!";
    }
    // Else find out what has changed
    else {
      if (people[userId].name !== user.name) {
        nameChange = true;
      } 
      if (people[userId].emotion !== user.emotion) {
        emotionChange = true;
      }
    }

    // Set the message to be emitted based on what has changed. The null case is handled in the client script.
    if (nameChange && emotionChange) {
      msgNewConnection = people[userId].name + " changed names to " + user.name + " and is now feeling " + user.emotion + "!";
      people[userId] = user;
    }
    else if (nameChange) {
      msgNewConnection = people[userId].name + " changed names to " + user.name + "!"; 
      people[userId] = user;
    }
    else if (emotionChange) {
      msgNewConnection = people[userId].name + " is now feeling " + user.emotion + "!";
      people[userId] = user;
    }


    io.emit('new-connection', msgNewConnection);
		console.log("People logged in: ");
    console.log(people);
	});
  	
	socket.on('chat message', function(messageObject) {
    console.log("Message object is: ");
    console.log(messageObject);

    var nameObject = {};
    nameObject.name = people[messageObject.userId].name;
    nameObject.message = messageObject.message;
    

    console.log("Name object is: ");
    console.log(nameObject);
    
		io.emit('chat message', nameObject);
	});
});

http.listen(3000, function() {
	console.log("listening on 3000");
});

