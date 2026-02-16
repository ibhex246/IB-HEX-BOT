module.exports = {
  name: 'binary',
  category: 'Convertisseurs',
  description: 'Convertir en binaire',
  usage: 'Ibbinary [options]',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Logique de la commande binary
      await sock.sendMessage(from, {
        text: `✅ Commande *binary* exécutée avec succès!\n\n` +
              `📝 Description: Convertir en binaire\n` +
              `📂 Catégorie: Convertisseurs\n` +
              `💡 Usage: Ibbinary [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans binary:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
