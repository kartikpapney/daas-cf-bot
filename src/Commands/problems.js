const axios = require('axios');
const {EmbedBuilder} = require('discord.js');
const NodeCache = require( "node-cache" );
const cache = new NodeCache();


const getRandomProblem = async(rate) => {
    try {
        if(!cache.get("problems")) {
            const resp = await axios.get(`https://codeforces.com/api/problemset.problems`);
            const problems = await resp.data.result.problems;
            const map = {};
            for(var p of problems) {
                const prate = p.rating;
                if(map[prate] === undefined) map[prate] = [];
                map[prate].push(`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`);
            }
            if(cache.set("problems", map, process.env.CACHE_TIME)) {
                console.log("cached");
            } else {
                console.log("can't cache");
                return new Promise((resolve, reject) => {
                    resolve("error");
                })
            }
        }
        const map = cache.get("problems");
        if(map[rate] === undefined) {
            return new Promise((resolve, reject) => {
                resolve("```" + "Can't find any probem give rating between 800-3500 " +  "```" )
            })   
        }
        const problemwithrate = map[rate];
        const problem = problemwithrate[Math.floor(Math.random() * problemwithrate.length)];
        const embed = new EmbedBuilder()
                    .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                    .setDescription(problem)
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png')
                    .setFooter({ text: 'DaaS Codeforces Bot' });
        return new Promise((resolve, reject) => {
            resolve({ embeds: [embed] })
        })
    } catch(e) {
        console.log(e);
        return new Promise((resolve, reject) => {
            resolve("```" + "Internal server Error!!!" + "```")
        })
    }
}

module.exports = {getRandomProblem};