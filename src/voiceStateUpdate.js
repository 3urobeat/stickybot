/*
 * File: voiceStateUpdate.js
 * Project: stickybot
 * Created Date: 15.02.2022 22:07:53
 * Author: 3urobeat
 * 
 * Last Modified: 30.06.2023 10:03:06
 * Modified By: 3urobeat
 * 
 * Copyright (c) 2022 3urobeat <https://github.com/3urobeat>
 * 
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


const Discord = require("discord.js");

/**
 * Handles voice channel changes and moves a user back if desired
 * @param {Discord.Client} bot The Discord client class
 * @param {Function} logger The logger function
 * @param {Discord.VoiceState} oldState The past
 * @param {Discord.VoiceState} newState The present
 */
module.exports.run = (bot, logger, oldState, newState) => {
    if (!oldState || !newState) return; //Make sure one of the two states can't be undefined/null

    //if (!newState.channelId) logger("debug", oldState.id + " gave up and left the voice channel.")

    //Don't bother if user just left
    if (newState.channelId && oldState.channelId != newState.channelId) {
        //logger("debug", oldState.id + " switched channel to " + newState.channelId);

        bot.dbs.stickyusers.findOne({ $and: [{ userid: newState.member.id, guildid: newState.guild.id }] }, (err, doc) => {
            if (err) logger("err", "Error searching for user in stickyusers db! Error: " + err);

            //Check if user needs to be moved if he/she is in db, otherwise check if channel is a honeypot (sticky channel) and add user to stickyusers db
            if (doc) {
                if (newState.channelId != doc.channelid) {
                    logger("info", `Moving ${newState.member.id} back into ${doc.channelid}`)
                    newState.member.voice.setChannel(newState.guild.channels.cache.get(doc.channelid), "User is stuck"); //move user where he/she belongs
                }
            } else {
                //Add entry to stickyusers db if channel is in stickychannels db
                bot.dbs.stickychannels.findOne({ $and: [{ channelid: newState.channelId }, { guildid: newState.guild.id }] }, (err, doc) => {
                    if (err) logger("err", "Error searching for channel in stickychannels db! Error: " + err);
                    if (!doc) return;

                    bot.dbs.stickyusers.update({ $and: [{ userid: newState.member.id }, { channelid: newState.channelId }] }, { $set: { userid: newState.member.id, channelid: newState.channelId, guildid: newState.guild.id } }, { upsert: true }, (err) => {
                        if (err) logger("error", "Error updating stickyusers database! Error: " + err);
                    
                        logger("info", `${newState.member.id} joined stickychannel (honeypot) ${newState.channelId} and is now stuck to it!`)
                    })
                })

            }
        })
    }
}