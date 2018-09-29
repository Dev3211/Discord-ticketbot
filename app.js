const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config.json')
const client = new Discord.Client()
const prefix = config.prefix
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        console.log(`${f} loaded!`);
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./commands/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on('message', message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(config.prefix.length)
    if (!message.content.startsWith(config.prefix)) return;

    try {
        let cmd = require(`./commands/${command}.js`)
        cmd.use(client, message, message.member, args, command)
    } catch (err) {

    }

})

client.login(config.token)

client.on('ready', () => {
    console.log('BOT STARTED')
})

client.on('ready', () => {
    client.user.setActivity("Ticket bot | 'help")
})