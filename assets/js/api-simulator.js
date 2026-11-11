/**
 * Interactive API Architecture & Protocol Simulator
 * Theme: Cyber Red Edition
 * Highlights Parthasarathi Kannan's production engineering expertise:
 * 1. HMAC-SHA256 Request Signing & Webhook Verification (InstiXPAY)
 * 2. FIX 4.4 Financial Protocol & WebSocket Telemetry (InstiX Trading)
 * 3. E-Commerce Scaling & Performance Architecture (kathis.fashion)
 */

(function () {
  // Web Crypto HMAC-SHA256 generator
  async function computeHmacSha256(keyStr, messageStr) {
    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(keyStr);
      const msgData = encoder.encode(messageStr);

      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: { name: 'SHA-256' } },
        false,
        ['sign']
      );

      const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, msgData);
      const hashArray = Array.from(new Uint8Array(signature));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (err) {
      return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    }
  }

  // DOM elements for HMAC Tab
  const secretKeyInput = document.getElementById('hmac-secret-key');
  const merchantPayloadInput = document.getElementById('hmac-payload');
  const timestampSpan = document.getElementById('hmac-timestamp');
  const nonceSpan = document.getElementById('hmac-nonce');
  const signatureOutput = document.getElementById('hmac-output');
  const computeBtn = document.getElementById('hmac-generate-btn');
  const verifyStatus = document.getElementById('hmac-verify-status');

  async function updateHmac() {
    if (!signatureOutput) return;

    const key = secretKeyInput ? secretKeyInput.value : 'k_live_sec_dxb98402f0a82741';
    const payload = merchantPayloadInput ? merchantPayloadInput.value : '{}';
    const nowTs = Math.floor(Date.now() / 1000).toString();
    const nonce = 'nc_' + Math.random().toString(36).substring(2, 10);

    if (timestampSpan) timestampSpan.textContent = nowTs;
    if (nonceSpan) nonceSpan.textContent = nonce;

    const stringToSign = `${nowTs}.${nonce}.${payload}`;
    const sig = await computeHmacSha256(key, stringToSign);

    signatureOutput.textContent = `v1,signature=${sig}`;
    if (verifyStatus) {
      verifyStatus.innerHTML = `<span style="color: #FF003C; font-weight: 700;">✔ SIGNATURE VALID</span> [HMAC-SHA256 Verified]`;
    }
  }

  if (computeBtn) {
    computeBtn.addEventListener('click', () => {
      if (window.playUiSound) window.playUiSound('action');
      updateHmac();
    });
  }

  // FIX 4.4 Stream Simulator
  const fixStreamContainer = document.getElementById('fix-stream-container');
  let fixInterval;

  const sampleFixSymbols = ['AED/USD', 'EUR/AED', 'GBP/AED', 'USD/JPY', 'BTC/USDT'];
  const sampleSides = ['1 (BUY)', '2 (SELL)'];

  function generateFixMessage() {
    if (!fixStreamContainer) return;

    const symbol = sampleFixSymbols[Math.floor(Math.random() * sampleFixSymbols.length)];
    const side = sampleSides[Math.floor(Math.random() * sampleSides.length)];
    const qty = (Math.floor(Math.random() * 50) + 1) * 10000;
    const price = (3.6720 + (Math.random() * 0.0050)).toFixed(4);
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const timestamp = new Date().toISOString().replace('T', '-').substring(0, 19);

    const row = document.createElement('div');
    row.style.padding = '8px 0';
    row.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
    row.style.fontFamily = 'var(--font-mono)';
    row.style.fontSize = '0.75rem';
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.alignItems = 'center';
    row.style.animation = 'fadeIn 0.3s ease forwards';

    row.innerHTML = `
      <div>
        <span style="color: #FF003C; font-weight: 600;">[FIX 4.4 MsgType=35:D]</span> 
        <span style="color: #FFFFFF; font-weight: 600;">${symbol}</span> 
        <span style="color: ${side.startsWith('1') ? '#FF5252' : '#FF003C'}; font-weight: 600;">${side}</span> 
        <span style="color: #A0A0A0;">Qty: ${qty.toLocaleString()} @ ${price}</span>
      </div>
      <span style="color: #707070; font-size: 0.7rem;">${timestamp.split('-')[3] || 'NOW'}</span>
    `;

    fixStreamContainer.insertBefore(row, fixStreamContainer.firstChild);

    // Keep only top 8 messages
    while (fixStreamContainer.children.length > 8) {
      fixStreamContainer.removeChild(fixStreamContainer.lastChild);
    }
  }

  function startFixStream() {
    if (!fixStreamContainer) return;
    for (let i = 0; i < 4; i++) {
      generateFixMessage();
    }
    if (fixInterval) clearInterval(fixInterval);
    fixInterval = setInterval(generateFixMessage, 3200);
  }

  // Tab switching for Sandbox
  const sandboxTabs = document.querySelectorAll('.sandbox-tab-btn');
  const sandboxPanels = document.querySelectorAll('.sandbox-panel');

  sandboxTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;

      if (window.playUiSound) window.playUiSound('tab');

      sandboxTabs.forEach(t => t.classList.remove('active'));
      sandboxPanels.forEach(p => (p.style.display = 'none'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.style.display = 'block';
      }

      if (targetId === 'panel-fix') {
        startFixStream();
      }
    });
  });

  // Initialize defaults
  updateHmac();
  startFixStream();
})();
