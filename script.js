// Character data - TOCFL Levels 1-4
const charactersData = [
    // Level 1
    { id: 1, character: '坐', pinyin: 'zuò', english: 'sit', level: 1, image: 'character-card-images/Level1/坐.png' },
    { id: 2, character: '火車', pinyin: 'huǒ chē', english: 'train', level: 1, image: 'character-card-images/Level1/火車.png' },
    { id: 3, character: '跟', pinyin: 'gēn', english: 'follow / with', level: 1, image: 'character-card-images/Level1/跟.png' },
    { id: 4, character: '玩', pinyin: 'wán', english: 'play', level: 1, image: 'character-card-images/Level1/玩.png' },
    { id: 5, character: '快', pinyin: 'kuài', english: 'fast', level: 1, image: 'character-card-images/Level1/快.png' },
    { id: 6, character: '站', pinyin: 'zhàn', english: 'stand / station', level: 1, image: 'character-card-images/Level1/站.png' },
    { id: 7, character: '鐘頭', pinyin: 'zhōng tóu', english: 'hour', level: 1, image: 'character-card-images/Level1/鐘頭.png' },
    { id: 8, character: '比較', pinyin: 'bǐ jiào', english: 'compare / relatively', level: 1, image: 'character-card-images/Level1/比較.png' },
    { id: 9, character: '慢', pinyin: 'màn', english: 'slow', level: 1, image: 'character-card-images/Level1/慢.png' },
    { id: 10, character: '舒服', pinyin: 'shū fu', english: 'comfortable', level: 1, image: 'character-card-images/Level1/舒服.png' },
    { id: 11, character: '車票', pinyin: 'chē piào', english: 'ticket', level: 1, image: 'character-card-images/Level1/車票.png' },
    { id: 12, character: '高鐵', pinyin: 'gāo tiě', english: 'high-speed rail', level: 1, image: 'character-card-images/Level1/高鐵.png' },

    // Level 2
    { id: 13, character: '壞了', pinyin: 'huài le', english: 'broken', level: 2, image: 'character-card-images/Level2/壞了.png' },
    { id: 14, character: '東部', pinyin: 'dōng bù', english: 'eastern part', level: 2, image: 'character-card-images/Level2/東部.png' },
    { id: 15, character: '準備', pinyin: 'zhǔn bèi', english: 'prepare', level: 2, image: 'character-card-images/Level2/準備.png' },

    // Level 3
    { id: 16, character: '季節', pinyin: 'jì jié', english: 'season', level: 3, image: 'character-card-images/Level3/季節.png' },
    { id: 17, character: '記者', pinyin: 'jì zhě', english: 'reporter / journalist', level: 3, image: 'character-card-images/Level3/記者.png' },

    // Level 4
    { id: 18, character: '影本', pinyin: 'yǐng běn', english: 'photocopy', level: 4, image: 'character-card-images/Level4/影本.png' },
    { id: 19, character: '插花', pinyin: 'chā huā', english: 'flower arrangement', level: 4, image: 'character-card-images/Level4/插花.png' },

    // Level 5
    { id: 20, character: '種植', pinyin: 'zhòng zhí', english: 'plant / cultivate', level: 5, image: 'character-card-images/Level5/種植.png' },
    { id: 21, character: '編織', pinyin: 'biān zhī', english: 'weave / knit', level: 5, image: 'character-card-images/Level5/編織.png' }
];

// State
let selectedCards = new Set();
let currentFilter = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    initializeEventListeners();
});

// Render character cards
function renderCards() {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';

    const filteredCards = charactersData.filter(card => {
        // Filter by level
        const levelMatch = currentFilter === 'all' || card.level === parseInt(currentFilter);

        // Filter by search query
        const searchMatch = searchQuery === '' ||
            card.character.includes(searchQuery) ||
            card.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.english.toLowerCase().includes(searchQuery.toLowerCase());

        return levelMatch && searchMatch;
    });

    filteredCards.forEach(card => {
        const cardElement = createCardElement(card);
        container.appendChild(cardElement);
    });
}

// Create individual card element
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'character-card';
    cardDiv.dataset.id = card.id;

    cardDiv.innerHTML = `
        <input type="checkbox" class="card-checkbox" data-id="${card.id}" ${selectedCards.has(card.id) ? 'checked' : ''}>
        <div class="card-image">
            <img src="${card.image}" alt="${card.character}" class="character-image">
        </div>
        <div class="card-character">${card.character}</div>
        <div class="card-pinyin">${card.pinyin}</div>
        <div class="card-english">${card.english}</div>
        <div class="card-level">TOCFL Level ${card.level}</div>
        <div class="card-actions">
            <button class="copy-btn copy-character" data-id="${card.id}">Copy 字</button>
            <button class="copy-btn copy-pinyin" data-id="${card.id}">Copy Pinyin</button>
            <button class="copy-btn copy-image" data-id="${card.id}">Copy Image</button>
            <button class="copy-btn copy-all" data-id="${card.id}">Copy All</button>
        </div>
    `;

    return cardDiv;
}

// Initialize event listeners
function initializeEventListeners() {
    // Search input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCards();
    });

    // Level filter buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.level;
            renderCards();
        });
    });

    // Checkbox selection (using event delegation)
    document.getElementById('cardsContainer').addEventListener('change', (e) => {
        if (e.target.classList.contains('card-checkbox')) {
            const cardId = parseInt(e.target.dataset.id);
            if (e.target.checked) {
                selectedCards.add(cardId);
            } else {
                selectedCards.delete(cardId);
            }
            updateSelectedCount();
        }
    });

    // Copy buttons (using event delegation)
    document.getElementById('cardsContainer').addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-character')) {
            copyCharacter(parseInt(e.target.dataset.id));
        } else if (e.target.classList.contains('copy-pinyin')) {
            copyPinyin(parseInt(e.target.dataset.id));
        } else if (e.target.classList.contains('copy-image')) {
            copyImage(parseInt(e.target.dataset.id));
        } else if (e.target.classList.contains('copy-all')) {
            copyAll(parseInt(e.target.dataset.id));
        }
    });

    // Export buttons
    document.getElementById('pdfBtn').addEventListener('click', () => {
        if (selectedCards.size > 0) {
            openModal('pdfModal');
        } else {
            alert('Please select at least one card to export.');
        }
    });

    document.getElementById('pngBtn').addEventListener('click', () => {
        if (selectedCards.size > 0) {
            openModal('pngModal');
        } else {
            alert('Please select at least one card to export.');
        }
    });

    // Modal close buttons
    document.querySelectorAll('.close, .btn-cancel').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = e.target.dataset.modal || e.target.closest('.modal').id;
            closeModal(modalId);
        });
    });

    // Export PDF button
    document.getElementById('exportPdfBtn').addEventListener('click', exportPDF);

    // Export PNG button
    document.getElementById('exportPngBtn').addEventListener('click', exportPNG);

    // Language toggle button
    document.getElementById('languageToggle').addEventListener('click', () => {
        showNotification('Language switching feature - Coming soon!');
        // Future: Implement actual language switching logic here
    });

    // Update export button states
    updateSelectedCount();
}

// Update selected count display
function updateSelectedCount() {
    document.getElementById('selectedCount').textContent = selectedCards.size;
    const pdfBtn = document.getElementById('pdfBtn');
    const pngBtn = document.getElementById('pngBtn');

    if (selectedCards.size === 0) {
        pdfBtn.disabled = true;
        pngBtn.disabled = true;
    } else {
        pdfBtn.disabled = false;
        pngBtn.disabled = false;
    }
}

// Copy functions
function copyCharacter(id) {
    const card = charactersData.find(c => c.id === id);
    copyToClipboard(card.character);
    showNotification('Character copied!');
}

function copyPinyin(id) {
    const card = charactersData.find(c => c.id === id);
    copyToClipboard(card.pinyin);
    showNotification('Pinyin copied!');
}

async function copyImage(id) {
    const card = charactersData.find(c => c.id === id);
    try {
        const response = await fetch(card.image);
        const blob = await response.blob();
        await navigator.clipboard.write([
            new ClipboardItem({ [blob.type]: blob })
        ]);
        showNotification('Image copied!');
    } catch (err) {
        console.error('Failed to copy image:', err);
        // Fallback: copy the image path as text
        copyToClipboard(card.image);
        showNotification('Image path copied!');
    }
}

function copyAll(id) {
    const card = charactersData.find(c => c.id === id);
    const allText = `${card.character}\n${card.pinyin}\n${card.english}`;
    copyToClipboard(allText);
    showNotification('All content copied!');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function showNotification(message) {
    // Simple notification - you can enhance this
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 150px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Export PDF function
async function exportPDF() {
    const includeImage = document.getElementById('pdfIncludeImage').checked;
    const includeCharacter = document.getElementById('pdfIncludeCharacter').checked;
    const includePinyin = document.getElementById('pdfIncludePinyin').checked;

    if (!includeImage && !includeCharacter && !includePinyin) {
        alert('Please select at least one element to include in the export.');
        return;
    }

    const selectedCardsData = charactersData.filter(card => selectedCards.has(card.id));

    // Create a temporary container for PDF generation
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 800px;
        background: white;
        padding: 40px;
    `;

    selectedCardsData.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.style.cssText = `
            margin-bottom: 30px;
            padding: 20px;
            border: 2px solid #ddd;
            border-radius: 8px;
            text-align: center;
        `;

        if (includeImage) {
            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = 'width: 300px; height: 200px; margin: 0 auto 15px; overflow: hidden;';
            const img = document.createElement('img');
            img.src = card.image;
            img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 8px;';
            imgContainer.appendChild(img);
            cardDiv.appendChild(imgContainer);
        }

        if (includeCharacter) {
            const char = document.createElement('div');
            char.textContent = card.character;
            char.style.cssText = 'font-size: 48px; font-weight: bold; margin-bottom: 10px;';
            cardDiv.appendChild(char);
        }

        if (includePinyin) {
            const pinyin = document.createElement('div');
            pinyin.textContent = card.pinyin;
            pinyin.style.cssText = 'font-size: 24px; color: #666;';
            cardDiv.appendChild(pinyin);
        }

        tempContainer.appendChild(cardDiv);
    });

    document.body.appendChild(tempContainer);

    try {
        const canvas = await html2canvas(tempContainer, {
            scale: 2,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('chinese-characters.pdf');

        showNotification('PDF exported successfully!');
    } catch (error) {
        console.error('PDF export error:', error);
        alert('Error exporting PDF. Please try again.');
    }

    document.body.removeChild(tempContainer);
    closeModal('pdfModal');
}

// Export PNG function
async function exportPNG() {
    const includeImage = document.getElementById('pngIncludeImage').checked;
    const includeCharacter = document.getElementById('pngIncludeCharacter').checked;
    const includePinyin = document.getElementById('pngIncludePinyin').checked;

    if (!includeImage && !includeCharacter && !includePinyin) {
        alert('Please select at least one element to include in the export.');
        return;
    }

    const selectedCardsData = charactersData.filter(card => selectedCards.has(card.id));

    for (const card of selectedCardsData) {
        const tempContainer = document.createElement('div');
        tempContainer.style.cssText = `
            position: absolute;
            left: -9999px;
            top: 0;
            width: 400px;
            background: white;
            padding: 30px;
            border: 2px solid #ddd;
            border-radius: 8px;
            text-align: center;
        `;

        if (includeImage) {
            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = 'width: 100%; height: 250px; margin-bottom: 20px; overflow: hidden;';
            const img = document.createElement('img');
            img.src = card.image;
            img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 8px;';
            imgContainer.appendChild(img);
            tempContainer.appendChild(imgContainer);
        }

        if (includeCharacter) {
            const char = document.createElement('div');
            char.textContent = card.character;
            char.style.cssText = 'font-size: 60px; font-weight: bold; margin-bottom: 15px;';
            tempContainer.appendChild(char);
        }

        if (includePinyin) {
            const pinyin = document.createElement('div');
            pinyin.textContent = card.pinyin;
            pinyin.style.cssText = 'font-size: 30px; color: #666;';
            tempContainer.appendChild(pinyin);
        }

        document.body.appendChild(tempContainer);

        try {
            const canvas = await html2canvas(tempContainer, {
                scale: 2,
                backgroundColor: '#ffffff'
            });

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${card.character}-${card.pinyin}.png`;
                link.click();
                URL.revokeObjectURL(url);
            });
        } catch (error) {
            console.error('PNG export error:', error);
            alert(`Error exporting PNG for ${card.character}. Please try again.`);
        }

        document.body.removeChild(tempContainer);
    }

    showNotification(`${selectedCardsData.length} PNG files exported successfully!`);
    closeModal('pngModal');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
