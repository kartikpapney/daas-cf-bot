const {Message, EmbedBuilder, MessageFlags, GuildExplicitContentFilter} = require('discord.js');
const {getUpcomingContests, getContestStanding} = require('./contest.js');
const {getHelpMessage}= require('./help.js');
const {welcomeMessage} = require('./welcomeMessage.js');
const {getUserHandle} = require('./getUserHandle.js');
const {getRandomProblem} = require('./problems.js');
const {authorizeMe, amIAuthorized, getAuthorizedUsers, getCodeforcesHandle} = require('./authorization.js');

const PREFIX = process.env.PREFIX;
const WRONG_COMMAND_MSG = "```" + "Wrong Command\nSend $help to get list of all available commands"+ "```";

/**
 * @param {Message} msg
 */

async function getResult(msg) {
    var res = "";
    const [cmd, ...args] = msg.content.trim().substring(PREFIX.length).split(" ");
    if(cmd === 'help' || cmd === '') {
        res = "```" + (await getHelpMessage()) + "```";
    } else if(cmd === 'handle' && args[0] == 'set') {
        res = await authorizeMe(msg, msg.author.username, args[1]);
    } else if(!(await amIAuthorized(msg))) {
        res = "```"+"unauthorize"+"```";
    } else if (cmd === 'contest' && args.length == 1) {
        if(args[0] === 'upcoming') {
            res = await getUpcomingContests();
        } else if(!isNaN(parseInt(args[0])) && isFinite(args[0])) {
            res = await getContestStanding(args[0]);
        } else {
            res = WRONG_COMMAND_MSG;
        }
    } else if (cmd === 'handle') {
        if(args.length == 1) {
            let user;
            const mention = msg.mentions.members.first();
            if(mention) {
                user = await getCodeforcesHandle(mention.user.username);
            } else {
                user = args[0];
            }
            
            if(user === undefined) {
                res = "```" + "No Codeforces Handle Found" + "```";
            } else {
                res = await getUserHandle(user);
            }
        } else {
            res = WRONG_COMMAND_MSG;
        }
    } else if(cmd === 'random') {
        if(args.length == 1) {
            res = await getRandomProblem(args[0]);
        } else {
            res = WRONG_COMMAND_MSG;
        }
    } else {
        res = WRONG_COMMAND_MSG;
    }
    msg.reply(res);
}

module.exports = {getResult};