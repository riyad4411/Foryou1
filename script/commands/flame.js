const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "flame",
  version: "1.1",
  permission: 0,
  credits: "Hazeyy",
  description: "( 𝙵𝚕𝚊𝚖𝚎 𝙶𝚒𝚏 )",
  commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
  usages: "( 𝙵𝚕𝚊𝚖𝚎 𝙶𝚒𝚏 𝚃𝚎𝚡𝚝 )",
  cooldown: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  const body = event.body || '';
  if (!(body.indexOf("flame") === 0 || body.indexOf("Flame") === 0)) return;

  const args = body.split(/\s+/);
  args.shift();

  const text = args.join(" ");

  if (!text)
    return api.sendMessage("✨ 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙵𝚕𝚊𝚖𝚎 𝙶𝚒𝚏, \n\n𝚄𝚜𝚎: 𝚏𝚕𝚊𝚖𝚎 [ 𝚝𝚎𝚡𝚝 ] 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝 𝚝𝚎𝚡𝚝 𝚒𝚗𝚝𝚘 𝚐𝚒𝚏.", event.threadID, event.messageID);

  api.sendMessage("🕟 | 𝙲𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚝𝚎𝚡𝚝 𝚒𝚗𝚝𝚘 𝙶𝚒𝚏, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID);

  try {
    const url = `https://hazeyy-merge-apis-b924b22feb7b.herokuapp.com/api/gen/flame?text=${text}`;
    const response = await axios.get(url, { responseType: "stream" });
    const data = response.data;
    let path = __dirname + "/cache/" + Math.floor(Math.random() * 9999999) + ".gif";
    await new Promise((resolve) => {
      data.pipe(fs.createWriteStream(path)).on("close", resolve);
    });

    if (fs.existsSync(path)) {
      const combinedMessage = {
        body: "🟢 𝙷𝚎𝚛𝚎'𝚜 𝚢𝚘𝚞𝚛 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚎𝚍 𝚝𝚎𝚡𝚝 𝚒𝚗𝚝𝚘 𝙶𝚒𝚏!",
        attachment: fs.createReadStream(path),
      };

      api.sendMessage(combinedMessage, event.threadID);
    } else {
      api.sendMessage("🔴 𝙴𝚛𝚛𝚘𝚛 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚏𝚕𝚊𝚖𝚎 𝙶𝚒𝚏.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 𝙴𝚛𝚛𝚘𝚛 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚏𝚕𝚊𝚖𝚎 𝙶𝚒𝚏.", event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {};


// Downloaded from https://neanmart-botcmds.onrender.com/raw/57382

/*
Name: Flame Gif Text
ID: 57382
Description: Convert text into Flame Gif
*/