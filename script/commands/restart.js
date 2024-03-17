module.exports.config = {
  name: "restart",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "manhIT",
  description: "Restart Bot",
  commandCategory: "Bot Admin",
  usePrefix: true,
  usages: "restart",
  cooldowns: 5
};
module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  return api.sendMessage(`💟𝗛𝗲𝗹𝗹𝗼 𝗯𝗼𝘀𝘀\n🔰𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁 𝗮 𝗺𝗼𝗺𝗲𝗻𝘁, 𝘁𝗵𝗲  ${global.config.BOTNAME}  𝗯𝗼𝘁 𝘀𝘆𝘀𝘁𝗲𝗺 𝘄𝗶𝗹𝗹 𝗿𝗲𝘀𝘁𝗮𝗿𝘁 𝗮𝗳𝘁𝗲𝗿 10 𝘀𝗲𝗰𝗼𝗻𝗱𝘀`, threadID, () => process.exit(1));
}