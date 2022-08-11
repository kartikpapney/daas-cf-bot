const axios = require('axios');
const {EmbedBuilder} = require('discord.js');

const welcomeMessage = async() => {
    const embed = new EmbedBuilder()
                .setTitle('Hi 👋')
                .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                .setDescription(`Welcome to DaaS codeforces Bot!!!\n Kindly register yourself with your codeforces handle`)
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                .setFooter({ text: 'Send $help to get list of all commands' });
    return new Promise((resolve, reject) => {
        resolve({ embeds: [embed] })
    })
}

module.exports = {welcomeMessage};