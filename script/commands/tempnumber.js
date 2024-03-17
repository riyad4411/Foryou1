const axios = require("axios");

module.exports.config = {
    name: "tempnum",
    version: "1.0", 
    credits: "Rishad",
    cooldowns: 5,
    hasPermission: 0,
    description: "generate temporary phone numbers and retrieve inbox messages",
    commandCategory: "tool",
  usePrefix: true,
    unsage: "{prefix}tempnum gen (1-10)\n{prefix}tempnum inbox (number) | (1-10)",
  };

  module.exports.run = async function ({ api, args, event }) {

    try {
      if (args[0] === "gen") {
        let num = args[1];

        num = num || 1;

        if (isNaN(num) || num < 1 || num > 100) {
          return api.sendMessage("Please provide a valid number between 1 and 100 for generating temporary phone numbers.", event.threadID);
        }

        const response = await axios.get(`https://for-devs.onrender.com/api/tempnum/gen?num=${num}&apikey=fuck`);
        const tempNumbers = response.data;


        const formattedNumbers = tempNumbers.map((tempNum) => {
          return `Country: ${tempNum.country}\nNumber: ${tempNum.number}\nGenerated ${tempNum.time}`;
        });

        return api.sendMessage(` 🪄Generated temporary numbers:\n\n${formattedNumbers.join("\n\n")}`, event.threadID);

      } else if (args[0] === "inbox") {
        let [phone, num] = args.slice(1).join(" ").split("|").map((str) => str.trim());

        if (!phone || isNaN(phone)) {
          return api.sendMessage("Please provide a valid phone number for retrieving inbox messages.", event.threadID);
        }

        num = num || 1;

        if (isNaN(num)) {
          return api.sendMessage("Please provide a valid number for retrieving inbox messages.", event.threadID);
        }

        const inboxResponse = await axios.get(`https://for-devs.onrender.com/api/tempnum/inbox?phone=${phone}&num=${num}&apikey=fuck`);
        const inboxMessages = inboxResponse.data;

        const formattedMessages = inboxMessages.map((message) => {
          return `${message.sms} - From: ${message.sender}`;
        });

        return api.sendMessage(`📥-Inbox messages for ${phone}:\n\n${formattedMessages.join("\n\n")}\n\n 🫧`, event.threadID);

      } else {
        return api.sendMessage("Invalid command. Use {prefix}tempnum gen (1-10) or {prefix}tempnum inbox (number) | (1-10).", event.threadID);
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage(error, event.threadID);
    }
  };