const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  let fortunes = ["Probably", "I don't think so", "Maybe?", "Not sure..", "Not in the near future, I'd say.", "No.", "Yep.", "I cannot answer this right now."];
  var fort = fortunes[Math.floor(Math.random() * fortunes.length)];

  if (args.length <= 2) return message.channel.send("What are you asking?!"); 

  return message.channel.send(fort + "");
}

module.exports.help = {
  name: "8ball"
}
