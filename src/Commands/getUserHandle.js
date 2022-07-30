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
            const user = await resp.data.result[0];
            const embed = new EmbedBuilder()
                        .setTitle("```" + `${handle}` + "```")
                        .setDescription("```" + `${user.rank||"NA"}            ${user.rating||"NA"}`+ "```")
                        .setColor(color[user.rank])
            resolve({ embeds: [embed] })
        } catch(e) {
            resolve("```" + "No User Found" + "```");
        }
    })
}

module.exports = {getUserHandle};