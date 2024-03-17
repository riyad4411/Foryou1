const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "emi",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Deku",
    description: "Generate image in emi",
    commandCategory: "AI",
     usePrefix: false,
    usages: "emi [prompt]",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    if (!(event.body.indexOf("emi") === 0 || event.body.indexOf("Emi") === 0)) return;
    const args = event.body.split(/\s+/);
    args.shift();

      api.setMessageReaction("🪄", event.messageID, (err) => {}, true);

    if (!args[0]) return api.sendMessage("🍭 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙴𝚖𝚒\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝙴𝚖𝚒 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]", event.threadID, event.messageID);

    api.sendMessage("🕓 | 𝙴𝚖𝚒 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝_", event.threadID);

    const a = args.join(" ");
    try {
      const response = await axios.get(`https://ai-tools.replit.app/emi?prompt=${encodeURIComponent(a)}`, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, "utf8");
      const filePath = __dirname + '/cache/emi.png';
      fs.writeFileSync(filePath, buffer);
      api.sendMessage({ attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath));
    } catch (e) {
      return api.sendMessage(e.message, event.threadID);
    }
  },

  run: async function({ api, event }) {
  }
};