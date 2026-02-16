/**
 * IB-HEX-BOT - Client JavaScript
 * Version 2.0
 * Développé par Ibrahima Sory Sacko
 */

class IBHexBotClient {
  constructor() {
    this.checkInterval = null;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.init();
  }

  init() {
    console.log('🥷 IB-HEX-BOT Client initialisé');
    this.setupEventListeners();
    this.loadQR();
  }

  setupEventListeners() {
    // Bouton refresh
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.refreshQR());
    }

    // Détection de la visibilité de la page
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkStatus();
      }
    });
  }

  async loadQR() {
    try {
      this.updateStatus('loading', '⏳ Chargement du QR Code...');
      
      const response = await fetch('/qr');
      const data = await response.json();
      
      const container = document.getElementById('qr-container');
      
      if (data.qr) {
        container.innerHTML = `
          <img id="qr-code" src="${data.qr}" alt="QR Code" class="fade-in">
          <p style="margin-top: 15px; color: #666;">
            Scannez avec WhatsApp
          </p>
        `;
        this.updateStatus('loading', '📱 Scannez le QR Code avec WhatsApp');
        this.startStatusCheck();
        this.retryCount = 0;
      } else if (data.message) {
        container.innerHTML = `
          <div class="fade-in">
            <div style="font-size: 3em; margin-bottom: 10px;">✅</div>
            <p style="color: #28a745; font-size: 1.2em; font-weight: bold;">
              ${data.message}
            </p>
          </div>
        `;
        this.updateStatus('connected', '✅ Bot connecté avec succès!');
        this.stopStatusCheck();
      }
    } catch (error) {
      console.error('Erreur de chargement:', error);
      this.handleError('Erreur de chargement du QR Code');
    }
  }

  async checkStatus() {
    try {
      const response = await fetch('/status');
      const data = await response.json();
      
      if (data.connected) {
        this.updateStatus('connected', '✅ Bot connecté et opérationnel!');
        
        const container = document.getElementById('qr-container');
        container.innerHTML = `
          <div class="fade-in">
            <div style="font-size: 4em; margin-bottom: 15px;">🥷</div>
            <h2 style="color: #28a745; margin-bottom: 10px;">
              Connexion établie!
            </h2>
            <p style="color: #666;">
              Le bot est maintenant en ligne et prêt à recevoir des commandes.
            </p>
            ${this.renderStats(data.stats)}
          </div>
        `;
        
        this.stopStatusCheck();
      }
    } catch (error) {
      console.error('Erreur de vérification:', error);
      // Ne pas afficher d'erreur si c'est juste une vérification de routine
    }
  }

  renderStats(stats) {
    if (!stats) return '';
    
    return `
      <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: left;">
          <div>
            <strong>📊 Commandes:</strong> ${stats.commands || 215}
          </div>
          <div>
            <strong>🔐 Sécurisées:</strong> ${stats.secured || 47}
          </div>
          <div>
            <strong>⏱️ Uptime:</strong> ${this.formatUptime(stats.uptime)}
          </div>
          <div>
            <strong>💬 Messages:</strong> ${stats.messages || 0}
          </div>
        </div>
      </div>
    `;
  }

  formatUptime(ms) {
    if (!ms) return '0s';
    
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }

  updateStatus(type, message) {
    const status = document.getElementById('status');
    if (status) {
      status.className = `status ${type}`;
      status.innerHTML = `
        <span class="security-indicator"></span>
        ${message}
      `;
    }
  }

  handleError(message) {
    this.retryCount++;
    
    const container = document.getElementById('qr-container');
    container.innerHTML = `
      <div class="fade-in">
        <div style="font-size: 3em; margin-bottom: 10px;">⚠️</div>
        <p style="color: #dc3545; font-weight: bold;">
          ${message}
        </p>
        ${this.retryCount < this.maxRetries ? 
          `<p style="color: #666; margin-top: 10px;">
            Nouvelle tentative dans 3 secondes...
          </p>` : 
          `<p style="color: #666; margin-top: 10px;">
            Veuillez actualiser la page manuellement.
          </p>`
        }
      </div>
    `;
    
    this.updateStatus('error', '❌ Erreur de connexion au serveur');
    
    if (this.retryCount < this.maxRetries) {
      setTimeout(() => this.loadQR(), 3000);
    }
  }

  startStatusCheck() {
    this.stopStatusCheck();
    this.checkInterval = setInterval(() => this.checkStatus(), 3000);
  }

  stopStatusCheck() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  refreshQR() {
    this.retryCount = 0;
    this.stopStatusCheck();
    
    const container = document.getElementById('qr-container');
    container.innerHTML = `
      <div class="spinner"></div>
      <p>Actualisation...</p>
    `;
    
    setTimeout(() => this.loadQR(), 500);
  }
}

// Initialisation au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
  window.ibHexBot = new IBHexBotClient();
});

// Message de bienvenue dans la console
console.log(`
  ╔═══════════════════════════════════════╗
  ║                                       ║
  ║         IB-HEX-BOT v2.0              ║
  ║                                       ║
  ║   200+ commandes en français 🥷      ║
  ║                                       ║
  ║   Développé par:                     ║
  ║   Ibrahima Sory Sacko                ║
  ║   +224621963059                      ║
  ║                                       ║
  ╚═══════════════════════════════════════╝
`);
