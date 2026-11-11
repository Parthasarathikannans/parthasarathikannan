/**
 * Minimal Terminal Introduction & Console
 * Color: Crimson (#C0392B / #BA372A)
 */

(function () {
  const terminalLinesContainer = document.getElementById('terminal-lines');
  const terminalInput = document.getElementById('term-input');

  if (!terminalLinesContainer) return;

  const bootSequence = [
    { text: 'Initializing Developer Portfolio...', status: null, delay: 200 },
    { text: 'Backend Systems:', status: 'ONLINE', delay: 400 },
    { text: 'API Integrations:', status: 'ACTIVE', delay: 400 },
    { text: 'Cloud Infrastructure:', status: 'CONNECTED', delay: 400 }
  ];

  async function typeLine(item) {
    const lineEl = document.createElement('div');
    lineEl.className = 'term-line';

    const promptSpan = document.createElement('span');
    promptSpan.className = 'term-prompt-char';
    promptSpan.textContent = '>';
    lineEl.appendChild(promptSpan);

    const textSpan = document.createElement('span');
    textSpan.textContent = item.text;
    lineEl.appendChild(textSpan);

    if (item.status) {
      const statusSpan = document.createElement('span');
      statusSpan.className = 'term-ok';
      statusSpan.textContent = item.status;
      lineEl.appendChild(statusSpan);
    }

    terminalLinesContainer.appendChild(lineEl);
  }

  async function runBoot() {
    for (const step of bootSequence) {
      await new Promise(r => setTimeout(r, step.delay));
      await typeLine(step);
    }
  }

  const commands = {
    help: () => [
      'Available commands:',
      '  skills    - List core backend & API stack',
      '  projects  - Show featured production platforms',
      '  contact   - Get direct email & phone',
      '  clear     - Clear terminal screen'
    ],
    skills: () => [
      '• Backend: PHP (Core & OOP), Laravel, Python, .NET, MVC',
      '• APIs: REST API, WebSocket API, FIX API, HMAC Request Signing, Webhook Verification',
      '• Database: MySQL, Schema Design, Optimization, Indexing',
      '• Cloud: Microsoft Azure, VM Management, Linux, Docker'
    ],
    projects: () => [
      '[1] InstiXPAY (FinTech / Payment Gateway)',
      '[2] InstiX Trading Platform (FinTech / Trading Infrastructure)',
      '[3] kathis.fashion (E-Commerce Platform - Live)'
    ],
    contact: () => [
      'Email: parthasarathi.skannan@gmail.com',
      'Phone: +971 50 725 6658',
      'Location: Dubai, UAE'
    ]
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        if (!cmd) return;

        const line = document.createElement('div');
        line.className = 'term-line';
        line.innerHTML = `<span class="term-prompt-char">></span> <span style="color:#FFF;">${cmd}</span>`;
        terminalLinesContainer.appendChild(line);

        if (cmd === 'clear') {
          terminalLinesContainer.innerHTML = '';
          return;
        }

        const out = commands[cmd];
        const resBox = document.createElement('div');
        resBox.style.padding = '4px 0 6px 16px';
        resBox.style.fontSize = '0.8rem';
        resBox.style.color = '#A3A3A3';

        if (out) {
          resBox.innerHTML = out().map(l => `<div>${l}</div>`).join('');
        } else {
          resBox.innerHTML = `Unknown command: '${cmd}'. Type <span style="color:#C0392B;">help</span>.`;
        }

        terminalLinesContainer.appendChild(resBox);
      }
    });
  }

  runBoot();
})();
