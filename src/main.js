require('dotenv').config();
const { Client, GatewayIntentBits, MessageFlags } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages] });


client.on('messageCreate', (message) => {
    if(message.author.bot) return;
    console.log(message.content);
    if(message.content === 'Hi') message.channel.send('Hi');
})

client.login(process.env.DISCORD_JS_BOT_TOKEN).then(() => {
    console.log(`${client.user.tag}`)
});