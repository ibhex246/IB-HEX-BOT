import makeWASocket, { 
    DisconnectReason, 
    useMultiFileAuthState,
    makeInMemoryStore,
    downloadMediaMessage
} from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'
import config from './config.js'
import { loadCommands, handleCommand } from './utils/commandHandler.js'

let sock
let qrCode = null
let store

export function getQR() {
    return qrCode
}

export async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
    
    // Store pour gérer les messages
    store = makeInMemoryStore({ 
        logger: pino().child({ level: 'silent', stream: 'store' }) 
    })

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        browser: ['IB-HEX-BOT', 'Chrome', '2.0'],
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg?.message || undefined
            }
            return undefined
        }
    })

    store?.bind(sock.ev)

    // Charger toutes les commandes
    await loadCommands()

    // Gestion de la connexion
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update

        if (qr) {
            qrCode = qr
            console.log('📱 QR Code généré')
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)
                ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
                : true

            console.log('❌ Connexion fermée. Reconnexion:', shouldReconnect)

            if (shouldReconnect) {
                startBot()
            }
        } else if (connection === 'open') {
            qrCode = null
            console.log('✅ Bot connecté avec succès!')
            console.log(`🥷 IB-HEX-BOT v${config.version} est actif`)
            
            // Envoyer un message de confirmation au propriétaire
            const ownerJid = config.ownerNumber + '@s.whatsapp.net'
            try {
                await sock.sendMessage(ownerJid, {
                    text: `╭─⌈ 🥷 IB-HEX-BOT ⌋\n│\n│ ✅ Bot connecté avec succès!\n│ 🤖 Version: ${config.version}\n│ 👤 Propriétaire: ${config.ownerName}\n│ 💻 Développeur: ${config.developer}\n│\n╰─⌊ Propulsé par Ibrahima Sory Sacko™ ⌉`
                })
            } catch (error) {
                console.log('Impossible d\'envoyer le message au propriétaire')
            }
        }
    })

    // Sauvegarder les credentials
    sock.ev.on('creds.update', saveCreds)

    // Gestion des messages
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return

        const msg = messages[0]
        if (!msg.message) return
        if (msg.key.fromMe) return

        // Extraire le texte du message
        const messageText = msg.message.conversation || 
                          msg.message.extendedTextMessage?.text || 
                          msg.message.imageMessage?.caption ||
                          msg.message.videoMessage?.caption || ''

        // Vérifier si c'est une commande (commence par le préfixe)
        if (!messageText.startsWith(config.prefix)) return

        // Extraire la commande
        const args = messageText.slice(config.prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        console.log(`📩 Commande reçue: ${config.prefix}${commandName}`)

        // Exécuter la commande
        await handleCommand(sock, msg, commandName, args)
    })

    return sock
}

export function getSocket() {
    return sock
}
