require('dotenv').config();

const { Client, WebhookClient } = require('discord.js');

const client = new Client({
    'partials': ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

const PREFIX = '$';

//establishing bot login

client.on('ready', () => {
});

// configuring bot messages for user queries

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

        // kicking the user
        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('You do not have permission toperform that activity');
            if (args.length === 0)
                return message.reply('Please Provide an ID to Proceed');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member.kick().then((member) => message.channel.send(`${member} was kicked out of the channel`))
                    .catch((error) => message.channel.send('I do not have permission to kick the user'));
            } else {
                message.channel.send('That member was not found');
            }

            // Banning the user
        } else if (CMD_NAME === 'ban') {
            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply('You do not have permission toperform that activity');
            if (args.length === 0)
                return message.reply('Please Provide an ID to Proceed');

            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('User has banned successfully');
            } catch (error) {
                message.channel.send('An error has occurred, Either I do not have permission or the user was not found');
            }
        }
        else if (CMD_NAME === 'announce') {
            console.log(args);
            const msg = args.join(' ');
            console.log(msg);
            webhookClient.send(msg);
        }
    }
});

// Sending message reaction automatically for user input

client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const guild = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '') {
        // respective Id's must be entered inside single quite string in order to make a role
        switch (name) {
            case '🍎': member.role.add('');
                break;
            case '🍌': member.role.add('');
                break;
            case '🍇': member.role.add('');
                break;
            case '🍑': member.role.add('');
                break;
        }

    }
});

// Removing from the role
client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const guild = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '') {
        // respective Id's must be entered in order to make a role
        switch (name) {
            case '🍎': member.role.remove('');
                break;
            case '🍌': member.role.remove('');
                break;
            case '🍇': member.role.remove('');
                break;
            case '🍑': member.role.remove('');
                break;
        }

    }
});

client.login(process.env.DISCORD_BOT_TOKEN);