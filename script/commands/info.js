module.exports.config = {
  name: "info",
  version: "1.0.1", 
  hasPermssion: 0,
  credits: "Unique Riyad", //don't change the credits please
  description: "Admin and Bot info.",
  commandCategory: "...",
   usePrefix: true,
  cooldowns: 30,
  dependencies: 
  {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function ({ api, event, args }) {
const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");
var link = ["https://i.imgur.com/dB7qDIN.gif","https://i.imgur.com/kAzWS1W.gif","https://i.imgur.com/e7a4qhy.gif", "https://i.imgur.com/aJ3Lcir.gif","https://i.imgur.com/FPHjbez.gif","https://i.imgur.com/zSvns53.gif","https://i.imgur.com/MpKd8rK.gif", "https://i.imgur.com/YaMnm8q.gif","https://i.imgur.com/lpwUXda.gif","","",];
var callback = () => api.sendMessage({body:`🌸 𝙰𝚍𝚖𝚒𝚗 𝚊𝚗𝚍 𝙱𝚘𝚝 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 🤍🐝

🐞 𝙱𝚘𝚝 𝙽𝚊𝚖𝚎 : ${global.config.BOTNAME} ✨


𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 𝚕𝚒𝚗𝚔 ΠΠ──♡─────ΠΠ
[https://www.facebook.com/uniqueeyamin]

 🪄 𝙱𝚘𝚝 𝙿𝚛𝚎𝚏𝚒𝚡: ${global.config.PREFIX} ✨

🔰 𝙱𝚘𝚝 𝙾𝚠𝚗𝚎𝚛:(𝚄𝚗𝚒𝚚𝚞𝚎 𝚁𝚒𝚢𝚊𝚍) 🌥️ 

🕑 𝚃𝚘𝚍𝚊𝚢 𝚒𝚜 : ${juswa} 

☑️ 𝙱𝚘𝚝 𝚒𝚜 𝚛𝚞𝚗𝚗𝚒𝚗𝚐 ${hours}:${minutes}:${seconds}.
🤖 𝚃𝚑𝚊𝚗𝚔𝚜 𝚏𝚘𝚛 𝚞𝚜𝚒𝚗𝚐 ${global.config.BOTNAME} 😵‍💫 `,attachment: fs.createReadStream(__dirname + "/zone/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/zone/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/zone/juswa.jpg")).on("close",() => callback());
   };
