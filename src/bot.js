/*
 * File: bot.js
 * Project: stickybot
 * Created Date: 15.02.2022 22:07:11
 * Author: 3urobeat
 * 
 * Last Modified: 15.02.2022 23:21:26
 * Modified By: 3urobeat
 * 
 * Copyright (c) 2022 3urobeat <https://github.com/HerrEurobeat>
 * 
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


//Invite link: https://discord.com/api/oauth2/authorize?client_id=943255143615459338&permissions=16777216&scope=applications.commands%20bot

const Discord = require("discord.js");
const logger  = require("output-logger");
const nedb    = require("@yetzt/nedb");

var config = require("../config.json");
var commandsFile = require("./commands.js");

const version = "1.0";


/**
 * Starts the bot
 */
module.exports.run = () => {

    //Configure my logging library (https://github.com/HerrEurobeat/output-logger#options-1)
    logger.options({
        msgstructure: `[${logger.Const.ANIMATION}] [${logger.Const.DATE} | ${logger.Const.TYPE}] ${logger.Const.MESSAGE}`,
        paramstructure: [logger.Const.TYPE, logger.Const.MESSAGE, "nodate", "remove", logger.Const.ANIMATION],
        outputfile: "./output.txt",
        animationdelay: 250
    })

    const bot = new Discord.Client({
        intents: [
            Discord.Intents.FLAGS.GUILD_VOICE_STATES
        ]
    });


    //Attach ready event
    bot.on("ready", () =>{
        logger("", "", true);
        logger("", "*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*", true);
        logger("", `> stickybot v${version} by 3urobeat logged in!`, true);
        logger("", "*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*", true);
        logger("", "", true);

        //Let the bot appear online
        bot.user.setPresence({ activities: [{ name: "Making people stick", type: "PLAYING" }], status: "online" });

        //Register out slash commands
        commandsFile.registerSlashCommands(bot);

        //Load the two databases
        const stickychannels = new nedb("./data/stickychannels.db");
        const stickyusers    = new nedb("./data/stickyusers.db");

        stickychannels.loadDatabase((err) => {
            if (err) return logger("error", "Error loading stickychannels database. Error: " + err)
            logger("info", "Successfully loaded stickychannels database.") //load db content into memory
        })

        stickyusers.loadDatabase((err) => {
            if (err) return logger("error", "Error loading stickyusers database. Error: " + err)
            logger("info", "Successfully loaded stickyusers database.") //load db content into memory
        })

        bot.dbs = { //add both dbs to bot object to make them easier accessible
            stickychannels,
            stickyusers
        }
    });


    //Register the voiceStateUpdate event which makes detecting voice channel changes possible
    bot.on("voiceStateUpdate", (oldState, newState) => {
        require("./voiceStateUpdate.js").run(bot, logger, oldState, newState);
    });


    //Listen for interactions and let the interactionCreate function handle them
    bot.on("interactionCreate", (interaction) => {
        require("./commands.js").interactionCreate(bot, logger, interaction);
    })


    //Login
    logger("", "", true);
    logger("info", "Logging in...")
    bot.login(config.token);
}
