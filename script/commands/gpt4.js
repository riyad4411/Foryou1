const axios = require("axios");
const jb = ""; //add your prompt//

module.exports.config = {
    name: "gpt",
    version: "1.0",
    credits: "Rishad",
    cooldowns: 5,
    hasPermission: 0,
    description: "chat with gpt",
    commandCategory: "Ai",
  usePrefix: true,
    usage: "<p> 'prompt'\nexample:\n<p> hi there \nyou can reply to chat\nyou can delete conversations by replying clear"
    };

  module.exports.handleReply = async function ({ api, event, handleReply, args }) {
  if (event.type == "message_reply") {
  const prompt = event.body;

    try {
      const uid = event.senderID;
      const response = await axios.get(
        `https://for-devs.onrender.com/api/gpt?query=${encodeURIComponent(prompt)}&uid=${uid}&jbprompt=${jb}&apikey=fuck`
      );
       const ok = response.data.result;
      if (response.data && response.data.result) {
    await api.sendMessage(ok ,event.threadID,(error, info) => {
  global.client.handleReply.push({
    name: this.config.name,
    type: 'reply',
    messageID: info.messageID,
    author: event.senderID,
    link: ok
  })},event.messageID);

      } else {
        console.error("API Error:", response.data);
        sendErrorMessage(message, "Server not responding ❌");
      }
    } catch (error) {
      console.error("Request Error:", error.message);
      sendErrorMessage(message, "Server not responding ❌");
    }
  }
 }
  module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ");
    if (!prompt) {
      api.sendMessage.reply(`Please provide some text`);
      return;
    }

    try {
      const uid = event.senderID;
      const response = await axios.get(
        `https://for-devs.onrender.com/api/gpt?query=${encodeURIComponent(prompt)}&uid=${uid}&jbprompt=${jb}&apikey=fuck`
      );
       const res = response.data.result;
      if (response.data && response.data.result) {
   await api.sendMessage({ body: res },event.threadID,(error, info) => {
  global.client.handleReply.push({
    name: this.config.name,
    type: 'reply',
    messageID: info.messageID,
    author: event.senderID,
    link: res
  })},event.messageID);
      } else {
        console.error("API Error:", response.data);
        sendErrorMessage(message, "Server not responding ❌");
      }
    } catch (error) {
      console.error("Request Error:", error.message);
      sendErrorMessage(message, "Server not responding ❌");
    }
};

function sendErrorMessage(message, errorMessage) {
  api.sendMessage({ body: errorMessage }, event.threadID, event.messageID);
}