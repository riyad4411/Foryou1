const axios = require('axios');

module.exports.config = {
  name: "geninfo",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "@Hazeyy",
  description: "( 𝙂𝙚𝙣 𝙍𝙖𝙣𝙙𝙤𝙢 𝙥𝙚𝙧𝙨𝙤𝙣 𝙞𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣 )",
  commandCategory: "Tools",
   usePrefix: true,
  usages: "( Country Code )",
  cooldowns: 5,
  dependencies: ""
};

module.exports.run = async function ({ api, args, event }) {
  const inputArr = args;
  const country = inputArr.length > 0 ? inputArr[0].toUpperCase() : "US";

  if (inputArr.length > 0 && inputArr[0] === "-help") {
    const example = "geninfo [country_code]";
    const message = `Generates random person information based on country code.\n\nUsage: ${example}\n\nOptional arguments:\n  [country_code]: ISO 3166-1 alpha-2 country code (Default: US).\n\nList of country codes:\n  United States: US\n  United Kingdom: GB\n  Canada: CA\n  Australia: AU\n  Germany: DE\n  France: FR\n  Italy: IT\n  Spain: ES\n  Netherlands: NL\n  Switzerland: CH\n  Brazil: BR\n  Mexico: MX\n  Argentina: AR\n  Colombia: CO\n  Chile: CL\n  Peru: PE\n  Ecuador: EC\n  Uruguay: UY\n  Paraguay: PY\n  Bolivia: BO\n  Costa Rica: CR\n  Dominican Republic: DO\n  Panama: PA\n  Puerto Rico: PR\n  Jamaica: JM\n  Bahamas: BS\n  Trinidad and Tobago: TT\n  Barbados: BB\n  Saint Lucia: LC\n  Saint Vincent and the Grenadines: VC\n  Grenada: GD\n  Antigua and Barbuda: AG\n  Dominica: DM\n  Saint Kitts and Nevis: KN`;
    api.sendMessage(message, event.threadID);
    return;
  }

  const url = `https://randomuser.me/api/1.4/?exc=picture,id,dob,registered,login,nat&nat=${country}&noinfo`;

  axios.get(url)
    .then(response => {
      const data = response.data;
      const results = data.results[0];
      const gender = results.gender;
      const firstName = results.name.first;
      const lastName = results.name.last;
      const streetNumber = results.location.street.number;
      const streetName = results.location.street.name;
      const city = results.location.city;
      const state = results.location.state;
      const country = results.location.country;
      const postcode = results.location.postcode;
      const latitude = results.location.coordinates.latitude;
      const longitude = results.location.coordinates.longitude;
      const timezoneOffset = results.location.timezone.offset;
      const timezoneDescription = results.location.timezone.description;
      const email = results.email;
      const phone = results.phone;
      const cell = results.cell;

      const message = `Random Person Information\n\nGender: ${gender}\nName: ${firstName} ${lastName}\nLocation:\n  Street: ${streetNumber} ${streetName}\n  City: ${city}\n  State: ${state}\n  Country: ${country}\n  Postcode: ${postcode}\n  Coordinates: (${latitude}, ${longitude})\n  Timezone: ${timezoneOffset} ${timezoneDescription}\nContact:\n  Email: ${email}\n  Phone: ${phone}\n  Cell: ${cell}`;

      api.sendMessage(message, event.threadID);
    })
    .catch(error => {
      console.log(error);
      api.sendMessage("Error getting data. Please try again later.", event.threadID);
    });
};
