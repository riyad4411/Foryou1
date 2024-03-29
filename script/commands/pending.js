module.exports.config = {
  name: "pending",
  version: "1.0.5",
  credits: "Mirai Team",
  hasPermssion: 2,
  description: "Quản lý tin nhắn chờ của bot",
  commandCategory: "system",
  usePrefix: true,
  cooldowns: 30
};

module.exports.languages = {
    "en": {
        "invaildNumber": "%1 is not an invalid number",
        "cancelSuccess": "Refused %1 thread!",
        "notiBox": "•𝗖𝘆𝗯𝗲𝗿 𝗔𝗻𝗮🦠\n𝙲𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕 🚀!! -𝚑𝚎𝚕𝚙 𝚝𝚘 𝚜𝚎𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜 🫧,\n𝙰𝚗𝚍 -𝚛𝚎𝚙𝚘𝚛𝚝 𝚝𝚘 𝚜𝚊𝚢 𝚋𝚘𝚝 𝚙𝚛𝚘𝚋𝚕𝚎𝚖 🫥🖤°°",
        "approveSuccess": "Approved successfully %1 threads!",

        "cantGetPendingList": "Can't get the pending list!",
        "returnListPending": "「🅿🅴🅽🅳🅸🅽🅶 🅶🆁🅾🆄🅿」\nThe whole number of threads to approve is %1 threads \n\n%2",
        "returnListClean": "「🅿🅴🅽🅳🅸🅽🅶> \n Aktao nai 🙂"
    }
}

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(getText("invaildNumber", singleIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), handleReply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getText("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(getText("invaildNumber", singleIndex), threadID, messageID);
            api.sendMessage(getText("notiBox"), handleReply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getText("approveSuccess", count), threadID, messageID);
    }
}

module.exports.run = async function({ api, event, getText }) {
  const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;

    try {
    var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
    var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
  } catch (e) { return api.sendMessage(getText("cantGetPendingList"), threadID, messageID) }

  const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}. ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(getText("returnListPending", list.length, msg), threadID, (error, info) => {
    global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
  }, messageID);
    else return api.sendMessage(getText("returnListClean"), threadID, messageID);
}