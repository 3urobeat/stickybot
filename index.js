const Discord = require("discord.js");
const os = require("os");
const superagent = require("superagent");
var fs = require("fs");
const token = require('./token.json')

const PREFIX = "sb_";

const BOTNAME = "stickybot";
const BOTVERSION = "1.0";
const GAME = "sticky testing...";
const STATUS = "dnd";
const BOTOWNER = "3urobeat#0975";
const OWNERID = "231827708198256642";
const BOTID = "265162449441783808";

const LOGINFO = "[INFO] ";
const LOGWARN = "[WARN] ";

var bot = new Discord.Client();
var servers = {};

bot.on("ready", async function() {
    //Bot startup
    console.log(" ")
    console.log("*---------------------*")
    console.log("Starting " + BOTNAME + " " + BOTVERSION + " by " + BOTOWNER)

    if (os.platform == "linux") console.log("Running on Linux...") 
    if (os.platform == "win32") console.log("Running on Windows...")
    var d = new Date();
    console.log("Time: " + d)

    console.log("Playing status set to: " + GAME)
    await console.info("The Bot is now ready.");
    await console.log("*---------------------*")
    await console.log(" ")
});


bot.on("message", async function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
    var args = message.content.substring(PREFIX.length).split(/\s+/);
    switch(args[0].toLowerCase()) {

//HELP & TEST COMMANDS:
    case "help":
        const help = fs.readFileSync("help.txt", {"encoding": "utf-8"});
        message.channel.send("Here is a list of all commands: :1234:\n\n" + help)
        break;
    case "ping":
        var embed = new Discord.RichEmbed()
            .addField("Pong!", ":heartbeat: " + bot.ping + "ms")
            .setColor(0x32CD32)
        message.channel.send(embed);
        console.info(LOGINFO + "Bot ping: " + bot.ping + "ms");
        break;
    case "stick":
        break;
    case "unstick":
        break;

//WRONG COMMAND
    default:
        if(message.content.includes(PREFIX + "*")) return;            
        if(message.content.endsWith(PREFIX)) return;
        message.channel.send("Invalid command!");        
    }
});

bot.login(token.token)