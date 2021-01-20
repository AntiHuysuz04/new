const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Az Önce Bot Ping yedi, Sorun önemli değil merak etme. Hatayı düzelttik.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login("Nzc3MjEwNTk1NjQwMDgyNDQ0.X7AHxQ.3A1KI6TyeRjNae6DL0xNMf0CxSA");

//-----------------------------------------------KOMUTLAR-------------------------------------------------\\
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG
client.on("guildMemberAdd", member => {  
  const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.kayıtkanal));
  const register = (ayarlar.teyitçi)
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
 
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
        return {
          '0': ``,
          '1': ``,
          '2': ``,
          '3': ``,
          '4': ``,
          '5': ``,
          '6': ``,
          '7': ``,
          '8': ``,
          '9': ``}[d];
        })
      }

  var kontrol;
if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil.'
if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir.'
  moment.locale("tr");
    const losxstg = new Discord.MessageEmbed()
    .setAuthor(member.guild.name)
    .setColor("RANDOM")
.setDescription("**<EMOJİ EKLE> • Hoşgeldin! <@" + member + "> Seninle " + üyesayısı + " Kişiyiz.\n\n<EMOJİ EKLE> • Soldaki Odalardan Birine Geçip Kayıt Olabilirsin.\n\n<EMOJİ EKLE> • Hesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n<EMOJİ EKLE> • "  + kontrol + "\n\n<EMOJİ EKLE> • Tagımızı alarak ` LOSXSTG ` bize destek olabilirsin.**")
 .setImage("https://images-ext-2.discordapp.net/external/GFDzmFva48_HXuap5Yjvt_laIzmYBZI2Eqw1WRdHnZU/https/i.pinimg.com/originals/b2/84/33/b28433c392959f923ff0d736cd89dcbd.gif")
 kanal.send(register)   
  kanal.send(losxstg) 
});


//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG



//-----------------------OTO-TAG-----------------------\\     

client.on("userUpdate", async (oldUser, newUser) => {
if (oldUser.username !== newUser.username) {
const tag = (ayarlar.tag)
const sunucu = (ayarlar.sunucuid)
const kanal = (ayarlar.taglog)
const rol = (ayarlar.tagrol)

try {

if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
}
if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
}
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
}
}
});


//-----------------------OTO-TAG-----------------------\\     

client.on("userUpdate", async (losxstg, yeni) => {
var sunucu = (ayarlar.sunucuid)
var uye = sunucu.members.cache.get(yeni.id);
var tag = (ayarlar.tag)
var rol =  (ayarlar.tagrol)
var kanal = (ayarlar.taglog)

if (!sunucu.members.has(yeni.id) || yeni.bot || losxstg.username === yeni.username) return;

if ((yeni.username).includes(tag) && !uye.roles.has(tagrol)) {
  try {
    await uye.roles.add(tagrol);
    await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
    await client.channels.cache.get(kanal).send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
  } catch (err) { console.error(err) };
};

if (!(yeni.username).includes(tag) && uye.roles.has(tagrol)) {
  try {
    await uye.roles.remove(uye.roles.filter(rol => rol.position >= sunucu.roles.get(tagrol).position));
    await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
    await client.channels.cache.get(kanal).send(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
  } catch(err) { console.error(err) };
};
});
//-----------------------OTO-TAG-----------------------\\ 

client.on("guildMemberAdd", async (member) => {
member.roles.add(ayarlar.kayitsiz)
})
