const axios = require('axios');
const {Message, resolveColor} = require('discord.js');

const {roles} = require('../static/roles.js');

/**
     * @param {Message} msg
     * @param {String} rank
 */

const assignRole = async(msg, rank) => {
    await msg.guild.roles.fetch()
    const promises=[];
    for(let r in roles) {
        let role = msg.guild.roles.cache.find(role => role.name === r);
        if(r === rank) promises.push( msg.member.roles.add(role));
        else promises.push( msg.member.roles.remove(role));
    }
    let role = msg.guild.roles.cache.find(role => role.name === 'authorized');
    promises.push(msg.member.roles.add(role));
    await Promise.all(promises);
    return `Updated to ${rank}`;
}

module.exports = {assignRole};