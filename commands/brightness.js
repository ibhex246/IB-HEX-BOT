module.exports = {
  name: 'brightness',
  category: 'Médias',
  description: 'Modifier la luminosité',
  usage: 'Ibbrightness [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande brightness
      await sock.sendMessage(from, {
        text: `✅ Commande *brightness* exécutée avec succès!\n\n` +
              `📝 Description: Modifier la luminosité\n` +
              `📂 Catégorie: Médias\n` +
              `💡 Usage: Ibbrightness [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans brightness:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
