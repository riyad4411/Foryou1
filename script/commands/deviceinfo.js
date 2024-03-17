const fetch = require("node-fetch");
const { writeFileSync, createReadStream, unlinkSync } = require('fs-extra');
const { get } = require('axios');

module.exports.config = {
    name: "deviceinfo",
    version: "1.0",
    credits: "Rishad",
    cooldowns: 5,
    hasPermission: 0,
  usePrefix : true,
    description: "Retrieve detailed information about the specified device.",
    commandCategory: "info",
    usage: "{p}deviceinfo (device name)",
  };

  module.exports.run = async function ({ api, args, event }) {
    const search = args.join(" ");

    if (!search) {
      api.sendMessage("Please provide the name of the device you want to search for.", event.threadID);
      return;
    }

    const searchUrl = `https://for-devs.onrender.com/api/deviceinfo/search?query=${encodeURIComponent(search)}&apikey=fuck`;

    try {
      const searchResponse = await fetch(searchUrl);
      const searchResults = await searchResponse.json();

      if (searchResults.results.length === 0) {
        api.sendMessage(`❌No results found for '${search}'. Please try again with a different device name.`, event.threadID);
        return;
      }

      let replyMessage = "🔍 Search Results:\n\n";
      for (let i = 0; i < searchResults.results.length; i++) {
        const device = searchResults.results[i];
        replyMessage += `${i + 1}. ${device.name}\n`;
      }
      replyMessage += "\nReply with the number of the device you want to get info about.";

      const reply = await api.sendMessage(replyMessage, event.threadID);
      const replyMessageID = reply.messageID;

      global.client.handleReply.push(replyMessageID, {
        name: this.config.name,
        author: event.senderID,
        messageID: replyMessageID,
        results: searchResults.results,
      });

    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while fetching device information.", event.threadID);
    }
  },
   module.exports.handleReply = async ({ api, event, handleReply, client }) => {
    const { author, messageID, results } = handleReply;

    if (event.senderID !== author) return;

    const selectedNumber = parseInt(event.body);

    if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > results.length) {
      api.sendMessage("Invalid option selected. Please reply with a valid number.", event.threadID);
      return;
    }

    const selectedDevice = results[selectedNumber - 1];
    const url = selectedDevice.url;
    const infoUrl = `https://for-devs.onrender.com/api/deviceinfo/info?url=${encodeURIComponent(url)}&apikey=fuck`;

    try {
      const infoResponse = await fetch(infoUrl);
      const deviceInfo = await infoResponse.json();

      if (deviceInfo.status === 200) {
     let infoMessage = `📱Device: ${deviceInfo.result.title}\n`;
        infoMessage += `📅 Release Date: ${deviceInfo.result.releaseDate}\n`;
        infoMessage += `📏 Dimensions: ${deviceInfo.result.dimensions}\n`;
        infoMessage += `📱 Type: ${deviceInfo.result.type}\n`;
        infoMessage += `💾 Storage: ${deviceInfo.result.storage}\n`;
        infoMessage += `🔍 Display Info: ${deviceInfo.result.displayInfo}\n`;
        infoMessage += `📏 Display Inch: ${deviceInfo.result.displayInch}\n`;
        infoMessage += `📷 Camera Pixel: ${deviceInfo.result.cameraPixel}\n`;
        infoMessage += `🎥 Video Pixel: ${deviceInfo.result.videoPixel}\n`;
        infoMessage += `🔒 RAM Size: ${deviceInfo.result.ramSize}\n`;
        infoMessage += `🧰 Chipset Info: ${deviceInfo.result.chipsetInfo}\n`;
        infoMessage += `🔋 Battery Type: ${deviceInfo.result.batteryType}\n`;
        infoMessage += `🔌 Battery Brand: ${deviceInfo.result.batteryBrand}\n`;
       
        const path = __dirname + '/cache/img.jpg';

        const img = (await get(deviceInfo.result.thumbnailUrls[0], { responseType: "arraybuffer" })).data;

        writeFileSync(path, Buffer.from(img, "binary"));

        api.sendMessage({
            body: infoMessage,
            attachment: createReadStream(path)
          }, event.threadID, () => unlinkSync(path), event.messageID);
      } else {
        api.sendMessage("Sorry, the device information could not be retrieved.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while fetching device information.", event.threadID);
    }
  };