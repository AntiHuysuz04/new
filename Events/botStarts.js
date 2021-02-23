module.exports = () => {
    console.log("Bot başarıyla çalıştırıldı.");
    client.user.setPresence({ activity: { name: "Hmm" }, status: "idle" });
  }
  module.exports.configuration = {
    name: "ready"
  }