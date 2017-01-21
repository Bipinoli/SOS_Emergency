require('dotenv').load();
var accountSid = process.env.T_SID;
var authToken = process.env.T_KEY;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

module.exports.sendMessage = function(client){
	client.messages.create({
			    to: '+9779860917264',
			    from: '+14692086632',
			    body: 'You are doing great Oli',
			}, function (err, message) {
					console.log("sms sent");
			    console.log(message.sid);
			});
}