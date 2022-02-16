/*
 * File: commands.js
 * Project: stickybot
 * Created Date: 15.02.2022 22:41:55
 * Author: 3urobeat
 * 
 * Last Modified: 16.02.2022 16:17:47
 * Modified By: 3urobeat
 * 
 * Copyright (c) 2022 3urobeat <https://github.com/HerrEurobeat>
 * 
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


const Discord         = require("discord.js");
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

    //Get userid and channelid from options with a stupid loop
    var userid = null;
    var channelid = null;

    interaction.options.data.forEach((e) => {
        if (e.name == "user") userid = e.value;
        if (e.name == "channel") channelid = e.value;
    })

    if (channelid && interaction.guild.channels.cache.get(channelid).type != "GUILD_VOICE") return interaction.reply(`Channel ${channelid} is not a voice channel!`); //make sure this is even a vc
    if (userid == bot.user.id) return interaction.reply("I can't sticky myself!");
    if (!interaction.memberPermissions.has(Discord.Permissions.FLAGS.MOVE_MEMBERS)) return interaction.reply("You need to have the 'Move Members' permission in order to use this command!"); //only allow members with MOVE_MEMBERS permission to use commands

    //Run code for requested command
    switch (interaction.commandName) {
        case "stickuser":
            bot.dbs.stickyusers.update({ $and: [{ userid: userid }, { channelid: channelid }] }, { $set: { userid: userid, channelid: channelid } }, { upsert: true }, (err) => {
                if (err) logger("error", "Error updating stickyusers database! Error: " + err);
            
                interaction.reply(`User ${userid} is now stuck in ${channelid}.`);
            })
            break;
        case "stickchannel":
            bot.dbs.stickychannels.update({ channelid: channelid }, { $set: { channelid: channelid } }, { upsert: true }, (err) => {
                if (err) logger("error", "Error updating stickychannels database! Error: " + err);
            
                interaction.reply(`Everyone joining ${channelid} will now be stuck to it.`);
            })
            break;
        case "unstickuser":
            bot.dbs.stickyusers.remove({ userid: userid }, {}, (err) => {
                if (err) logger("error", "Error updating stickyusers database! Error: " + err);
            
                interaction.reply(`Unstuck user ${userid}.`);
            })
            break;
        case "unstickchannel":
            bot.dbs.stickychannels.remove({ channelid: channelid }, {}, (err) => {
                if (err) logger("error", "Error updating stickychannels database! Error: " + err);
            
                interaction.reply(`Channel ${channelid} is not sticky anymore.`);
            })
            break;
        default:
            logger("warn", "Invalid commandName in interactionCreate recieved! Recieved name: " + interaction.commandName); //This can't happen. For real. Trust me.
    }

}