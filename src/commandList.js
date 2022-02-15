/*
 * File: commandList.js
 * Project: stickybot
 * Created Date: 15.02.2022 23:00:08
 * Author: 3urobeat
 * 
 * Last Modified: 15.02.2022 23:03:51
 * Modified By: 3urobeat
 * 
 * Copyright (c) 2022 3urobeat <https://github.com/HerrEurobeat>
 * 
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


const Discord = require("discord.js");


module.exports.commandList = [
    {
        name: "stickuser",
        description: "Stick a user to a voice channel",
        options: [
            {
                name: "user",
                description: "The user to stick to a channel",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            },
            {
                name: "channel",
                description: "The channel to stick the user to",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL
            }
        ]
    },
    {
        name: "stickchannel",
        description: "Prevents any user joining this channel from leaving",
        options: [
            {
                name: "channel",
                description: "The channel to stick everyone to that joins",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL
            }
        ]
    },
    {
        name: "unstickuser",
        description: "Unsticks a user from a channel",
        options: [
            {
                name: "user",
                description: "The user to unstick",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            }
        ]
    },
    {
        name: "unstickchannel",
        description: "Unsticks a channel",
        options: [
            {
                name: "channel",
                description: "The channel to unstick",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL
            }
        ]
    }
]