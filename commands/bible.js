module.exports = {
  name: 'bible',
  category: 'Religion',
  description: 'Versets de la Bible',
  usage: 'Ibbible [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande bible
      await sock.sendMessage(from, {
        text: `✅ Commande *bible* exécutée avec succès!\n\n` +
              `📝 Description: Versets de la Bible\n` +
              `📂 Catégorie: Religion\n` +
              `💡 Usage: Ibbible [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans bible:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
