const axios = require('axios');

module.exports.config = {
  name: "tempmail",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "@Hazeyy",
  description: "( 𝙂𝙚𝙣-𝙍𝙖𝙣𝙙𝙤𝙢 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡 )",
  commandCategory: "gen",
  usePrefix: true,
  usages: "( Gen Tempmail )",
  cooldowns: 5,
  dependencies: {
    "axios": "0.21.1"
  }
};

module.exports.run = async ({ api, event, args }) => {
  const command = args[0];

  if (command === "random") {
    try {
      const count = args[1] || 1;
      const response = await axios.get(`https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=${count}`);
      const emailAddresses = response.data;

      const message = `Random Email Address(es):\n${emailAddresses.join("\n")}`;
      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝖥𝖺𝗂𝗅𝖾𝖽😿", event.threadID);
    }
  } else if (command === "domains") {
    try {
      const response = await axios.get("https://www.1secmail.com/api/v1/?action=getDomainList");
      const domains = response.data;

      const message = `Active Domains:\n${domains.join("\n")}`;
      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖤𝗋𝗋𝗈𝗋😿 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗍𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍 𝗈𝖿 𝖺𝖼𝗍𝗂𝗏𝖾 𝖽𝗈𝗆𝖺𝗂𝗇𝗌..", event.threadID);
    }
  } else if (command === "getmessages") {
    try {
      const randomUsername = generateRandomUsername();
      const responseDomains = await axios.get("https://www.1secmail.com/api/v1/?action=getDomainList");
      const domains = responseDomains.data;
      const randomDomain = pickRandomDomain(domains);

      const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${randomUsername}&domain=${randomDomain}`);
      const emails = response.data;

      if (emails.length === 0) {
        return api.sendMessage("𝖭𝗈 𝖾𝗆𝖺𝗂𝗅 𝖿𝗈𝗎𝗇𝖽😿.", event.threadID);
      }

      let message = '';
      emails.forEach((email, index) => {
        message += `Email ${index + 1}:\n`;
        message += `From: ${email.from}\n`;
        message += `Subject: ${email.subject}\n`;
        message += `Date: ${email.date}\n\n`;
      });

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖤𝗋𝗋𝗈𝗋😿 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖾𝗆𝖺𝗂𝗅𝗌..", event.threadID);
    }
  } else if (command === "inbox") {
    const email = args[1];

    if (!email) {
      return api.sendMessage("𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌😸", event.threadID);
    }

    const username = getUsernameFromEmail(email);

    if (!username) {
      return api.sendMessage("𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌😿", event.threadID);
    }

    try {
      const responseDomains = await axios.get("https://www.1secmail.com/api/v1/?action=getDomainList");
      const domains = responseDomains.data;
      const randomDomain = pickRandomDomain(domains);

      const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${randomDomain}`);
      const emails = response.data;

      if (emails.length === 0) {
        return api.sendMessage("𝖭𝗈 𝖾𝗆𝖺𝗂𝗅 𝖿𝗈𝗎𝗇𝖽😿", event.threadID);
      }

      let message = '';
      emails.forEach((email, index) => {
        message += `Email ${index + 1}:\n`;
        message += `From: ${email.from}\n`;
        message += `Subject: ${email.subject}\n`;
        message += `Date: ${email.date}\n\n`;
      });

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖤𝗋𝗋𝗈𝗋 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖾𝗆𝖺𝗂𝗅𝗌😿", event.threadID);
    }
  } else {
    api.sendMessage("𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽😿. 𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌: 𝗋𝖺𝗇𝖽𝗈𝗆, 𝖽𝗈𝗆𝖺𝗂𝗇, 𝗀𝖾𝗍𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌, 𝗂𝗇𝖻𝗈𝗑", event.threadID);
  }
};

function generateRandomUsername() {
  const prefix = "shiki";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let suffix = "";

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    suffix += characters.charAt(randomIndex);
  }

  const shuffledSuffix = shuffleString(suffix);
  return prefix + shuffledSuffix;
}

function pickRandomDomain(domains) {
  const randomIndex = Math.floor(Math.random() * domains.length);
  return domains[randomIndex];
}

function shuffleString(string) {
  const array = string.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}

function getUsernameFromEmail(email) {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  }
  return null;
        }
    