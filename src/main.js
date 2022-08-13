require('dotenv').config();
const { Client, GatewayIntentBits, Partials, MessageFlags } = require('discord.js');
const {getResult} = require("./Commands/commands");
const config = require('../src/Database/daas-cp-integration-899ef3cfa804.js')
const fs = require('fs')
const client = new Client(
    {
        intents: [
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
        partials: [Partials.Channel],
    }
);

const PREFIX=process.env.PREFIX;
const CONFIG_FILE_PATH = __dirname + "/Database/daas-cp-integration-899ef3cfa804.json"
fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config), function writeJSON(err) {
    if (err)
        return console.log(err);
    console.log("database config created");
    client.once('ready', () => {
        console.log('Ready!');
    });

    client.on('messageCreate', async(msg) => {
        if(!msg.author.bot && msg.content.startsWith(PREFIX)) {
            try {
                await getResult(msg);
            } catch(e) {
                msg.reply("Server Error");
            }
        }
    });

    client.login(process.env.DISCORD_JS_BOT_TOKEN);

});



