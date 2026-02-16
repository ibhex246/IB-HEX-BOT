module.exports = {
  name: 'owner',
  category: 'Menu',
  description: 'Informations sur le propriétaire',
  usage: 'Ibowner [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande owner
      await sock.sendMessage(from, {
        text: `✅ Commande *owner* exécutée avec succès!\n\n` +
              `📝 Description: Informations sur le propriétaire\n` +
              `📂 Catégorie: Menu\n` +
              `💡 Usage: Ibowner [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans owner:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
