// const axios = require('axios');
// const {Message} = require('discord.js');

// const assign = (message, arguments) => {
//     /**
//      * @param {Message} message
//      */
//     const targetUser = message.author.username;
//     console.log(targetUser);
//     if (!targetUser) {
//         message.reply('Please specify someone to give a role to.')
//         return
//     }

//     arguments.shift()

//     const roleName = arguments.join(' ')
//     const { guild } = message

//     const role = guild.roles.cache.find((role) => {
//         return role.name === roleName
//     })
//     if (!role) {
//         message.reply(`There is no role with the name "${roleName}"`)
//         return
//     }

//     const member = guild.members.cache.get(targetUser.id)
//     member.roles.add(role)

//     message.reply(`that user now has the "${roleName}" role`)
// }

// const assignRole = async(msg) => {
//     /**
//      * @param {Message} msg
//      */
//     const handle = async (msg) => {
//         const member = await msg.guild.member(msg.author);
//         console.log(member);
//         return member ? member.nickname : msg.author.username;
//     }
//     // console.log(handle);
//     try {
//         const resp = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
//         const userInfo = await resp.data.result[0];
//         const rank = userInfo.rank;
//         const targetUser = msg.author;
//         // console.log(targetUser);
//         await assign(msg, rank);
//         return "Role assigned";
//     } catch(e) {
//         console.log(msg.author)
//         return `No User Found @${msg.author.username}. Update your server name with codeforces Handle`;
//     }
// }

// module.exports = {assignRole};