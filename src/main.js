require('dotenv').config();
const { Client, GatewayIntentBits, Partials, MessageFlags } = require('discord.js');
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

const PREFIX=process.env.PREFIX;


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

