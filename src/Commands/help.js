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
    `  
    $help                     get List of all available commands
    $handle set xyz           set your codeforces handle to xyz
    $handle get xyz           get information about handle xyz
    $contest upcoming         list of upcoming codeforces contests
    $contest x                get standings of discord user in contest x
    $random x                 get a random problem rated x
    `
    return res;
}

module.exports = {getHelpMessage}