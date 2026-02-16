module.exports = {
  name: 'bonk',
  category: 'Réactions',
  description: 'Taper',
  usage: 'Ibbonk [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande bonk
      await sock.sendMessage(from, {
        text: `✅ Commande *bonk* exécutée avec succès!\n\n` +
              `📝 Description: Taper\n` +
              `📂 Catégorie: Réactions\n` +
              `💡 Usage: Ibbonk [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans bonk:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
