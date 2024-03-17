const d1p = ["1Sq711mHxq7lTovSEmeEB7mlpCotjkxM1yhYb1ceNopLAtTReCROqljNMGvQjMrc2PmBM6ucTARuTGeJQYaH4x-4O8q9p2iBBg_cSrCRi1uZho3E-P10_sbFJoHdyJ8bV8Wgi8HiHAskhP-yultiXdxuWuwdnZVRxFd9N2vr6TRBuubjNtCf-bFrGG5_y1Pw9G7AFBxu84leIbmd1yZxzToCY0XhQgaGqdZum0VFJDuw","1Qn2pCEUyLQxtksD9djrhaJAmScQmG57UOsqSg4NhoRukflF-K0D2tnYhYgNK2hyiMR-xEPEXfdHWYyrN5gZTsQwcnXg-xvfEgtf9KxXWP2EzW-m5Nfy4aCyA9kHEaf3SCmnlk2DKC0cdfqiIifyYhUEw0lDLpfacO1enAYur0rH-tpex-kuC6Bl2nq2K-LZxAKUh88YHzrY2Now8g6rmzQ"];
const cookie = d1p[Math.floor(Math.random() * d1p.length)];

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "bing",
    version: "1.0",
    credits: "dipto",
    hasPermssion: 0,
    usePrefix: true,
    description: "Generate images by Dalle-3 AI",
    commandCategory: "image",
    usages: "[text] \nJamon [A 17/18/19 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k]",
    cooldowns: 5
  };

module.exports.run = async function ({ api, event, args }) {
  const prompt = event.messageReply?.body.split("dalle")[1] ||  args.join(" ");
  if (!prompt) {
   return api.sendMessage("❌| Wrong Formet .✅ | Use 17/18 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k",event.threadID,event.messageID);
  }
    try {
      const w = await api.sendMessage("Wait koro baby < 😽", event.threadID);
  
const response = await axios.get(`https://all-image-genator-d1p.onrender.com/dipto/dalle?prompt=${prompt}&key=dipto008&cookies=${cookie}`)
      const data = response.data.imgUrls;
      if (!data || data.length === 0) {
        api.sendMessage("Empty response or no images generated.",event.threadID,event.messageID);
      }
      const diptoo = [];
      for (let i = 0; i < data.length; i++) {
        const imgUrl = data[i];
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'dalle', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        diptoo.push(fs.createReadStream(imgPath));
      }
      await api.unsendMessage(w.messageID);
      await api.sendMessage({
  body: `✅ |Naw Baby Tumar Generated Pic<😘`,
        attachment: diptoo
      },event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      await api.sendMessage(`Generation failed!\nError: ${error.message}`,event.threadID, event.messageID);
    }
  };