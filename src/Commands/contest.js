const axios = require('axios');
const {EmbedBuilder} = require('discord.js');

const getUpcomingContests = async() => {

    const resp = await axios.get('https://codeforces.com/api/contest.list');
    const allContest = await resp.data.result;
    const embed = new EmbedBuilder()
                .setTitle('Upcoming Contests @Codeforces')
                .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                .setDescription(`Hi 👋\n Welcome to DaaS codeforces Bot!!!\n Below is a list of all upcoming codeforces contests.`)
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                .setFooter({ text: 'DaaS Codeforces Bot' });
    const upcomingContest = [];
    for(var idx=0; idx<allContest.length &&allContest[idx].phase==='BEFORE'; idx++) {
        const contest = allContest[idx];
        const datentime = new Date(contest.startTimeSeconds*1000).toLocaleString();
        upcomingContest.push(
            {name: contest.name + "\n" + datentime, value: `https://codeforces.com/contestRegistration/${contest.id}`}
        )
    }
    return new Promise((resolve, reject) => {
        for(var i=upcomingContest.length-1; i>=0; i--) embed.addFields(upcomingContest[i]);
        resolve({ embeds: [embed] })
    })
}

module.exports = {getUpcomingContests};