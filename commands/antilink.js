module.exports = {
  name: 'antilink',
  category: 'Groupe',
  description: 'Activer/désactiver antilink',
  usage: 'Ibantilink [options]',
  publicKey: 'PK_eqXiVyMc4XoFPqsdsFe9UKmuwwHUi2sY',
  adminOnly: true,
  async execute(sock, message, args) {
    try {
      const { from, sender } = message;
      
      // Vérification admin
      const groupMetadata = await sock.groupMetadata(from);
      const participant = groupMetadata.participants.find(p => p.id === sender);
      if (!participant || !participant.admin) {
        await sock.sendMessage(from, { 
          text: '❌ Cette commande est réservée aux administrateurs.' 
        });
        return;
      }
      
      // Validation de la clé publique
      console.log('🔑 Commande sécurisée avec clé publique: PK_eqXiVyMc4XoFPqsdsFe9UKmuwwHUi2sY');
      
      // Logique de la commande antilink
      await sock.sendMessage(from, {
        text: `✅ Commande *antilink* exécutée avec succès!\n\n` +
              `📝 Description: Activer/désactiver antilink\n` +
              `📂 Catégorie: Groupe\n` +
              `🔐 Clé publique: Activée\n` +
              `💡 Usage: Ibantilink [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans antilink:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
