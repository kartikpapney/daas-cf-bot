const axios = require('axios');

const getUpcomingContests = async() => {
    const resp = await axios.get('https://codeforces.com/api/contest.list');
    const allContest = await resp.data.result;
    var res = "";
    for(var idx=0; idx<allContest.length &&allContest[idx].phase==='BEFORE'; idx++) {
        const contest = allContest[idx];
        res = `Contest ID=${contest.id}, ${contest.name}, @${new Date(contest.startTimeSeconds*1000).toLocaleString()}\n` + res;
    }
    return new Promise((resolve, reject) => resolve(res));
}

module.exports = {getUpcomingContests};