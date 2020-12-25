const Discord = require('discord.js');
const superagent = require("superagent")
module.exports.run = async (Client, interaction, args) => {
  
  let {body} = await superagent
  .get('https://some-random-api.ml/img/panda')

  let embed = new Discord.MessageEmbed
  .setTitle("Panda")
  .setImage(body.link)
  
  Client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: await createAPIMessage(interaction, embed)
        }
    });
    async function createAPIMessage(interaction, content) {
        const apiMessage = await Discord.APIMessage.create(Client.channels.resolve(interaction.channel_id), content)
            .resolveData()
            .resolveFiles();
        return { ...apiMessage.data, files: apiMessage.files };
    }
};

module.exports.help = {
    name: 'panda',
    description: 'Panda fotoğrafları gönderir.',
    options: [
        {
            name: 'User',
            description: 'If mentioned, shows the information about the user.',
            type: 6,
            required: false
        }
    ]
};
