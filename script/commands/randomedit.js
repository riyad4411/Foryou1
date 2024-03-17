const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "randomedit",
    version: "1.0.0",
    author: "Jonell Magallanes", // convert into goatbot command ny jonell Magallanes 
    countDown: 20,
    role: 0,
    shortDescription: {
      vi: "Random edit from TikTok",
      en: "Random edit from TikTok",
    },
    longDescription: {
      vi: "",
      en: "",
    },
    category: "media",
    guide: {
      vi: "",
      en: "",
    },
    dependencies: {
      axios: "",
    },
  },

  langs: {
    vi: {
      
    },
    en: {
      
    },
  },

  onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
    api.sendMessage("⏱️ | Sending Random edit Just Please wait...", event.threadID, event.messageID);
    api.setMessageReaction("⏱️", event.messageID, () => {}, true);

    try {
      const response = await axios.get('https://cc-project-apis-jonell-magallanes.onrender.com/api/edit', {
        responseType: 'arraybuffer'
      });

      if (response && response.status === 200) {
        const filePath = __dirname + "/tmp/randomedit.mp4";
        fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'), "binary");
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        const tid = event.threadID;
        api.sendMessage({
          body: `Here's your Random Edit Video from TikTok\n\nID:${tid}`,
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
      } else {
        console.error(response); // Log detailed response for debugging
        api.sendMessage(`Failed to retrieve a video. Status: ${response ? response.status : 'Unknown'}`, event.threadID, event.messageID);
        api.setMessageReaction("🔭", event.messageID, () => {}, true);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(`Error fetching video: ${error.message}`, event.threadID, event.messageID);
    }
  },
};