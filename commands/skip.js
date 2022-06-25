const Discord = require("discord.js");
const playFile = require("./play.js");

module.exports.run = async(bot, message, args) => {

  if (playFile.server.dispatcher) playFile.server.dispatcher.end();
  return message.channel.send("Song skipped.");
}

module.exports.help = {
  name: "skip"
}
