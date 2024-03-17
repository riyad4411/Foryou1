 const axios = require("axios");
  const fs = require("fs-extra");


module.exports.config = {
  name: "cdp",
  version: "2.0",
  hasPermssion: 0,
  credits: "RUBISH",
  description: "Random couple dp",
  usePrefix: true,
  commandCategory: "Image",
  cooldowns:20,
};

module.exports.run = async function({ api, event, args }) {
 
  try {
    const response = await axios.get(
      "https://cdp-rubish-api.onrender.com/api-cdp"
    );

    const images = response.data.images;
    const serialNumber = response.data.serialNumber;

    const imagePromises = images.map(async (imageUrl, index) => {
      const imageBuffer = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const imagePath = `${__dirname}/cache/img${index + 1}.png`;
      fs.writeFileSync(imagePath, Buffer.from(imageBuffer.data, "binary"));
      return fs.createReadStream(imagePath);
    });

    const allImages = await Promise.all(imagePromises);

    const msg = `
✅ | Here is your couple dp 

⦿ ID: ${serialNumber}`;

    return api.sendMessage({
      body: msg,
      attachment: allImages
    }, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    return api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
  }
};
