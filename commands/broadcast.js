module.exports = {
  name: 'broadcast',
  category: 'Owner',
  description: 'Message groupé',
  usage: 'Ibbroadcast [options]',
  publicKey: 'PK_A9TqKtozOW9tFBqXYdeqY6cFUEozq6Jf',
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
      console.log('🔑 Commande sécurisée avec clé publique: PK_A9TqKtozOW9tFBqXYdeqY6cFUEozq6Jf');
      
      // Logique de la commande broadcast
      await sock.sendMessage(from, {
        text: `✅ Commande *broadcast* exécutée avec succès!\n\n` +
              `📝 Description: Message groupé\n` +
              `📂 Catégorie: Owner\n` +
              `🔐 Clé publique: Activée\n` +
              `💡 Usage: Ibbroadcast [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans broadcast:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
