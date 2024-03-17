const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "render",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Deku//riyad",
    description: "Generate image in render",
    commandCategory: "AI",
     usePrefix: false,
    usages: "render [prompt]",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    if (!(event.body.indexOf("Render") === 0 || event.body.indexOf("render") === 0)) return;
    const args = event.body.split(/\s+/);
    args.shift();

      api.setMessageReaction("🍕", event.messageID, (err) => {}, true);

    if (!args[0]) return api.sendMessage("🍕 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝚁𝚎𝚗𝚍𝚎𝚛\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝚁𝚎𝚗𝚍𝚎𝚛 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]", event.threadID, event.messageID);

    api.sendMessage("🕓 | 𝚁𝚎𝚗𝚍𝚎𝚛 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝_", event.threadID);

    const a = args.join(" ");
    try {
      const response = await axios.get(`https://ai-tools.replit.app/render?prompt=${encodeURIComponent(a)}`, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, "utf8");
      const filePath = __dirname + '/cache/render.png';
      fs.writeFileSync(filePath, buffer);
      api.sendMessage({ attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath));
    } catch (e) {
      return api.sendMessage(e.message, event.threadID);
    }
  },

  run: async function({ api, event }) {
  }
};