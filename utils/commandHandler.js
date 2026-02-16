import { readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import config from '../config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const commands = new Map()

// Charger toutes les commandes
export async function loadCommands() {
    const commandsPath = join(__dirname, '../commands')
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        try {
            const command = await import(`../commands/${file}`)
            if (command.default) {
                commands.set(command.default.name, command.default)
                console.log(`✅ Commande chargée: ${command.default.name}`)
            }
        } catch (error) {
            console.error(`❌ Erreur chargement ${file}:`, error)
        }
    }

    console.log(`📦 ${commands.size} commandes chargées`)
}

// Gérer l'exécution des commandes
export async function handleCommand(sock, msg, commandName, args) {
    const command = commands.get(commandName)
    
    if (!command) return

    const remoteJid = msg.key.remoteJid
    const sender = msg.key.participant || msg.key.remoteJid
    const isGroup = remoteJid.includes('@g.us')
    const isOwner = sender.split('@')[0] === config.ownerNumber

    // Vérifications
    if (command.ownerOnly && !isOwner) {
        return await sock.sendMessage(remoteJid, { 
            text: config.messages.ownerOnly 
        }, { quoted: msg })
    }

    if (command.groupOnly && !isGroup) {
        return await sock.sendMessage(remoteJid, { 
            text: config.messages.groupOnly 
        }, { quoted: msg })
    }

    if (command.adminOnly && isGroup) {
        const groupMetadata = await sock.groupMetadata(remoteJid)
        const participant = groupMetadata.participants.find(p => p.id === sender)
        
        if (!participant?.admin && !isOwner) {
            return await sock.sendMessage(remoteJid, { 
                text: config.messages.adminOnly 
            }, { quoted: msg })
        }
    }

    // Exécuter la commande
    try {
        await command.execute(sock, msg, args)
    } catch (error) {
        console.error(`Erreur commande ${commandName}:`, error)
        await sock.sendMessage(remoteJid, { 
            text: config.messages.error 
        }, { quoted: msg })
    }
}

export { commands }
