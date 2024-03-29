const axios = require('axios');

module.exports.config = {
  name: "blue",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes",
  description: "cmd ai powered by blue",
  usePrefix: false,
  commandCategory: "Educ",
  usages: "blue [your content]",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
  const content = encodeURIComponent(args.join(" "));
  
  if (!content) {
    return api.sendMessage("Please Provide your question with blue 🔵", event.threadID, event.messageID);
  }

  api.sendMessage("🛸 • 𝙱𝚕𝚞𝚎𝙰𝚒 𝚒𝚜 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐", event.threadID, event.messageID); 
    
  const apiUrl = `https://bluerepoapislasttry.onrender.com/hercai?content=${content}`;

  try {
    const response = await axios.get(apiUrl);
    const reply = response.data.reply;

    api.sendMessage(reply, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    api.sendMessage("An error occurred while processing your request.", event.threadID);
  }
};