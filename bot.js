const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "f!";

bot.on("ready", () => {
	console.log("Połączony!");
	console.log("Gotowy\n");

	var i = 0;
    var loop = setInterval(function() {
        i++;
        if(i > 3) i = 1;

        var time = new Date();

        if(i == 1) bot.user.setPresence({game: { name: 'Communist Manifest', type: 3 }});
        else if (i == 2) bot.user.setPresence({game: { name: bot.users.size + ' więźniów łagrów', type: 2 }});
    }, 60000);
});

bot.on("disconnected", () => {
	console.log("Odłączony");
});

bot.on("guildMemberAdd", member => {
	let role = member.guild.roles.find("name", "Класа роботницза");

	member.addRole(role);
	bot.channels.get("500328272232710177").send("Łooo suka, dostaliśmy nowego towarzysza! " + member.user.username + " przywitaj się z innymi robotnikami i buduj gospodarkę Sowieckiemu Fokarium!");
});

bot.on("message", async msg => {
	if(msg.author.bot) return false;
    if(!msg.guild) return;

    if(msg.content === prefix + "bstop") {
        if(msg.author.id !== "146599241022832640") return;
            msg.channel.send("[DEV] Wyłączanie bota..");
            bot.destroy();
    }

    if(msg.content.startsWith(prefix + "setavatar")) {
    	if(msg.author.id !== "146599241022832640") return;
    	foka = msg.content.split(' ');
    	wilk = foka.slice(1).join(' ');
    	bot.user.setAvatar(wilk).catch((err) => {
    		if(err) return msg.reply("coś nie tak poszło, sprawdź link i daj bezpośredni link do obrazka.");
    	});
    }

    if(msg.content.startsWith(prefix + "gulag")) {
    	let user = msg.mentions.members.first();
    	let role = msg.guild.roles.find("name", "Виезиен Лагру");

    	if(msg.user.roles.has(role)) {
    		msg.reply("towarzyszu! Więzień już jest w łagrze!");
    	} else {
    		user.addRole(role);
    		msg.channel.send("Zdrajca narodu " + user.user.username + " został przewieziony do łagra.");
    	}
    }
});

console.log("Łączenie..");
bot.login(process.env.BOT_TOKEN);