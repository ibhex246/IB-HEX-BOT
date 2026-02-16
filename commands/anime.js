module.exports = {
  name: 'anime',
  category: 'Divers',
  description: 'Image anime',
  usage: 'Ibanime [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande anime
      await sock.sendMessage(from, {
        text: `✅ Commande *anime* exécutée avec succès!\n\n` +
              `📝 Description: Image anime\n` +
              `📂 Catégorie: Divers\n` +
              `💡 Usage: Ibanime [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans anime:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
