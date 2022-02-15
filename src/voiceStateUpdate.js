/*
 * File: voiceStateUpdate.js
 * Project: stickybot
 * Created Date: 15.02.2022 22:07:53
 * Author: 3urobeat
 * 
 * Last Modified: 15.02.2022 22:40:00
 * Modified By: 3urobeat
 * 
 * Copyright (c) 2022 3urobeat <https://github.com/HerrEurobeat>
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

    if (!newState.channelId) logger("debug", oldState.id + " gave up and left the voice channel.")

    //Don't bother if user just left
    if (newState.channelId && oldState.channelId != newState.channelId) {
        logger("debug", oldState.id + " switched channel to " + newState.channelId)
    }
}