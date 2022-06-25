const botconfig = require("./botconfig.json");
const serversettings = require("./serversettings.json");

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
module.exports.client = bot;

bot.commands = new Discord.Collection();
module.exports.serversettings = serversettings;


fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);


  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0){
     console.log("Could not find commands!");
     return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded.`);
    bot.commands.set(props.help.name, props);
  });

});

module.exports.setupServer = async(id) => {
    // serversettings.servers.push(id);
    // var pos = serversettings.servers.indexOf(id);
    // serversettings.servers[pos].fortnite = false;
    console.log("\nGonna try to make server");
    // NEED TO MAKE: serversettings[id].fortnite = false;

    var server = {
            [id]: {
              "fortnite": false
            }
    };

    let stringed = JSON.stringify(server, null, 4);

    let preset = "";
    fs.readFile("./serversettings.json", "utf8", function(err, data) {
      if (err) return console.log(err);
    //  console.log(data);
      preset = data.slice(0);
      console.log(preset);
    });


      // console.log(string);
    fs.writeFile("./serversettings.json", stringed + "\n", (err) => {
      if (err){
        console.log(err);
          return;
      }
        console.log("Success!");
    });

      // console.log(stringed);

}

bot.on("ready", async () => {
    let servers = bot.guilds.array().length;
    console.log(`------------------------\n${bot.user.username} is online on ` + servers + ` server(s).\n------------------------`);
    bot.user.setActivity("Sat creepily", {type: "WATCHING"});
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  if (message.member.roles.find('name', 'Muted')){
    message.delete().catch(O_o=>{});
    message.author.sendMessage("You may not speak, as you have been muted.");

  }

  let prefix = botconfig.prefix;
  let msgArray = message.content.split(" ");
  let cmd = msgArray[0];
  let args = msgArray.slice(1);

  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  if (commandFile) commandFile.run(bot,message,args);
});

bot.login(botconfig.token);
