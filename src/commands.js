/*
 * File: commands.js
 * Project: stickybot
 * Created Date: 15.02.2022 22:41:55
 * Author: 3urobeat
 * 
 * Last Modified: 15.02.2022 23:10:18
 * Modified By: 3urobeat
 * 
 * Copyright (c) 2022 3urobeat <https://github.com/HerrEurobeat>
 * 
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


const Discord = require("discord.js");
const { commandList } = require("./commandList.js");


/**
 * Registers slash commands
 * @param {Discord.Client} bot The Discord client class
 */
module.exports.registerSlashCommands = (bot) => {
    commandList.forEach((e) => {
        //bot.application.commands.create(e);                            //Release
        bot.guilds.cache.get("232550371191554051").commands.create(e);   //Testing
    })
}


/**
 * Handles interactions the bot recieved
 * @param {Discord.Client} bot The Discord client class
 * @param {Function} logger The logger function
 * @param {Discord.Interaction} interaction The recieved interaction
 */
module.exports.interactionCreate = (bot, logger, interaction) => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case "stickuser":
            break;
        case "stickchannel":
            break;
        case "unstickuser":
            break;
        case "unstickchannel":
            break;
        default:
            logger("warn", "Invalid commandName in interactionCreate recieved! Recieved name: " + interaction.commandName); //This can't happen. For real. Trust me.
    }

}