/* 
This is JavaScript code, I used this with my bot, it's still in working order, as long as you're using the correct Node version.
This also comes with commands, I have highlighted certain zones where my bot link was, or my bot name was, for you to replace with your 
own.

You'll also notice that I've used 'config.<somethingHere>' all over my code, if you don't have a config.json folder, don't worry, 
remove the 'const config = require('./config.json');' and change the `config.<somethingHere>` to either prefix or token, but the only
time you'd have to do 'config.token' is at the bottom for the bot login.

My Node Version:
v6.10.2
*/

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`in ${client.guilds.size} guilds! | ~help`)
});

const prefix = "~";

const responses = [
   'Yes', 'A small chance', 'Maybe...', 'Not in your wildest dreams', 'Huhmmm, No...', 'Possibly', 'I hope so', 'Pffft', 'Forget about it', 'Never!'
]

const fcoin = [
  'Heads', 'Tails'
]

client.on('guildCreate', guild => {
  guild.defaultChannel.send('Hey! Thanks for inviting me to your server!\n\n- To see my commands, do: ~help\nTo see my support server, go to: <YourURL>')
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
  newUsers[guild.id].set(member.id, member.user);

  if (newUsers[guild.id].size > 10) {
    const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
    let welcome = message.guild.channels.find("name", "welcome-log");
    welcome.send("Welcome our new members to the server!\n" + userlist);
    newUsers[guild.id].clear();
  }
});

// Message Handler Event (Commands Go Inside)
client.on('message', message => {
  if(!message.content.startsWith(config.prefix)) return;

let command = message.content.split(' ')[0];
command = command.slice(prefix.length);

let args = message.content.split(' ').slice(1);

if (message.content.startsWith(config.prefix + 'say')) {
  message.delete();
  message.channel.send({embed: {
  color: 0x00f735,
  description: `**${message.author.username} says... **` + (args.join(' '))
} }) }

if(message.content.startsWith(config.prefix + 'ping')) {
 message.channel.send(`:ping_pong: Pong! | **${Date.now() - message.createdTimestamp}ms**`)
}

if(message.content.startsWith(config.prefix + 'invite')) {
 message.author.send('To invite me to your server, go to: <YourBotInviteURL>')
}

if(message.content.startsWith(config.prefix + 'rate')) {
  message.channel.send(`I'd rate **${message.author.username}** a(n) ${(Math.floor(Math.random() * 11))}\/10`)
}

if (message.content.startsWith(config.prefix + 'kick')) {
  if (!message.member.permissions.has("KICK_MEMBERS")) {
    message.channel.send('Sorry, I do not have permission to execute the "kick" command!');
    return;
  } else if (!message.channel.permissionsFor(client.user).has("KICK_MEMBERS")) {
    message.channel.send("Sorry, I do not have permission to execute this command!");
    return;
  }
  if(message.author.id === message.mentions.users.first().id) return;
  let userToKick = message.mentions.users.first();
  message.guild.member(userToKick).kick().catch(console.error);
  message.channel.send('Successfully kicked!')
}

if (message.content.startsWith(config.prefix + 'ban')) {
  if (!message.member.permissions.has("BAN_MEMBERS")) {
    message.channel.send('Sorry, I do not have permission to execute the "ban" command!');
    return;
  } else if (!message.channel.permissions(client.user).has("BAN_MEMBERS")) {
    message.channel.send("Sorry, I do not have permission to execute this command!");
    return;
  }
  if(message.author.id === message.mentions.users.first().id) return;
  let userToBan = message.mentions.users.first();
  message.guild.member(userToBan).ban().catch(console.error);
  message.channel.send('Successfully banned!')
}

if (message.content.startsWith(config.prefix + 'roll')) {
  message.channel.send(`My number is... ${(Math.floor(Math.random() * 999))}`)
}

if (message.content.startsWith(config.prefix + 'help')) {
  message.react('👌');
  message.channel.send('You\'ve been DMed a list of commands! :mailbox_with_mail:')
  message.author.send(`__<botName> Commands__\n
__Fun__
**ping**: Checks if the bot\'s still alive
**roll**: Rolls a random number!
**rate**: Will rate the user who said it
**8ball**: Ask the magic 8ball a question! (Do \`~usage 8ball\` for usage information!)
**flipcoin**: The bot will respond with either heads or tails!
**say**: Will say the users input!
**avatar**: Displays the users avatar! (Works with GIFs too!)
**lenny**: Will create a lenny face!
**tableflip**: The bot will throw tables!
**unflip**: Unflips a table!
**f**: Pay your respects\n
__Moderation__
**purge**: The bot will purge any message (Limit: 2 - 100 Messages)
**ban**: Bans the user specified
**kick**: Kicks the user specified
**mute**: Mutes the user specified
**unmute**: Unmutes the user specified\n
__Utility__
**support**: Directs you to the support server!
**invite**: Gives bot invite link, this is useful for adding the bot to your server!
**uptime**: Shows bot uptime
**serverinfo**: Shows info about the server`)
}

if (message.content.startsWith(config.prefix + 'avatar')) {
  message.channel.send(message.author.avatarURL)
}

if (message.content.startsWith(config.prefix + 'support')) {
  message.author.send({embed: {
    color: 0xe0bee5,
    description: 'For real-time support, and more, join: <yourURL>'
} }) }

if (message.content.startsWith(config.prefix + '8ball')) {
  let args = message.content.split(" ").slice(1);
  let question = args[0]
  if (!message.content.endsWith('?')) {
    return message.channel.send('You must ask me a question, first!')
} else {
  message.channel.send(`:8ball: | ${responses[Math.floor(Math.random() * responses.length)]}`);
  }
}

if (message.content.startsWith(config.prefix + 'flipcoin')) {
  message.channel.send(`You flipped \`${fcoin[Math.floor(Math.random() * fcoin.length)]}\``);
}

if (message.content.startsWith(config.prefix + 'purge')) {
  message.delete();

  if (!message.member.permissions.has("MANAGE_MESSAGES")) {
    message.channel.send('Sorry, I do not have permission to execute the "purge" command!');
    return;
  } else if (!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
    message.channel.send("Sorry, I do not have permission to execute this command!");
    return;
  }
const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(' ')[2]) ? parseInt(message.content.split(' ')[2]) : parseInt(message.content.split(' ')[1])
if (!amount) return message.channel.send('Must specify an amount to delete!');
if (!amount && !user) return message.channel.send('Must specify a user and amount, or just an amount of messages to purge!');
message.channel.fetchMessages({
  limit: amount,
}).then((messages) => {
  if (user) {
    const filterBy = user ? user.id : client.user.id;
    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
  }
  message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
}) }

if (message.content.startsWith(config.prefix + 'lenny')) {
  message.channel.send('( ͡° ͜ʖ ͡°)')
}

if (message.content.startsWith(config.prefix + 'tableflip')) {
  message.delete();
  message.channel.send('(╯°□°）╯︵ ┻━┻')
}

if (message.content.startsWith(config.prefix + 'unflip')) {
  message.delete();
  message.channel.send('Whoops! Flipped another table, lemme get that. ┬──┬﻿ ¯\_(ツ)')
}

if (message.content.startsWith(prefix + 'f')) {
  message.channel.send(`${message.author.username} paid their respects! :blue_heart:`)
}

let Botrole = message.guild.roles.find("name", "Bot Commander");
if (!Botrole) return message.channel.send('You must make a role called "Bot Commander" to use this command!')

  if (message.content.startsWith(config.prefix + 'mute')) {
    let user = message.mentions.users.first();
    var member = message.guild.member(user);
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      message.channel.send('Sorry, I do not have permission to execute the "mute" command!');
      return;
    } else if (!message.channel.permissionsFor(client.user).has("MANAGE_ROLES")) {
      message.channel.send("Sorry, I do not have permission to execute this command!");
      return;
    }
    if(!user) return message.channel.send({embed: {
      color: 0xFF0000,
      author: {
      },
      title: 'User not found',
      description: "Please specify a valid user to mute!",
      timestamp: new Date(),
    }});
    if(member.roles.has(Botrole.id)) return message.channel.send('This user can\'t be muted, as they have the Bot Commander role, Bot Commanders control the bot')
    let Muted = message.guild.roles.find("name", "Muted");
    if(!Muted) return message.channel.send({embed: {
      color: 0xFF0000,
      author: {
      },
      title: 'Unable To Mute',
      description: `${user} was unable to be muted`,
      timestamp: new Date(),
    }});
    message.channel.send({embed: {
      color: 0x22FF2C,
      author: {
      },
      title: 'Successfully Muted',
      description: `${user} was successfully muted :zipper_mouth:`,
      timestamp: new Date(),
    }});
    message.guild.member(user).addRole(Muted);
    }

    if (message.content.startsWith(prefix + 'unmute')) {
    if(!message.guild.member(client.user).has("MANAGE_ROLES_OR_PERMISSIONS")) return message.channel.send('__**Insufficient Permissions**__\nPlease give the bot the required permissions. kthx')
    let user = message.mentions.users.first();
    if(!user) return message.channel.send('__**User not found**__\nPlease input a valid user to unmute!')
    let Muted = message.guild.roles.find("name", "Muted");
    if(!Muted) return message.channel.send('This user was unabled to be muted!')
    message.guild.member(user).removeRole(Muted);
    message.channel.send(`__**Successfully Unmuted**__\n${user} was successfully unmuted!`)
  }
  
  if (message.content.startsWith(config.prefix + 'uptime')) {
var milliseconds = parseInt((client.uptime % 1000) / 100),
       seconds = parseInt((client.uptime / 1000) % 60),
       minutes = parseInt((client.uptime / (1000 * 60)) % 60),
       hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);

       hours = (hours < 10) ? "0" + hours : hours;
       minutes = (minutes < 10) ? "0" + minutes : minutes;
       seconds = (seconds < 10) ? "0" + seconds : seconds;

       message.channel.send(":chart_with_upwards_trend: I've been running for** " + hours + " **hours, **" + minutes + "** minutes and **" + seconds + "." + milliseconds + "** seconds!");
}
  
  if (message.content.startsWith(prefix + 'serverinfo')) {
  message.channel.send({embed: {
  color: 0x1b74f9,
  author: {
    name: '',
  },
  title: `${message.guild.name}`,
  description: '',
  fields: [{
      name: 'Owner',
      value: `${message.channel.guild.owner.user.tag} (${message.channel.guild.owner.user.id})`
    },
    {
      name: 'Members',
      value: `${message.guild.memberCount}`
    },
    {
      name: 'Region',
      value: `${message.guild.region}`
    },
    {
      name: 'Server ID',
      value: `${message.guild.id}`
    },
    {
      name: 'Default Channel',
      value: `${message.guild.defaultChannel}`
    },
  ],
}
})
}
  
  if (message.content.startsWith(prefix + 'usage 8ball')) {
    const embed = new Discord.RichEmbed()
    .setTitle("8ball Usage")
    .setColor(0xc1c1c1)
    .addField("Usage", "~8ball <Question>")
    .addField("Note", "All questions must end with a `?`")

    message.channel.send({embed});
  }

});
// Commands will go up there, not below or above

client.login(config.token);

/* 
Make sure you have a config file before doing 'config.token'!
If not, just put your token there
*/
