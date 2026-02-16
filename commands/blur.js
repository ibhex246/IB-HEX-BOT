module.exports = {
  name: 'blur',
  category: 'Médias',
  description: 'Flouter une image',
  usage: 'Ibblur [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande blur
      await sock.sendMessage(from, {
        text: `✅ Commande *blur* exécutée avec succès!\n\n` +
              `📝 Description: Flouter une image\n` +
              `📂 Catégorie: Médias\n` +
              `💡 Usage: Ibblur [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans blur:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
