const { dc, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const ayar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
if(![(ayar.teyitçi)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

  
//KANALLAR VE ROLLER + TAG
const kayıtlı = (ayar.kadınrol)
const kayıtsız = (ayar.kayitsiz)
const chat = (ayar.chat)
const kanal = (ayar.kayıtkanal)
const savelog = (ayar.savelog)
const emoji = message.guild.emojis.cache.find(r => r.name === (ayar.emojiisim))

if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
  
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if(!member) return message.channel.send('Kimi Kayıt Etmem Gerekiyor ?')
let losxstg = message.guild.member(member)
let isim = args[1]
if(!isim) return message.reply('İsim Belirt.')
  
  
//İSİM - ROL DEĞİŞME
losxstg.setNickname(`${isim}`)  
losxstg.roles.add(kayıtlı)
losxstg.roles.remove(kayıtsız)

//DB LER
db.add(`yetkili.${message.author.id}.kadin`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)
let kadın = db.get(`yetkili.${message.author.id}.kadin`);
let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
db.set(`rol.${message.guild.id}`, (ayar.kadınrol))
db.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  isim: isim,
})
  
//CHAT EMBED
const chatembed = new MessageEmbed()
  .setColor("ffffff")
  .setDescription(`<@${losxstg.user.id}> Aramıza Hoşgeldin, Keyifli Vakitler Geçirmeni Dilerim.`)
chat.send(chatembed)
  
  
//REGİSTER CHAT EMBED
const embed = new MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı`)
.setDescription(`♦ Kaydedilen Kullanıcı: <@${losxstg.user.id}>
♣ Kaydeden Yetkili: <@${message.author.id}>
♠ Kullanıcının Yeni İsmi:\`${tag} ${isim} | ${yas}\``)
.setFooter(`Yetkilinin Toplam ${kayıtlar} Kaydı Gözüküyor.`)
.setColor('PURPLE')
message.react(emoji)
kanal.send(embed)
  
//SAVE LOG EMBED
const embed2 = new MessageEmbed()
  .setTitle(`Kayıt İşlemi Tamamlandı`)
  .addField(`• Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
  .addField(`• Kayıt Edilen:`, `<@${losxstg.user.id}> Kayıt Oldu`)
  .addField(`• Verilen Rol:`, `<@&${kayıtlı.id}> Rolü Verildi`) 
  .addField(`• Alınan Rol:`, `<@&${kayıtsız.id}> Rolü Alındı`)
  .addField(`• Yeni İsmin:`, `\`${isim}\` Olarak Güncellendi`) 
  .addField(`• Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
  .setFooter(`Alper 🧡 Register`)
  .setColor('PURPLE')
savelog.send(embed)
  
  
//DM LOG EMBED
const embed3 = new MessageEmbed()
  .setTitle(`Kayıt İşlemi Tamamlandı`)
  .setDescription(`\`${message.guild.name}\` Sunucusunda, <@${message.author.id}> Tarafından Kaydedildin.
  İsmin \`${isim}\` Olarak Değiştirildi.`)
  .setFooter(`Eğer Yanlışlık Varsa Yetkililere Bildir.`)
  .setColor('BLUE')
member.send(embed3)
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["13-15"],
    permLevel: 0
};

exports.help = {
    name: "kadın"
}

