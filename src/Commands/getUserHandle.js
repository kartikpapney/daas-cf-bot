const axios = require('axios');
const {EmbedBuilder} = require('discord.js');

const {color} = require('../static/roles.js');

const getUserHandle = async(handle) => {
    return new Promise(async(resolve, reject) => {
        try {
            const resp = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
            const rresp = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`)
            const user = await resp.data.result[0];
            const urating = await rresp.data.result;
            const rankspace = 38-(user.rank||"").length
            var res = "";
            for(var count=0, i=urating.length-1; i>=0 && count < 5; count++, i--) {
                const contest = urating[i];
                const id = "Contest " + contest.contestId;
                const len = 35 - id.length;
                res += `\n${id}  ${"\xa0".repeat(len)} ${contest.newRating - contest.oldRating}`;
            }
            const embed = new EmbedBuilder()
                        .setTitle("```" + `${handle}\n${user.rank||"NA"} ${"\xa0".repeat(rankspace)} ${user.rating||"NA"}` + "```")
                        .setDescription("```" + res + "```")
                        .setColor(color[user.rank])
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                        .setFooter({ text: 'DaaS Codeforces Bot' });
            resolve({ embeds: [embed] })
        } catch(e) {
            resolve("```" + "No User Found" + "```");
        }
    })
}

module.exports = {getUserHandle};