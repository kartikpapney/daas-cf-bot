require('dotenv').config();

const { Client, GatewayIntentBits, Partials } = require('discord.js');
const {getResult} = require("./Commands/commands");
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

const PREFIX = '$';

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', msg => {
    if(msg.author.bot) return;
    if(msg.content.startsWith(PREFIX)) {
        const CMD = msg.content.trim().substring(PREFIX.length).split(" ");
        msg.reply(getResult(CMD));
    }
});

client.login(process.env.DISCORD_JS_BOT_TOKEN);

