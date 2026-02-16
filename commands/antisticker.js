module.exports = {
  name: 'antisticker',
  category: 'Groupe',
  description: 'Activer/désactiver antisticker',
  usage: 'Ibantisticker [options]',
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
      
      // Logique de la commande antisticker
      await sock.sendMessage(from, {
        text: `✅ Commande *antisticker* exécutée avec succès!\n\n` +
              `📝 Description: Activer/désactiver antisticker\n` +
              `📂 Catégorie: Groupe\n` +
              `💡 Usage: Ibantisticker [options]`
      });
      
    } catch (error) {
      console.error(`Erreur dans antisticker:`, error);
      await sock.sendMessage(message.from, {
        text: '❌ Une erreur s'est produite lors de l'exécution de la commande.'
      });
    }
  }
};
