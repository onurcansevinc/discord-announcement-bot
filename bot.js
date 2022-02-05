const config = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'] } });

const myInterval = setInterval(sendMessage, 12 * 60 * 60000); //12 hours;
client.login(config.bot_token);

client.once('ready', () => {
    client.user.setStatus('Online');
    console.log('Discord bot started');
    client.user.setActivity(config.bot_activity);
});

client.on('message', async message => {
    var sender = message.author.id;
    var msg = message.content.toUpperCase();
    if(config.admins.indexOf(sender) > -1){
        if(msg == '!ANNOUNCEMENT'){
            sendMessage();
        } else if(msg == '!SETTIME'){
            let time = message.content.split(' ')[1];
            clearInterval(myInterval);
            myInterval = setInterval(sendMessage, time * 60 * 60000); //12 hours;
        }
    }
});

function sendMessage(){
    const server = client.guilds.cache.get(config.serverID);
    setTimeout(() => {
        server.roles.cache.get(config.whiteList).members.forEach((m, i) => {
            m.user.send(config.privateSale_message).catch(err => console.log('User don`t allow to send DM message from him'));
        });
    }, 2 * 60000);
    server.roles.cache.get(config.privateSale).members.forEach((m, index) => {
        m.user.send(config.privateSale_message).catch(err => console.log('User don`t allow to send DM message from him'));
    });
}