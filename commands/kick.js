const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

   if (!message.member.hasPermission("KICK_MEMBERS")){
     message.delete().catch(O_o=>{});
     return message.channel.send(`You cannot do this, ${message.author}`);
   }

   let kicked = message.guild.member(message.mentions.users.first());
   if (!kicked) return message.channel.send("Cannot find user.");

   if (message.author.id === kicked.id){
     message.delete().catch(O_o=>{});
     return message.channel.send("Why kick yourself?");
   }

   if (kicked.id === bot.user.id){
     message.delete().catch(O_o=>{});
     return message.channel.send("Hah! Im overpowered if you were wondering..\nIf you wish to kick me, right click on me.");
   }

   if (kicked.hasPermission("MANAGE_MESSAGES")){
     message.delete().catch(O_o=>{});
     return message.channel.send(`You cannot do this to ${kicked}, ${message.author}`);
   }


   let reason = args.join(" ").slice(22);
   if (reason === ""){
     message.delete().catch(O_o=>{});
     return message.channel.send("Specify a reason for the kick.");
   }

   let embed = new Discord.RichEmbed()
   .setDescription("**Kick Report**")
   .setColor("#e742ed")
   .addField("Kicked User", `${kicked} with ID ${kicked.id}`)
   .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
   .addField("Reason", reason);

   let channel = message.guild.channels.find(`name`, "incidents");
   if (!channel) return message.channel.send("Cannot find \"incidents\" channel. Contact server admins.");

   message.guild.member(kicked).kick(reason);
   return channel.send(embed);

}

module.exports.help = {
  name: "kick"
}
