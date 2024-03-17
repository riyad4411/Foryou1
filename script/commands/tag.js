module.exports.config = {
  name: "tag",
  version: "6.9",
  hasPermssion: 0,
  credits: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
  description: "Tag User.",
  usePrefix: true,
  commandCategory: "tools",
  usages: "-tag [reply]",
  cooldowns: 0,
};

module️.exports️.run = async function ({ api, event, Users, args }) {
  try {
       const { threadID, messageID, senderID } = event;
       const text = args.join(' ');
       const ID = Object.keys(event.mentions)[0] || args[0] || event.senderID;
       var userName = await Users.getNameUser(ID);

       api.sendMessage({
        body: `${text}`,
        mentions: [{
            tag: `${userName}`,
            id: ID
           ]}
       }, threadID, messageID);
    } catch (error) {
      api.sendMessage('💔', threadID, messageID);
    }
  };