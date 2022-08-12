const axios = require('axios');
const DatastoreClient = require('../Database/database.js');
const {EmbedBuilder, Message} = require('discord.js');
const NodeCache = require( "node-cache" );
const {assignRole} = require('./roleassign.js')

/**
 * 
 * @param {Message} msg 
 */

const setUserHandle = async(msg, discordHandle, codeforcesHandle) => {
    const embed = new EmbedBuilder()
        .setTitle('Congratulations!!')
        .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
        .setFooter({ text: 'DaaS Codeforces Bot' });
    const user = async() => {
        await DatastoreClient.save("User", discordHandle, {handle: codeforcesHandle.handle, rating: codeforcesHandle.rating, rank: codeforcesHandle.rank});
        const res = await DatastoreClient.get("User", discordHandle);
        const reply = await assignRole(msg, res.rank);
        embed.setDescription(reply);
    }
    const result = await user();
    return new Promise((resolve, reject) => {
        resolve({ embeds: [embed] })
    })  
}


const getCodeforcesHandle = async(user) => {
    const resp = await DatastoreClient.get("User", user);
    if(resp == null) return undefined;
    return resp.handle;
}
const amIAuthorized = async(msg) => {
    let role = msg.guild.roles.cache.find(role => role.name === 'authorized');
    const result = msg.member.roles.cache.has(role.id);
    return result;
}

const getAuthorizedUsers = async() => {
    const resp = await DatastoreClient.getAll("User");
    return resp;
} 

/**
 * 
 * @param {Message} msg 
 */
const authorizeMe = async(msg, discordHandle, codeforcesHandle) => {
    const TIME_DURATION = parseInt(process.env.PROBLEM_SUBMISSION_TIME);
    const problem = `https://codeforces.com/problemset/problem/${process.env.PROBLEM_CONTEST_ID}/${process.env.PROBLEM_CONTEST_IDX}`
    const embed = new EmbedBuilder()
        .setTitle('Authorization!!')
        .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
        .setDescription(`Submit a compilation error at ${problem} in 60s`)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
        .setFooter({ text: 'DaaS Codeforces Bot' });
    const timestamp = Math.floor((new Date())/1000);
    msg.reply({ embeds: [embed] });
    return new Promise((resolve, reject) => {
        setTimeout(async() => {
            try {
                const resp = await axios.get(`https://codeforces.com/api/user.status?handle=${codeforcesHandle}&from=1&count=1`);
                const sbmn = await resp.data.result;
                if(sbmn === null || sbmn.length == 0) {
                    msg.reply("Authentication Failed");
                } else if(
                    !(timestamp <= sbmn[0].creationTimeSeconds && timestamp + TIME_DURATION >= sbmn[0].creationTimeSeconds)
                    || sbmn[0].problem.contestId != process.env.PROBLEM_CONTEST_ID
                    || sbmn[0].problem.index != process.env.PROBLEM_CONTEST_IDX
                    || sbmn[0].verdict != process.env.PROBLEM_CONTEST_VERDICT)  {
                        msg.reply("Authentication Failed");
                    } else {
                        try {
                            const resp = await axios.get(`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`);
                            const user = await resp.data.result[0];
                            const userDetails = {
                                handle: user.handle,
                                rating: user.rating||0,
                                rank: user.rank||"unparticipated"
                            }
                            const res = await setUserHandle(msg, discordHandle, userDetails);
                            resolve(res);
                        } catch (e) {
                            resolve(`No User Exist ${codeforcesHandle}`);
                        }
                    }
                } catch (e) {
                    resolve(`No User Exist ${codeforcesHandle}`);
                }
            }, TIME_DURATION);
        });
}

module.exports = {setUserHandle, authorizeMe, amIAuthorized, getAuthorizedUsers, getCodeforcesHandle};