const axios = require("axios");
const fs = require("fs");

module.exports.config = {
	name: "Birthday",
	version: "1.0.2", 
	hasPermssion: 0,
	credits: "Riyad", //don't change the credits please
	description: "Wish From bot",
	commandCategory: "Entertainment",
   usePrefix: true,
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.indexOf("Happy Birthday") === 0 || event.body.indexOf("happy birthday") === 0 || event.body.indexOf("Birthday") === 0 || event.body.indexOf("hbd") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");
var link = ["https://i.imgur.com/EgwqKdi.gif","https://i.imgur.com/L9d0r5c.gif","https://i.imgur.com/zEsQrVO.gif", "https://i.imgur.com/2Tylvgz.gif","https://i.imgur.com/HT3aHQj.jpeg","https://i.imgur.com/jHSl5XP.gif","https://i.imgur.com/ReV1qjc.gif", "https://i.imgur.com/b0Nt2wp.gif","https://i.imgur.com/JgTrLbK.gif","","",];
var callback = () => api.sendMessage({body:` 😍
𝙷𝚊𝚙𝚙𝚢 𝚋𝚒𝚛𝚝𝚑𝚍𝚊𝚢, 𝚋𝚎𝚊𝚞𝚝𝚒𝚏𝚞𝚕! 🎉✨ 𝙰𝚗𝚘𝚝𝚑𝚎𝚛 𝚢𝚎𝚊𝚛 𝚘𝚕𝚍𝚎𝚛, 𝚋𝚞𝚝 𝚢𝚘𝚞 𝚓𝚞𝚜𝚝 𝚔𝚎𝚎𝚙 𝚐𝚎𝚝𝚝𝚒𝚗𝚐 𝚖𝚘𝚛𝚎 𝚜𝚝𝚞𝚗𝚗𝚒𝚗𝚐 𝚠𝚒𝚝𝚑 𝚎𝚊𝚌𝚑 𝚙𝚊𝚜𝚜𝚒𝚗𝚐 𝚍𝚊𝚢. 𝙼𝚊𝚢 𝚢𝚘𝚞𝚛 𝚍𝚊𝚢 𝚋𝚎 𝚏𝚒𝚕𝚕𝚎𝚍 𝚠𝚒𝚝𝚑 𝚕𝚘𝚟𝚎, 𝚕𝚊𝚞𝚐𝚑𝚝𝚎𝚛, 𝚊𝚗𝚍 𝚊𝚕𝚕 𝚝𝚑𝚎 𝚝𝚑𝚒𝚗𝚐𝚜 𝚝𝚑𝚊𝚝 𝚖𝚊𝚔𝚎 𝚢𝚘𝚞 𝚜𝚖𝚒𝚕𝚎. 𝚈𝚘𝚞 𝚍𝚎𝚜𝚎𝚛𝚟𝚎 𝚝𝚑𝚎 𝚠𝚘𝚛𝚕𝚍, 𝚍𝚊𝚛𝚕𝚒𝚗𝚐, 𝚊𝚗𝚍 𝙸 𝚑𝚘𝚙𝚎 𝚝𝚑𝚒𝚜 𝚢𝚎𝚊𝚛 𝚋𝚛𝚒𝚗𝚐𝚜 𝚢𝚘𝚞 𝚎𝚗𝚍𝚕𝚎𝚜𝚜 𝚓𝚘𝚢, 𝚜𝚞𝚌𝚌𝚎𝚜𝚜, 𝚊𝚗𝚍 𝚞𝚗𝚏𝚘𝚛𝚐𝚎𝚝𝚝𝚊𝚋𝚕𝚎 𝚖𝚘𝚖𝚎𝚗𝚝𝚜. 𝙲𝚑𝚎𝚎𝚛𝚜 𝚝𝚘 𝚊𝚗𝚘𝚝𝚑𝚎𝚛 𝚢𝚎𝚊𝚛 𝚘𝚏 𝚏𝚊𝚋𝚞𝚕𝚘𝚞𝚜 𝚢𝚘𝚞! 💕🎂`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };

module.exports.run = async function({api, event}) {};