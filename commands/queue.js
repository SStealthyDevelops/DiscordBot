const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const { getInfo } = require("ytdl-getinfo");
const playFile = require("./play.js");

module.exports.run = async(bot, message, args) => {



  let server = playFile.server;

  var arrayLength = server.queue.length;
  let songs = [''];

  console.log(`${arrayLength}`);
  for (var i = 0; i < arrayLength; i++) {
    getInfo(server.queue[i]).then(info => {
      songs = songs.push(info.items[0].title);
      console.log(info.items[0].title);
    });
  }

var songsLined = songs.join("\n");


  if (songsLined === " "){
    message.delete().catch(O_o=>{});
    return message.channel.send("There are no songs in the queue.");
  } else {
    message.delete().catch(O_o=>{});
    return message.channel.send(songsLined);
  }
}

module.exports.help = {
  name: "queue"
}
