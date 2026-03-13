const ROLECRAFT_WIDGET_ID = 'rolecraft-floating-widget';
const ROLECRAFT_PANEL_ID = 'rolecraft-fill-panel';
const STORAGE_KEY = 'rolecraft-widget-visible';

// Content script runs in page context and cannot read extension CSS variables.
// These values are kept in sync with design tokens in globals.css (--primary, --background, --foreground, --border).
const PRIMARY = 'hsl(9, 85%, 58%)';
const PRIMARY_DARK = 'hsl(9, 85%, 50%)';
const BG_CREAM = 'hsl(45, 25%, 99%)';
const TEXT_DARK = 'hsl(0, 0%, 12%)';
const BORDER = 'hsl(45, 15%, 88%)';

function createFillPanel(): HTMLDivElement {
  const panel = document.createElement('div');
  panel.id = ROLECRAFT_PANEL_ID;
  panel.innerHTML = `
    <style>
      #${ROLECRAFT_PANEL_ID} {
        position: fixed;
        top: 50%;
        right: 60px;
        transform: translateY(-50%);
        z-index: 2147483645;
        width: 200px;
        max-width: calc(100vw - 72px);
        background: ${BG_CREAM};
        border: 1px solid ${BORDER};
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        padding: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      @media (max-width: 480px) {
        #${ROLECRAFT_PANEL_ID} {
          right: 56px;
          width: min(180px, calc(100vw - 72px));
        }
      }
      #${ROLECRAFT_PANEL_ID} h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
        color: ${TEXT_DARK};
      }
      #${ROLECRAFT_PANEL_ID} button {
        width: 100%;
        padding: 10px 16px;
        background: ${PRIMARY};
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
      }
      #${ROLECRAFT_PANEL_ID} button:hover {
        background: ${PRIMARY_DARK};
      }
      #${ROLECRAFT_PANEL_ID} button:focus-visible {
        outline: 2px solid ${PRIMARY};
        outline-offset: 2px;
      }
    </style>
    <h3>Rolecraft</h3>
    <button id="rolecraft-fill-btn" aria-label="Fill form with AI">Fill with AI</button>
  `;
  const btn = panel.querySelector('#rolecraft-fill-btn');
  btn?.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'TRIGGER_FILL' });
  });
  return panel;
}

function toggleFillPanel() {
  let panel = document.getElementById(ROLECRAFT_PANEL_ID);
  if (panel) {
    panel.remove();
    return;
  }
  panel = createFillPanel();
  document.body.appendChild(panel);
}

function createWidget(): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.id = ROLECRAFT_WIDGET_ID;
  wrapper.setAttribute('role', 'button');
  wrapper.setAttribute('aria-label', 'Rolecraft - Show fill prompt');
  wrapper.setAttribute('tabindex', '0');
  wrapper.title = 'Show fill prompt';

  const styles = `
    #${ROLECRAFT_WIDGET_ID} {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      z-index: 2147483646;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: -2px 2px 12px rgba(0,0,0,0.12);
      border-radius: 12px 0 0 12px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    #${ROLECRAFT_WIDGET_ID}:hover {
      transform: translateY(-50%) translateX(-2px);
      box-shadow: -4px 4px 16px rgba(0,0,0,0.15);
    }
    #${ROLECRAFT_WIDGET_ID} .rc-main {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${PRIMARY};
      padding: 12px 14px 12px 14px;
      min-height: 52px;
      min-width: 52px;
    }
    #${ROLECRAFT_WIDGET_ID} .rc-main:hover {
      background: ${PRIMARY_DARK};
    }
    #${ROLECRAFT_WIDGET_ID} .rc-icon {
      width: 24px;
      height: 24px;
      color: white;
      flex-shrink: 0;
    }
    #${ROLECRAFT_WIDGET_ID} .rc-close {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 44px;
      height: 44px;
      min-width: 44px;
      min-height: 44px;
      border: none;
      background: rgba(255,255,255,0.25);
      color: white;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: background 0.2s;
    }
    #${ROLECRAFT_WIDGET_ID} .rc-close:hover {
      background: rgba(255,255,255,0.4);
    }
    #${ROLECRAFT_WIDGET_ID} .rc-close:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }
    #${ROLECRAFT_WIDGET_ID} .rc-tooltip {
      position: absolute;
      bottom: -28px;
      left: 50%;
      transform: translateX(-50%);
      background: ${TEXT_DARK};
      color: white;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s, bottom 0.2s;
    }
    #${ROLECRAFT_WIDGET_ID}:hover .rc-tooltip {
      opacity: 1;
      bottom: -24px;
    }
    #${ROLECRAFT_WIDGET_ID}:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  wrapper.appendChild(styleEl);

  const main = document.createElement('div');
  main.className = 'rc-main';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'rc-close';
  closeBtn.innerHTML = '×';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    hideWidget();
  };

  const iconSvg = `<svg class="rc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M12 12l1.5 4.5L18 18l-4.5 1.5L12 24l-1.5-4.5L6 18l4.5-1.5L12 12z"/></svg>`;

  const iconWrap = document.createElement('div');
  iconWrap.innerHTML = iconSvg;
  iconWrap.className = 'rc-icon';

  const tooltip = document.createElement('span');
  tooltip.className = 'rc-tooltip';
  tooltip.textContent = 'Show fill prompt';

  main.appendChild(closeBtn);
  main.appendChild(iconWrap.firstElementChild!);
  main.appendChild(tooltip);
  wrapper.appendChild(main);

  wrapper.onclick = (e) => {
    if ((e.target as HTMLElement).closest('.rc-close')) return;
    toggleFillPanel();
  };

  wrapper.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFillPanel();
    }
  };

  return wrapper;
}

function showWidget() {
  let widget = document.getElementById(ROLECRAFT_WIDGET_ID);
  if (!widget) {
    widget = createWidget();
    document.body.appendChild(widget);
  }
  widget.style.display = '';
}

function hideWidget() {
  const widget = document.getElementById(ROLECRAFT_WIDGET_ID);
  if (widget) {
    widget.style.display = 'none';
  }
  try {
    chrome.storage.local.set({ [STORAGE_KEY]: false });
  } catch {
    // ignore
  }
}

function init() {
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    const visible = result[STORAGE_KEY] !== false;
    if (visible) {
      showWidget();
    }
  });

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'TOGGLE_WIDGET') {
      const widget = document.getElementById(ROLECRAFT_WIDGET_ID);
      if (widget && widget.style.display !== 'none') {
        hideWidget();
      } else {
        showWidget();
        chrome.storage.local.set({ [STORAGE_KEY]: true });
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
