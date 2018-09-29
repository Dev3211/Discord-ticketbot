const Config = require('../config.json')

exports.use = async (client, message, nothing, args, command) => {
    const Discord = require('discord.js')
    if (!args[0] || args[0] === '1') {
        let banEmbed = new Discord.RichEmbed()
            .setColor(Config.ticketcolor)
            .addField("Ticket Commands", `!new (subject)\n!support (subject)`)
        message.channel.send(banEmbed);
        return;
    };
}

