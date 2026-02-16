export default {
    // Informations du bot
    botName: 'IB-HEX-BOT',
    version: '2.0',
    prefix: 'Ib',
    
    // Propriétaire
    ownerNumber: '224621963059',
    ownerName: 'IbSacko',
    developer: 'Ibrahima Sory Sacko',
    
    // Image du menu
    menuImage: 'https://i.ibb.co/fYbBRWyy/IMG-20260210-WA0152.jpg',
    
    // Mode du bot
    mode: 'privé', // ou 'public'
    
    // Port pour le serveur web
    port: process.env.PORT || 3000,
    
    // Messages
    messages: {
        ownerOnly: '❌ Cette commande est réservée au propriétaire !',
        groupOnly: '❌ Cette commande fonctionne uniquement dans les groupes !',
        adminOnly: '❌ Cette commande est réservée aux administrateurs !',
        botAdminRequired: '❌ Le bot doit être administrateur pour exécuter cette commande !',
        wait: '⏳ Patientez un instant...',
        error: '❌ Une erreur est survenue !',
        success: '✅ Commande exécutée avec succès !'
    }
}
