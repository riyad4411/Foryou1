const axios = require('axios');

module.exports.config = {
  name: 'p2t',
  version: '1.0.0',
  credits: 'dipto',
  usePrefix: true,
  premium: true,
  hasPermssion: 0,
  commandCategory: 'Utility',
  usages: '<photo_url> or reply a photo',
  cooldowns: 10,
  description: 'Extract text from a photo using OCR.',
};
module.exports.run = async function ({ api, args , event }) {
    const imageUrl = event.messageReply.attachments[0].url || args[0];
    if (!imageUrl) {
      return api.sendMessage('Please provide a URL to a photo.', event.threadID);
    }

    try {
      const response = await axios.get(`https://all-image-genator-d1p.onrender.com/dipto/ocr?imageUrl=${encodeURIComponent(imageUrl)}`);
      const text = response.data.dipto;
      api.sendMessage( text || 'No text found in the photo.', event.threadID, event.messageID);
    } catch (error) {
      console.error('OCR API Error:', error);
      api.sendMessage('Failed to extract text from the photo.', event.threadID);
    }
  };