var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var User;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	userName: {type: String, required: true},
	displayName: {type: String, required: true},
	emotion: {type: String, required: true}
});

User = mongoose.model("User", UserSchema);

module.exports = User;