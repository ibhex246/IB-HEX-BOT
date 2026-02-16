module.exports = {
  name: 'bite',
  category: 'Réactions',
  description: 'Mordre',
  usage: 'Ibbite [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande bite
      await sock.sendMessage(from, {
        text: `✅ Commande *bite* exécutée avec succès!\n\n` +
              `📝 Description: Mordre\n` +
              `📂 Catégorie: Réactions\n` +
              `💡 Usage: Ibbite [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans bite:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
