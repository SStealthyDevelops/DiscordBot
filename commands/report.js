const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let reported = message.guild.member(message.mentions.users.first());
    if (!reported){
      message.delete().catch(O_o=>{});
      return message.channel.send("Could not find user. Make sure to \"@\" them!");
    }

    let reason = args.join(" ").slice(22);

    if (message.author.id === reported.id){
      message.delete().catch(O_o=>{});
      return message.channel.send("Why report yourself?");
    }

    if (reported.id === bot.user.id){
      message.delete().catch(O_o=>{});
      return message.channel.send("Hah! Im overpowered if you were wondering..");
    }

    if (reason === ""){
      message.delete().catch(O_o=>{});
      return message.channel.send("Specify reasons for the report.");
    }



    let embed = new Discord.RichEmbed()
      .setDescription("Report")
      .setColor("#007bff")
      .addField("Reported User", `${reported} with ID: ${reported.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Timestamp", `${message.createdAt}`)
      .addField("Reason of Report", reason);

      let repChannel = message.guild.channels.find(`name`, "reports");
      if (!repChannel) return message.channel.send("Cannot find \"reports\" channel. Contact server admins.");

      message.delete().catch(O_o=>{});

      return repChannel.send(embed);

}

module.exports.help = {
  name: "report"
}
