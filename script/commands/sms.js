const request = require('request');

// Object to store user message counts
const messageCounts = {};

module.exports.config = {
  name: "sms",
  version: "1.0.0",
  hasPermssion: 0,
  //don't change credit
  credits: "Kingi Charles",//Asif sarker
  description: "Sends bulk SMS messages",
  commandCategory: "bulksms",
  usePrefix: true,
  usages: [],
  cooldowns: 50,
  dependencies: {
    "request": ""
  }
};

module.exports.run = async function ({ api, event }) {
  // Get user input from the event
  const [command, number, ...messageArray] = event.body.slice(1).trim().split(" ");

  // Check if number or message is empty
  if (!number || !messageArray.length) {
    api.sendMessage("Number or message cannot be blank", event.threadID, event.messageID);
    return;
  }

  // Join the message array to form the complete message
  const message = messageArray.join(" ");

  // Check if the user has exceeded the message limit
  const userId = event.senderID;
  const messageLimit = 10; // Maximum number of messages allowed every 12 hours
  const currentTime = Date.now();
  const messageCount = messageCounts[userId] || 0;
  const twelveHoursInMilliseconds = 10 * 60 * 60 * 1000;
  
  if (messageCount >= messageLimit && currentTime - messageCounts[userId].timestamp < twelveHoursInMilliseconds) {
    api.sendMessage(`You have exceeded the message limit. Please try again after 10 hours.`, event.threadID, event.messageID);
    return;
  }

  // Make a request to the API endpoint with the user input
  request.get({
    url: `https://sms-bomb.vercel.app/api/sms.php?number=${number}&msg=${encodeURIComponent(message)}`
  }, function (message, response, body) {
    if (!message && response.statusCode === 200) {
      // If the request was successful, parse the response body
      const data = JSON.parse(body);

      if (data.msg_code) {
        // If there is an error, send the error message back to the user
        api.sendMessage(`✅SMS Sent Successfully!`, event.threadID, event.messageID);
      } else if (data.message) {
        // If there is a success message, send it back to the user
        api.sendMessage(data.message, event.threadID, event.messageID);

        // Update the message count for the user
        if (messageCounts[userId]) {
          messageCounts[userId].count += 1;
        } else {
          messageCounts[userId] = {
            count: 1,
            timestamp: currentTime
          };
        }
      } else {
        // If the response is unexpected, send a generic error message
        api.sendMessage("✅SMS Sent Successfully!", event.threadID, event.messageID);
      }
    } else {
      // If the request failed, send an error message back to the user
      api.sendMessage("Something went wrong, please try again later", event.threadID, event.messageID);
    }
  });
};
  