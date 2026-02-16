module.exports = {
  name: 'alive',
  category: 'Menu',
  description: 'Vérifie si le bot est actif',
  usage: 'Ibalive [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande alive
      await sock.sendMessage(from, {
        text: `✅ Commande *alive* exécutée avec succès!\n\n` +
              `📝 Description: Vérifie si le bot est actif\n` +
              `📂 Catégorie: Menu\n` +
              `💡 Usage: Ibalive [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans alive:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
