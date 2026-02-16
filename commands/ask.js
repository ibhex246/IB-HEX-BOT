module.exports = {
  name: 'ask',
  category: 'IA',
  description: 'Poser une question',
  usage: 'Ibask [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande ask
      await sock.sendMessage(from, {
        text: `✅ Commande *ask* exécutée avec succès!\n\n` +
              `📝 Description: Poser une question\n` +
              `📂 Catégorie: IA\n` +
              `💡 Usage: Ibask [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans ask:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
