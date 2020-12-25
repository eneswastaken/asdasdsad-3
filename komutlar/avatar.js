const Discord = require("discord.js");
module.exports.run = async (Client, interaction, args) => {
      let user;
    if (args != null) {
        user = Client.users.cache.get(args.find(arg => arg.name.toLowerCase() == "user").value);
    } else {
        user = Client.users.cache.get(interaction.member.user.id);
    }
    let guild = Client.guilds.cache.get(interaction.guild_id);
    if (!user) return;
    let member = guild.members.cache.get(user.id);

let embed = new Discord.MessageEmbed()
.setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
.setImage(user.displayAvatarURL({ dynamic: true, size: 512 }));
                     
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
    name: 'avatar',
    description: 'Kullanıcının avatarını gösterir.',
    options: [
        {
            name: 'User',
            description: 'If mentioned, shows the information about the user.',
            type: 6,
            required: false
        }
    ]
};
