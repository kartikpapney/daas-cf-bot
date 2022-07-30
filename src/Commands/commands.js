const {Message, EmbedBuilder, MessageFlags} = require('discord.js');
const {getUpcomingContests} = require('./contest.js');
const {getHelpMessage}= require('./help.js');
const {welcomeMessage} = require('./welcomeMessage.js');
const {getUserHandle} = require('./getUserHandle.js');
const {getRandomProblem} = require('./problems.js');

const PREFIX = process.env.PREFIX;

const db = [
    'abccc123',
    'abccc125'
]
const data = [
    {
        "name": "abccc123",
        "handle": "kartikpapney",
        "rating": "1406",
        "rank": "specialist"
    },
    {
        "name": "abccc125",
        "handle": "kunalsahu",
        "rating": "1699",
        "rank": "expert"
    }
]
async function getResult(msg) {

    /**
     * @param {Message} msg
     */

    const [cmd, ...args] = msg.content.trim().substring(PREFIX.length).split(" ");
    const check = db.includes(msg.author.username);

    if(cmd === 'help' || cmd === '') {
        const help = await getHelpMessage();
        msg.channel.send("```"+help+"```");
    }else if (!check) {
        const wcomeMsg = await welcomeMessage();
        msg.channel.send("```" + wcomeMsg + "```");
    } else if (cmd === 'contest' && args.length == 1) {
        if(args[0] === 'upcoming') {
            const res = await getUpcomingContests();
            msg.channel.send(res);
        } else {
            msg.reply("```" + "Wrong Command\nSend $help to get list of all available commands"+ "```");
        }
    } else if (cmd === 'handle') {
        if(args.length == 2) {
            if(args[0] == 'get') {
                const res = await getUserHandle(args[1]);
                msg.reply(res);
            } else if(args[0] == 'set') {
                
            } else {
                msg.reply("```" + "Wrong Command\nSend $help to get list of all available commands"+ "```");
            }
        } else {

        }
    } else if(cmd === 'random') {
        if(args.length == 1) {
            const res = await getRandomProblem(args[0]);
            msg.reply(res);
        }
    } else {
        msg.reply("```" + "Wrong Command\nSend $help to get list of all available commands"+ "```");
    }
}

module.exports = {getResult};