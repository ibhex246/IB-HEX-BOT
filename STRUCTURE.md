# Structure du Projet IB-HEX-BOT

## 📁 Arborescence

```
ib-hex-bot/
│
├── 📄 package.json           # Dépendances Node.js
├── 📄 config.js              # Configuration du bot
├── 📄 index.js               # Serveur Express + Interface web
├── 📄 bot.js                 # Logique principale du bot
├── 📄 .gitignore             # Fichiers à ignorer
├── 📄 README.md              # Documentation
├── 📄 DEPLOYMENT.md          # Guide de déploiement
├── 📄 STRUCTURE.md           # Ce fichier
│
├── 📁 utils/                 # Utilitaires
│   └── 📄 commandHandler.js  # Gestionnaire de commandes
│
└── 📁 commands/              # 200 commandes
    ├── 📄 menu.js            # Menu principal
    ├── 📄 alive.js           # Vérifier état
    ├── 📄 ping.js            # Vitesse
    ├── 📄 owner.js           # Propriétaire
    ├── 📄 tagall.js          # Mentionner tous
    ├── 📄 tagadmin.js        # Mentionner admins
    ├── 📄 ninja.js           # Commande 🥷
    ├── 📄 vv.js              # Vue unique
    ├── 📄 sticker.js         # Créer sticker
    ├── 📄 kick.js            # Exclure membre
    ├── 📄 add.js             # Ajouter membre
    ├── 📄 promote.js         # Promouvoir admin
    ├── 📄 demote.js          # Rétrograder admin
    ├── 📄 open.js            # Ouvrir groupe
    ├── 📄 close.js           # Fermer groupe
    └── ... 185 autres commandes
```

## 📊 Statistiques

- **Total de fichiers:** 207
- **Commandes:** 200
- **Lignes de code:** ~10,000+
- **Taille:** ~500 KB

## 🔑 Fichiers Principaux

### package.json
Contient toutes les dépendances nécessaires :
- @whiskeysockets/baileys (WhatsApp API)
- express (Serveur web)
- qrcode (Génération QR)
- axios (Requêtes HTTP)
- Et plus...

### config.js
Configuration centralisée :
- Nom du bot
- Numéro propriétaire
- Préfixe
- Messages système

### index.js
- Serveur web Express
- Interface pour scanner QR code
- Endpoints API (/qr, /status)
- Page HTML responsive

### bot.js
- Connexion WhatsApp via Baileys
- Gestion des messages
- Exécution des commandes
- Gestion de la reconnexion

### commandHandler.js
- Chargement dynamique des commandes
- Vérification des permissions
- Gestion des erreurs

## 🎨 Fonctionnalités

### ✅ Gestion de Groupe
- Mentionner tous les membres
- Mentionner admins uniquement
- Ajouter/Exclure membres
- Promouvoir/Rétrograder admins
- Ouvrir/Fermer groupe
- Infos du groupe

### ✅ Médias
- Créer stickers
- Voir messages vue unique
- Télécharger en privé (🥷)
- Convertir médias

### ✅ Intelligence Artificielle
- ChatGPT
- Google Gemini
- Discussions IA

### ✅ Téléchargements
- YouTube (audio/vidéo)
- TikTok
- Instagram
- Facebook
- Twitter
- Spotify

### ✅ Utilitaires
- Traduction
- QR Code
- Calculatrice
- Météo
- Actualités

### ✅ Divertissement
- Jeux
- Blagues
- Citations
- Anime
- Réactions

### ✅ Religion
- Coran
- Hadith
- Heures de prière
- Bible

## 🚀 Commandes par Catégorie

1. **Menu (10 commandes)**
   - menu, alive, ping, owner, dev, runtime, stats, info, about, help

2. **Groupe (20 commandes)**
   - tagall, tagadmin, kick, add, promote, demote, open, close, linkgc, groupinfo, kickall, acceptall, getall, antilink, antisticker, resetlink, grouplist, vcf, create

3. **Owner (15 commandes)**
   - join, leave, block, unblock, broadcast, setbio, setname, delete, upload, 🥷, vv

4. **Médias (25 commandes)**
   - sticker, toimage, take, attp, smeme, emoji, removebg, blur, enhance, photo, filter, edit, grayscale, resize

5. **Téléchargements (20 commandes)**
   - play, song, video, tiktok, instagram, facebook, twitter, spotify, ytmp3, ytmp4, mediafire, apk, pinterest, soundcloud, drive

6. **IA (10 commandes)**
   - ai, gpt, gemini, chatbot, chat, ask, think, code, bug

7. **Convertisseurs (15 commandes)**
   - tomp3, tomp4, toaudio, tovideo, topdf, tourl, ss, url, fancy, qr, readqr

8. **Jeux (10 commandes)**
   - tictactoe, trivia, math, guess, flip, roll, slot, quiz, dare, truth

9. **Religion (10 commandes)**
   - quran, ayah, hadith, prayer, bible

10. **Réactions (45 commandes)**
    - slap, hug, kiss, smile, wave, dance, poke, yeet, nom, smug, cringe, happy, laugh, wink, cry, pat, bite, lick, tickle, pout, shrug, think, blush, nervous, scared, angry, confused, surprised, bored, tired, sleepy, dizzy, sick, hot, cold, hungry, thirsty, celebrate, party, congrats

11. **Utilitaires (15 commandes)**
    - translate, calc, weather, time, currency, crypto, covid, country, wiki, news, movie, truecaller, hash, encrypt, decrypt

12. **Divers (20 commandes)**
    - joke, quote, fact, meme, anime, waifu, neko, manga, cosplay, logo, logo3d, neon, glitch, thunder, graffiti, ship, rate, profile, couple, poll

## 🎯 Préfixe

Toutes les commandes utilisent le préfixe **Ib** (majuscule obligatoire)

Exemples :
- `Ibmenu`
- `Ibalive`
- `Ibtagall`
- `Ib🥷`

## 💻 Technologies Utilisées

- **Node.js** - Runtime JavaScript
- **Baileys** - WhatsApp Web API
- **Express.js** - Serveur web
- **QRCode** - Génération QR codes
- **Axios** - Requêtes HTTP
- **Pino** - Logging

## 📱 Compatibilité

- ✅ Android
- ✅ iOS (via navigateur)
- ✅ PC (tous navigateurs)
- ✅ Render (hébergement)
- ✅ WhatsApp Business

## 🔄 Mise à Jour

Pour ajouter une nouvelle commande :

1. Créez un fichier dans `commands/`
2. Utilisez le template de commande
3. Commitez sur GitHub
4. Render redéploie automatiquement

## 📞 Support

Développeur : **Ibrahima Sory Sacko**
Téléphone : **+224621963059**
Version : **2.0**

---

*IB-HEX-BOT - 200 commandes en français* 🥷
