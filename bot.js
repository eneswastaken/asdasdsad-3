const Discord = require('discord.js'); 
const fs = require('fs'); 
const Client = new Discord.Client(); 

Client.on('ready', () => {
    console.log(Client.user.tag); 
    fs.readdir('./komutlar/', (error, files) => {
        if (error) return console.log(error); 
        files.forEach(file => { 
            if (!file.endsWith('.js')) return; 
            let fileProp = require('./komutlar/' + file);
            Client.api.applications(Client.user.id).commands.post({
                data: {
                    name: fileProp.help.name, 
                    description: fileProp.help.description, 
                    options: fileProp.help.options
                }
            });
            Client.ws.on('INTERACTION_CREATE', async interaction => { 
                const command = interaction.data.name.toLowerCase(); 
                const args = interaction.data.options; 
                if (command == fileProp.help.name.toLowerCase()) fileProp.run(Client, interaction, args); 
            });
        });
    });
});

Client.login(''); 
