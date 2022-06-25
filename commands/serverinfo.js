const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let sicon = message.guild.iconURL;

    let embed = new Discord.RichEmbed()
    .setDescription("Info about: " + message.guild.name)
    .setColor("#64d847")
    .setThumbnail(sicon)
    .addField("Created On", message.guild.createdAt)
    .addField("You joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(embed);
}

module.exports.help = {
  name: "serverinfo"
}
