const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("ready", () => {

	var i = 0;

	var loop = setInterval(function() {
		i++;
		if(i > 2) i = 1;

		if(i == 1) bot.channels.get("517814393472286740").send("t!daily <@146599241022832640>");
		if(i == 2) bot.channels.get("517814393472286740").send("t!daily <@146599241022832640>");
	}, 86405000);
});

bot.on("message", msg => {

	if(msg.content === "daj hajs") {
		msg.channel.send("t!daily <@146599241022832640>");
	}

	if(msg.content === "daj repa") {
		msg.channel.send("t!rep <@146599241022832640>");
	}
});

console.log("Łączenie..");
bot.login(process.env.FOKA4_TOKEN);