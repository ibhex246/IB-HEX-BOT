module.exports = {
  name: 'about',
  category: 'Menu',
  description: 'À propos du bot',
  usage: 'Ibabout [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande about
      await sock.sendMessage(from, {
        text: `✅ Commande *about* exécutée avec succès!\n\n` +
              `📝 Description: À propos du bot\n` +
              `📂 Catégorie: Menu\n` +
              `💡 Usage: Ibabout [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans about:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
