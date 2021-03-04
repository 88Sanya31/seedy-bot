const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
  console.log('Client is online!')
  client.user.setActivity('@help', { type: 'PLAYING'}).catch(console.error);
})

command(client, ['Alive', 'alive'], (message) => {
    message.channel.send('Jā, es esmu dzīvs!')
  })

command(client, 'serveris', (message) => {
    const logo =
      'https://cdn.discordapp.com/attachments/787675340339937339/815826358257188904/unnamed.png'

    const embed = new Discord.MessageEmbed()
      .setImage(logo)
      .setColor('#111010')
      .addFields(
        {
          name: 'Server IP - 185.239.239.231:30430 | Teamspeak IP - 91.134.217.3:1753',
          value: 'Lai pieslēgtos caur IP uzspied F8 (fivem klientā) un ieraksti -> connect 185.239.239.231:30430',
          inline: true,
        }
      )

    message.channel.send(embed)
  })

  command(client, ['help', 'Help'], (message) => {

    const embed = new Discord.MessageEmbed()
      .setTitle('Manas kommandas')
      .setColor('#111010')
      .addFields(
        {
          name: '$alive',
          value: 'Pārbauda vai bots ir dzīvs',
          inline: true,
        },
        {
          name: '$serveris',
          value: 'Uzzināt informāciju par serveri',
          inline: true,
        }
      )

    message.channel.send(embed)
  })

  command(client, 'wlban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} Personas WHITELIST tika nobanots`)
      } else {
        message.channel.send(`${tag} Lūdzu ietagojiet kura personas WHITELIST nobanot!`)
      }
    } else {
      message.channel.send(
        `${tag} Tev nav pieejas šai kommandai.`
      )
    }
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} Personā tika veiksmīgi izmesta`)
      } else {
        message.channel.send(`${tag} Ietagojiet`)
      }
    } else {
      message.channel.send(
        `${tag} Tev nav pieejas šai kommandai.`
      )
    }
  })

client.login(config.token)