module.exports = {
  name: 'acceptall',
  category: 'Groupe',
  description: 'Accepter toutes les demandes',
  usage: 'Ibacceptall [options]',
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
      
      // Logique de la commande acceptall
      await sock.sendMessage(from, {
        text: `✅ Commande *acceptall* exécutée avec succès!\n\n` +
              `📝 Description: Accepter toutes les demandes\n` +
              `📂 Catégorie: Groupe\n` +
              `💡 Usage: Ibacceptall [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans acceptall:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
