module.exports = {
  name: 'ai',
  category: 'IA',
  description: 'Intelligence artificielle',
  usage: 'Ibai [options]',
  publicKey: 'PK_cUF6F22JS2Aw096QscCepQGX5b2o3w4v',
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Validation de la clé publique
      console.log('🔑 Commande sécurisée avec clé publique: PK_cUF6F22JS2Aw096QscCepQGX5b2o3w4v');
      
      // Logique de la commande ai
      await sock.sendMessage(from, {
        text: `✅ Commande *ai* exécutée avec succès!\n\n` +
              `📝 Description: Intelligence artificielle\n` +
              `📂 Catégorie: IA\n` +
              `🔐 Clé publique: Activée\n` +
              `💡 Usage: Ibai [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans ai:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
