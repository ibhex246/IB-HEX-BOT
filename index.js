import express from 'express'
import { createServer } from 'http'
import qrcode from 'qrcode'
import { startBot, getQR } from './bot.js'
import config from './config.js'

const app = express()
const server = createServer(app)

// Middleware
app.use(express.json())
app.use(express.static('public'))

// Variable pour stocker le QR code
let currentQR = null

// Page d'accueil avec QR code
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IB-HEX-BOT - Connexion</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 40px;
            max-width: 500px;
            width: 100%;
            text-align: center;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2em;
        }
        .emoji {
            font-size: 3em;
            margin-bottom: 20px;
        }
        .info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .info p {
            margin: 10px 0;
            color: #555;
        }
        .qr-container {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border: 2px solid #667eea;
        }
        #qrcode {
            max-width: 100%;
            height: auto;
        }
        .status {
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            font-weight: bold;
        }
        .status.connecting {
            background: #fff3cd;
            color: #856404;
        }
        .status.connected {
            background: #d4edda;
            color: #155724;
        }
        .status.error {
            background: #f8d7da;
            color: #721c24;
        }
        .btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1em;
            cursor: pointer;
            margin: 10px;
            transition: all 0.3s;
        }
        .btn:hover {
            background: #764ba2;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .footer {
            margin-top: 20px;
            color: #999;
            font-size: 0.9em;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .loading {
            animation: pulse 1.5s infinite;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="emoji">🥷</div>
        <h1>IB-HEX-BOT</h1>
        <p style="color: #666; margin-bottom: 20px;">Version ${config.version}</p>
        
        <div class="info">
            <p><strong>👤 Propriétaire:</strong> ${config.ownerName}</p>
            <p><strong>💻 Développeur:</strong> ${config.developer}</p>
            <p><strong>📱 Préfixe:</strong> ${config.prefix}</p>
        </div>

        <div class="status connecting" id="status">
            <span class="loading">⏳ Génération du QR code...</span>
        </div>

        <div class="qr-container" id="qrContainer" style="display:none;">
            <img id="qrcode" alt="QR Code">
            <p style="margin-top: 15px; color: #666;">
                Scannez ce QR code avec WhatsApp<br>
                <small>WhatsApp > Menu > Appareils connectés > Connecter un appareil</small>
            </p>
        </div>

        <button class="btn" onclick="refreshQR()">🔄 Actualiser QR Code</button>

        <div class="footer">
            <p>Propulsé par Ibrahima Sory Sacko™</p>
        </div>
    </div>

    <script>
        let checkInterval;

        async function loadQR() {
            try {
                const response = await fetch('/qr');
                const data = await response.json();
                
                if (data.qr) {
                    document.getElementById('qrcode').src = data.qr;
                    document.getElementById('qrContainer').style.display = 'block';
                    document.getElementById('status').className = 'status connecting';
                    document.getElementById('status').innerHTML = '<span class="loading">⏳ En attente du scan...</span>';
                    startChecking();
                } else if (data.connected) {
                    document.getElementById('status').className = 'status connected';
                    document.getElementById('status').textContent = '✅ Bot connecté !';
                    document.getElementById('qrContainer').style.display = 'none';
                    stopChecking();
                } else {
                    document.getElementById('status').className = 'status connecting';
                    document.getElementById('status').innerHTML = '<span class="loading">⏳ Initialisation...</span>';
                    setTimeout(loadQR, 2000);
                }
            } catch (error) {
                document.getElementById('status').className = 'status error';
                document.getElementById('status').textContent = '❌ Erreur de connexion';
                setTimeout(loadQR, 5000);
            }
        }

        async function checkStatus() {
            try {
                const response = await fetch('/status');
                const data = await response.json();
                
                if (data.connected) {
                    document.getElementById('status').className = 'status connected';
                    document.getElementById('status').textContent = '✅ Bot connecté avec succès !';
                    document.getElementById('qrContainer').style.display = 'none';
                    stopChecking();
                }
            } catch (error) {
                console.error('Erreur vérification:', error);
            }
        }

        function startChecking() {
            stopChecking();
            checkInterval = setInterval(checkStatus, 3000);
        }

        function stopChecking() {
            if (checkInterval) {
                clearInterval(checkInterval);
            }
        }

        function refreshQR() {
            location.reload();
        }

        // Charger le QR au démarrage
        loadQR();
    </script>
</body>
</html>
    `)
})

// Endpoint pour obtenir le QR code
app.get('/qr', async (req, res) => {
    try {
        const qrData = getQR()
        if (qrData) {
            const qrImage = await qrcode.toDataURL(qrData)
            res.json({ qr: qrImage })
        } else {
            res.json({ connected: true })
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur génération QR' })
    }
})

// Endpoint pour vérifier le statut
app.get('/status', (req, res) => {
    res.json({ connected: getQR() === null })
})

// Démarrer le serveur
server.listen(config.port, () => {
    console.log(`🚀 Serveur démarré sur le port ${config.port}`)
    console.log(`🌐 Accédez à: http://localhost:${config.port}`)
    startBot()
})
