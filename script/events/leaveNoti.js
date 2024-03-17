module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  description: "left notification",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } =  global.nodemodule["path"];
  const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
  const { threadID } = event;
  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝙻𝚎𝚏𝚝 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙 😫" : "\n𝙰𝚛𝚎 𝚔𝚒𝚌𝚔𝚎𝚍 𝚋𝚢 𝙰𝚍𝚖𝚒𝚗 𝚖𝚊𝚢𝚋𝚎 𝚢𝚘𝚞 𝚜𝚝𝚞𝚙𝚒𝚍 🥴";
  (typeof data.customLeave == "undefined") ? msg = `🥺 𝙶𝚘𝚘𝚍𝚋𝚢𝚎 ${name}🙂 𝙱𝚞𝚝 𝚒 𝚖𝚒𝚜𝚜 𝚢𝚘𝚞 𝚊𝚕𝚕 𝚝𝚒𝚖𝚎 𝚠𝚑𝚢 𝚢𝚘𝚞 𝚕𝚎𝚏𝚝 𝚖𝚎? 🥺!\n\n 𝚈𝚘𝚞  ${type} 🙀 «` : msg = data.customLeave;
  msg = msg.replace(/\name}/g, name).replace(/\type}/g, type);

  var link = [  
"https://i.imgur.com/1AqInaf.gif",
"https://i.imgur.com/9GtlnAJ.gif",
"https://i.imgur.com/QyNXpjw.gif",
"https://i.imgur.com/WMjN5xw.gif",
"",
  ];
  var callback = () => api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + "/cache/randomly.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/randomly.gif"));
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/randomly.gif")).on("close", () => callback());
}