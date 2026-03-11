/* ========================
   FUZZY SEARCH & SMART FEATURES
   ======================== */

let fuse = null;
let currentMapInstance = null;
let mapMarkers = [];

// Initialize Fuse.js for fuzzy search
function initializeFuzzySearch() {
    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
    const allItems = [...lostItems, ...foundItems];

    const fuseOptions = {
        keys: ['name', 'description', 'location'],
        threshold: 0.4, // 0.4 means 60% match required (handles typos well)
        minMatchCharLength: 2,
        distance: 100
    };

    fuse = new Fuse(allItems, fuseOptions);
}

// Filter items with fuzzy search
function filterItemsWithFuzzy() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    const statusFilter = document.getElementById('filterStatus').value;
    const locationFilter = document.getElementById('filterLocation').value.toLowerCase();

    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
    const allItems = [...lostItems, ...foundItems];

    let filteredItems = allItems;

    // Apply fuzzy search if search term exists
    if (searchTerm.length > 0) {
        const fuzzyResults = fuse ? fuse.search(searchTerm) : [];
        filteredItems = fuzzyResults.map(result => result.item);
    }

    // Apply status filter
    if (statusFilter) {
        filteredItems = filteredItems.filter(item => item.status === statusFilter);
    }

    // Apply location filter
    if (locationFilter) {
        filteredItems = filteredItems.filter(item => 
            item.location.toLowerCase().includes(locationFilter)
        );
    }

    updateItemsGrid(filteredItems);
}

// Initialize map toggle functionality
function initializeMapToggle() {
    const toggleBtn = document.getElementById('toggleMapView');
    const mapContainer = document.getElementById('mapContainer');

    toggleBtn.addEventListener('click', function() {
        if (mapContainer.style.display === 'none') {
            mapContainer.style.display = 'block';
            toggleBtn.textContent = '📋 Show List View';
            initializeMap();
        } else {
            mapContainer.style.display = 'none';
            toggleBtn.textContent = '📍 Show Map View';
            if (currentMapInstance) {
                currentMapInstance.remove();
                currentMapInstance = null;
            }
        }
    });
}

// Initialize interactive map with Leaflet
function initializeMap() {
    if (currentMapInstance) {
        currentMapInstance.remove();
    }

    const mapContainer = document.getElementById('itemsMap');
    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
    const allItems = [...lostItems, ...foundItems];

    // Default center (University of Colombo area)
    const defaultCenter = [6.9271, 80.7744];

    // Create map
    currentMapInstance = L.map(mapContainer).setView(defaultCenter, 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(currentMapInstance);

    // Clear existing markers
    mapMarkers.forEach(marker => marker.remove());
    mapMarkers = [];

    // Add markers for each item
    allItems.forEach(item => {
        // Generate consistent coordinates based on location name
        const coordHash = hashLocationName(item.location);
        const lat = defaultCenter[0] + (coordHash.lat % 100) / 1000;
        const lng = defaultCenter[1] + (coordHash.lng % 100) / 1000;

        // Determine marker color based on status
        let markerColor = '#06b6d4'; // Found - cyan
        let markerIcon = '🔍';
        if (item.status === 'Lost') {
            markerColor = '#ef4444'; // Lost - red
            markerIcon = '❌';
        } else if (item.status === 'Returned') {
            markerColor = '#10b981'; // Returned - green
            markerIcon = '✅';
        }

        // Create custom marker
        const marker = L.circleMarker([lat, lng], {
            radius: 10,
            fillColor: markerColor,
            color: 'white',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(currentMapInstance);

        // Add popup with item details
        const popupContent = `
            <div style="font-size: 12px; min-width: 180px;">
                <strong style="color: var(--text-dark);">${item.name}</strong><br>
                <span style="color: ${markerColor}; font-weight: 600;">${item.status}</span><br>
                <small style="color: var(--text-light);">📍 ${item.location}</small><br>
                <small style="color: var(--text-light);">📅 ${formatDate(item.date)}</small><br>
                <a href="#" onclick="showItemDetail('${item.id}'); return false;" 
                   style="color: #2563eb; text-decoration: none; font-weight: 600;">View Details →</a>
            </div>
        `;
        marker.bindPopup(popupContent);

        mapMarkers.push(marker);
    });

    // Fit map bounds if there are items
    if (mapMarkers.length > 0) {
        const group = new L.featureGroup(mapMarkers);
        currentMapInstance.fitBounds(group.getBounds().pad(0.1));
    }
}

// Hash location name to generate consistent coordinates
function hashLocationName(locationName) {
    let hash = 0;
    for (let i = 0; i < locationName.length; i++) {
        const char = locationName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    return {
        lat: hash,
        lng: hash ^ 12345
    };
}

/* ========================
   AUTO-MATCHING ALGORITHM
   ======================== */

function initializeAutoMatching() {
    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
    const potentialMatches = [];

    // Compare each lost item with found items
    lostItems.forEach(lostItem => {
        if (lostItem.status === 'Lost') {
            foundItems.forEach(foundItem => {
                if (foundItem.status === 'Found') {
                    const similarityScore = calculateItemSimilarity(lostItem, foundItem);

                    if (similarityScore > 0.6) { // 60% match threshold
                        potentialMatches.push({
                            lostItem: lostItem,
                            foundItem: foundItem,
                            matchScore: similarityScore,
                            timestamp: new Date().toISOString()
                        });
                    }
                }
            });
        }
    });

    // Store matches for admin review
    if (potentialMatches.length > 0) {
        localStorage.setItem('potentialMatches', JSON.stringify(potentialMatches));
    }

    return potentialMatches;
}

// Calculate similarity score between two items
function calculateItemSimilarity(item1, item2) {
    let score = 0;
    const weights = {
        nameMatch: 0.4,
        descriptionMatch: 0.3,
        locationMatch: 0.2,
        dateProximity: 0.1
    };

    // Name similarity (using simple substring matching for now)
    const name1 = item1.name.toLowerCase();
    const name2 = item2.name.toLowerCase();
    if (name1.includes(name2) || name2.includes(name1)) {
        score += weights.nameMatch;
    } else if (calculateLevenshteinSimilarity(name1, name2) > 0.7) {
        score += weights.nameMatch * 0.7;
    }

    // Description similarity
    const desc1 = item1.description.toLowerCase();
    const desc2 = item2.description.toLowerCase();
    const commonWords = desc1.split(' ').filter(word => desc2.includes(word)).length;
    const descriptionScore = commonWords / Math.max(desc1.split(' ').length, desc2.split(' ').length);
    score += descriptionScore * weights.descriptionMatch;

    // Location similarity
    const loc1 = item1.location.toLowerCase();
    const loc2 = item2.location.toLowerCase();
    if (loc1.includes(loc2) || loc2.includes(loc1)) {
        score += weights.locationMatch;
    }

    // Date proximity (within 7 days is good)
    const date1 = new Date(item1.date);
    const date2 = new Date(item2.date);
    const daysDiff = Math.abs((date1 - date2) / (1000 * 60 * 60 * 24));
    if (daysDiff <= 7) {
        score += weights.dateProximity * (1 - daysDiff / 7);
    }

    return Math.min(score, 1); // Cap at 1.0
}

// Levenshtein distance for string similarity
function calculateLevenshteinSimilarity(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const max = Math.max(len1, len2);

    if (max === 0) return 1.0;

    const distance = levenshteinDistance(str1, str2);
    return 1 - (distance / max);
}

function levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

/* ========================
   SMART NOTIFICATIONS
   ======================== */

function showAutoMatchNotifications() {
    const matches = JSON.parse(localStorage.getItem('potentialMatches')) || [];

    if (matches.length > 0) {
        const user = getCurrentUser();
        
        // Check if user has any items that match
        const userMatches = matches.filter(match => 
            match.lostItem.reportedBy === user?.email || 
            match.foundItem.reportedBy === user?.email
        );

        if (userMatches.length > 0) {
            showNotificationBanner(`🎉 We found ${userMatches.length} potential match(es) for your item(s)!`, 'success');
        }
    }
}

function showNotificationBanner(message, type = 'info') {
    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#2563eb'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    banner.textContent = message;
    document.body.appendChild(banner);

    setTimeout(() => {
        banner.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => banner.remove(), 300);
    }, 5000);
}

// Initialize fuzzy search on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeFuzzySearch();
    
    // Run auto-matching in background
    setTimeout(() => {
        initializeAutoMatching();
        showAutoMatchNotifications();
    }, 500);
});

// Format date utility (if not already in script.js)
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
