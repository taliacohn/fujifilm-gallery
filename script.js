// Main JavaScript for Fujifilm Recipe Gallery
let recipes = [];
let currentFilter = 'all';
let currentSearch = '';
let currentLightboxRecipe = null;
let currentLightboxIndex = 0;

// Load recipes on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadRecipes();
    setupEventListeners();
    displayRecipes();
});

// Load recipes from JSON file
async function loadRecipes() {
    try {
        const response = await fetch('recipes.json');
        recipes = await response.json();
        
        // Load likes from localStorage
        const likes = JSON.parse(localStorage.getItem('recipeLikes') || '{}');
        recipes.forEach(recipe => {
            if (recipe.photos && recipe.photos.length > 0) {
                recipe.photos.forEach(photo => {
                    photo.liked = likes[`${recipe.id}-${photo.filename}`] || false;
                });
            }
        });
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const page = e.target.dataset.page;
            switchPage(page);
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        displayRecipes();
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            displayRecipes();
        });
    });

    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('recipeModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Lightbox controls
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
    document.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));
    
    window.addEventListener('click', (e) => {
        const lightbox = document.getElementById('photoLightbox');
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('photoLightbox');
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'Escape') closeLightbox();
        }
    });
}

// Switch between pages
function switchPage(page) {
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.page === page) {
            tab.classList.add('active');
        }
    });

    // Update page content
    document.querySelectorAll('.page-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${page}Page`).classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Display recipes based on filters
function displayRecipes() {
    const grid = document.getElementById('recipeGrid');
    const filteredRecipes = recipes.filter(recipe => {
        // Apply filter
        let passFilter = false;
        switch (currentFilter) {
            case 'all':
                passFilter = true;
                break;
            case 'usingNow':
                passFilter = recipe.usingNow;
                break;
            case 'tried':
                passFilter = recipe.tried;
                break;
            case 'untried':
                passFilter = !recipe.tried;
                break;
        }

        // Apply search
        let passSearch = true;
        if (currentSearch) {
            const searchableText = `${recipe.name} ${recipe.filmSim} ${recipe.notes}`.toLowerCase();
            passSearch = searchableText.includes(currentSearch);
        }

        return passFilter && passSearch;
    });

    if (filteredRecipes.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3>No recipes found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredRecipes.map(recipe => createRecipeCard(recipe)).join('');

    // Add click listeners to cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const recipeId = card.dataset.recipeId;
            const recipe = recipes.find(r => r.id === recipeId);
            showRecipeModal(recipe);
        });
    });
}

// Create recipe card HTML
function createRecipeCard(recipe) {
    const badges = [];
    if (recipe.usingNow) badges.push('<span class="badge using-now">Using Now</span>');
    if (recipe.tried) badges.push('<span class="badge tried">Tried</span>');
    else badges.push('<span class="badge untried">To Try</span>');

    const photoCount = recipe.photos ? recipe.photos.length : 0;
    const likedCount = recipe.photos ? recipe.photos.filter(p => p.liked).length : 0;

    return `
        <div class="recipe-card" data-recipe-id="${recipe.id}">
            <div class="recipe-header">
                <h3>${recipe.name}</h3>
            </div>
            <div class="recipe-badges">
                ${badges.join('')}
            </div>
            <div class="recipe-info">
                <div class="info-row">
                    <span class="info-label">Film Sim</span>
                    <span class="info-value">${recipe.filmSim}</span>
                </div>
                ${recipe.dynamicRange ? `
                <div class="info-row">
                    <span class="info-label">Dynamic Range</span>
                    <span class="info-value">${recipe.dynamicRange}</span>
                </div>
                ` : ''}
                ${recipe.whiteBalance ? `
                <div class="info-row">
                    <span class="info-label">White Balance</span>
                    <span class="info-value">${recipe.whiteBalance}</span>
                </div>
                ` : ''}
            </div>
            <a href="${recipe.link}" target="_blank" class="recipe-link" onclick="event.stopPropagation();">
                View Recipe Source →
            </a>
            <div class="photo-count">
                📸 ${photoCount} photo${photoCount !== 1 ? 's' : ''} 
                ${likedCount > 0 ? `| ❤️ ${likedCount} liked` : ''}
            </div>
        </div>
    `;
}

// Show recipe detail modal
function showRecipeModal(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalBody = document.getElementById('modalBody');

    const photoCount = recipe.photos ? recipe.photos.length : 0;

    // Collect all settings to display
    const settings = [
        { label: 'Film Simulation', value: recipe.filmSim },
        { label: 'Dynamic Range', value: recipe.dynamicRange },
        { label: 'Grain Effect', value: recipe.grain },
        { label: 'Color Chrome', value: recipe.colorChromeEffect },
        { label: 'White Balance', value: recipe.whiteBalance },
        { label: 'Highlight', value: recipe.highlight },
        { label: 'Shadow', value: recipe.shadow },
        { label: 'Color', value: recipe.color },
        { label: 'Sharpness', value: recipe.sharpness },
        { label: 'Noise Reduction', value: recipe.noiseReduction }
    ].filter(s => s.value); // Only show settings that have values

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${recipe.name}</h2>
            ${recipe.notes ? `<p style="color: var(--text-muted); margin-top: 0.5rem;">${recipe.notes}</p>` : ''}
            <div class="recipe-badges" style="margin-top: 1rem;">
                ${recipe.usingNow ? '<span class="badge using-now">Using Now</span>' : ''}
                ${recipe.tried ? '<span class="badge tried">Tried</span>' : '<span class="badge untried">To Try</span>'}
            </div>
        </div>

        <h3 style="margin-bottom: 1rem; color: var(--primary-color);">📋 Recipe Settings</h3>
        <div class="settings-grid">
            ${settings.map(s => createSettingItem(s.label, s.value)).join('')}
        </div>

        <div style="margin: 2rem 0; padding: 1.25rem; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 12px; border-left: 4px solid var(--secondary-color);">
            <strong style="color: var(--primary-color);">🔗 Recipe Source:</strong> 
            <a href="${recipe.link}" target="_blank" style="color: var(--secondary-color); word-break: break-all; display: inline-block; margin-top: 0.5rem;">${recipe.link}</a>
        </div>

        <div class="photo-gallery">
            <h3>📸 Photos (${photoCount})</h3>
            ${photoCount > 0 ? `
                <div class="photo-grid">
                    ${recipe.photos.map((photo, index) => createPhotoItem(recipe, photo, index)).join('')}
                </div>
            ` : `
                <div class="no-photos">
                    <p>No photos yet for this recipe</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">
                        Add photos to the <code>photos/${recipe.id}/</code> directory and update the recipe in <code>recipes.json</code>
                    </p>
                </div>
            `}
        </div>
    `;

    // Add like button listeners
    modalBody.querySelectorAll('.like-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const recipeId = btn.dataset.recipeId;
            const photoIndex = parseInt(btn.dataset.photoIndex);
            toggleLike(recipeId, photoIndex);
        });
    });

    // Add photo click listeners to open lightbox
    modalBody.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't open lightbox if clicking the like button
            if (e.target.classList.contains('like-button')) return;
            
            const photoIndex = parseInt(item.dataset.photoIndex);
            openLightbox(recipe, photoIndex);
        });
    });

    modal.style.display = 'block';
}

// Create setting item HTML
function createSettingItem(label, value) {
    if (!value) return '';
    return `
        <div class="setting-item">
            <h4>${label}</h4>
            <p>${value}</p>
        </div>
    `;
}

// Create photo item HTML
function createPhotoItem(recipe, photo, index) {
    const likedClass = photo.liked ? 'liked' : '';
    return `
        <div class="photo-item" data-photo-index="${index}">
            <img src="photos/${recipe.id}/${photo.filename}" alt="${photo.caption || recipe.name}">
            <button class="like-button ${likedClass}" 
                    data-recipe-id="${recipe.id}" 
                    data-photo-index="${index}">
                ${photo.liked ? '❤️' : '🤍'}
            </button>
            <div class="photo-overlay">
                ${photo.caption ? `<p style="font-size: 0.85rem; margin-bottom: 0.3rem;">${photo.caption}</p>` : ''}
                ${photo.tags && photo.tags.length > 0 ? `
                    <div class="photo-tags">
                        ${photo.tags.map(tag => `<span class="photo-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Toggle like on a photo
function toggleLike(recipeId, photoIndex) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe || !recipe.photos || !recipe.photos[photoIndex]) return;

    recipe.photos[photoIndex].liked = !recipe.photos[photoIndex].liked;

    // Save to localStorage
    const likes = JSON.parse(localStorage.getItem('recipeLikes') || '{}');
    const key = `${recipeId}-${recipe.photos[photoIndex].filename}`;
    likes[key] = recipe.photos[photoIndex].liked;
    localStorage.setItem('recipeLikes', JSON.stringify(likes));

    // Refresh modal
    showRecipeModal(recipe);
    
    // Refresh grid to update counts
    displayRecipes();
}

// Close modal
function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

// Open photo lightbox
function openLightbox(recipe, photoIndex) {
    currentLightboxRecipe = recipe;
    currentLightboxIndex = photoIndex;
    
    updateLightboxContent();
    
    const lightbox = document.getElementById('photoLightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Setup lightbox like button
    const likeBtn = document.getElementById('lightboxLikeBtn');
    likeBtn.onclick = () => toggleLightboxLike();
}

// Update lightbox content
function updateLightboxContent() {
    if (!currentLightboxRecipe || !currentLightboxRecipe.photos) return;

    const photo = currentLightboxRecipe.photos[currentLightboxIndex];
    const totalPhotos = currentLightboxRecipe.photos.length;

    // Update image
    const img = document.getElementById('lightboxImage');
    img.src = `photos/${currentLightboxRecipe.id}/${photo.filename}`;
    img.alt = photo.caption || currentLightboxRecipe.name;

    // Update caption
    const caption = document.querySelector('.lightbox-caption');
    caption.textContent = photo.caption || '';

    // Update tags
    const tagsContainer = document.querySelector('.lightbox-tags');
    if (photo.tags && photo.tags.length > 0) {
        tagsContainer.innerHTML = photo.tags.map(tag => 
            `<span class="photo-tag">${tag}</span>`
        ).join('');
    } else {
        tagsContainer.innerHTML = '';
    }

    // Update like button
    const likeBtn = document.getElementById('lightboxLikeBtn');
    const likeIcon = likeBtn.querySelector('.like-icon');
    if (photo.liked) {
        likeBtn.classList.add('liked');
        likeIcon.textContent = '❤️';
    } else {
        likeBtn.classList.remove('liked');
        likeIcon.textContent = '🤍';
    }

    // Update counter
    const counter = document.querySelector('.lightbox-counter');
    counter.textContent = `${currentLightboxIndex + 1} / ${totalPhotos}`;

    // Show/hide navigation buttons
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    prevBtn.style.display = currentLightboxIndex > 0 ? 'block' : 'none';
    nextBtn.style.display = currentLightboxIndex < totalPhotos - 1 ? 'block' : 'none';
}

// Navigate lightbox
function navigateLightbox(direction) {
    if (!currentLightboxRecipe || !currentLightboxRecipe.photos) return;

    const newIndex = currentLightboxIndex + direction;
    if (newIndex >= 0 && newIndex < currentLightboxRecipe.photos.length) {
        currentLightboxIndex = newIndex;
        updateLightboxContent();
    }
}

// Toggle like in lightbox
function toggleLightboxLike() {
    if (!currentLightboxRecipe || !currentLightboxRecipe.photos) return;

    const photo = currentLightboxRecipe.photos[currentLightboxIndex];
    photo.liked = !photo.liked;

    // Save to localStorage
    const likes = JSON.parse(localStorage.getItem('recipeLikes') || '{}');
    const key = `${currentLightboxRecipe.id}-${photo.filename}`;
    likes[key] = photo.liked;
    localStorage.setItem('recipeLikes', JSON.stringify(likes));

    // Update lightbox like button
    updateLightboxContent();

    // Refresh the recipe modal in the background
    showRecipeModal(currentLightboxRecipe);

    // Refresh grid to update counts
    displayRecipes();
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('photoLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    currentLightboxRecipe = null;
    currentLightboxIndex = 0;
}

