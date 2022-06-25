const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  if (!message.member.hasPermission("BAN_MEMBERS")){
    message.delete().catch(O_o=>{});
    return message.channel.send(`You cannot do this, ${message.author}`);
  }

  let banned = message.guild.member(message.mentions.users.first());
  if (!banned) return message.channel.send("Cannot find user.");

  if (message.author.id === banned.id){
    message.delete().catch(O_o=>{});
    return message.channel.send("Why ban yourself?");
  }

  if (banned.id === bot.user.id){
    message.delete().catch(O_o=>{});
    return message.channel.send("Hah! Im overpowered if you were wondering..\nIf you wish to ban me, right click on me.");
  }

  if (banned.hasPermission("MANAGE_MESSAGES")){
    message.delete().catch(O_o=>{});
    return message.channel.send(`You cannot do this to ${banned}, ${message.author}`);
  }


  let reason = (args.join(" ").slice(22));

  if (reason === ""){
    message.delete().catch(O_o=>{});
    return message.channel.send("Specify a reason for the banishment.");
  }

  let embed = new Discord.RichEmbed()
  .setDescription("**Ban Report**")
  .setColor("#e742ed")
  .addField("Banned User", `${banned} with ID ${banned.id}`)
  .addField("Banned By", `${message.author} with ID ${message.author.id}`)
  .addField("Reason", reason);

  let channel = message.guild.channels.find(`name`, "incidents");
  if (!channel) return message.channel.send("Cannot find \"incidents\" channel. Contact server admins.");

  // message.guild.member.ban(7, reason);

  message.guild.member(banned).ban(reason);

  return channel.send(embed);
}

module.exports.help = {
  name: "ban"
}
