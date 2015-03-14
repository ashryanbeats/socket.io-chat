var app = require("express")(); // look this up
var http = require("http").Server(app);
var io = require("socket.io")(http);

var people = {};

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  var userId = socket.id;
	var msgNewDissconnection = 'Someone disconnected ; ;';
	
  io.emit('client-register-id', userId);
	
	socket.on('disconnect', function(){
    	console.log('user disconnected', userId);
    	io.emit('new-disconnection', msgNewDissconnection);
      delete people[socket.id];
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
  	
	socket.on('chat message', function(msg) {
		console.log("message: " + msg);
		io.emit('chat message', msg);
	});
});

http.listen(3000, function() {
	console.log("listening on 3000");
});

