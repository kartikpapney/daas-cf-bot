require('dotenv').config();
const DatastoreClient = require('./Database/database.js');
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
    if(msg.author.bot) return;
    if(msg.content.startsWith(PREFIX)) {
        await getResult(msg);
    }
});

// const findd = async() => {
//     await DatastoreClient.save("Task", "pk1", {fname: "task1", description: "task1 description"});
//     const res = await DatastoreClient.get("Task", "pk1");
//     return res;
// }
// findd().then((res) => console.log(res));
// client.login(process.env.DISCORD_JS_BOT_TOKEN);

