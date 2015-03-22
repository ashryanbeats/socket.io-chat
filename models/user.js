var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var User;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {type: String, required: true}
});

User = mongoose.model("User", UserSchema);

module.exports = User;