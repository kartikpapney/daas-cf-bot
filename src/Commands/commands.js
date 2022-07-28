const getResult = (command) => {
    const [cmd, ...args] = command;
    if(cmd === '') {
        return "Welcome To DAAS Codeforces BOT";
    } else if(cmd === 'contest') {
        return "Below is the list of contest";
    } else if(cmd === 'role') {
        return "Role assigned";
    } else {
        return "Wrong Command";
    }
}

module.exports = {getResult};