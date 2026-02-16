module.exports = {
  name: 'chatbot',
  category: 'IA',
  description: 'Bot conversationnel',
  usage: 'Ibchatbot [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande chatbot
      await sock.sendMessage(from, {
        text: `✅ Commande *chatbot* exécutée avec succès!\n\n` +
              `📝 Description: Bot conversationnel\n` +
              `📂 Catégorie: IA\n` +
              `💡 Usage: Ibchatbot [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans chatbot:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
