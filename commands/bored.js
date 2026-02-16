module.exports = {
  name: 'bored',
  category: 'Réactions',
  description: 'Ennuyé',
  usage: 'Ibbored [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande bored
      await sock.sendMessage(from, {
        text: `✅ Commande *bored* exécutée avec succès!\n\n` +
              `📝 Description: Ennuyé\n` +
              `📂 Catégorie: Réactions\n` +
              `💡 Usage: Ibbored [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans bored:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
