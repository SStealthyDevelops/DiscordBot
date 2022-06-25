const Discord = require("discord.js");
const playFile = require("./play.js");

module.exports.run = async(bot, message, args) => {

    playFile.server.repeat = !playFile.server.repeat;
    return message.channel.send("Repeat has been set to " + playFile.server.repeat);
}

module.exports.help = {
  name: "repeat"
}
