module.exports.config = {
	name: "profile",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "DuyVuong",
  usePrefix: true,
	description: "view fb pp ",
	commandCategory: "system",
	cooldowns:20
};

module.exports.run = async function({ api, event, args }) {
const request = require("request");
const fs = require("fs")
const axios = require("axios")
const prefix = global.config.PREFIX
if (!args[0]) return api.sendMessage(`» » » FB-AVATAR « « «\n\n${prefix}fbavt id [id to get] <get photo by person uid>\n\n${prefix}fbavt link [link to get] <get by that person's link>\n\n${prefix}fbavt user <Leave it blank to get the user's own avatar>\n\n${prefix}fbavt user [@mentions] <get avatars of people tagged>`,event.threadID,event.messageID);
else if (args[0] == "id") {
	try {
	var id = args[1];
  if (!id) return api.sendMessage(`Please enter the uid to get avatar.`,event.threadID,event.messageID);
   var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
   return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());