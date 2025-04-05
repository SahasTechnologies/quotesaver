document.addEventListener('DOMContentLoaded', () => {
      // --- DOM Elements ---
      const body = document.body;
      const root = document.documentElement;
      const navItems = document.querySelectorAll('.nav-item');
      const mainContent = document.querySelector('.main-content');
      const settingsButton = document.querySelector('.settings-button');
      const importFileInput = document.getElementById('importFile');

      // Modals & Controls
      const welcomeModalOverlay = document.getElementById('welcomeModal');
      const quoteModalOverlay = document.getElementById('addQuoteModal');
      const chainModalOverlay = document.getElementById('addChainModal');
      const paragraphModalOverlay = document.getElementById('addParagraphModal');
      const settingsModalOverlay = document.getElementById('settingsModal');
      const downloadModalOverlay = document.getElementById('downloadModal');
      const previewModalOverlay = document.getElementById('previewModal');
      const termsModalOverlay = document.getElementById('termsModal');
      const privacyModalOverlay = document.getElementById('privacyModal');
      const licenseModalOverlay = document.getElementById('licenseModal');
      const accentColorModalOverlay = document.getElementById('accentColorModal');
      // const customColorModalOverlay = document.getElementById('customColorModal'); // Removed
      const feedbackModalOverlay = document.getElementById('feedbackModal');

      // Welcome Modal Elements
      const agreementCheckbox = document.getElementById('agreementCheckbox');
      const localStorageConsentCheckbox = document.getElementById('localStorageConsentCheckbox');
      const getStartedBtn = document.getElementById('getStartedBtn');
      const welcomeColorSwatchesContainer = document.getElementById('welcomeColorSwatchesContainer');
      const welcomeImportBtn = document.getElementById('welcomeImportBtn');

      // Quote Modal Elements
      const quoteModalCloseBtn = quoteModalOverlay.querySelector('.modal-close-btn');
      const addQuoteForm = document.getElementById('addQuoteForm');
      const quoteModalTitle = document.getElementById('modalTitle');
      const quoteSaveButtonText = document.getElementById('saveButtonText');
      const quoteIdInput = document.getElementById('quoteId');

      // Chain Modal Elements
      const chainModalCloseBtn = chainModalOverlay.querySelector('.modal-close-btn');
      const addChainForm = document.getElementById('addChainForm');
      const chainModalTitle = document.getElementById('chainModalTitle');
      const chainSaveButtonText = document.getElementById('saveChainButtonText');
      const chainIdInput = document.getElementById('chainId');
      const chainQuoteSelect = document.getElementById('chainQuoteSelect');
      const chainEffectsContainer = document.getElementById('chainEffectsContainer');
      const addEffectBtn = document.getElementById('addEffectBtn');

      // Paragraph Modal Elements
      const paragraphModalCloseBtn = paragraphModalOverlay.querySelector('.modal-close-btn');
      const addParagraphForm = document.getElementById('addParagraphForm');
      const paragraphModalTitle = document.getElementById('paragraphModalTitle');
      const paragraphSaveButtonText = document.getElementById('saveParagraphButtonText');
      const paragraphIdInput = document.getElementById('paragraphId');
      const paragraphChainSelect = document.getElementById('paragraphChainSelect');
      const paragraphTextInput = document.getElementById('paragraphText');

      // Settings Modal Elements
      const settingsModalCloseBtn = settingsModalOverlay.querySelector('.modal-close-btn');
      const darkModeToggle = document.getElementById('darkModeToggle');
      const accentColorBtn = document.getElementById('accentColorBtn');
      const openDownloadBtn = document.getElementById('openDownloadBtn');
      const importBtn = document.getElementById('importBtn');
      const feedbackBtn = document.getElementById('feedbackBtn');
      const termsBtn = document.getElementById('termsBtn');
      const privacyBtn = document.getElementById('privacyBtn');
      const licenseBtn = document.getElementById('licenseBtn');
      const deleteAllDataBtn = document.getElementById('deleteAllDataBtn'); // Delete button

      // Download Modal Elements
      const downloadModalCloseBtn = downloadModalOverlay.querySelector('.modal-close-btn');
      const downloadQuotesToggle = document.getElementById('downloadQuotesToggle');
      const downloadChainsToggle = document.getElementById('downloadChainsToggle');
      const downloadParagraphsToggle = document.getElementById('downloadParagraphsToggle');
      const downloadTxtBtn = document.getElementById('downloadTxtBtn');

      // Preview Modal Elements
      const previewModalCloseBtn = previewModalOverlay.querySelector('.modal-close-btn');
      const previewContent = document.getElementById('previewContent');

      // Terms Modal Elements
      const termsModalCloseBtn = termsModalOverlay.querySelector('.modal-close-btn');
      const termsContent = document.getElementById('termsContent');

      // Privacy Modal Elements
      const privacyModalCloseBtn = privacyModalOverlay.querySelector('.modal-close-btn');
      const privacyContent = document.getElementById('privacyContent');

      // License Modal Elements
      const licenseModalCloseBtn = licenseModalOverlay.querySelector('.modal-close-btn');
      const licenseContent = document.getElementById('licenseContent');

      // Accent Color Modal Elements
      const accentColorModalCloseBtn = accentColorModalOverlay.querySelector('.modal-close-btn');
      const colorSwatchesContainer = document.getElementById('colorSwatchesContainer');

      // Custom Color Modal Elements - Removed

      // Feedback Modal Elements
      const feedbackModalCloseBtn = feedbackModalOverlay.querySelector('.modal-close-btn');
      const feedbackForm = document.getElementById('feedbackForm');
      const feedbackNameInput = document.getElementById('feedbackName');
      const feedbackDescriptionInput = document.getElementById('feedbackDescription');
      const sendFeedbackBtn = document.getElementById('sendFeedbackBtn');


      // --- Constants ---
      const QUOTES_STORAGE_KEY = 'quoteSaver_quotes';
      const CHAINS_STORAGE_KEY = 'quoteSaver_chains';
      const PARAGRAPHS_STORAGE_KEY = 'quoteSaver_paragraphs';
      const THEME_STORAGE_KEY = 'quoteSaver_theme';
      const ACCENT_COLOR_STORAGE_KEY = 'quoteSaver_accentColor';
      const WELCOME_SEEN_KEY = 'quoteSaver_welcomeSeen';
      const HIGHLIGHT_CLASS = 'highlighted-card';
      const HIGHLIGHT_DURATION = 1500;
      const DEFAULT_ACCENT_COLOR = '#6750A4';
      const PRESET_ACCENT_COLORS = [
          { main: '#6750A4', hover: '#5a4091' }, { main: '#006d77', hover: '#005a63' },
          { main: '#d90429', hover: '#b50322' }, { main: '#f77f00', hover: '#d36c00' },
          { main: '#0077b6', hover: '#006398' }, { main: '#52b788', hover: '#459c74' },
      ];

      // --- State ---
      let currentSection = 'quotes';
      let isWelcomeScreenOpen = false;

      // --- Initialization ---
      function initialize() {
        // Removed EmailJS init
        applyTheme();
        setupEventListeners();
        checkWelcomeScreen();
        const initialSection = document.querySelector('.nav-item.active')?.dataset.section || 'quotes';
        setActiveSection(initialSection, true);
      }

      // --- Event Listeners Setup ---
      function setupEventListeners() {
        navItems.forEach(item => item.addEventListener('click', handleNavClick));
        settingsButton.addEventListener('click', openSettingsModal);

        // Welcome Modal
        if (welcomeModalOverlay) {
            agreementCheckbox?.addEventListener('change', updateGetStartedButtonState);
            localStorageConsentCheckbox?.addEventListener('change', updateGetStartedButtonState);
            getStartedBtn?.addEventListener('click', handleGetStarted);
            welcomeModalOverlay.addEventListener('click', handleWelcomeLegalLinks);
            welcomeColorSwatchesContainer?.addEventListener('click', handleWelcomeColorSwatchClick);
            welcomeImportBtn?.addEventListener('click', () => importFileInput.click());
        }

        // CRUD Modals
        setupModalListeners(quoteModalOverlay, quoteModalCloseBtn, closeQuoteModal);
        addQuoteForm.addEventListener('submit', handleQuoteFormSubmit);
        setupModalListeners(chainModalOverlay, chainModalCloseBtn, closeChainModal);
        addChainForm.addEventListener('submit', handleChainFormSubmit);
        addEffectBtn.addEventListener('click', () => addEffectInput());
        chainEffectsContainer.addEventListener('click', handleEffectAction);
        setupModalListeners(paragraphModalOverlay, paragraphModalCloseBtn, closeParagraphModal);
        addParagraphForm.addEventListener('submit', handleParagraphFormSubmit);

        // Settings & Download Modals
        setupModalListeners(settingsModalOverlay, settingsModalCloseBtn, closeSettingsModal);
        darkModeToggle.addEventListener('change', handleThemeToggle);
        accentColorBtn.addEventListener('click', openAccentColorModal);
        openDownloadBtn.addEventListener('click', openDownloadModal);
        importBtn.addEventListener('click', () => importFileInput.click());
        importFileInput.addEventListener('change', handleImportFileSelect);
        feedbackBtn.addEventListener('click', openFeedbackModal);
        termsBtn.addEventListener('click', openTermsModal);
        privacyBtn.addEventListener('click', openPrivacyModal);
        licenseBtn.addEventListener('click', openLicenseModal);
        deleteAllDataBtn?.addEventListener('click', handleDeleteAllData); // Listener for Delete All
        setupModalListeners(downloadModalOverlay, downloadModalCloseBtn, closeDownloadModal);
        downloadTxtBtn.addEventListener('click', handleDownloadAction);

        // Preview Modal
        setupModalListeners(previewModalOverlay, previewModalCloseBtn, closePreviewModal);

        // Legal Modals
        setupModalListeners(termsModalOverlay, termsModalCloseBtn, closeTermsModal);
        setupModalListeners(privacyModalOverlay, privacyModalCloseBtn, closePrivacyModal);
        setupModalListeners(licenseModalOverlay, licenseModalCloseBtn, closeLicenseModal);

        // Accent Color Modal
        setupModalListeners(accentColorModalOverlay, accentColorModalCloseBtn, closeAccentColorModal);
        colorSwatchesContainer.addEventListener('click', handleColorSwatchClick);
        // Removed listeners for custom color modal

        // Feedback Modal
        setupModalListeners(feedbackModalOverlay, feedbackModalCloseBtn, closeFeedbackModal);
        feedbackForm.addEventListener('submit', handleFeedbackSubmit); // Reverted to mailto handler

        mainContent.addEventListener('click', handleMainContentClick);
      }

      function setupModalListeners(modalOverlay, closeBtn, closeFn) {
          if (!modalOverlay || !closeBtn) { console.warn("Missing elements for modal listener setup:", modalOverlay, closeBtn); return; }
          closeBtn.addEventListener('click', closeFn);
          // Close on overlay click, EXCEPT for the welcome modal
          if (modalOverlay.id !== 'welcomeModal') {
              modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeFn(); });
          }
      }

      // --- Welcome Screen ---
      function checkWelcomeScreen() { /* ... */ if (!localStorage.getItem(WELCOME_SEEN_KEY)) { isWelcomeScreenOpen = true; populateColorSwatches(welcomeColorSwatchesContainer); updateGetStartedButtonState(); welcomeModalOverlay.style.display = 'flex'; setTimeout(() => welcomeModalOverlay.classList.add('visible'), 10); } }
      function updateGetStartedButtonState() { /* ... */ if (getStartedBtn) { getStartedBtn.disabled = !(agreementCheckbox?.checked && localStorageConsentCheckbox?.checked); } }
      function handleGetStarted() { /* ... */ if (!agreementCheckbox?.checked || !localStorageConsentCheckbox?.checked) return; localStorage.setItem(WELCOME_SEEN_KEY, 'true'); closeWelcomeModal(); }
      function closeWelcomeModal() { /* ... */ isWelcomeScreenOpen = false; welcomeModalOverlay.classList.remove('visible'); welcomeModalOverlay.addEventListener('transitionend', () => { welcomeModalOverlay.style.display = 'none'; }, { once: true }); }
      function handleWelcomeLegalLinks(event) {
          const target = event.target.closest('a[data-action]');
          if (!target) return;
          event.preventDefault();
          const action = target.dataset.action;

          // Hide welcome modal content temporarily
          const welcomeContent = welcomeModalOverlay.querySelector('.modal-content');
          if (welcomeContent) welcomeContent.style.visibility = 'hidden'; // Hide content, keep overlay

          if (action === 'open-terms-welcome') openTermsModal(false);
          if (action === 'open-privacy-welcome') openPrivacyModal(false);
          if (action === 'open-license-welcome') openLicenseModal(false);
      }

      // --- Theme & Accent Color Handling ---
      function applyTheme() { /* ... */ const savedTheme = localStorage.getItem(THEME_STORAGE_KEY); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; if (savedTheme === 'dark' || (!savedTheme && prefersDark)) { body.classList.add('dark-mode'); darkModeToggle.checked = true; } else { body.classList.remove('dark-mode'); darkModeToggle.checked = false; } const savedAccentColor = localStorage.getItem(ACCENT_COLOR_STORAGE_KEY) || DEFAULT_ACCENT_COLOR; const presetMatch = PRESET_ACCENT_COLORS.find(c => c.main === savedAccentColor); if (presetMatch) { applyAccentColor(presetMatch.main, presetMatch.hover); } else { const hoverColor = calculateHoverColor(savedAccentColor); applyAccentColor(savedAccentColor, hoverColor); } }
      function handleThemeToggle() { /* ... */ if (darkModeToggle.checked) { body.classList.add('dark-mode'); localStorage.setItem(THEME_STORAGE_KEY, 'dark'); } else { body.classList.remove('dark-mode'); localStorage.setItem(THEME_STORAGE_KEY, 'light'); } applyTheme(); }
      function applyAccentColor(mainColor, hoverColor) { /* ... */ root.style.setProperty('--primary-color', mainColor); root.style.setProperty('--primary-hover-color', hoverColor); const highlightAlpha = body.classList.contains('dark-mode') ? '66' : '33'; root.style.setProperty('--highlight-color', mainColor + highlightAlpha); root.style.setProperty('--toggle-bg-on', mainColor); }
      function calculateHoverColor(hex) { /* ... */ hex = hex.replace('#', ''); let r = parseInt(hex.substring(0, 2), 16); let g = parseInt(hex.substring(2, 4), 16); let b = parseInt(hex.substring(4, 6), 16); r = Math.max(0, Math.floor(r * 0.85)); g = Math.max(0, Math.floor(g * 0.85)); b = Math.max(0, Math.floor(b * 0.85)); return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`; }

      // --- Navigation & Content Rendering ---
      function handleNavClick(event) { /* ... */ event.preventDefault(); const section = event.currentTarget.dataset.section; setActiveSection(section); }
      function setActiveSection(section, isInitialLoad = false) { /* ... */ if (!isInitialLoad && section === currentSection) return; currentSection = section; navItems.forEach(item => { item.classList.toggle('active', item.dataset.section === section); }); renderContent(section); }
      function renderContent(section) { /* ... */ mainContent.innerHTML = ''; switch (section) { case 'quotes': renderQuotesPage(); break; case 'chains': renderChainsPage(); break; case 'paragraphs': renderParagraphsPage(); break; default: mainContent.innerHTML = '<h2>Welcome</h2><p>Select a section.</p>'; } }

      // --- Generic Get/Save/Escape ---
      function getItems(key) { /* ... */ const itemsJson = localStorage.getItem(key); return itemsJson ? JSON.parse(itemsJson) : []; }
      function saveItems(key, items) { /* ... */ localStorage.setItem(key, JSON.stringify(items)); }
      function escapeHtml(unsafe) { /* ... */ if (unsafe === null || unsafe === undefined) return ''; return unsafe.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }

      // --- Quotes Section ---
      function renderQuotesPage() { /* ... */ mainContent.innerHTML = `<div class="main-content-header"><h2>Quotes</h2><button class="add-button" data-action="add-quote"><span class="material-symbols-rounded">add</span> Add Quote</button></div><div class="quotes-container cards-container" id="quotesList"></div>`; displayQuotes(); }
      function getQuotes() { /* ... */ let quotes = getItems(QUOTES_STORAGE_KEY); quotes.sort((a, b) => { const pageA = parseInt(a.page, 10); const pageB = parseInt(b.page, 10); const isANumeric = !isNaN(pageA); const isBNumeric = !isNaN(pageB); if (isANumeric && isBNumeric) return pageA - pageB; else if (isANumeric) return -1; else if (isBNumeric) return 1; else return 0; }); return quotes; }
      function saveQuotes(quotes) { saveItems(QUOTES_STORAGE_KEY, quotes); }
      function displayQuotes() { /* ... */ const container = mainContent.querySelector('#quotesList'); if (!container) return; const quotes = getQuotes(); container.innerHTML = ''; if (quotes.length === 0) { container.innerHTML = `<p class="no-items-message">No quotes saved yet. Click 'Add Quote' to get started!</p>`; } else { quotes.forEach(quote => { const card = document.createElement('div'); card.className = 'quote-card'; card.dataset.id = quote.id; const blockquote = document.createElement('blockquote'); blockquote.textContent = quote.text; blockquote.title = quote.text; card.innerHTML = `${blockquote.outerHTML}${quote.technique ? `<p><strong>Technique:</strong> ${escapeHtml(quote.technique)}</p>` : ''}${quote.description ? `<p><strong>Description:</strong> ${escapeHtml(quote.description)}</p>` : ''}<div class="quote-card-footer">${quote.page ? `<span class="page-number">Page: ${escapeHtml(quote.page.toString())}</span>` : '<span></span>'}<div class="quote-actions"><button class="icon-button edit-btn" aria-label="Edit quote" data-action="edit-quote" data-id="${quote.id}"><span class="material-symbols-rounded">edit</span></button><button class="icon-button preview-btn" aria-label="Preview quote" data-action="preview-quote" data-id="${quote.id}"><span class="material-symbols-rounded">visibility</span></button><button class="icon-button delete-btn" aria-label="Delete quote" data-action="delete-quote" data-id="${quote.id}"><span class="material-symbols-rounded">delete</span></button></div></div>`; container.appendChild(card); }); } }
      function handleQuoteFormSubmit(event) { /* ... */ event.preventDefault(); const editingId = quoteIdInput.value; const quoteData = { id: editingId || Date.now().toString(), text: document.getElementById('quoteText').value.trim(), technique: document.getElementById('quoteTechnique').value.trim(), description: document.getElementById('quoteDescription').value.trim(), page: document.getElementById('quotePage').value.trim() }; if (!quoteData.text) { alert('Quote text cannot be empty!'); return; } let quotes = getQuotes(); if (editingId) { const index = quotes.findIndex(q => q.id === editingId); if (index !== -1) quotes[index] = quoteData; else quotes.push(quoteData); } else { quotes.push(quoteData); } saveQuotes(quotes); closeQuoteModal(); if (currentSection === 'quotes') displayQuotes(); }
      function openQuoteModal(quoteData = null) { /* ... */ addQuoteForm.reset(); if (quoteData) { quoteModalTitle.textContent = 'Edit Quote'; quoteSaveButtonText.textContent = 'Save Changes'; quoteIdInput.value = quoteData.id; document.getElementById('quoteText').value = quoteData.text || ''; document.getElementById('quoteTechnique').value = quoteData.technique || ''; document.getElementById('quoteDescription').value = quoteData.description || ''; document.getElementById('quotePage').value = quoteData.page || ''; } else { quoteModalTitle.textContent = 'Add New Quote'; quoteSaveButtonText.textContent = 'Save Quote'; quoteIdInput.value = ''; } quoteModalOverlay.style.display = 'flex'; setTimeout(() => quoteModalOverlay.classList.add('visible'), 10); }
      function closeQuoteModal() { /* ... */ quoteModalOverlay.classList.remove('visible'); quoteModalOverlay.addEventListener('transitionend', () => { quoteModalOverlay.style.display = 'none'; }, { once: true }); }
      function deleteQuote(quoteId) { /* ... */ if (confirm('Are you sure you want to delete this quote? This might break related chains and paragraphs.')) { let quotes = getQuotes(); quotes = quotes.filter(q => q.id !== quoteId); saveQuotes(quotes); if (currentSection === 'quotes') displayQuotes(); } }

      // --- Chains Section ---
      function renderChainsPage() { /* ... */ mainContent.innerHTML = `<div class="main-content-header"><h2>Chains</h2><button class="add-button" data-action="add-chain"><span class="material-symbols-rounded">add</span> Add Chain</button></div><div class="chains-container cards-container" id="chainsList"></div>`; displayChains(); }
      function getChains() { return getItems(CHAINS_STORAGE_KEY); }
      function saveChains(chains) { saveItems(CHAINS_STORAGE_KEY, chains); }
      function displayChains() { /* ... */ const container = mainContent.querySelector('#chainsList'); if (!container) return; const chains = getChains(); const quotes = getQuotes(); container.innerHTML = ''; if (chains.length === 0) { container.innerHTML = `<p class="no-items-message">No chains created yet. Click 'Add Chain' to link quotes and effects.</p>`; } else { chains.forEach(chain => { const linkedQuote = quotes.find(q => q.id === chain.quoteId); const quoteText = linkedQuote ? linkedQuote.text : "Linked quote not found"; const card = document.createElement('div'); card.className = 'chain-card'; card.dataset.id = chain.id; const effectsHtml = chain.effects.map(effect => `<li class="chain-effect-item">${escapeHtml(effect)}</li>`).join(''); card.innerHTML = `<a class="chain-quote-link" data-action="view-quote" data-id="${chain.quoteId}" title="${escapeHtml(quoteText)}">"${escapeHtml(quoteText)}"</a><ul class="chain-effects-list">${effectsHtml}</ul><div class="chain-card-footer"><div class="chain-actions"><button class="icon-button edit-btn" aria-label="Edit chain" data-action="edit-chain" data-id="${chain.id}"><span class="material-symbols-rounded">edit</span></button><button class="icon-button delete-btn" aria-label="Delete chain" data-action="delete-chain" data-id="${chain.id}"><span class="material-symbols-rounded">delete</span></button></div></div>`; container.appendChild(card); }); } }
      function populateQuoteSelect() { /* ... */ const quotes = getQuotes(); chainQuoteSelect.innerHTML = '<option value="" disabled selected>-- Select a Quote --</option>'; if (quotes.length === 0) { chainQuoteSelect.innerHTML += '<option value="" disabled>No quotes available</option>'; } else { quotes.forEach(quote => { const shortText = quote.text.length > 70 ? quote.text.substring(0, 67) + '...' : quote.text; const option = document.createElement('option'); option.value = quote.id; option.textContent = `"${shortText}" (p. ${quote.page || 'N/A'})`; chainQuoteSelect.appendChild(option); }); } }
      function addEffectInput(effectText = '') { /* ... */ const effectWrapper = document.createElement('div'); effectWrapper.className = 'effect-item'; const textarea = document.createElement('textarea'); textarea.rows = 2; textarea.placeholder = `Effect ${chainEffectsContainer.children.length + 1}`; textarea.value = effectText; textarea.required = true; const removeBtn = document.createElement('button'); removeBtn.type = 'button'; removeBtn.className = 'icon-button remove-effect-btn'; removeBtn.ariaLabel = 'Remove effect'; removeBtn.innerHTML = '<span class="material-symbols-rounded">delete</span>'; effectWrapper.appendChild(textarea); effectWrapper.appendChild(removeBtn); chainEffectsContainer.appendChild(effectWrapper); }
      function handleEffectAction(event) { /* ... */ const removeButton = event.target.closest('.remove-effect-btn'); if (removeButton) { if (chainEffectsContainer.children.length > 1) { removeButton.closest('.effect-item').remove(); } else { alert("You must have at least one effect."); } } }
      function openChainModal(chainData = null) { /* ... */ addChainForm.reset(); populateQuoteSelect(); chainEffectsContainer.innerHTML = ''; if (chainData) { chainModalTitle.textContent = 'Edit Chain'; chainSaveButtonText.textContent = 'Save Changes'; chainIdInput.value = chainData.id; chainQuoteSelect.value = chainData.quoteId || ''; chainData.effects.forEach(effect => addEffectInput(effect)); if (chainData.effects.length === 0) addEffectInput(); } else { chainModalTitle.textContent = 'Add New Chain'; chainSaveButtonText.textContent = 'Save Chain'; chainIdInput.value = ''; addEffectInput(); } chainModalOverlay.style.display = 'flex'; setTimeout(() => chainModalOverlay.classList.add('visible'), 10); }
      function closeChainModal() { /* ... */ chainModalOverlay.classList.remove('visible'); chainModalOverlay.addEventListener('transitionend', () => { chainModalOverlay.style.display = 'none'; }, { once: true }); }
      function handleChainFormSubmit(event) { /* ... */ event.preventDefault(); const editingId = chainIdInput.value; const selectedQuoteId = chainQuoteSelect.value; if (!selectedQuoteId) { alert('Please select a quote.'); return; } const effectTextareas = chainEffectsContainer.querySelectorAll('textarea'); const effects = Array.from(effectTextareas).map(textarea => textarea.value.trim()).filter(Boolean); if (effects.length === 0) { alert('Please add at least one effect.'); return; } const chainData = { id: editingId || Date.now().toString(), quoteId: selectedQuoteId, effects: effects }; let chains = getChains(); if (editingId) { const index = chains.findIndex(c => c.id === editingId); if (index !== -1) chains[index] = chainData; else chains.push(chainData); } else { chains.push(chainData); } saveChains(chains); closeChainModal(); if (currentSection === 'chains') displayChains(); }
      function deleteChain(chainId) { /* ... */ if (confirm('Are you sure you want to delete this chain? This might break related paragraphs.')) { let chains = getChains(); chains = chains.filter(c => c.id !== chainId); saveChains(chains); if (currentSection === 'chains') displayChains(); } }

      // --- Paragraphs Section ---
      function renderParagraphsPage() { /* ... */ mainContent.innerHTML = `<div class="main-content-header"><h2>Paragraphs</h2><button class="add-button" data-action="add-paragraph"><span class="material-symbols-rounded">add</span> Add Paragraph</button></div><div class="paragraphs-container cards-container" id="paragraphsList"></div>`; displayParagraphs(); }
      function getParagraphs() { return getItems(PARAGRAPHS_STORAGE_KEY); }
      function saveParagraphs(paragraphs) { saveItems(PARAGRAPHS_STORAGE_KEY, paragraphs); }
      function displayParagraphs() { /* ... */ const container = mainContent.querySelector('#paragraphsList'); if (!container) return; const paragraphs = getParagraphs(); const chains = getChains(); const quotes = getQuotes(); container.innerHTML = ''; if (paragraphs.length === 0) { container.innerHTML = `<p class="no-items-message">No paragraphs written yet. Click 'Add Paragraph' to link text to a chain.</p>`; } else { paragraphs.forEach(para => { const linkedChain = chains.find(c => c.id === para.chainId); let chainContext = "Linked chain not found"; let chainQuoteText = ""; if (linkedChain) { const linkedQuote = quotes.find(q => q.id === linkedChain.quoteId); chainQuoteText = linkedQuote ? linkedQuote.text : "Linked quote not found"; chainContext = `Chain starting with: "${chainQuoteText.substring(0, 50)}${chainQuoteText.length > 50 ? '...' : ''}"`; } const card = document.createElement('div'); card.className = 'paragraph-card'; card.dataset.id = para.id; card.innerHTML = `<a class="paragraph-chain-link" data-action="view-chain" data-id="${para.chainId}" title="Chain starting with: ${escapeHtml(chainQuoteText)}"><span class="material-symbols-rounded">link</span> ${escapeHtml(chainContext)}</a><div class="paragraph-content">${escapeHtml(para.text)}</div><div class="paragraph-card-footer"><div class="paragraph-actions"><button class="icon-button edit-btn" aria-label="Edit paragraph" data-action="edit-paragraph" data-id="${para.id}"><span class="material-symbols-rounded">edit</span></button><button class="icon-button delete-btn" aria-label="Delete paragraph" data-action="delete-paragraph" data-id="${para.id}"><span class="material-symbols-rounded">delete</span></button></div></div>`; container.appendChild(card); }); } }
      function populateChainSelect() { /* ... */ const chains = getChains(); const quotes = getQuotes(); paragraphChainSelect.innerHTML = '<option value="" disabled selected>-- Select a Chain --</option>'; if (chains.length === 0) { paragraphChainSelect.innerHTML += '<option value="" disabled>No chains available</option>'; } else { chains.forEach(chain => { const linkedQuote = quotes.find(q => q.id === chain.quoteId); const quoteText = linkedQuote ? linkedQuote.text : "Quote not found"; const shortText = quoteText.length > 60 ? quoteText.substring(0, 57) + '...' : quoteText; const option = document.createElement('option'); option.value = chain.id; option.textContent = `Chain: "${shortText}" (Effects: ${chain.effects.length})`; paragraphChainSelect.appendChild(option); }); } }
      function openParagraphModal(paraData = null) { /* ... */ addParagraphForm.reset(); populateChainSelect(); if (paraData) { paragraphModalTitle.textContent = 'Edit Paragraph'; paragraphSaveButtonText.textContent = 'Save Changes'; paragraphIdInput.value = paraData.id; paragraphChainSelect.value = paraData.chainId || ''; paragraphTextInput.value = paraData.text || ''; } else { paragraphModalTitle.textContent = 'Add New Paragraph'; paragraphSaveButtonText.textContent = 'Save Paragraph'; paragraphIdInput.value = ''; } paragraphModalOverlay.style.display = 'flex'; setTimeout(() => paragraphModalOverlay.classList.add('visible'), 10); }
      function closeParagraphModal() { /* ... */ paragraphModalOverlay.classList.remove('visible'); paragraphModalOverlay.addEventListener('transitionend', () => { paragraphModalOverlay.style.display = 'none'; }, { once: true }); }
      function handleParagraphFormSubmit(event) { /* ... */ event.preventDefault(); const editingId = paragraphIdInput.value; const selectedChainId = paragraphChainSelect.value; const paragraphText = paragraphTextInput.value.trim(); if (!selectedChainId) { alert('Please select a chain.'); return; } if (!paragraphText) { alert('Paragraph text cannot be empty.'); return; } const paraData = { id: editingId || Date.now().toString(), chainId: selectedChainId, text: paragraphText }; let paragraphs = getParagraphs(); if (editingId) { const index = paragraphs.findIndex(p => p.id === editingId); if (index !== -1) paragraphs[index] = paraData; else paragraphs.push(paraData); } else { paragraphs.push(paraData); } saveParagraphs(paragraphs); closeParagraphModal(); if (currentSection === 'paragraphs') displayParagraphs(); }
      function deleteParagraph(paragraphId) { /* ... */ if (confirm('Are you sure you want to delete this paragraph?')) { let paragraphs = getParagraphs(); paragraphs = paragraphs.filter(p => p.id !== paragraphId); saveParagraphs(paragraphs); if (currentSection === 'paragraphs') displayParagraphs(); } }

      // --- Settings & Download Modals ---
      function openSettingsModal() { /* ... */ settingsModalOverlay.style.display = 'flex'; setTimeout(() => settingsModalOverlay.classList.add('visible'), 10); }
      function closeSettingsModal() { /* ... */ settingsModalOverlay.classList.remove('visible'); settingsModalOverlay.addEventListener('transitionend', () => { settingsModalOverlay.style.display = 'none'; }, { once: true }); }
      function openDownloadModal() { /* ... */ closeSettingsModal(); downloadModalOverlay.style.display = 'flex'; setTimeout(() => downloadModalOverlay.classList.add('visible'), 10); }
      function closeDownloadModal() { /* ... */ downloadModalOverlay.classList.remove('visible'); downloadModalOverlay.addEventListener('transitionend', () => { downloadModalOverlay.style.display = 'none'; }, { once: true }); }

      // --- Download Action (IDs Removed) ---
      function handleDownloadAction() { /* ... as before (v8) ... */
        let content = `Quote Saver Data - ${new Date().toLocaleString()}\n\n`; const includeQuotes = downloadQuotesToggle.checked; const includeChains = downloadChainsToggle.checked; const includeParagraphs = downloadParagraphsToggle.checked; if (!includeQuotes && !includeChains && !includeParagraphs) { alert("Please select at least one data type."); return; } const allQuotes = getQuotes(); const allChains = getChains(); const allParagraphs = getParagraphs(); if (includeQuotes) { content += "== QUOTES ==\n\n"; if (allQuotes.length === 0) { content += "No quotes.\n\n"; } else { allQuotes.forEach((q, i) => { content += `[Q${i+1}] "${q.text}"\n`; if (q.technique) content += `  Tech: ${q.technique}\n`; if (q.description) content += `  Desc: ${q.description}\n`; if (q.page) content += `  Page: ${q.page}\n`; content += `\n`; }); } } if (includeChains && includeParagraphs) { content += "== CHAINS & PARAGRAPHS ==\n\n"; if (allChains.length === 0) { content += "No chains.\n\n"; } else { allChains.forEach((chain, i) => { const lq = allQuotes.find(q => q.id === chain.quoteId); const qt = lq ? `"${lq.text}" (p. ${lq.page||'N/A'})` : `Linked Quote Not Found (Was ID: ${chain.quoteId})`; content += `[Chain ${i+1}] Linked Quote: ${qt}\n`; content += `  Effects:\n`; chain.effects.forEach((e, ei) => { content += `    ${ei+1}. ${e}\n`; }); const relatedParagraphs = allParagraphs.filter(p => p.chainId === chain.id); if (relatedParagraphs.length > 0) { content += `  Linked Paragraphs:\n`; relatedParagraphs.forEach((para, pi) => { content += `    [P${pi+1}]\n`; const indentedText = para.text.split('\n').map(line => `      ${line}`).join('\n'); content += `${indentedText}\n`; }); } else { content += `  (No linked paragraphs)\n`; } content += `\n`; }); } } else { if (includeChains) { content += "== CHAINS ==\n\n"; if (allChains.length === 0) { content += "No chains.\n\n"; } else { allChains.forEach((c, i) => { const lq = allQuotes.find(q => q.id === c.quoteId); const qt = lq ? `"${lq.text}" (p. ${lq.page||'N/A'})` : `Linked Quote Not Found (Was ID: ${c.quoteId})`; content += `[Chain ${i+1}] Linked Quote: ${qt}\n`; content += `  Effects:\n`; c.effects.forEach((e, ei) => { content += `    ${ei+1}. ${e}\n`; }); content += `\n`; }); } } if (includeParagraphs) { content += "== PARAGRAPHS ==\n\n"; if (allParagraphs.length === 0) { content += "No paragraphs.\n\n"; } else { allParagraphs.forEach((p, i) => { const lc = allChains.find(c => c.id === p.chainId); let cc = `Linked Chain Not Found (Was ID: ${p.chainId})`; if (lc) { const lq = allQuotes.find(q => q.id === lc.quoteId); const qt = lq ? `"${lq.text}"` : `Linked Quote Not Found`; cc = `Chain starting with ${qt}`; } content += `[P${i+1}] Linked Chain: ${cc}\n`; content += `  Text:\n${p.text}\n`; content += `\n`; }); } } } const blob = new Blob([content], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'quote-saver-data.txt'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); closeDownloadModal();
      }

      // --- Import Action ---
      function handleImportFileSelect(event) { /* ... */ const file = event.target.files[0]; if (!file) { return; } const reader = new FileReader(); reader.onload = function(e) { const content = e.target.result; try { processImport(content); } catch (error) { console.error("Error processing import file:", error); alert(`Error processing import file: ${error.message}`); } finally { importFileInput.value = ''; } }; reader.onerror = function(e) { console.error("Error reading file:", e); alert("Error reading file."); importFileInput.value = ''; }; reader.readAsText(file); closeSettingsModal(); }
      function processImport(content) { /* ... as before (v8) ... */
        const lines = content.split('\n'); let currentSection = null; let importedQuotes = []; let importedChains = []; let importedParagraphs = []; let currentQuote = null; let currentChain = null; let currentParagraph = null; let quoteTextToNewIdMap = new Map(); let chainKeyToNewIdMap = new Map(); const quoteHeaderRegex = /^\[Q\d+\] "(.*)"$/; const techniqueRegex = /^\s{2}Tech:\s(.*)$/; const descriptionRegex = /^\s{2}Desc:\s(.*)$/; const pageRegex = /^\s{2}Page:\s(.*)$/; const chainHeaderRegex = /^\[Chain \d+\] Linked Quote: "(.*)"(?:\s\(p\. .*\))?$/; const chainHeaderNotFoundRegex = /^\[Chain \d+\] Linked Quote: Linked Quote Not Found \(Was ID: .*\)$/; const chainEffectsHeaderRegex = /^\s{2}Effects:$/; const chainEffectRegex = /^\s{4}(\d+)\.\s(.*)$/; const paragraphHeaderRegex = /^\[P\d+\] Linked Chain: Chain starting with "(.*)"$/; const paragraphHeaderNotFoundRegex = /^\[P\d+\] Linked Chain: Linked Chain Not Found \(Was ID: .*\)$/; const paragraphTextHeaderRegex = /^\s{2}Text:$/; const paragraphCombinedHeaderRegex = /^\s{4}\[P\d+\]$/;
        for (let i = 0; i < lines.length; i++) { let line = lines[i].trimEnd(); if (line === "====================") continue; if (line === "       QUOTES") { currentSection = 'QUOTES'; continue; } if (line === "       CHAINS") { currentSection = 'CHAINS'; continue; } if (line === "     PARAGRAPHS") { currentSection = 'PARAGRAPHS'; continue; } if (line === " CHAINS & PARAGRAPHS") { currentSection = 'CHAINS_PARAGRAPHS'; continue; } if (line.trim() === "") { currentQuote = null; if (currentSection !== 'CHAINS_PARAGRAPHS') currentChain = null; currentParagraph = null; continue; }
        if (currentSection === 'QUOTES') { let match = line.match(quoteHeaderRegex); if (match) { currentQuote = { id: Date.now().toString() + Math.random(), text: match[1], technique: '', description: '', page: '' }; importedQuotes.push(currentQuote); quoteTextToNewIdMap.set(currentQuote.text, currentQuote.id); continue; } if (currentQuote) { match = line.match(techniqueRegex); if (match) { currentQuote.technique = match[1]; continue; } match = line.match(descriptionRegex); if (match) { currentQuote.description = match[1]; continue; } match = line.match(pageRegex); if (match) { currentQuote.page = match[1]; continue; } } }
        if (currentSection === 'CHAINS' || currentSection === 'CHAINS_PARAGRAPHS') { let match = line.match(chainHeaderRegex); if (match) { const quoteText = match[1]; const linkedQuoteId = quoteTextToNewIdMap.get(quoteText); if (linkedQuoteId) { currentChain = { id: Date.now().toString() + Math.random(), quoteId: linkedQuoteId, effects: [] }; importedChains.push(currentChain); chainKeyToNewIdMap.set(quoteText, currentChain.id); } else { console.warn(`Import: Could not find quote for chain: "${quoteText}". Skipping.`); currentChain = null; } currentParagraph = null; continue; } match = line.match(chainHeaderNotFoundRegex); if (match) { console.warn(`Import: Skipping chain with missing original quote.`); currentChain = null; currentParagraph = null; continue; } if (currentChain) { match = line.match(chainEffectsHeaderRegex); if (match) continue; match = line.match(chainEffectRegex); if (match) { currentChain.effects.push(match[2]); continue; } if (currentSection === 'CHAINS_PARAGRAPHS') { match = line.match(paragraphCombinedHeaderRegex); if (match) { currentParagraph = { id: Date.now().toString() + Math.random(), chainId: currentChain.id, text: '' }; importedParagraphs.push(currentParagraph); let pLines = []; for (let j = i + 1; j < lines.length; j++) { const pLine = lines[j]; if (pLine.match(chainHeaderRegex) || pLine.match(chainHeaderNotFoundRegex) || pLine.match(paragraphCombinedHeaderRegex) || pLine.trim() === "" && lines[j+1]?.trim() !== "") { i = j - 1; break; } if (pLine.startsWith('      ')) { pLines.push(pLine.substring(6)); } else if (pLine.trim() !== "") { pLines.push(pLine); } if (j === lines.length - 1) i = j; } currentParagraph.text = pLines.join('\n'); currentParagraph = null; continue; } } } }
        if (currentSection === 'PARAGRAPHS') { let match = line.match(paragraphHeaderRegex); if (match) { const quoteText = match[1]; const linkedChainId = chainKeyToNewIdMap.get(quoteText); if (linkedChainId) { currentParagraph = { id: Date.now().toString() + Math.random(), chainId: linkedChainId, text: '' }; importedParagraphs.push(currentParagraph); } else { console.warn(`Import: Could not find chain for paragraph linked to: "${quoteText}". Skipping.`); currentParagraph = null; } continue; } match = line.match(paragraphHeaderNotFoundRegex); if (match) { console.warn(`Import: Skipping paragraph with missing original chain.`); currentParagraph = null; continue; } if (currentParagraph) { match = line.match(paragraphTextHeaderRegex); if (match) continue; if (line.trim() !== "") { currentParagraph.text += (currentParagraph.text ? '\n' : '') + line; } } } }
        if (importedQuotes.length === 0 && importedChains.length === 0 && importedParagraphs.length === 0) { alert("No valid data found to import."); return; } const confirmationMessage = `Found:\n- ${importedQuotes.length} Quotes\n- ${importedChains.length} Chains\n- ${importedParagraphs.length} Paragraphs\n\nAdd these items? (Links based on exact text match)`; if (confirm(confirmationMessage)) { const existingQuotes = getQuotes(); const existingChains = getChains(); const existingParagraphs = getParagraphs(); saveQuotes([...existingQuotes, ...importedQuotes]); saveChains([...existingChains, ...importedChains]); saveParagraphs([...existingParagraphs, ...importedParagraphs]); alert(`Import complete!\nAdded ${importedQuotes.length} quotes, ${importedChains.length} chains, ${importedParagraphs.length} paragraphs.`); setActiveSection(currentSection || 'quotes', true); } else { alert("Import cancelled."); }
      }

      // --- Preview Modal ---
      function openPreviewModal(quoteId) { /* ... */ const quote = getQuotes().find(q => q.id === quoteId); if (!quote) { console.error("Quote not found for preview:", quoteId); return; } const allChains = getChains(); const allParagraphs = getParagraphs(); const linkedChains = allChains.filter(chain => chain.quoteId === quoteId); const linkedChainIds = linkedChains.map(chain => chain.id); const linkedParagraphs = allParagraphs.filter(para => linkedChainIds.includes(para.chainId)); let modalHtml = `<div class="preview-section"><h3><span class="material-symbols-rounded">format_quote</span> Quote Details</h3><div class="preview-quote-text">${escapeHtml(quote.text)}</div><div class="preview-details">${quote.technique ? `<p><strong>Technique:</strong> ${escapeHtml(quote.technique)}</p>` : ''}${quote.description ? `<p><strong>Description:</strong> ${escapeHtml(quote.description)}</p>` : ''}${quote.page ? `<p><strong>Page:</strong> ${escapeHtml(quote.page)}</p>` : ''}<p><strong>ID:</strong> ${escapeHtml(quote.id)}</p></div></div>`; modalHtml += `<div class="preview-section"><h3><span class="material-symbols-rounded">link</span> Linked Chains (${linkedChains.length})</h3>`; if (linkedChains.length > 0) { linkedChains.forEach(chain => { modalHtml += `<div class="preview-chain-card"><strong>Chain ID: ${escapeHtml(chain.id)}</strong><ul class="preview-chain-effects">${chain.effects.map(effect => `<li>${escapeHtml(effect)}</li>`).join('')}</ul></div>`; }); } else { modalHtml += `<p class="preview-no-items">No chains are linked to this quote.</p>`; } modalHtml += `</div>`; modalHtml += `<div class="preview-section"><h3><span class="material-symbols-rounded">segment</span> Linked Paragraphs (${linkedParagraphs.length})</h3>`; if (linkedParagraphs.length > 0) { linkedParagraphs.forEach(para => { const parentChain = linkedChains.find(c => c.id === para.chainId); const chainContext = parentChain ? `(From Chain ID: ${parentChain.id})` : ''; modalHtml += `<div class="preview-paragraph-card"><strong>Paragraph ID: ${escapeHtml(para.id)} ${escapeHtml(chainContext)}</strong><div class="preview-paragraph-text">${escapeHtml(para.text)}</div></div>`; }); } else { modalHtml += `<p class="preview-no-items">No paragraphs are linked via chains starting with this quote.</p>`; } modalHtml += `</div>`; previewContent.innerHTML = modalHtml; previewModalOverlay.style.display = 'flex'; setTimeout(() => previewModalOverlay.classList.add('visible'), 10); }
      function closePreviewModal() { /* ... */ previewModalOverlay.classList.remove('visible'); previewModalOverlay.addEventListener('transitionend', () => { previewModalOverlay.style.display = 'none'; previewContent.innerHTML = ''; }, { once: true }); }

      // --- Legal Modals (Terms, Privacy, License) ---
      function formatLegalText(rawText) { /* ... as before (v13) ... */ return rawText .trim() .split('\n') .map(line => { const leadingSpace = line.match(/^\s*/)[0]; let processedLine = line.trim(); if (processedLine.startsWith('## ')) return `${leadingSpace}<h2>${escapeHtml(processedLine.substring(3))}</h2>`; if (processedLine.startsWith('# ')) return `${leadingSpace}<h1>${escapeHtml(processedLine.substring(2))}</h1>`; if (processedLine === '---') return '<hr>'; processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); processedLine = processedLine.replace(/_(.*?)_/g, '<em>$1</em>'); if (processedLine.match(/^(\d+\.|-)\s+/)) { return `<span style="display: block; padding-left: 20px;">${processedLine}</span>`; } if (processedLine === '') return ''; return `${leadingSpace}<p>${processedLine}</p>`; }) .filter(line => line !== '') .join('\n'); }
      function openTermsModal(closeSettings = true) {
          if(closeSettings && !isWelcomeScreenOpen) closeSettingsModal();
          if(isWelcomeScreenOpen) welcomeModalOverlay.querySelector('.modal-content').style.visibility = 'hidden';
          const termsText = `
# Quote Saver Terms and Conditions
_Last Updated: 4/04/2025_
**PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THE QUOTE SAVER APPLICATION ("APP"). BY DOWNLOADING, INSTALLING, OR USING THIS APP, YOU AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS. IF YOU DO NOT AGREE WITH ANY OF THESE TERMS, YOU MUST NOT ACCESS OR USE THE APP.**
---
## 1. Acceptance of Terms
1.1. By accessing, downloading, installing, or using the Quote Saver app, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
1.2. These Terms constitute a legally binding agreement between you and **SahasTech** (hereinafter referred to as "the Company", "we", "us", or "our") regarding your use of the App.
---
## 2. Application Overview and Purpose
2.1. **Description:**
Quote Saver is an application designed to help users collect, organize, and save quotes for personal use.
2.2. **Browser Storage:**
All features and functionalities of the App operate within your web browser using its local storage capabilities. No data is transmitted to or stored on external servers operated by the Company.
2.3. **"As Is" Provision:**
The App is provided on an “AS IS” and “AS AVAILABLE” basis without any warranty of any kind unless explicitly stated in these Terms.
---
## 3. Data Storage, Security, and User Responsibility
3.1. **Browser Local Storage Only:**
All user data is stored within your web browser's local storage. No information is stored on any servers, cloud services, or remote systems operated by the Company or third parties.
3.2. **Lack of Encryption:**
Data within the App is stored unencrypted in your browser's local storage. Similarly, the App code is unencrypted. This design choice means:
  - **Data Security:** The security of your information depends entirely on your browser's security measures and the security of the device running the browser.
  - **Exposure Risk:** In the event that your browser data is compromised or your device is lost, stolen, or accessed by unauthorized parties, the data may be accessible.
3.3. **User Responsibility:**
By using the App, you acknowledge and accept sole responsibility for securing your device, browser, and the data stored within the browser's local storage. The Company is not liable for any loss, theft, or compromise of your data arising from the unencrypted storage or your failure to maintain adequate device/browser security.
---
## 4. License to Use the App and Intellectual Property Rights
4.1. **License Grant:**
Subject to your compliance with these Terms, the Company grants you a non-exclusive, non-transferable, revocable license to use the App solely for personal, non-commercial purposes within a web browser.
4.2. **Intellectual Property Ownership:**
All aspects of the App—including its design, graphics, user interface, code, and written content—are the exclusive property of the Company or its licensors. All rights not expressly granted herein are reserved by the Company.
4.3. **Code Accessibility:**
Since the App code is unencrypted and executed within your browser, you may view and inspect it for personal use only. Any reproduction, modification, redistribution, or use beyond personal review is prohibited unless authorized in writing by the Company or under an applicable open source license provided with the App.
---
## 5. Permitted and Prohibited Uses
5.1. **Permitted Uses:**
You may use the App in accordance with these Terms and solely for collecting and organizing quotes for personal use within your browser.
5.2. **Prohibited Activities:**
You agree not to:
  - Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the App except as expressly allowed by law.
  - Modify, adapt, or create derivative works based on the App code or its functionalities for non-personal use.
  - Circumvent or disable any security features or measures of the App.
  - Use the App to store or share any content that is illegal, harmful, defamatory, or in violation of any third-party rights.
  - Engage in any activity that may impair or interfere with the performance or security of the App.
---
## 6. Privacy and Data Handling
6.1. **Data Handling:**
- **Local Only:**
  As stated, the App does not collect, transmit, or store any user data on external servers. All data resides in your browser's local storage.
- **No Personal Data Collection:**
  The App is designed not to collect personally identifiable information (PII) or any usage data beyond what is stored in your browser's local storage.
6.2. **Privacy Responsibility:**
Because your data is unencrypted and stored solely within your browser's local storage, it is your responsibility to manage your privacy by ensuring your device and browser are secured (e.g., using passcodes, browser security settings, etc.).
---
## 7. Third-Party Links and Services
7.1. **Third-Party Content:**
The App may contain links, references, or integrations with third-party websites or services solely for your convenience. These third parties are not under the control of the Company.
7.2. **No Endorsement:**
The inclusion of any third-party links or services does not imply any endorsement by the Company. You are solely responsible for reviewing and complying with the terms and conditions of any third-party service you access.
---
## 8. Disclaimers of Warranties
8.1. **No Warranty:**
The App is provided "as is" without any representations or warranties of any kind, either express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, or non-infringement.
8.2. **Error-Free Operation:**
The Company does not warrant that the App will be secure, error-free, uninterrupted, or completely free of viruses or other harmful components.
8.3. **Use at Your Own Risk:**
Your use of the App is at your sole risk. In no event shall the Company be liable for any damages arising out of or in connection with your use of the App or any loss of data due to the lack of encryption.
---
## 9. Limitation of Liability
9.1. **Exclusion of Damages:**
In no event shall the Company be liable for any indirect, incidental, punitive, special, or consequential damages, including but not limited to loss of profits or data, even if the Company has been advised of the possibility of such damages.
9.2. **Maximum Liability:**
The Company's total liability to you for any claims arising under these Terms or relating to your use of the App shall not exceed the amount actually paid by you for accessing or using the App (if applicable).
9.3. **Jurisdictional Limits:**
Some jurisdictions do not allow the exclusion or limitation of liability for incidental or consequential damages. In such jurisdictions, the Company’s liability shall be limited to the fullest extent permitted by law.
---
## 10. Indemnification
10.1. **User Agreement to Indemnify:**
You agree to indemnify, defend, and hold harmless the Company, its affiliates, and its respective officers, directors, employees, and agents from and against any claims, liabilities, damages, obligations, losses, or expenses (including legal fees) arising out of or in connection with your use of the App or violation of these Terms.
10.2. **Survival:**
The indemnification obligations set forth in this section shall survive the termination of your use of the App.
---
## 11. Termination
11.1. **Termination by the Company:**
The Company reserves the right to suspend or terminate your access to the App at any time, with or without notice, for any reason, including for any violation of these Terms.
11.2. **Effect of Termination:**
Upon termination, your right to use the App will immediately cease. Data stored in your browser's local storage will remain unless cleared by you or your browser settings. All provisions of these Terms which, by their nature, should survive termination shall remain in full force and effect.
---
## 12. Modifications to the Terms
12.1. **Right to Amend:**
The Company may revise these Terms at any time by updating this document. Any changes will become effective upon posting the revised version within the App or on the Company’s website.
12.2. **Continued Use:**
Your continued use of the App after changes have been posted constitutes your acceptance of the revised Terms. It is your responsibility to review the Terms periodically.
---
## 13. Governing Law and Dispute Resolution
13.1. **Governing Law:**
These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Company is registered, without regard to its conflict of law provisions.
13.2. **Dispute Resolution:**
Any disputes arising out of or relating to these Terms or your use of the App shall be resolved exclusively through the courts located in [Insert Jurisdiction], and you consent to the personal jurisdiction of such courts.
13.3. **Severability:**
If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
---
## 14. Feedback
14.1. **Providing Feedback:**
If you choose to provide feedback or suggestions regarding the App, you hereby grant the Company a perpetual, non-exclusive, royalty-free, irrevocable license to use such feedback for any purpose without any obligation of confidentiality.
---
## 15. Entire Agreement
15.1. **Integration:**
These Terms, together with any documents or policies expressly incorporated by reference herein, constitute the entire agreement between you and the Company with respect to the subject matter and supersede any prior or contemporaneous understandings
          `;
          termsContent.innerHTML = formatLegalText(termsText);
          termsModalOverlay.style.display = 'flex';
          setTimeout(() => termsModalOverlay.classList.add('visible'), 10);
      }
      function closeTermsModal() { /* ... */ termsModalOverlay.classList.remove('visible'); termsModalOverlay.addEventListener('transitionend', () => { termsModalOverlay.style.display = 'none'; termsContent.innerHTML = ''; if (isWelcomeScreenOpen) { welcomeModalOverlay.querySelector('.modal-content').style.visibility = 'visible'; } }, { once: true }); }

      function openPrivacyModal(closeSettings = true) {
          if(closeSettings && !isWelcomeScreenOpen) closeSettingsModal();
          if(isWelcomeScreenOpen) welcomeModalOverlay.querySelector('.modal-content').style.visibility = 'hidden';
          const privacyPolicyText = `
# Quote Saver Privacy Policy
**Effective Date:** 4/04/2025
---
## 1. Overview
At Quote Saver ("the App"), we value your privacy and prioritize the protection of your data. This Privacy Policy explains how your data is handled, stored, and your responsibilities in managing it. By using the App, you agree to the practices outlined in this policy.
---
## 2. Data Collection
2.1 **No Personal Data Collection:**
The App is designed to operate entirely within your web browser. **No personal information, identifiable data, or usage statistics are collected, transmitted to, or stored on external servers.**
2.2 **Browser Local Storage:**
All information entered into the App, including saved quotes and organizational details, is stored solely within your web browser's local storage mechanism. No data is sent to external servers, third parties, or cloud-based systems operated by the Company.
---
## 3. Data Storage & Security
3.1 **Unencrypted Storage:**
Data within the App is stored unencrypted in your browser's local storage. This design ensures complete transparency about how your data is stored, but it also means the security of your data is entirely dependent on your browser's and device's safeguards.
3.2 **User Responsibility:**
By using the App, you agree to assume full responsibility for securing your device, browser, and the data stored within the browser's local storage. You are encouraged to implement robust security measures, such as:
  - Device encryption.
  - Biometric or password protection for your device.
  - Secure browser settings and regular updates.
3.3 **No External Backups Provided:**
The App does not back up your data on external systems. All information remains within your browser's local storage until you delete or modify it manually, or clear your browser data.
---
## 4. Use of Information
4.1 **Functionality-Only:**
The App uses the information you enter solely to provide its quote-saving functionality within your browser. Since no data is collected or transmitted externally, there are no additional uses or processing of your information by the Company.
4.2 **No Third-Party Sharing:**
Because the App does not collect or transmit any data externally, there is no sharing, selling, or disclosure of user information to third parties under any circumstances.
---
## 5. Third-Party Services
5.1 **No Third-Party Integrations:**
Quote Saver does not integrate with or rely on any third-party services that collect user data.
5.2 **External Links:**
The App may contain links to third-party websites or services for your convenience. These external platforms are not under the control of the Company, and their privacy practices are governed by their respective policies. Users are encouraged to review third-party privacy policies independently.
---
## 6. User Control and Consent
6.1 **Your Consent:**
By using the App, you acknowledge and accept that:
  - All data entered into the App is stored within your web browser's local storage.
  - You are responsible for managing the security of your device, browser, and the data stored therein.
  - You consent to the unencrypted nature of local browser storage.
6.2 **Editing and Deletion:**
You have full control over your data. You can add, modify, or delete any information stored within the App at your discretion. Clearing your browser's storage for this site will also remove the data.
---
## 7. Data Retention
7.1 **Browser Storage Duration:**
All data remains in your browser's local storage until you choose to delete or modify it manually, or until you clear your browser's storage for this site.
7.2 **No Remote Retention:**
The App does not transmit or store your data on external servers, meaning there is no automated retention or archiving by the developer.
---
## 8. Changes to This Privacy Policy
8.1 **Policy Updates:**
We reserve the right to update or modify this Privacy Policy at any time. Any changes will become effective upon posting the updated version within the App or on our website.
8.2 **Continued Use Constitutes Acceptance:**
Your continued use of the App following changes to the Privacy Policy signifies your acceptance of the revised terms.
---
## 9. Security Disclaimer
9.1 **Browser/Device Security:**
Given that all data is stored unencrypted within your browser's local storage, the security of your data is contingent on your device's and browser's security measures. We strongly recommend following best practices to protect your device and browser.
9.2 **No Liability for Breaches:**
We are not responsible for any data loss, theft, or breaches arising from unauthorized access to your device or compromise of your browser's storage.
---
## 10. Contact Information
If you have any questions, concerns, or feedback regarding this Privacy Policy, you can contact us at:
- **Email:** sahas.shimpi@outlook.com
---
## 11. Agreement
By using the Quote Saver app, you acknowledge that you have read, understood, and agreed to this Privacy Policy. If you do not agree with the terms, please refrain from using the App.
          `;
          privacyContent.innerHTML = formatLegalText(privacyPolicyText);
          privacyModalOverlay.style.display = 'flex';
          setTimeout(() => privacyModalOverlay.classList.add('visible'), 10);
      }
      function closePrivacyModal() { /* ... */ privacyModalOverlay.classList.remove('visible'); privacyModalOverlay.addEventListener('transitionend', () => { privacyModalOverlay.style.display = 'none'; privacyContent.innerHTML = ''; if (isWelcomeScreenOpen) { welcomeModalOverlay.querySelector('.modal-content').style.visibility = 'visible'; } }, { once: true }); }

      function openLicenseModal(closeSettings = true) {
          if(closeSettings && !isWelcomeScreenOpen) closeSettingsModal();
          if(isWelcomeScreenOpen) welcomeModalOverlay.querySelector('.modal-content').style.visibility = 'hidden';
          const licenseText = `
# Quote Saver License Agreement
**Effective Date:** 4/04/2025
This License Agreement ("Agreement") is a legally binding agreement between you ("Licensee", "you", or "your") and **SahasTech** ("Licensor", "we", "our", or "us") regarding the use of the Quote Saver application ("App"), including all related software, documentation, and materials.
---
## 1. Grant of License
1.1 **License Grant:**
Subject to the terms and conditions of this Agreement, Licensor grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the App solely for personal, non-commercial purposes within a web browser.
1.2 **Restrictions on Use:**
This license is granted only for your personal use of the App. Any other use, such as commercial exploitation, redistribution, or sublicensing, is strictly prohibited without prior written consent from Licensor.
---
## 2. Ownership and Intellectual Property
2.1 **Ownership:**
All intellectual property rights in and to the App, including but not limited to copyrights, trademarks, and trade secrets, remain the exclusive property of Licensor or its licensors. You receive no ownership rights under this Agreement.
2.2 **Code Access and Modification:**
The App's source code is unencrypted and executed within your web browser. While you are allowed to inspect the code for personal use (e.g., using browser developer tools), you may not:
  - Modify, reproduce, or distribute the code.
  - Create derivative works based on the code.
  - Use the code for any purpose beyond personal review and use without express written permission from Licensor.
---
## 3. Restrictions
You agree not to:
- Reverse engineer, decompile, or disassemble the App except as expressly permitted by applicable law.
- Rent, lease, lend, or sell access to the App or any part of its code or functionality.
- Use the App to store or share illegal, harmful, or infringing content.
- Circumvent, disable, or otherwise tamper with any features or limitations of the App.
---
## 4. No Warranty and Disclaimers
4.1 **"As Is" Provision:**
The App is provided "as is" without any warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. You assume all risks arising from your use of the App.
4.2 **No Guarantee of Performance:**
Licensor does not guarantee that:
  - The App will meet your requirements or expectations.
  - The App will operate uninterrupted or error-free.
  - The data stored in your browser's local storage using the App will remain secure or accessible under all circumstances.
---
## 5. Limitation of Liability
5.1 **Exclusion of Certain Damages:**
To the fullest extent permitted by applicable law, Licensor is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the App, including data loss, browser issues, or any other damages.
5.2 **Total Liability Cap:**
In no event shall Licensor's total liability exceed the amount paid by you (if any) for accessing or using the App.
---
## 6. Termination
6.1 **Termination by Licensor:**
Licensor reserves the right to terminate this Agreement and revoke your license at any time without notice if you fail to comply with its terms.
6.2 **Effect of Termination:**
Upon termination, you must immediately cease using the App. Data stored in your browser's local storage will remain unless cleared by you or your browser settings.
---
## 7. Governing Law and Jurisdiction
This Agreement is governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising out of this Agreement shall be resolved exclusively in the courts of [Insert Jurisdiction].
---
## 8. Severability
If any provision of this Agreement is found to be unenforceable, the remaining provisions will remain in full force and effect.
---
## 10. External Credits
Checkboxes code was taken from CSS Scan, and the source code can be found on CSS Scan or CodePen.
---
## 10. Contact Information
For questions or concerns regarding this License Agreement, please contact us at:
- **Email:**   sahas.shimpi@outlook.com
---
**By accessing or using the Quote Saver App, you acknowledge that you have read and understood this License Agreement and agree to its terms.**
          `;
          licenseContent.innerHTML = formatLegalText(licenseText);
          licenseModalOverlay.style.display = 'flex';
          setTimeout(() => licenseModalOverlay.classList.add('visible'), 10);
      }
      function closeLicenseModal() { /* ... */ licenseModalOverlay.classList.remove('visible'); licenseModalOverlay.addEventListener('transitionend', () => { licenseModalOverlay.style.display = 'none'; licenseContent.innerHTML = ''; if (isWelcomeScreenOpen) { welcomeModalOverlay.querySelector('.modal-content').style.visibility = 'visible'; } }, { once: true }); }

      // --- Accent Color Modal ---
      function openAccentColorModal() { /* ... */ closeSettingsModal(); populateColorSwatches(colorSwatchesContainer); accentColorModalOverlay.style.display = 'flex'; setTimeout(() => accentColorModalOverlay.classList.add('visible'), 10); }
      function closeAccentColorModal() { /* ... */ accentColorModalOverlay.classList.remove('visible'); accentColorModalOverlay.addEventListener('transitionend', () => { accentColorModalOverlay.style.display = 'none'; }, { once: true }); }
      function populateColorSwatches(container) {
          if (!container) return;
          container.innerHTML = ''; // Clear existing
          PRESET_ACCENT_COLORS.forEach(colorPair => {
              const swatch = document.createElement('div');
              swatch.className = 'color-swatch';
              swatch.style.backgroundColor = colorPair.main;
              swatch.style.color = colorPair.main; // Set color for hover effect
              swatch.dataset.color = colorPair.main;
              swatch.dataset.hoverColor = colorPair.hover;
              swatch.title = `Set accent to ${colorPair.main}`;
              container.appendChild(swatch);
          });
          // Add Custom Color Input directly as a styled label/input combo
          const customColorLabel = document.createElement('label');
          customColorLabel.htmlFor = `customColorSwatchInput_${container.id}`;
          customColorLabel.title = 'Choose custom colour';
          customColorLabel.className = 'color-swatch custom-swatch'; // Style like a swatch
          customColorLabel.innerHTML = `<span class="material-symbols-rounded">edit</span>`; // Add icon
          const customColorInputEl = document.createElement('input');
          customColorInputEl.type = 'color';
          customColorInputEl.id = `customColorSwatchInput_${container.id}`;
          customColorInputEl.className = 'color-swatch-input'; // Hidden input
          customColorInputEl.value = localStorage.getItem(ACCENT_COLOR_STORAGE_KEY) || DEFAULT_ACCENT_COLOR;
          customColorLabel.appendChild(customColorInputEl); // Append input inside label
          container.appendChild(customColorLabel); // Append label (acting as swatch)

          // Add listener for the input
          customColorInputEl.addEventListener('input', handleCustomColorInput);
          customColorInputEl.addEventListener('change', handleCustomColorSaveFromInput);
      }
      function handleColorSwatchClick(event) {
          const swatch = event.target.closest('.color-swatch:not(.custom-swatch)');
          if (!swatch) return;
          const mainColor = swatch.dataset.color;
          const hoverColor = swatch.dataset.hoverColor;
          applyAccentColor(mainColor, hoverColor);
          localStorage.setItem(ACCENT_COLOR_STORAGE_KEY, mainColor);
          if (accentColorModalOverlay.classList.contains('visible')) {
              closeAccentColorModal();
          }
      }
      function handleWelcomeColorSwatchClick(event) {
          const swatch = event.target.closest('.color-swatch:not(.custom-swatch)');
          if (swatch) {
              const mainColor = swatch.dataset.color;
              const hoverColor = swatch.dataset.hoverColor;
              applyAccentColor(mainColor, hoverColor);
              localStorage.setItem(ACCENT_COLOR_STORAGE_KEY, mainColor);
          }
          // Custom color input handled by its own listeners
      }
      function handleCustomColorInput(event) { /* ... */ const mainColor = event.target.value; const hoverColor = calculateHoverColor(mainColor); applyAccentColor(mainColor, hoverColor); }
      function handleCustomColorSaveFromInput(event) { /* ... */ const mainColor = event.target.value; localStorage.setItem(ACCENT_COLOR_STORAGE_KEY, mainColor); if (accentColorModalOverlay.classList.contains('visible')) { closeAccentColorModal(); } }
      // Removed open/close/save functions for the separate custom color modal

      // --- Feedback Modal ---
      function openFeedbackModal() { /* ... */ closeSettingsModal(); feedbackForm.reset(); feedbackModalOverlay.style.display = 'flex'; setTimeout(() => feedbackModalOverlay.classList.add('visible'), 10); }
      function closeFeedbackModal() { /* ... */ feedbackModalOverlay.classList.remove('visible'); feedbackModalOverlay.addEventListener('transitionend', () => { feedbackModalOverlay.style.display = 'none'; }, { once: true }); }
      function handleFeedbackSubmit(event) { // Reverted to mailto
          event.preventDefault();
          const name = feedbackNameInput.value.trim();
          const description = feedbackDescriptionInput.value.trim();

          if (!description) {
              alert("Please enter your feedback in the description field.");
              return;
          }

          const subject = "Quote Saver Feedback";
          let body = `Feedback Description:\n${description}\n\n`;
          if (name) {
              body += `From: ${name}`;
          }

          const mailtoLink = `mailto:sahas.shimpi@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          window.location.href = mailtoLink;
          closeFeedbackModal();
      }

      // --- Delete All Data ---
      function handleDeleteAllData() {
          if (confirm("Are you absolutely sure you want to delete ALL data?\nThis includes all quotes, chains, and paragraphs.\nThis action cannot be undone and will reset the app.")) {
              // Clear all relevant localStorage keys
              localStorage.removeItem(QUOTES_STORAGE_KEY);
              localStorage.removeItem(CHAINS_STORAGE_KEY);
              localStorage.removeItem(PARAGRAPHS_STORAGE_KEY);
              localStorage.removeItem(WELCOME_SEEN_KEY);
              localStorage.removeItem(ACCENT_COLOR_STORAGE_KEY);
              localStorage.removeItem(THEME_STORAGE_KEY);

              // Reload the page to reset the state and show welcome screen
              window.location.reload();
          }
      }


      // --- Main Content Click Handler (Delegation) ---
      function handleMainContentClick(event) {
          const target = event.target;
          const actionElement = target.closest('[data-action]');
          if (!actionElement) return;
          const action = actionElement.dataset.action;
          const id = actionElement.dataset.id;

          // --- Navigation Actions ---
          if (action === 'view-quote' || action === 'view-chain') {
              event.preventDefault();
              const targetSection = action === 'view-quote' ? 'quotes' : 'chains';
              const targetId = id;
              setActiveSection(targetSection);
              setTimeout(() => {
                  const elementToHighlight = mainContent.querySelector(`[data-id="${targetId}"]`);
                  if (elementToHighlight) {
                      elementToHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      const currentlyHighlighted = mainContent.querySelector(`.${HIGHLIGHT_CLASS}`);
                      if(currentlyHighlighted) currentlyHighlighted.classList.remove(HIGHLIGHT_CLASS);
                      elementToHighlight.classList.add(HIGHLIGHT_CLASS);
                      setTimeout(() => { elementToHighlight.classList.remove(HIGHLIGHT_CLASS); }, HIGHLIGHT_DURATION);
                  } else { console.warn(`Element with ID ${targetId} not found in section ${targetSection}.`); }
              }, 150);
              return;
          }

          // --- Other Actions ---
          switch (action) {
              case 'add-quote': openQuoteModal(); break;
              case 'edit-quote': const qte = getQuotes().find(q => q.id === id); if (qte) openQuoteModal(qte); break;
              case 'delete-quote': deleteQuote(id); break;
              case 'add-chain': openChainModal(); break;
              case 'edit-chain': const cte = getChains().find(c => c.id === id); if (cte) openChainModal(cte); break;
              case 'delete-chain': deleteChain(id); break;
              case 'add-paragraph': openParagraphModal(); break;
              case 'edit-paragraph': const pte = getParagraphs().find(p => p.id === id); if (pte) openParagraphModal(pte); break;
              case 'delete-paragraph': deleteParagraph(id); break;
              case 'preview-quote': openPreviewModal(id); break;
              case 'open-settings': openSettingsModal(); break;
              // Legal links in welcome modal are handled by handleWelcomeLegalLinks
          }
      }

      // --- Start the app ---
      initialize();
    });
