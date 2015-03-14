var app = require("express")(); // look this up
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	var msgNewConnection = 'A new user connected!';
	var msgNewDissconnection = 'Someone disconnected ; ;';

	console.log(msgNewConnection);
	io.emit('new-connection', msgNewConnection);
	console.log(socket.id);
	
	
	socket.on('disconnect', function(){
    	console.log('user disconnected');
    	io.emit('new-disconnection', msgNewDissconnection);
  	});
  	
  	socket.on('chat message', function(msg) {
  		console.log("message: " + msg);
  		io.emit('chat message', msg);
  	});
});

http.listen(3000, function() {
	console.log("listening on 3000");
});

