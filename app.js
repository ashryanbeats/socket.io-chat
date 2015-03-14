var app = require("express")(); // look this up
var http = require("http").Server(app);
var io = require("socket.io")(http);

var people = {};

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	var msgNewConnection = 'A new user connected!';
	var msgNewDissconnection = 'Someone disconnected ; ;';
	
  io.emit('client-register-id', socket.id);
  io.emit('new-connection', msgNewConnection);
	console.log(msgNewConnection, socket.id);
	
	
	socket.on('disconnect', function(){
    	console.log('user disconnected', socket.id);
    	io.emit('new-disconnection', msgNewDissconnection);
      delete people[socket.id];
      console.log("People logged in after user disconnect");
      console.log(people);
  });

	socket.on('update-user-info', function(user) {
		people[socket.id] = user;
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

