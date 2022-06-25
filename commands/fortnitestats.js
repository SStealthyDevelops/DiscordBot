const Discord = require("discord.js");
const index = require("../index.js");
const botconfig = require("../botconfig.json");
const api_keys = require("../api_keys.json");
const key = api_keys.fortnite;

const serversettings = index.serversettings;

const Fortnite = require("fortnite");
const ft = new Fortnite(key);


module.exports.run = async(bot, message, args) => {


  // var pos = serversettings.servers.indexOf(message.guild.id);
  //
  // if (!pos){
  //   index.setupServer(message.guild.id);
  //   console.log("!pos");
  //   return message.channel.send(`You must enable Fortnite Stats-tracking. \nUsage: ${botconfig.prefix}settings fortnite {true/false}`);
  // }
  //
  // let guild = serversettings.servers[pos];
  //
  // if (!guild.fortnite){
  //   return message.channel.send("You have fortnite tracking disabled. ");
  // }


  let gID = message.guild.id;
  if (!serversettings[gID]){
    index.setupServer(gID);
    return console.log("Could not find server");
  }

  if (!serversettings[gID].fortnite){
    return console.log("Fortnite off");
  }


  let username = args[0];
  let platform = args[1] || "pc";

  let data = ft.getInfo(username, platform).then(data => {

    let stats = data.lifetimeStats;

    console.log(data.username);

    let kills = stats.find(s => s.stat == 'kills');
    let wins = stats.find(s => s.stat == 'wins');
    let kd = stats.find(s => s.stat == 'kd');
    let mPlayed = stats.find(s => s.stat == 'matchesPlayed');
    // let tPlayed = stats.find(s => s.stat == 'timePlayed');
    let asTime = stats.find(s => s.stat == 'avgSurvivalTime');

    let embed = new Discord.RichEmbed()
    .setTitle("Fortnite Stats")
    .setAuthor(data.username)
    .setColor("#ff6a00")
    .addField("Kills", kills.value, true)
    .addField("Wins", wins.value, true)
    .addField("K/D Ratio", kd.value, true)
    .addField("Matched Played", mPlayed.value, true);
    //.addField("Time Played", tPlayed.value, true)
    //.addField("Avg. Survival Time", asTime.value, true);

    message.channel.send(embed);
  }).catch(e => {
    console.log(e);
    message.channel.send("Could not find that user. ");
  });



}



module.exports.help = {
  name: "fortnitestats"
}
