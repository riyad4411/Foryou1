const axios = require("axios");

module.exports.config = {
    name: "prompt",
    version: "1.0",
    credits: "404",
    cooldowns: 2,
    hasPermission: 0,
    usePrefix: false, 
    description: "image to prompt",
    commandCategory: "game",
    usage: "{p}prompt reply to image",
  };
  module.exports.run = async function ({ api, event }) {
    try {

      if (event.type !== "message_reply") {
        return api.sendMessage("❌ | Please reply to an image to use the command.");
      }

      const attachment = event.messageReply.attachments[0];
      if (!attachment || !["photo", "sticker"].includes(attachment.type)) {
        return api.sendMessage("❌ | Reply must be an image.");
      }


      const imageUrl = await require('tinyurl').shorten(attachment.url);


      const promptResponse = await axios.get(`https://www.api.vyturex.com/describe?url=${encodeURIComponent(imageUrl)}`);
      let prompt = promptResponse.data;

      api.sendMessage({ body: `${prompt}`}, event.threadID);

    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred. Please try again later.");
    }
  };