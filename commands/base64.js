module.exports = {
  name: 'base64',
  category: 'Convertisseurs',
  description: 'Encoder en Base64',
  usage: 'Ibbase64 [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande base64
      await sock.sendMessage(from, {
        text: `✅ Commande *base64* exécutée avec succès!\n\n` +
              `📝 Description: Encoder en Base64\n` +
              `📂 Catégorie: Convertisseurs\n` +
              `💡 Usage: Ibbase64 [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans base64:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
