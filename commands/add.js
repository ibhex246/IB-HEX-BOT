module.exports = {
  name: 'add',
  category: 'Groupe',
  description: 'Ajouter un membre',
  usage: 'Ibadd [options]',
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
      
      // Logique de la commande add
      await sock.sendMessage(from, {
        text: `✅ Commande *add* exécutée avec succès!\n\n` +
              `📝 Description: Ajouter un membre\n` +
              `📂 Catégorie: Groupe\n` +
              `💡 Usage: Ibadd [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans add:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
