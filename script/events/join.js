module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "CatalizCS",
    description: "Notification of bots or people entering groups with random gif/photo/video",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "cache", "joinGif");
    if (existsSync(path)) mkdirSync(path, { recursive: true }); 

    const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("", event.threadID, () => api.sendMessage({body: `‼️𝖲𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 💫💙${global.config.BOTNAME}☜︎︎︎ 𝖢𝗈𝗇𝗇𝖾𝖼𝗍𝖾𝖽‼️ 🐝

😻 𝖧𝖾𝗅𝗅𝗈 𝖨'𝗆 ${global.config.BOTNAME}☜︎︎︎
𝖧𝖾𝗋𝖾'𝗌 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑' ( ${global.config.PREFIX} )
𝖴𝗌𝖾 ( ${global.config.PREFIX}𝖧𝖾𝗅𝗉 ) 𝗍𝗈 𝗌𝖾𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌.
𝖧𝖾𝗋𝖾'𝗌 𝗆𝗒 𝗈𝗐𝗇𝖾𝗋 𝗇𝖺𝗆𝖾' 𝚄𝚗𝚒𝚚𝚞𝚎 𝚛𝚒𝚢𝚊𝚍 𝖴𝗌𝖾 ${global.config.PREFIX}𝖢𝖺𝗅𝗅𝖺𝖽 𝖿𝗈𝗋 𝖺𝗇𝗒 𝗍𝖾𝖼𝗁𝗇𝗂𝖼𝖺𝗅 𝖾𝗋𝗋𝗈𝗋𝗌 𝗈𝗋 𝖼𝗈𝗇𝗍𝖺𝖼𝗍 𝗆𝖾 𝗈𝗇 𝗌𝗈𝖼𝗂𝖺𝗅 𝗆𝖾𝖽𝗂𝖺:   https://www.facebook.com/100084942163710 \n\n 🦋`, attachment: fs.createReadStream(__dirname + "/cache/joinMp4/hello.gif")} ,threadID));
    }
    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);

            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinGif");
            const pathGif = join(path, `${threadID}.gif`);

            var mentions = [], nameArray = [], memLength = [], i = 0;

            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);

            (typeof threadData.customJoin == "undefined") ? msg = " Assalamualaikum,🤍 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 {name}, 😻 \n              𝖸𝗈𝗎'𝗋𝖾 𝗍𝗁𝖾 \n{soThanhVien}𝖳𝗁 𝖬𝖾𝗆𝖻𝖾𝗋 𝖮𝖿 𝖳𝗁𝗂𝗌 𝖦𝗋𝗈𝗎𝗉⚡ \n✿⊱┈──╌✾╌──┈⊰✿\n𝙹𝚞𝚜𝚝 𝚎𝚗𝚓𝚘𝚢 𝚝𝚑𝚒𝚜 𝚖𝚘𝚖𝚎𝚗𝚝𝚜 🖤😸\n━━━━━━━━━━━━━━━━━━" : msg = threadData.customJoin;
            msg = msg
            .replace(/\{name}/g, nameArray.join(', '))
            .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
            .replace(/\{soThanhVien}/g, memLength.join(', '))
            .replace(/\{threadName}/g, threadName);

            if (existsSync(path)) mkdirSync(path, { recursive: true });

            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

            if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
            else if (randomPath.length != 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
            }
            else formPush = { body: msg, mentions }

            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
}
