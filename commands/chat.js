module.exports = {
  name: 'chat',
  category: 'IA',
  description: 'Discuter avec l'IA',
  usage: 'Ibchat [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande chat
      await sock.sendMessage(from, {
        text: `✅ Commande *chat* exécutée avec succès!\n\n` +
              `📝 Description: Discuter avec l'IA\n` +
              `📂 Catégorie: IA\n` +
              `💡 Usage: Ibchat [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans chat:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
