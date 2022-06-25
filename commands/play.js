const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const { getInfo } = require("ytdl-getinfo");

var servers = {};
module.exports.run = async(bot, message, args) => {

  function play(connection, message) {
     var server = servers[message.guild.id];
     module.exports.server = server;
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    if (!server.repeat) server.queue.shift();
    server.dispatcher.on("end", function() {
      if (server.repeat) {
        play(connection, message);
      }
      if (server.queue[0]) play(connection, message);
      else connection.disconnect;
    });
  }

  if (!args[0]){
    message.delete().catch(O_o=>{});
    return message.channel.send("Provide a link.");
  }


  if (!message.member.voiceChannel){
    message.delete().catch(O_o=>{});
    return message.channel.send("Enter a voice channel.");
  }

  if (!servers[message.guild.id]) servers[message.guild.id] = {
    queue: [],
    repeat: false
  };


  var server = servers[message.guild.id];
  server.queue.push(args[0]);
  message.delete().catch(O_o=>{});


  let name = '';

  getInfo(args[0]).then(info => {
    name = info.items[0].title;
  });

  let embed = new Discord.RichEmbed()
  .setDescription("Queue Add")
  .setColor("cc0000")
  .addField(name + " added to queue");

  message.channel.send(embed);

  if (!message.guild.voiceConnection){
    message.delete().catch(O_o=>{});
    message.member.voiceChannel.join().then(function(connection) {
      play(connection, message);
    });
  }



}

module.exports.help = {
  name: "play"
}
