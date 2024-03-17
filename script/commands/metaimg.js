const axios = require('axios');
const fs = require('fs-extra');
module.exports.config = {
  name: "metaimg",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "dipto",
  usePrefix: true,
  description: "Meta AI Image Generator.",
  commandCategory: "imagination",
  cooldowns: 5
};
module.exports.run = async function ({ args, event, api }) {
  try {
    const prompt = args.join(" ");
    const wait = await api.sendMessage("🕣 | 𝙼𝚎𝚝𝚊 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐🫗 𝙸𝚖𝚊𝚐𝚎, 𝚓𝚞𝚜𝚝 𝚠𝚊𝚒𝚝..", event.threadID);

     api.setMessageReaction("🫗", event.messageID, (err) => {}, true);
    
    const response = await axios.get(`https://noobs-apihouse.onrender.com/dipto/meta?prompt=${encodeURIComponent(prompt)}&key=dipto008`);
    const data = response.data.imgUrls;
    if (!data || data.length === 0) {
      return api.sendMessage("🚫𝙴𝚖𝚙𝚝𝚢 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚘𝚛 𝚗𝚘 𝚒𝚖𝚊𝚐𝚎𝚜 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍",event.threadID,event.messageID);
    }
    const imgData = [];
    for (let i = 0; i < data.length; i++) {
      const imgUrl = data[i];
      const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
      const imgPath = (__dirname +`/tmp/${i + 1}.jpg`);
      await fs.outputFile(imgPath, imgResponse.data);
      imgData.push(fs.createReadStream(imgPath));
    }
     await api.unsendMessage(wait.messageID);
    await api.sendMessage({
      body: `📸 | Generated images`,
      attachment: imgData
    }, event.threadID ,event.messageID);
for (const imgPath of imgData) {
       fs.unlink(imgPath);
}
  } catch (e) {
    console.error(e);
    await api.sendMessage(`Failed to genarate photo!!!!\nerror: ${e.message}`, event.threadID);
  }
};