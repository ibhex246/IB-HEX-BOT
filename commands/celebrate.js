module.exports = {
  name: 'celebrate',
  category: 'Réactions',
  description: 'Célébrer',
  usage: 'Ibcelebrate [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande celebrate
      await sock.sendMessage(from, {
        text: `✅ Commande *celebrate* exécutée avec succès!\n\n` +
              `📝 Description: Célébrer\n` +
              `📂 Catégorie: Réactions\n` +
              `💡 Usage: Ibcelebrate [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans celebrate:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
