//constantes et variables
const Discord = require('discord.js');
const on = 1;
const off = 0;
const bot = new Discord.Client();
const config = require("./config.json");//config
const { get } = require("snekfetch");
const low = require('lowdb')//database
const FileSync = require('lowdb/adapters/FileSync')//database
const adapter = new FileSync('database.json');//database
const db = low(adapter);//database
const { Client, Attachment } = require('discord.js');//cat
const version = "0.7.1"
const embedRed = 0xff0000
const embedOrange = 0xff790c
const embedYellow = 0xffff00
const embedGreen = 0x00ff00
const embedBlue = 0x0064ff
const embedPurple = 0x6a00b0
const embedMagenta = 0x9600ff
const embedPink = 0xff00ff
const embedBlack = 0x000000
const embedWhite = 0xffffff
const embedGray = 0x777777

db.defaults({ jokes: []}).write()
var prefix = ("/");
var randnum = 0;
var servers = {};
var jokenumber = db.get(`jokes`).map(`joke_value`).value();

var fortunes = [
  "🎱 Oui.",
  "🎱 Non.",
  "🎱 C'est non.",
  "🎱 Très probable.",
  "🎱 C'est bien parti.",
  "🎱 Oui absolument.",
  "🎱 Évidemment.",
  "🎱 Assurémment.",
  "🎱 Peu probable.",
  "🎱 Impossible.",
  "🎱 Faut pas rêver.",
  "🎱 C'est sûr et certain.",
  "🎱 C'est décidément ainsi.",
  "🎱 Sans aucun doutes.",
  "🎱 Oui, définitivement.",
  "🎱 Vous pouvez compter dessus.",
  "🎱 D'après moi, oui.",
  "🎱 Très probablement.",
  "🎱 La perspective est bonne.",
  "🎱 Les signes indiquent que oui.",
  "🎱 Reponse floue, essaye encore.",
  "🎱 Demande encore plus tard.",
  "🎱 Mieux vaut que tu ne le saches pas maintenant...",
  "🎱 Je suis dans l'impossibilité de prédire maintenant.",
  "🎱 Concentre-toi et demande encore...",
  "🎱 Ne compte par sur cela.",
  "🎱 Ma réponse est non.",
  "🎱 Ma source dit non.",
  "🎱 La perspective n'est pas si bonne...",
  "🎱 Très douteux.",
  "🎱 Pas du tout.",
  "🎱 Tout à fait.",
  "🎱 C'est totalement vrai.",
  "🎱 Impossible.",
  "🎱 Bien sûr.",
  "🎱 Je ne pense pas.",
  "🎱 Ce n'est pas vrai.",
  "🎱 C'est vraiment incertain.",
  "🎱 Non d'un certain point de vue.",
  "🎱 Des théories le prouvent.",
  "🎱 Probablement pas.",
  "🎱 Exactement.",
  "🎱 Je ne pense pas.",
];

//setup du bot
bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '[/help] Créé par Nébulleux', type:0}});
    console.log("Bot Ready !"); 
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(`[/help] | Créé par NéBulleux#3718`);
});
//token unique du bot
bot.login(process.env.TOKEN);

//bienvenue
bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "Membres 💯");
    member.addRole(role);
    member.send(`Bienvenu(e) ${member.user.username} dans le meilleur serveur Discord du monde avec **NébuBot**, le bot qui va t'aider dans ta quête tout d'abord, n'oublies pas de lire les règles dans **#acceuil-reglement**, et ensuite amuses-toi bien et passes un agréable séjour :kissing_smiling_eyes:  ! Sache que mes commandes sont disponibles via [/help] :wink: ! https://i.ytimg.com/vi/T8l6TErzS04/maxresdefault.jpg`)
})

bot.on('message', message => {
//help
     if (message.content.toLowerCase() === prefix + "help") {
      message.delete().catch(O_o=>{});
      let member = message.author;
        var help_embed = new Discord.RichEmbed()
            .setColor('#2C22BA')
            .setDescription("Voici les différentes commandes de NebuBot créé par Nébulleux")
            .addField("Interactions" , "/avatar (votre photo de profil) \n /8ball [message] \n /ow (overwatch personnages aléatoires) \n /ow2 (overwatch 2 personnages aléatoires) \n /ow3 (overwatch 3 personnages aléatoires) \n /coinflip (pile ou face) \n /rps (pierre, feuille, ciseaux) \n /lenny \n /say [message] \n /cat (chat aléatoire) \n /rip (image) \n /roll (chiffre aléatoire entre 1 et 6) \n /write \n /stopwrite \n /dm @PERSONNE [message] \n /slap (la gifle du turfu) \n")
            .addField("Commandes de Modération" , "/helpadmin")
            .addField("Commandes d'informations annexes" , "/info (informations du robot Discord) \n /moi (créateur du robot Discord) \n /serv (le lien du serveur de la SmashTeam évidemment !) \n /ping (commande ping) \n /allchan (nombre de canaux écrits dans lesquels le bot navigue !) \n /allserv (nombre de serveurs dans lesquels le bot navigue !) \n /nebubot (test mp) \n /stat (informations dans la console demandez au dev)")
            .addField("Musiques" , "/ouh \n /shrek")
            .addField("Autres" , "Messages de bienvenue en mp \n Raisons de ban en mp")
            .setFooter("Merci d'avoir pris connaissance des commandes !")
            .setThumbnail("https://discordemoji.com/assets/emoji/Question.gif")
            .setAuthor(`Commandes`, bot.user.displayAvatarURL)
            member.send({
              embed : help_embed
              });
              message.reply("Je t'ai envoyé la liste des commandes en DM !")
        console.log("Commande Help demandée !");
       }

//moi
    if (message.content.toLowerCase() === prefix + "moi") {
        var moi = new Discord.RichEmbed()
            .setColor('#2C22BA')
            .setDescription("Informations")
            .addField("Créé par" , "[NéBulleux#3718]")
            .addField("Créé le" , "08/07/2018")
            message.channel.send(moi);
        console.log("Commande Moi demandée !");
    }
//help admin
  if (message.content.toLowerCase() === prefix + "helpadmin") {
    message.delete().catch(O_o=>{});
    let member = message.author;
      var help_embed = new Discord.RichEmbed()
            .setColor('#2C22BA')
            .setDescription("Voici les différentes commandes d'administrations de NebuBot créé par Nébulleux")
            .addField("Commandes Admin", "/admin (Pour avoir le grade admin et gouverner le serveur MOUHAHAHAHAHA) \n /ban @? raison \n /kick @? raison \n /purge (pour supprimer entre 2 et 100 messages d'un salon textuel)")
            .addField("PS", "Pour pouvoir utiliser les commandes administrateurs, n'oubliez pas de cochez la petite case liée à l'action que vous voulez faire ! :ballot_box_with_check: ")
            .setFooter("Merci d'avoir pris connaissance des commandes !")
            .setThumbnail("https://discordemoji.com/assets/emoji/anibanned.gif")
            .setAuthor("NébuBot")
            member.send({
              embed : help_embed
              });
              message.reply("Je t'ai envoyé la liste des commandes d'administrations en DM !")
        console.log("Commande Admin demandée !");
    }
//serv
    if(message.content === prefix + "serv"){
       message.reply("https://discord.gg/qGDNGXt")
       console.log("Demande du serveur")
    }
  //avatar
    if(message.content === prefix + "avatar") {
      message.reply(message.author.avatarURL);
      console.log("avatar")
      }

    if(message.content === prefix + "stat") {
      console.log(message.author);
    }


//randomow
  function randomow() {
    var rand = ['Ana https://vignette.wikia.nocookie.net/overwatch/images/d/d8/Ana_cute.png/revision/latest/scale-to-width-down/439?cb=20170228045800', 'Ange https://i.imgur.com/I0H41SM.png', 'Bastion https://vignette.wikia.nocookie.net/overwatch/images/0/08/Bastion_cute.png/revision/latest/scale-to-width-down/480?cb=20170228044445', 'Bouldozer https://i.imgur.com/4KD6YQN.jpg', 'Brigitte https://vignette.wikia.nocookie.net/overwatch/images/2/21/Brigitte_Cute.png/revision/latest/scale-to-width-down/480?cb=20180325172719', 'Chacal https://vignette.wikia.nocookie.net/overwatch/images/a/a7/Junkrat_cute.png/revision/latest/scale-to-width-down/480?cb=20170228044709', 'Chopper https://vignette.wikia.nocookie.net/overwatch/images/7/74/Roadhog_cute.png/revision/latest/scale-to-width-down/480?cb=20170228045528', 'D.va https://i.imgur.com/HC2CfB2.png', 'Doomfist https://vignette.wikia.nocookie.net/overwatch/images/0/0f/Doomspray_cute.png/revision/latest/scale-to-width-down/480?cb=20170713212315', 'Fatale https://vignette.wikia.nocookie.net/overwatch/images/a/af/Widowmaker_cute.png/revision/latest/scale-to-width-down/480?cb=20170228045111', 'Faucheur https://vignette.wikia.nocookie.net/overwatch/images/9/94/Reaper_cute.png/revision/latest/scale-to-width-down/480?cb=20170228043859', 'Genji https://vignette.wikia.nocookie.net/overwatch/images/7/78/Genji_cute.png/revision/latest/scale-to-width-down/480?cb=20170228042759', 'Hanzo https://vignette.wikia.nocookie.net/overwatch/images/6/68/Hanzo_cute.png/revision/latest/scale-to-width-down/480?cb=20170228044535', 'Lúcio https://vignette.wikia.nocookie.net/overwatch/images/a/ae/Lucio_cute.png/revision/latest/scale-to-width-down/480?cb=20170228045841', 'Mc Cree https://vignette.wikia.nocookie.net/overwatch/images/1/18/Mccree_cute.png/revision/latest/scale-to-width-down/480?cb=20170228043629', 'Mei https://vignette.wikia.nocookie.net/overwatch/images/d/df/Mei_cute.png/revision/latest/scale-to-width-down/480?cb=20170228044844', 'Moira https://vignette.wikia.nocookie.net/overwatch/images/a/a1/Moira_Cute.png/revision/latest/scale-to-width-down/480?cb=20180325170022', 'Orisa https://vignette.wikia.nocookie.net/overwatch/images/6/69/Spray_ORISA_018_copy.png/revision/latest/scale-to-width-down/480?cb=20170327220658', 'Pharah https://vignette.wikia.nocookie.net/overwatch/images/e/e1/Pharah_cute.png/revision/latest/scale-to-width-down/480?cb=20170228043747', 'Reinhardt https://vignette.wikia.nocookie.net/overwatch/images/9/96/Reinhardt_cute.png/revision/latest/scale-to-width-down/480?cb=20170228045446', 'Soldat76 https://vignette.wikia.nocookie.net/overwatch/images/7/72/Soldier76_cute.png/revision/latest/scale-to-width-down/480?cb=20170228044010', 'Sombra https://vignette.wikia.nocookie.net/overwatch/images/6/6b/Sombra_cute.png/revision/latest/scale-to-width-down/382?cb=20170228044129', 'Symmetra https://vignette.wikia.nocookie.net/overwatch/images/6/66/Symmetra_cute.png/revision/latest/scale-to-width-down/480?cb=20170228050008', 'Torbjörn https://vignette.wikia.nocookie.net/overwatch/images/8/8a/Torbjorn_cute.png/revision/latest/scale-to-width-down/480?cb=20170228044951', 'Tracer https://i.imgur.com/C5IZs0R.png', 'Winston https://vignette.wikia.nocookie.net/overwatch/images/1/1c/Winston_cute.png/revision/latest/scale-to-width-down/480?cb=20170330120915', 'Zarya https://vignette.wikia.nocookie.net/overwatch/images/c/c7/Zarya_cute.png/revision/latest/scale-to-width-down/480?cb=20170228045714', 'Zenyatta https://vignette.wikia.nocookie.net/overwatch/images/b/b1/Zenyatta_cute.png/revision/latest/scale-to-width-down/480?cb=20170228050046'];
    return rand[Math.floor(Math.random()*rand.length)];
  }
    if (message.content === prefix + "ow") {
    message.channel.send(randomow())
}

    if (message.content === prefix + "ow2") {
    message.channel.send(randomow())
    message.channel.send(randomow())
}

    if (message.content === prefix + "ow3") {
    message.channel.send(randomow())
    message.channel.send(randomow())
    message.channel.send(randomow())
}
//random cat
if(message.content.startsWith(prefix + 'cat')) {
  try {
    get('https://aws.random.cat/meow').then(res => {
      const embed = new Discord.RichEmbed()
      .setImage(res.body.file)
      .setDescription(`:cat: Image de chat pour ${message.author.username}`)
      .setColor('#2C22BA')
      return message.channel.send({embed});
    });
  } catch(err) {
    return message.channel.send(error.stack);
  }
}
//tous les serveurs dans lesquels le bot se trouve
    if (message.content === prefix + "allserv") {
    message.channel.send(`Je suis sur ${bot.guilds.size} serveurs !`)
    }
//tous les channels dans lesquels le bot se trouve
    if (message.content === prefix + "allchan") {
    message.channel.send(`Je suis actuellement connecté à plus de ${bot.channels.size} channels écrits !`)
    }
//test dm
    if (message.content === prefix + "nebubot") {
    message.author.send("C'est moi.")
    }
//lennyface
    if (message.content === prefix + "lenny"){
      message.delete().catch(O_o=>{});
    message.channel.send("( ͡° ͜ʖ ͡° )")
    }
//rip
    if (message.content.startsWith(prefix + 'rip')) {
      message.delete().catch(O_o=>{});
      const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
      message.channel.send(attachment);
    }
//coinflip
    if (message.content.toLowerCase().startsWith(prefix + "coinflip")) { 
        console.log("coinflip")
		var message2 = Array(2);
		message2[1] = "Face :cd:";
	    message2[2] = "Pile :dvd:";
        var x = getRandomInt(0, 8);
		if (x < 4){
			message.channel.send(message2[1]);
		}
		else{
			message.channel.send(message2[2]);
		}
    }
//rps rock paper scissors pour les anglosaxons
    if (message.content.toLowerCase().startsWith(prefix + "rps")) { 
        console.log("rps")
		var message1 = Array(3);
		message1[1] = "Pierre :black_circle:";
	    message1[2] = "Papier :page_facing_up:";
		message1[3] = "Ciseaux :scissors:"
        var x = getRandomInt(0, 9);
		if (x < 6){
         if (x < 3){
			message.channel.send(message1[1]);
		}
		else{
            message.channel.send(message1[3]);
		}
		}
		else{ 
			message.channel.send(message1[2]);
        }}
//contactadmin
   if(message.content === prefix + "contact")
   message.channel.send(`**Hey <@&331867820638076928>, <@${message.author.id}> a besoin d'aide !**`, {
});

//fonction coinflip rip mes skins csgo maxence
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
//database blagues
    if (!message.content.startsWith(prefix))return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){
//newjoke    
      case "newjoke":
      var value = message.content.substr(9);
      var author = message.author.tag;
      var number = db.get('jokes').map('id').value();
      console.log(value);
      message.reply("Ajout de la blague à la base de données")

      db.get('jokes')
         .push({ joke_value: value, joke_author: author})
         .write()

    break;
//telljoke
    case "telljoke" :
    joke_random();
    console.log(randnum);
    
    var joke = db.get(`jokes[${randnum}].joke_value`).toString().value();
    var author_joke = db.get(`jokes[${randnum}].joke_author`).toString().value();
    console.log('joke')

    message.channel.send(`Voici la blague : ${joke} (Blague de @${author_joke})`)

    break;
}

})



//affichage de nouvelle guilde dans la console
bot.on("guildCreate", guild => {
  console.log("Someone added my Nebubot, server named: " + guild.name + " and their name was: " + guild.owner.user.username);
});
//affichage d'une guilde en moins dans la console
bot.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
//async en gros des que le bot est online il est apte a envoyer et a recevoir des messages
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
//vrai ping
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! La Latence est de ${m.createdTimestamp - message.createdTimestamp}ms. La Latence de l'API est de ${Math.round(bot.ping)}ms`);
  }
//commande pour dire quelque chose et le supprimer juste apres 
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

//commande pour kick
  if(command === "kick") {
    if(!message.member.hasPermission("KICK_MEMBERS") )
      return message.reply("Désolé, vous n'avez pas les permissions pour utiliser ceci!");
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("S'il vous plaît mentionner un membre valide de ce serveur");
    if(!member.kickable) 
      return message.reply("Je ne peux pas kick cet utilisateur ! A-t-il un rôle plus haut? Est-ce que j'ai les permissions requises?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison fournie";
    await member.send(`Tu as été kick du serveur à cause de ${reason}`)
    await member.kick(reason)
    
    await member.kick(reason)
      .catch(error => message.reply(`Désolé ${message.author} je n'ai pas pu kick à cause de : ${error}`));
    message.reply(`${member.user.tag} a été kick par ${message.author.tag} à cause de: ${reason}`);
  }
//commande pour bannir
  if(command === "ban") {
    if(!message.member.hasPermission("BAN_MEMBERS") )
      return message.reply("Désolé, vous n'avez pas la permission pour utiliser ceci !");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("S'il vous plaît mentionner un membre valide de ce serveur");
    if(!member.bannable) 
      return message.reply("Je ne peux pas ban cet utilisateur ! A-t-il un rôle plus haut? Est-ce que j'ai les permissions requises?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison fournie";
    await member.send(`Tu as été banni du serveur à cause de ${reason}`)
    await member.ban(reason)
      .catch(error => message.reply(`Désolé ${message.author} je n'ai pas pu kick à cause de : ${error}`));
      message.reply(`${member.user.tag} a été ban par ${message.author.tag} à cause de: ${reason}`);
  }
//commande pour purger les messages
  if(command === "purge") {

    const deleteCount = parseInt(args[0], 10);
    if(!message.member.hasPermission("MANAGE_MESSAGES") )
     return message.reply("Désolé, vous n'avez pas la permission pour utiliser ceci !");
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Choisis un numéro entre 2 et 100 pour choisir le nombre de message à supprimer !");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Je n'ai pas pu supprimer les messages à cause de: ${error}`));
   }

   if (command === "ouh") {
    message.delete().catch(O_o=>{});
    var VC = message.member.voiceChannel;
    if (!VC)
        return message.reply("Vous n'êtes pas dans un canal audio !")
VC.join()
    .then(connection => {
        const dispatcher = connection.playFile('C:/Users/JB/Desktop/nebubot/roblox.mp3');
        dispatcher.on("end", end => {VC.leave()});
    })
    .catch(console.error);
};

if (command === "shrek") {
  message.delete().catch(O_o=>{});
  var VC = message.member.voiceChannel;
  if (!VC)
      return message.reply("Vous n'êtes pas dans un canal audio !")
VC.join()
  .then(connection => {
      const dispatcher = connection.playFile('C:/Users/JB/Desktop/nebubot/shrek.mp3');
      dispatcher.on("end", end => {VC.leave()});
  })
  .catch(console.error);
   };

   try{
     if (command === 'write')
    message.channel.startTyping()
    
     if (command === 'stopwrite')
    message.channel.stopTyping()
  }catch(e){
    console.log(e)
  }
}
);

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
//dé
case "roll":
message.channel.send({embed: {
          color: embedRed,
          title: "🎲 Tu as eu... 🎲",
          description: Math.floor(Math.random() * 6) + 1,
          }});
          break;
//admin
case "admin":
message.reply("Bien essayé, mais non.");
break;         
//slap
case "slap":
let slappedUser = message.mentions.users.first();

if (message.mentions.users.size < 1) return message.reply("T'as oublié d'appeler une salope à gifler.");
message.reply("Vous venez de gifler " + slappedUser);
const attachment2 = new Attachment('https://thumbs.gfycat.com/YellowishEcstaticHoverfly-size_restricted.gif');
message.channel.send(attachment2); 
break;
//dm
case "dm":
let person = message.mentions.users.first();
let msg = message.content.split(" ").slice(2).join(" ");

if(message.mentions.users.size < 1) return message.reply("Utilisation: /dm @JOUEUR000 J'aime les poneys");
if(!msg) return message.reply("Utilisation: /dm @JOUEUR000 J'aime les poneys");

const customEmbed = new Discord.RichEmbed()
.setAuthor(`INCONNU`, 'https://vignette.wikia.nocookie.net/browmanwood/images/8/86/Point_d%27interrogation.png/revision/latest?cb=20130217173859&path-prefix=fr')
.addField(`__Quelqu'un vous a dit:__`, `${msg}\n ======================== \n *F.Y.I Tu n'as pas la possibilité de répondre à cet inconnu à travers ce tchat.* `)
.setColor(embedOrange);
person.send({
embed : customEmbed
});
message.author.send(`J'ai DM ${person}, ${msg}`);
message.channel.send("Suppression...")
setTimeout( () => {
message.channel.bulkDelete(2);
}, 1000);
break;

case "8ball":
if (args[1]) {
   message.channel.send({embed: {
       color: embedRed,
       title: `Hmmm...mon petit ${message.author.username}`,
       description: (fortunes[Math.floor(Math.random() * fortunes.length)]),
       }});
}
else {
   message.channel.send({embed: {
       color: embedRed,
       title: "Oops...",
       description: "L'utilisation de cette commande est: **/8ball [Question]**",
       }});
}
break;

case "info":
message.channel.send({embed: {
color: 0xf50107,
title: "Actuellement la dernière version de NebuBot est active.",
description: "(Version " + version + ")",
}});
break;

}})
