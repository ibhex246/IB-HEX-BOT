# IB-HEX-BOT

🥷 **Bot WhatsApp IB-HEX-BOT avec 200 commandes en français**

## 📱 Fonctionnalités

- ✅ 200+ commandes en français
- ✅ Préfixe: `Ib`
- ✅ Interface web pour scanner QR Code
- ✅ Gestion de groupes WhatsApp
- ✅ Téléchargement de médias
- ✅ Commandes IA
- ✅ Et bien plus !

## 🚀 Déploiement sur Render (depuis téléphone Android)

### Étape 1 : Créer un compte GitHub
1. Ouvrez votre navigateur sur Android
2. Allez sur [github.com](https://github.com)
3. Créez un compte si vous n'en avez pas

### Étape 2 : Créer un nouveau repository
1. Sur GitHub, cliquez sur le bouton **"+"** en haut à droite
2. Sélectionnez **"New repository"**
3. Nom du repository : `ib-hex-bot`
4. Mettez-le en **Public**
5. Cliquez sur **"Create repository"**

### Étape 3 : Uploader les fichiers
1. Sur la page du repository, cliquez sur **"uploading an existing file"**
2. Téléchargez TOUS les fichiers de ce projet :
   - `package.json`
   - `config.js`
   - `index.js`
   - `bot.js`
   - Dossier `utils/`
   - Dossier `commands/`
   - Dossier `public/`

**OU** Utilisez GitHub Mobile :
1. Téléchargez l'application **GitHub** depuis Play Store
2. Connectez-vous
3. Créez un nouveau fichier pour chaque fichier du projet
4. Copiez-collez le contenu de chaque fichier

### Étape 4 : Déployer sur Render
1. Allez sur [render.com](https://render.com)
2. Créez un compte (vous pouvez utiliser votre compte GitHub)
3. Cliquez sur **"New +"** puis **"Web Service"**
4. Connectez votre repository GitHub `ib-hex-bot`
5. Configurez :
   - **Name**: `ib-hex-bot`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Sélectionnez **Free**
6. Cliquez sur **"Create Web Service"**

### Étape 5 : Scanner le QR Code
1. Attendez que le déploiement se termine (5-10 minutes)
2. Render vous donnera une URL (exemple: `https://ib-hex-bot.onrender.com`)
3. Ouvrez cette URL dans votre navigateur
4. Ouvrez WhatsApp > Menu (3 points) > **Appareils connectés**
5. **Connecter un appareil**
6. Scannez le QR Code affiché sur la page web
7. ✅ Votre bot est maintenant connecté !

## 📝 Configuration

Modifiez le fichier `config.js` pour personnaliser :
- Numéro du propriétaire
- Nom du bot
- Préfixe des commandes
- Image du menu

## 🎯 Utilisation

Envoyez simplement une commande avec le préfixe `Ib` :

```
Ibmenu          → Afficher le menu
Ibalive         → Vérifier le bot
Ibtagall        → Mentionner tous
Ib🥷            → Télécharger médias en privé
```

## 🛠️ Commandes Disponibles

### Menu Principal
- `menu` - Menu complet
- `alive` - État du bot
- `ping` - Vitesse
- `owner` - Propriétaire

### Groupe
- `tagall` - Mentionner tous
- `tagadmin` - Mentionner admins
- `kick` - Exclure membre
- `add` - Ajouter membre
- `promote` - Promouvoir admin
- `demote` - Rétrograder admin
- `open` - Ouvrir groupe
- `close` - Fermer groupe

### Owner
- `🥷` - Télécharger en privé
- `vv` - Voir messages vue unique
- `join` - Rejoindre groupe
- `leave` - Quitter groupe
- `block` - Bloquer
- `broadcast` - Diffusion

### Médias
- `sticker` - Créer sticker
- `toimage` - Vers image
- `take` - Modifier sticker

### IA
- `ai` - Intelligence artificielle
- `gpt` - ChatGPT
- `gemini` - Google Gemini

### Téléchargements
- `play` - YouTube
- `tiktok` - TikTok
- `instagram` - Instagram
- `facebook` - Facebook

... et 180+ autres commandes !

## 💡 Astuces

### Garder le bot actif
Render met en veille les applications gratuites après 15 minutes d'inactivité. Pour éviter cela :
1. Utilisez [UptimeRobot](https://uptimerobot.com) (gratuit)
2. Ajoutez votre URL Render
3. Ping toutes les 5 minutes

### Mise à jour
Pour mettre à jour votre bot :
1. Modifiez les fichiers sur GitHub depuis votre téléphone
2. Render redéploiera automatiquement

## ⚠️ Important

- Le bot nécessite une connexion internet stable
- Ne partagez jamais votre QR Code
- Le dossier `auth_info` contient vos credentials WhatsApp
- Render peut prendre quelques minutes pour démarrer

## 🔧 Dépannage

### Le QR Code ne s'affiche pas
- Attendez 2-3 minutes après le déploiement
- Rafraîchissez la page
- Vérifiez les logs sur Render

### Le bot ne répond pas
- Vérifiez que le bot est connecté (status "Connected")
- Assurez-vous d'utiliser le bon préfixe : `Ib`
- Vérifiez les logs pour les erreurs

### Déconnexion fréquente
- Utilisez UptimeRobot pour garder le bot actif
- Vérifiez votre connexion WhatsApp

## 👨‍💻 Développeur

**Ibrahima Sory Sacko**
- 📱 Numéro : +224621963059
- 🤖 Bot : IB-HEX-BOT v2.0

## 📄 Licence

MIT License - Libre d'utilisation

## 🌟 Support

Pour toute question ou problème :
1. Vérifiez d'abord la section Dépannage
2. Consultez les logs sur Render
3. Contactez le développeur

---

*Propulsé par Ibrahima Sory Sacko™* 🥷
