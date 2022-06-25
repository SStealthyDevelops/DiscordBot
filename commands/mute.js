const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")){
    message.delete().catch(O_o=>{});
    return message.channel.send(`You cannot do this, ${message.author}`);
  }

  let muted = message.guild.member(message.mentions.users.first());
  if (!muted) return message.channel.send("Cannot find user.");

  if (message.author.id === muted.id){
    message.delete().catch(O_o=>{});
    return message.channel.send("Why mute yourself?");
  }

  if (muted.id === bot.user.id){
    message.delete().catch(O_o=>{});
    return message.channel.send("Hah! Im overpowered if you were wondering..\nYou cannot mute me, all you can do is kick me *manually*.");
  }

  if (muted.hasPermission("MANAGE_MESSAGES")){
    message.delete().catch(O_o=>{});
    return message.channel.send(`You cannot do this to ${muted}, ${message.author}`);
  }


  let reason = args.join(" ").slice(22);
  if (reason === ""){
    message.delete().catch(O_o=>{});
    return message.channel.send("Specify a reason for the mute.");
  }

  let embed = new Discord.RichEmbed()
  .setDescription("**Mute Report**")
  .setColor("#e742ed")
  .addField("Muted User", `${muted} with ID ${muted.id}`)
  .addField("Muted By", `${message.author} with ID ${message.author.id}`)
  .addField("Reason", reason);

  let mutedRole = message.guild.roles.find("name",  "Muted");

  if (!mutedRole){
    message.delete().catch(O_o=>{});
    message.guild.createRole({
        name: 'Muted',
        color: 'GRAY',
    })
      .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
      .catch(console.error)

  }

  let channel = message.guild.channels.find(`name`, "incidents");
  if (!channel) return message.channel.send("Cannot find \"incidents\" channel. Contact server admins.");


  message.delete().catch(O_o=>{});
  message.guild.member(muted).addRole(mutedRole);
  return channel.send(embed);
}

module.exports.help = {
  name: "mute"
}
