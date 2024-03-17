const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "sdxl",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Deku",//Riyad
    description: "Generate image in sdxl",
    commandCategory: "AI",
     usePrefix: false,
    usages: "sdxl [prompt|model]",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    if (!(event.body.indexOf("Sdxl") === 0 || event.body.indexOf("sdxl") === 0)) return;
    const args = event.body.split(/\s+/);
    args.shift();

      api.setMessageReaction("🪄", event.messageID, (err) => {}, true);

    if (!args[0]) return api.sendMessage("🍭 ", event.threadID, event.messageID);

    api.sendMessage("🕓 | 𝙴𝚖𝚒 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝_", event.threadID);

    const a = args.join(" ");
    try {
      const response = await axios.get(`https://ai-tools.replit.app/sdxl?prompt=${encodeURIComponent(a)}`, { responseType: 'arraybuffer' });
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