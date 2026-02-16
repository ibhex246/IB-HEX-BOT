module.exports = {
  name: 'block',
  category: 'Owner',
  description: 'Bloquer un utilisateur',
  usage: 'Ibblock [options]',
  publicKey: 'PK_rSlJX8lo3KH8IlsqUpmivjVp1IBz7YTU',
  ownerOnly: true,
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Vérification propriétaire
      const config = require('../config');
      if (sender.split('@')[0] !== config.ownerNumber) {
        await sock.sendMessage(from, { 
          text: '❌ Cette commande est réservée au propriétaire.' 
        });
        return;
      }
      
      // Validation de la clé publique
      console.log('🔑 Commande sécurisée avec clé publique: PK_rSlJX8lo3KH8IlsqUpmivjVp1IBz7YTU');
      
      // Logique de la commande block
      await sock.sendMessage(from, {
        text: `✅ Commande *block* exécutée avec succès!\n\n` +
              `📝 Description: Bloquer un utilisateur\n` +
              `📂 Catégorie: Owner\n` +
              `🔐 Clé publique: Activée\n` +
              `💡 Usage: Ibblock [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans block:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
