const {Message, EmbedBuilder} = require('discord.js');


/**
 * @param {String} command
 */

const getString = function(command, value) {
    
    var res = command;
    res += " ".repeat(15-command.length);
    res += value;
    return res;
}


const getHelpMessage = async() => {
    // getString("help", "Get all the commands");
    const res =
`$help                List of all commands
$handle set xyz      set codeforces handle
$handle xyz          get information about xyz
$contest upcoming    upcoming contests
$contest x           standings of contest x
$random x            random problem 'x' rated
`
    return res;
}

module.exports = {getHelpMessage}