const axios = require("axios");

module.exports.config = {
    name: "ana",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "KENLIEPLAYS\\Depressedriyad",
    description: "Talk to Ana",
    commandCategory: "Ana",
    usages: "Ana [ask]",
    usePrefix: true,
    cooldown: 5, 
};

module.exports.handleEvent = async function ({ api, event }) {
    if (!(event.body.indexOf("ana") === 0 || event.body.indexOf("Ana") === 0)) return;
    const args = event.body.split(/\s+/);
    args.shift();

    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
        mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("Assalamualaikum Jan 💚", tid, mid);
    try {
        const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${content}&filter=true`);
        const respond = res.data.success;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage(" 𝚜𝚘𝚛𝚛𝚢 𝚋𝚊𝚋𝚎 🥺..𝚃𝚛𝚢 𝚕𝚊𝚝𝚎𝚛, 𝚜𝚎𝚛𝚟𝚎𝚛 𝚒𝚜 𝚍𝚘𝚠𝚗❗", tid, mid);
    }
};

module.exports.run = async function ({ api, event }) {};
