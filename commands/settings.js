const Discord = require("discord.js");
const index = require("../index.js");
const botconfig = require("../botconfig.json");
const serversettings = require("../serversettings.json");

module.exports.run = async(bot, message, args) => {
  // console.log("Settings");

  if (args.length < 2){
    message.delete().catch();
    return message.channel.send(`Usage: ${botconfig.prefix}settings {fortnite} {true | false}`);
  }


  // TODO: ADD OTHER SETTINGS
  if (args[0] != "fortnite"){
    message.delete().catch();
    return message.channel.send(`Usage: ${botconfig.prefix}settings {fortnite} {true | false}`);
  }

  if (args[1] != "true" && args[1] != "false"){
    message.delete().catch();
    return message.channel.send(`Usage: ${botconfig.prefix}settings {fortnite} {true | false}`);
  }

  let gID = message.guild.id;
  

}

module.exports.help = {
  name: "settings"
}
