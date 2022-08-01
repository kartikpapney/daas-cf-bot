const axios = require('axios');
const {EmbedBuilder} = require('discord.js');


const color = {
    undefined: '#000000',
    "newbie": "#d3d3d3",
    "pupil": "#00FF00",
    "specialist": "#03a89e",
    "expert": "#0000ff",
    "candidate master": "#aa00aa",
    "master": "#ff8c00",
    "international master": "#ff8c00",
    "grandmaster": "#ff0000",
    "international grandmaster": "#ff0000",
    "legendary grandmaster": "#ff0000"
}

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
            resolve({ embeds: [embed] })
        } catch(e) {
            resolve("```" + "No User Found" + "```");
        }
    })
}

module.exports = {getUserHandle};