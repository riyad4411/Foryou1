const fs = require('fs');
const request = require('request');

module.exports.config = {
  name: "gist",
  version: "6.9.0",
  role: 2,
  author: "dipto",
  usePrefix: true,
  description: "Convert code into link",
  category: "convert",
  guide:{ en: "[filename]/[reply and file name]"},
  coolDowns: 1
};

module.exports.run = async function ({ api, event, args }) {
  const admin = "100084942163710";
  const na = this.config.author;
  const fileName = args[0];
  if (!admin.includes(event.senderID)) {
    api.sendMessage("⚠️ | You do not have permission to use this command.", event.threadID, event.messageID);
    return;
  }
  const path = `script/commands/${fileName}.js`;
  try {
    let code = '';
    if (event.type === "message_reply") {
      code = event.messageReply.body;
    } else {
      code = await fs.promises.readFile(path, 'utf-8');
    }
    const en = encodeURIComponent(code);
    const options = {
      url: `https://noobs-apihouse.onrender.com/${na}/gist`,
      method: 'POST',
      json: true,
      body: {
        code: en,
        nam: `${fileName}.js`
      }
    };
    request(options, (error, response, body) => {
      if (error) {
        api.sendMessage("Error occurred while processing the command.", event.threadID, event.messageID);
        return;
      }
      const diptoUrl = body.data;
      api.sendMessage(diptoUrl, event.threadID, event.messageID);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    api.sendMessage("Error occurred while processing the command.", event.threadID, event.messageID);
  }
};