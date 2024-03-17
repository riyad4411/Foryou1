module.exports.config = {
  name: "supportgc",
  version: "1.1",
  credits: "Shikaki",
  cooldowns: 5,
  hasPermission: 0,
  description: "Join the official support group chat",
  usePrefix: true,
  commandCategory: "General",
  usage: "supportgc",
};

module.exports.run = async function ({ api, event }) {
  const userId = event.senderID;
  const supportGroupThreadId = "7751614804853351";// Replace with the actual thread ID of the support group, if available.

  try {
    const threadInfo = await api.getThreadInfo(supportGroupThreadId);
    const participantIds = threadInfo.participantIDs;

    if (participantIds.includes(userId)) {
      return api.sendMessage("𝚃𝚞𝚖𝚒 𝙰𝚕𝚛𝚎𝚊𝚍𝚢 𝙲𝚢𝚋𝚎𝚛 𝙰𝚗𝚊 | 𝙾𝚏𝚏𝚒𝚌𝚒𝚊𝚕 𝙶𝚛𝚘𝚞𝚙𝚎 𝙰𝚜𝚘! 😜.", event.threadID);
    } else {
      await api.addUserToGroup(userId, supportGroupThreadId);
      return api.sendMessage(" 𝚃𝚖𝚔𝚎 𝙰𝚍𝚍 𝚔𝚘𝚛𝚎 𝚍𝚒𝚌𝚒 👾🤍! 𝙽𝚊 𝚙𝚊𝚒𝚕𝚎 𝚜𝚙𝚊𝚖 𝙲𝚑𝚎𝚌𝚔 𝚔𝚘𝚛𝚘 😊", event.threadID);
    }
  } catch (error) {
    console.error("Error adding user to group:", error);
    return api.sendMessage("𝚃𝚖𝚔𝚎 𝚊𝚍𝚍 𝚔𝚘𝚛𝚊 𝚓𝚊𝚢 𝚗𝚊😑. 𝚊𝚖𝚊𝚔𝚎 𝚁𝚎𝚚𝚞𝚎𝚜𝚝 𝚍𝚎𝚠 ❤️", event.threadID);
  }
};