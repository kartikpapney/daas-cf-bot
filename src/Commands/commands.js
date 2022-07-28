const {getUpcomingContests} = require('./contest.js');

const getResult = async(command) => {
    const [cmd, ...args] = command;
    if(cmd === '') {
        return "Welcome To DAAS Codeforces BOT";
    } else if(cmd === 'contest') {
        const res = await getUpcomingContests();
        return res;
    } else if(cmd === 'role') {
        return "Role assigned";
    } else {
        return "Wrong Command";
    }
}

module.exports = {getResult};