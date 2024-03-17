const { get } = require('axios');
const { writeFileSync, unlinkSync, createReadStream } = require('fs-extra');

module.exports.config = {
    name: 'v2g',
    version: "1.6.9",
    credits: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
  usePrefix: true, 
    hasPermission: 0,
    cooldowns: 1,
    commandCategory: "utilities",

 description: "Video to gif converter",
    usage: "{pn} [link] or [reply to a video]",
  };
exports.run = async function ({ api, event, args }) {
    try{
    const d = event.messageReply?.attachments[0]?.url || args.join(' ');
        if (!d) {
          return api.sendMessage('❌| Please provide a link or reply to a video.', event.threadID);
        }
{ api.setMessageReaction("👀", event.messageID, (err) => {}, true);
}
  const { data } = await get(`https://all-image-genator-d1p.onrender.com/dipto/gif?url=${encodeURIComponent(d)}`);
const path = __dirname + '/cache/v2g.gif';
const img = (await get(data.data, { responseType: "arraybuffer" })).data;
writeFileSync(path, Buffer.from(img), "binary");
  api.sendMessage({ 
    body: `✅ | GIF LINK: ${data.data}\n🔰 | Author: ${data.author}`,attachment: createReadStream(path)} ,event.threadID, () => unlinkSync(path), event.messageID);
    } catch (err){
    console.log(err);
api.sendMessage(err, event.threadID);
   }
}