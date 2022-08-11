const axios = require('axios');
const {EmbedBuilder, Message, MessageE} = require('discord.js');
const NodeCache = require( "node-cache" );
const {getCodeforcesHandle, getAuthorizedUsers} = require("./authorization.js")
const cache = new NodeCache();

const getUpcomingContests = async() => {
    const embed = new EmbedBuilder()
                .setTitle('Upcoming Contests @Codeforces')
                .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                .setDescription(`Hi 👋\n Welcome to DaaS codeforces Bot!!!\n Below is a list of all upcoming codeforces contests.`)
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                .setFooter({ text: 'DaaS Codeforces Bot' });
    if(!cache.get("contests")) {
        const resp = await axios.get('https://codeforces.com/api/contest.list');
        const allContest = await resp.data.result;
        const upcomingContest = [];
        for(var idx=0; idx<allContest.length &&allContest[idx].phase==='BEFORE'; idx++) {
            const contest = allContest[idx];
            const datentime = new Date(contest.startTimeSeconds*1000).toLocaleString();
            upcomingContest.push(
                {name: contest.name + "\n" + datentime, value: `https://codeforces.com/contestRegistration/${contest.id}`}
            )
        }
        if(cache.set("contests", upcomingContest, process.env.CACHE_TIME)) {
            console.log("cached");
        } else {
            console.log("can't cache");
            return new Promise((resolve, reject) => {
                resolve("error");
            })
        }
    }
    const upcomingContest = cache.get("contests");
    return new Promise((resolve, reject) => {
        for(var i=upcomingContest.length-1; i>=0; i--) embed.addFields(upcomingContest[i]);
        resolve({ embeds: [embed] })
    })
}


const getContestStanding = async(contest) => {
    var response = ""
    const embed = new EmbedBuilder()
                .setTitle(`Contest ${contest} @Codeforces`)
                .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                .setDescription(`DaaS congratulate below users to be in top 5000 in contest ${contest}`)
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                .setFooter({ text: 'DaaS Codeforces Bot' });
    if(!cache.get(`contest${contest}`)) {
        try {
            const resp = await axios.get(`https://codeforces.com/api/contest.ratingChanges?contestId=${contest}&from=1&count=5000`);
            const result = await resp.data.result;
            if(!result) response = "```" + "No Data Found" + "```";
            else {
                const users = await getAuthorizedUsers();
                const standing = result
                        .filter((u) => users.includes(u.handle))
                        .map((u) => {
                            return {"handle": u.handle, "rank": u.rank}
                        });
                if(cache.set(`contest${contest}`, standing, process.env.CACHE_TIME)) {
                    console.log("cached");
                } else {
                    console.log("can't cache");
                    return new Promise((resolve, reject) => {
                        resolve("error");
                    })
                }
            }
        } catch(e) {
            return new Promise((resolve, reject) => {
                resolve("Invalid Contest");
            })
        }
    }
    const standing = cache.get(`contest${contest}`)
    standing.forEach((user) => embed.addFields(
        {"name": user.handle, "value": user.rank+""})
    )
    response = { embeds: [embed] } 
    return new Promise((resolve, reject) => {
        resolve(response)
    })
}
module.exports = {getUpcomingContests, getContestStanding};