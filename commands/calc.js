module.exports = {
  name: 'calc',
  category: 'Utilitaires',
  description: 'Calculatrice',
  usage: 'Ibcalc [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande calc
      await sock.sendMessage(from, {
        text: `✅ Commande *calc* exécutée avec succès!\n\n` +
              `📝 Description: Calculatrice\n` +
              `📂 Catégorie: Utilitaires\n` +
              `💡 Usage: Ibcalc [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans calc:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
