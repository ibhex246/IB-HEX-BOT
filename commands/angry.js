module.exports = {
  name: 'angry',
  category: 'Réactions',
  description: 'En colère',
  usage: 'Ibangry [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande angry
      await sock.sendMessage(from, {
        text: `✅ Commande *angry* exécutée avec succès!\n\n` +
              `📝 Description: En colère\n` +
              `📂 Catégorie: Réactions\n` +
              `💡 Usage: Ibangry [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans angry:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
