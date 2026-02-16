/**
 * Test des commandes IB-HEX-BOT
 * Vérifie que toutes les commandes sont correctement formatées
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Démarrage des tests...\n');

const commandsDir = path.join(__dirname, 'commands');
const files = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

let totalCommands = 0;
let validCommands = 0;
let commandsWithKey = 0;
let adminCommands = 0;
let ownerCommands = 0;
let errors = [];

const categories = {};

files.forEach(file => {
  totalCommands++;
  
  try {
    const command = require(path.join(commandsDir, file));
    
    // Vérifications de base
    if (!command.name) {
      errors.push(`❌ ${file}: Nom manquant`);
      return;
    }
    
    if (!command.category) {
      errors.push(`❌ ${file}: Catégorie manquante`);
      return;
    }
    
    if (!command.description) {
      errors.push(`❌ ${file}: Description manquante`);
      return;
    }
    
    if (!command.execute || typeof command.execute !== 'function') {
      errors.push(`❌ ${file}: Fonction execute manquante ou invalide`);
      return;
    }
    
    validCommands++;
    
    // Statistiques
    if (command.publicKey) commandsWithKey++;
    if (command.adminOnly) adminCommands++;
    if (command.ownerOnly) ownerCommands++;
    
    // Comptage par catégorie
    if (!categories[command.category]) {
      categories[command.category] = 0;
    }
    categories[command.category]++;
    
  } catch (error) {
    errors.push(`❌ ${file}: Erreur de chargement - ${error.message}`);
  }
});

// Affichage des résultats
console.log('📊 RÉSULTATS DES TESTS\n');
console.log('═══════════════════════════════════════\n');

console.log(`Total de commandes:        ${totalCommands}`);
console.log(`Commandes valides:         ${validCommands} ✅`);
console.log(`Commandes invalides:       ${totalCommands - validCommands} ❌`);
console.log(`Commandes avec clé:        ${commandsWithKey} 🔐`);
console.log(`Commandes admin:           ${adminCommands} 👮`);
console.log(`Commandes owner:           ${ownerCommands} 👑`);
console.log(`\nTaux de réussite:          ${((validCommands / totalCommands) * 100).toFixed(2)}%\n`);

console.log('═══════════════════════════════════════\n');
console.log('📂 RÉPARTITION PAR CATÉGORIE\n');

// Tri des catégories par nombre de commandes
const sortedCategories = Object.entries(categories)
  .sort((a, b) => b[1] - a[1]);

sortedCategories.forEach(([category, count]) => {
  const bar = '█'.repeat(Math.ceil(count / 2));
  console.log(`${category.padEnd(20)} ${count.toString().padStart(3)} ${bar}`);
});

console.log('\n═══════════════════════════════════════\n');

// Affichage des erreurs
if (errors.length > 0) {
  console.log('⚠️  ERREURS DÉTECTÉES\n');
  errors.forEach(error => console.log(error));
  console.log('\n═══════════════════════════════════════\n');
} else {
  console.log('✅ AUCUNE ERREUR DÉTECTÉE!\n');
  console.log('═══════════════════════════════════════\n');
}

// Vérification des clés publiques
console.log('🔐 VÉRIFICATION DES CLÉS PUBLIQUES\n');

const keysMap = {};
const duplicateKeys = [];

files.forEach(file => {
  try {
    const command = require(path.join(commandsDir, file));
    if (command.publicKey) {
      if (keysMap[command.publicKey]) {
        duplicateKeys.push({
          key: command.publicKey,
          files: [keysMap[command.publicKey], file]
        });
      } else {
        keysMap[command.publicKey] = file;
      }
      
      // Vérifier le format de la clé
      if (!command.publicKey.startsWith('PK_') || command.publicKey.length !== 35) {
        errors.push(`❌ ${file}: Clé publique invalide (${command.publicKey})`);
      }
    }
  } catch (error) {
    // Déjà traité
  }
});

if (duplicateKeys.length > 0) {
  console.log('⚠️  Clés dupliquées détectées:\n');
  duplicateKeys.forEach(dup => {
    console.log(`   ${dup.key}`);
    console.log(`   - ${dup.files.join('\n   - ')}\n`);
  });
} else {
  console.log('✅ Toutes les clés publiques sont uniques!\n');
}

console.log('═══════════════════════════════════════\n');

// Résumé final
if (validCommands === totalCommands && errors.length === 0 && duplicateKeys.length === 0) {
  console.log('🎉 TOUS LES TESTS SONT PASSÉS AVEC SUCCÈS!\n');
  console.log('✅ Toutes les commandes sont correctement formatées');
  console.log('✅ Aucune erreur détectée');
  console.log('✅ Toutes les clés publiques sont valides et uniques');
  console.log('\n🚀 Le bot est prêt à être déployé!\n');
} else {
  console.log('⚠️  CERTAINS TESTS ONT ÉCHOUÉ\n');
  console.log('Veuillez corriger les erreurs avant le déploiement.\n');
  process.exit(1);
}

console.log('═══════════════════════════════════════\n');
