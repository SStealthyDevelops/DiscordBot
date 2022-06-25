const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let bIcon = bot.user.displayAvatarURL;

    let embed = new Discord.RichEmbed()
    .setDescription("Bot Info")
    .setColor("#f94343")
    .setThumbnail(bIcon)
    .addField("Bot Name", "RetroBot")
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(embed);
}

module.exports.help = {
  name: "botinfo"
}
