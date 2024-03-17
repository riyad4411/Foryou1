const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Jonell Magallanes",
    description: "EDUCATIONAL",
    usePrefix: true,
    commandCategory: "other",
    usages: "[question]",
    cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
    const content = encodeURIComponent(args.join(" "));
    const apiUrl = `https://jonellccapisproject-e1a0d0d91186.herokuapp.com/api/gpt?prompt=${content}`;

    if (!content) return api.sendMessage("🍼| 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚢𝚘𝚞𝚛 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗.\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎:𝙰𝚒 𝙷𝚘𝚠 𝚋𝚎 𝚜𝚖𝚊𝚛𝚝?", event.threadID, event.messageID);

    try {
        api.sendMessage("𝙰𝚒 𝚒𝚜 𝚝𝚢𝚙𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚊𝚗𝚜𝚠𝚎𝚛 🧃", event.threadID, event.messageID);

        const response = await axios.get(apiUrl);
        const { gptResult } = response.data.result;
        const { gpt, code, status } = gptResult;

        if (status && code === 200) {
            api.sendMessage(gpt, event.threadID, event.messageID);
        } else {
            api.sendMessage("❓ | An error occurred while processing your request.", event.threadID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("🚧 | An error occurred while processing your request.", event.threadID);
    }
};