const axios = require("axios");

module.exports.config = {
  name: "jan",
  version: "1.0.0",
  hasPermssion: 0, 
  credits: "dipto", 
  description: "better than Sim simi",
  usePrefix: false,
  commandCategory: "ChatBots",
  cooldowns: 5,
};
module.exports.handleReply = async function ({ api, event, handleReply }) {
 //api.unsendMessage(handleReply.messageID);
  if (event.type == "message_reply") {
  const reply = event.body.toLowerCase();;
  if (isNaN(reply)) {
    const response = await axios.get(`https://noobs-apihouse.onrender.com/dipto/baby?text=${encodeURIComponent(reply)}`)
       const ok = response.data.reply;
    await api.sendMessage(ok ,event.threadID,(error, info) => {
  global.client.handleReply.push({
    name: this.config.name,
    type: 'reply',
    messageID: info.messageID,
    author: event.senderID,
    link: ok
  })},event.messageID)
  }
}
  //----------//
  if (event.type == "message_reply") {
  const reply = event.body.toLowerCase();;
  if (isNaN(reply)) {
    const response = await axios.get(`https://noobs-apihouse.onrender.com/dipto/baby?text=${encodeURIComponent(reply)}`)
       const yy = response.data.reply;
    await api.sendMessage(yy,event.threadID,event.messageID)
  }
  }
}
module.exports.run = async function ({ api, args, event }) {
  try {
    const dipto = args.join(" ").toLowerCase();
    if (!args[0]) {
      api.sendMessage(
        "◽ 𝚜𝚊𝚢 𝚜𝚘𝚖𝚎𝚝𝚑𝚒𝚗𝚐",
  event.threadID,  event.messageID ); return;}
    if (dipto) {
      const response = await axios.get(`https://noobs-apihouse.onrender.com/dipto/baby?text=${dipto}`);
         const mg = response.data.reply;
      await api.sendMessage({body: mg ,},event.threadID,(error, info) => {
  global.client.handleReply.push({
    name: this.config.name,
    type: 'reply',
    messageID: info.messageID,
    author: event.senderID,
    link: mg
  })},event.messageID);
    }
  } catch (error) {console.error(`Failed to get an answer: ${error.message}`);
api.sendMessage(`${error.message}.\nAn error`,event.threadID,event.messageID);}
};