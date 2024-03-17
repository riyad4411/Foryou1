const axios = require("axios");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

module.exports.config = {
    name: "Ramadan",
    version: "1.0",
    hasPermission: 0,
    credits: "SiAM",
    description: "Get Ramadan timings information for a city",
    commandCategory: "Information",
    usePrefix: true,
    usages: "{prefix}ramadan [city]",
    cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const cityName = args.join(" ");
        if (!cityName) {
            return api.sendMessage({
                body: "Please provide a city name.",
            }, event.threadID);
        }


      const botName = 'CYBER ANA'; // add your bot name to show it in canvas image


        const response = await axios.get(`https://connect-simoai.onrender.com/tools/ramadan?city=${encodeURIComponent(cityName)}&botName=${encodeURIComponent(botName)}`);

        const ramadanInfo = response.data;

        if (!ramadanInfo.city) {
            return api.sendMessage({
                body: `City "${cityName}" not found.`,
            }, event.threadID);
        }

        const message = "🌙 Ramadan Timings 🕌\n" +
            "❏ City: " + ramadanInfo.city + "\n" +
            "❏ Date: " + ramadanInfo.today.date + "\n" +
            "❏ Current Time: " + ramadanInfo.localTime + "\n\n" +

            "Today's:\n" +
            "❏ Sahr: " + ramadanInfo.today.sahr + "\n" +
            "❏ Iftar: " + ramadanInfo.today.iftar + "\n\n" +

            "Tomorrow:\n" +
            "❏ Date: " + ramadanInfo.tomorrow.date + "\n" +
            "❏ Sahr: " + ramadanInfo.tomorrow.sahr + "\n" +
            "❏ Iftar: " + ramadanInfo.tomorrow.iftar + "\n\n" +

            "❏ Note: 1 minute preventative difference in Sehri (-1 min) & Iftar (+1 min)";

        const processingMessage = await api.sendMessage({
            body: `Fetching Ramadan timings for ${cityName}...`,
        }, event.threadID);

        const { data: imageBuffer } = await axios.get(ramadanInfo.canvas_img, { responseType: "arraybuffer" });

        const temporaryImagePath = `temp_${Date.now()}.jpg`;
        fs.writeFileSync(temporaryImagePath, Buffer.from(imageBuffer, 'binary'));

        const attachmentData = fs.createReadStream(temporaryImagePath);

        await api.sendMessage({
            body: message,
            attachment: attachmentData,
        }, event.threadID);

        await unlinkAsync(temporaryImagePath);
        api.unsendMessage(processingMessage.messageID);

    } catch (error) {
        console.error(error);
        api.sendMessage({
            body: "Failed to fetch Ramadan timings.⚠",
        }, event.threadID);
    }
};