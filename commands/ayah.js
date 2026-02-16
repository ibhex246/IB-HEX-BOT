module.exports = {
  name: 'ayah',
  category: 'Religion',
  description: 'Ayah aléatoire',
  usage: 'Ibayah [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande ayah
      await sock.sendMessage(from, {
        text: `✅ Commande *ayah* exécutée avec succès!\n\n` +
              `📝 Description: Ayah aléatoire\n` +
              `📂 Catégorie: Religion\n` +
              `💡 Usage: Ibayah [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans ayah:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
