module.exports = {
  name: 'bug',
  category: 'IA',
  description: 'Corriger un bug',
  usage: 'Ibbug [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande bug
      await sock.sendMessage(from, {
        text: `✅ Commande *bug* exécutée avec succès!\n\n` +
              `📝 Description: Corriger un bug\n` +
              `📂 Catégorie: IA\n` +
              `💡 Usage: Ibbug [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans bug:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
