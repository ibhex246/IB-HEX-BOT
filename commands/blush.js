module.exports = {
  name: 'blush',
  category: 'Réactions',
  description: 'Rougir',
  usage: 'Ibblush [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande blush
      await sock.sendMessage(from, {
        text: `✅ Commande *blush* exécutée avec succès!\n\n` +
              `📝 Description: Rougir\n` +
              `📂 Catégorie: Réactions\n` +
              `💡 Usage: Ibblush [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans blush:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
