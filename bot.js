const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "f!";

var wiezien = "500338326365274122";
var robotnik = "500331500882100224";
var umarniety = "501443297772961792";
var kgb = "500331296975749122";

var serumW = {}

bot.on("ready", () => {
	console.log("Połączony!");
	console.log("Gotowy\n");

	var i = 0;
    var loop = setInterval(function() {
        i++;
        if(i > 3) i = 1;

        var time = new Date();

        if(i == 1) bot.user.setPresence({game: { name: 'Communist Manifest', type: 3 }});
        else if (i == 2) bot.user.setPresence({game: { name: bot.users.size + ' obywateli', type: 2 }});
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

    if(msg.content.startsWith(prefix + "setnickname")) {
    	if(msg.author.id !== "146599241022832640") return;
    	foka = msg.content.split(' ');
    	wilk = foka.slice(1).join(' ');
    	bot.user.setUsername(wilk).catch((err) => {
    		if(err) return msg.reply("coś poszło nie tak, sprawdź dokładnie wpisany nick.");
    	});
    }

    if(msg.content.startsWith(prefix + "gulag")) {
    	let userA = msg.mentions.members.first();
    	let userP = userA.roles.has("500331338956537857");
    	let userK = userA.roles.has(kgb);
    	let userC = userA.roles.has("500332041439674368");
    	let userM = userA.roles.has("501447795413352463");

    	if(msg.member.roles.has(kgb) || !userP || !userK || !userC || !userM) {
    		let user = msg.mentions.members.first();
	    	let role = msg.guild.roles.get(wiezien);
	    	let revRole = msg.guild.roles.get(robotnik);

	    	if(user.roles.has(wiezien)) {
	    		msg.reply("towarzyszu! Więzień już jest w łagrze!");
	    	} else if(!user) {
	    		msg.reply("wskaż mi najpierw zdrajce narodu.");
	    	} else {
	    		user.addRole(role);
	    		user.removeRole(revRole);
	    		msg.channel.send("Zdrajca narodu " + user.user.username + " został przewieziony do łagra.");
	    	} 
    	} else if(msg.member.roles.has(wiezien)) {
    		let role = msg.guild.roles.get(umarniety);
    		let revRole = msg.guild.roles.get(wiezien);

    		msg.member.addRole(role);
    		msg.member.removeRole(revRole);
    		msg.reply("z powodu próby włożenia kogoś do łagra zostałeś rozstrzelany.");
    	} else if(msg.member.roles.has(kgb) || userP || userK || userC || userM) {
    		msg.reply("Niestety, nie możesz wprowadzić do łagra członka naszych służb.");
    	} else {
    		msg.reply("ty chyba głupi jesteś, że chcesz to użyć bez uprawnień KGB");
    	}
    }

    if(msg.content.startsWith(prefix + "rozstrzelaj")) {
    	let user = msg.mentions.members.first();

    	if(msg.member.roles.has(kgb) && user.roles.has(wiezien)) {
    		let role = msg.guild.roles.get(umarniety);
    		let revRole = msg.guild.roles.get(wiezien);

    		user.addRole(role);
    		user.removeRole(revRole);
    		msg.reply("Więzień " + user.user.username + " został rozstrzelany z powodu psucia gospodarki naszego kraju.", {
    			file: "https://cdn.discordapp.com/attachments/414532404754120714/506110191687827466/proxy.gif"
    		});
    	} else if(!user.roles.has(wiezien)) {
    		msg.reply("Osoba do rozstrzelania musi być więźniem łagru!");
    	} else {
    		msg.reply("dziecko, zostaw te zabawki.");
    	}
    }

    if(msg.content === prefix + "wiezniowie") {
    	let liczbaWiezien = msg.guild.roles.get(wiezien).members;
    	if(liczbaWiezien.size < 3) {
    		msg.channel.send(`Posiadamy ${liczbaWiezien.size} więźniów w łagrach.. Coś mało ich mamy, trzeba któregoś robotnika wrobić w zdradę kraju.`).catch(console.error);
    	} else {
    		msg.channel.send(`Posiadamy ${liczbaWiezien.size} więźniów w łagrach.. Trza kogoś rozstrzelać.`).catch(console.error);
    	}
    }

    if(msg.content.startsWith(prefix + "daj")) {
    	if(msg.member.roles.has("500331338956537857")) {
    		let user = msg.mentions.members.first();

    		serumW[msg.user.id] = 1;
    		msg.channel.send("Kostnica \"Pod Twoją Foką\" dała " + user.user.username + " serum wskrzeszenia.");
    	} else {
    		msg.reply("foka jesteś.");
    	}
    }

    if(msg.content === prefix + "respawn") {
    	if(!serumW[msg.member.id]) serumW[msg.member.id] = 1;

		if(serumW[msg.member.id] == 1) {
			let role = msg.guild.roles.get(robotnik);
			let revRole = msg.guild.roles.get(umarniety);

			msg.member.addRole(role);
			msg.member.removeRole(revRole);
			msg.reply("wykorzystałeś swoje serum wskrzeszenia!");

			serumW[msg.member.id] = 0;
		} else {
			msg.reply("nie posiadasz serum wskrzeszenia.");
		}
	}
});

console.log("Łączenie..");
bot.login(process.env.BOT_TOKEN);