require('dotenv').config();

var client = require("twilio")(
		process.env.T_SID,
		process.env.T_KEY
	);

client.messages.create({
	from: "+14692086632",
	to: "+9779843446221",
	body: "Ayush I am in danger"
	},function(err,message){
		if (err){
			console.err("sms failed");
		}
	});