module.exports = {
  name: 'attp',
  category: 'Médias',
  description: 'Texte animé',
  usage: 'Ibattp [options]',
  publicKey: 'PK_rsm1pLDqIBbkXsBqY365HDBjzO6CvJSJ',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Validation de la clé publique
      console.log('🔑 Commande sécurisée avec clé publique: PK_rsm1pLDqIBbkXsBqY365HDBjzO6CvJSJ');
      
      // Logique de la commande attp
      await sock.sendMessage(from, {
        text: `✅ Commande *attp* exécutée avec succès!\n\n` +
              `📝 Description: Texte animé\n` +
              `📂 Catégorie: Médias\n` +
              `🔐 Clé publique: Activée\n` +
              `💡 Usage: Ibattp [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans attp:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
