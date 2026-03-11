/* ========================
   LOST & FOUND SYSTEM
   JavaScript Functionality
   ======================== */

// Initialize localStorage if needed
function initializeData() {
    if (!localStorage.getItem('lostItems')) {
        localStorage.setItem('lostItems', JSON.stringify(getSampleLostItems()));
    }
    if (!localStorage.getItem('foundItems')) {
        localStorage.setItem('foundItems', JSON.stringify(getSampleFoundItems()));
    }
}

// Sample Lost Items Data
function getSampleLostItems() {
    return [
        {
            id: 1,
            name: 'Black Backpack',
            description: 'Black Adidas backpack with laptop compartment. Has a small tear on the left pocket.',
            location: 'Library - 3rd Floor',
            date: '2026-03-05',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect fill="%23333" width="300" height="200"/><ellipse cx="150" cy="80" rx="40" ry="50" fill="%23666"/><rect x="120" y="100" width="60" height="80" fill="%23555"/><circle cx="135" cy="110" r="5" fill="red"/><circle cx="165" cy="110" r="5" fill="red"/></svg>',
            email: 'student1@university.edu',
            phone: '+94-77-123-4567',
            status: 'Lost'
        },
        {
            id: 2,
            name: 'Silver Laptop',
            description: 'MacBook Pro 14-inch with Apple Care sticker on the back',
            location: 'Computer Lab - Building A',
            date: '2026-03-04',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect fill="%23ccc" x="30" y="40" width="240" height="130" rx="5"/><rect fill="%23999" x="35" y="45" width="230" height="100"/><rect fill="%23333" x="40" y="150" width="220" height="10"/></svg>',
            email: 'student2@university.edu',
            phone: '+94-70-456-7890',
            status: 'Lost'
        },
        {
            id: 3,
            name: 'Student ID Card',
            description: 'Purple colored ID card. Name: John Doe. Missing since yesterday.',
            location: 'Main Gate',
            date: '2026-03-06',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect fill="%238b4dba" width="300" height="200" rx="10"/><circle cx="100" cy="80" r="30" fill="%23ddd"/><rect x="10" y="130" width="280" height="25" fill="rgba(255,255,255,0.3)"/><text x="150" y="150" fill="white" font-size="14" text-anchor="middle">STUDENT ID</text></svg>',
            email: 'john.doe@university.edu',
            phone: '+94-71-234-5678',
            status: 'Lost'
        }
    ];
}

// Sample Found Items Data
function getSampleFoundItems() {
    return [
        {
            id: 101,
            name: 'Blue Wallet',
            description: 'Blue leather wallet with multiple card slots. Contains some cash.',
            location: 'Cafeteria',
            date: '2026-03-07',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect fill="%234169e1" x="50" y="60" width="200" height="100" rx="10"/><line x1="60" y1="80" x2="240" y2="80" stroke="white" stroke-width="2"/><line x1="60" y1="100" x2="240" y2="100" stroke="white" stroke-width="2"/><line x1="60" y1="120" x2="240" y2="120" stroke="white" stroke-width="2"/></svg>',
            email: 'finder1@university.edu',
            phone: '+94-77-654-3210',
            currentLocation: 'Campus Security Office',
            status: 'Found'
        },
        {
            id: 102,
            name: 'Red AirPods',
            description: 'Apple AirPods Pro in red color with charging case. Good condition.',
            location: 'Sports Complex',
            date: '2026-03-08',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect fill="white" x="80" y="40" width="140" height="130" rx="20"/><circle cx="110" cy="90" r="15" fill="red"/><circle cx="190" cy="90" r="15" fill="red"/><rect x="140" y="120" width="20" height="40" fill="red" rx="10"/></svg>',
            email: 'finder2@university.edu',
            phone: '+94-70-987-6543',
            currentLocation: 'Student Center - Lost & Found Desk',
            status: 'Found'
        },
        {
            id: 103,
            name: 'Brown Glasses',
            description: 'Brown framed prescription glasses with UV protection coating.',
            location: 'Parking Area',
            date: '2026-03-09',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><circle cx="100" cy="100" r="35" fill="none" stroke="%238b6914" stroke-width="3"/><circle cx="200" cy="100" r="35" fill="none" stroke="%238b6914" stroke-width="3"/><line x1="135" y1="100" x2="165" y2="100" stroke="%238b6914" stroke-width="3"/><line x1="65" y1="100" x2="30" y2="90" stroke="%238b6914" stroke-width="2"/><line x1="235" y1="100" x2="270" y2="90" stroke="%238b6914" stroke-width="2"/></svg>',
            email: 'finder3@university.edu',
            phone: '+94-71-345-6789',
            currentLocation: 'Campus Security Office',
            status: 'Found'
        }
    ];
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
});

/* ========================
   AUTHENTICATION FUNCTIONS
   ======================== */

function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

function isGuest() {
    const user = getCurrentUser();
    return user && user.type === 'Guest';
}

function isAdmin() {
    const user = getCurrentUser();
    return user && user.isAdmin;
}

function redirectToLogin(message = '') {
    localStorage.setItem('redirectMessage', message || 'Please log in to access this page.');
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

function checkAuthenticationStatus() {
    const user = getCurrentUser();
    const navbar = document.querySelector('.navbar-buttons');
    
    if (!navbar) return; // Skip if navbar doesn't exist
    
    // Clear existing buttons
    const existingButtons = navbar.querySelectorAll('.auth-button');
    existingButtons.forEach(btn => btn.remove());
    
    if (user) {
        // User is logged in - show user info and logout button
        const userName = user.name || user.email.split('@')[0];
        const userBadge = document.createElement('span');
        userBadge.className = 'auth-button user-badge';
        userBadge.style.cssText = `
            padding: 8px 15px;
            background: var(--gradient);
            color: white;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            cursor: default;
            text-transform: capitalize;
        `;
        const roleText = user.type === 'Guest' ? '👤 Guest' : user.isAdmin ? '👨‍💼 Admin' : '👨‍🎓 Student';
        userBadge.innerHTML = `${roleText} • ${userName.substring(0, 20)}`;
        navbar.appendChild(userBadge);
        
        // Add logout button
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'auth-button logout-btn';
        logoutBtn.textContent = 'Logout';
        logoutBtn.style.cssText = `
            padding: 8px 18px;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
        `;
        logoutBtn.addEventListener('mouseover', function() {
            this.style.background = 'rgb(239, 68, 68)';
            this.style.transform = 'translateY(-2px)';
        });
        logoutBtn.addEventListener('mouseout', function() {
            this.style.background = 'rgba(239, 68, 68, 0.9)';
            this.style.transform = 'translateY(0)';
        });
        logoutBtn.addEventListener('click', logout);
        navbar.appendChild(logoutBtn);
        
        // Add Admin dashboard link if user is admin
        if (user.isAdmin) {
            const adminLink = document.createElement('a');
            adminLink.href = 'admin.html';
            adminLink.className = 'auth-button admin-link';
            adminLink.textContent = '⚙️ Admin Panel';
            adminLink.style.cssText = `
                padding: 8px 18px;
                background: rgba(147, 51, 234, 0.9);
                color: white;
                border: none;
                border-radius: 8px;
                text-decoration: none;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.3s ease;
                display: inline-block;
            `;
            adminLink.addEventListener('mouseover', function() {
                this.style.background = 'rgb(147, 51, 234)';
                this.style.transform = 'translateY(-2px)';
            });
            adminLink.addEventListener('mouseout', function() {
                this.style.background = 'rgba(147, 51, 234, 0.9)';
                this.style.transform = 'translateY(0)';
            });
            navbar.appendChild(adminLink);
        }
    } else {
        // User is not logged in - show login button
        const loginBtn = document.createElement('a');
        loginBtn.href = 'login.html';
        loginBtn.className = 'auth-button';
        loginBtn.textContent = '🔐 Login';
        loginBtn.style.cssText = `
            padding: 8px 18px;
            background: var(--gradient);
            color: white;
            border: none;
            border-radius: 8px;
            text-decoration: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            display: inline-block;
        `;
        loginBtn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.4)';
        });
        loginBtn.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        navbar.appendChild(loginBtn);
    }
}

// Check authentication on every page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthenticationStatus();
});

/* ========================
   FORM HANDLING
   ======================== */

// Handle Lost Item Form Submission
function handleLostItemSubmit(e) {
    e.preventDefault();

    // Check if user is authenticated and not a guest
    if (!isLoggedIn()) {
        redirectToLogin('You must log in to report a lost item.');
        return;
    }

    if (isGuest()) {
        alert('❌ Guest users cannot report items. Please login with your university account to report lost items.');
        return;
    }

    const formData = {
        id: Date.now(),
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        location: document.getElementById('locationLost').value,
        date: document.getElementById('dateLost').value,
        image: document.querySelector('.image-preview img')?.src || getSampleLostItems()[0].image,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        status: 'Lost',
        timestamp: new Date().toISOString(),
        reportedBy: getCurrentUser().email
    };

    // Get existing lost items
    let lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    lostItems.unshift(formData);
    localStorage.setItem('lostItems', JSON.stringify(lostItems));

    // Show success message
    const form = e.target;
    const successMsg = form.nextElementSibling;
    successMsg.style.display = 'block';
    form.style.display = 'none';

    // Reset form and show success for 3 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        successMsg.style.display = 'none';
        document.getElementById('imagePreview').innerHTML = '';
    }, 3000);

    updateStats();
}

// Handle Found Item Form Submission
function handleFoundItemSubmit(e) {
    e.preventDefault();

    // Check if user is authenticated and not a guest
    if (!isLoggedIn()) {
        redirectToLogin('You must log in to report a found item.');
        return;
    }

    if (isGuest()) {
        alert('❌ Guest users cannot report items. Please login with your university account to report found items.');
        return;
    }

    const formData = {
        id: Date.now(),
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        location: document.getElementById('locationFound').value,
        date: document.getElementById('dateFound').value,
        image: document.querySelector('.image-preview img')?.src || getSampleFoundItems()[0].image,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        currentLocation: document.getElementById('currentLocation').value || 'Campus Security Office',
        status: 'Found',
        timestamp: new Date().toISOString(),
        reportedBy: getCurrentUser().email
    };

    // Get existing found items
    let foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
    foundItems.unshift(formData);
    localStorage.setItem('foundItems', JSON.stringify(foundItems));

    // Show success message
    const form = e.target;
    const successMsg = form.nextElementSibling;
    successMsg.style.display = 'block';
    form.style.display = 'none';

    // Reset form and show success for 3 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        successMsg.style.display = 'none';
        document.getElementById('imagePreview').innerHTML = '';
    }, 3000);

    updateStats();
}

// Handle Image Preview
function previewImage(e) {
    const file = e.target.files[0];
    const fileUploadContainer = e.target.closest('.file-upload');
    const preview = fileUploadContainer.querySelector('.image-preview');
    const qualityDiv = fileUploadContainer.querySelector('.image-quality');

    if (file) {
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            qualityDiv.innerHTML = '⚠️ <strong>File too large!</strong> Maximum size is 5MB. Please compress your image.';
            qualityDiv.style.background = '#fef3c7';
            qualityDiv.style.borderLeftColor = '#f59e0b';
            qualityDiv.style.display = 'block';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                // Display preview
                preview.innerHTML = `<img src="${event.target.result}" alt="Preview" style="max-width: 100%; max-height: 300px; border-radius: 8px;">`;
                
                // Analyze image quality
                analyzeImageQuality(img, file, qualityDiv);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Analyze image quality and provide feedback
function analyzeImageQuality(img, file, qualityDiv) {
    let quality = 'good';
    let feedback = '✅ <strong>Image Quality:</strong> ';
    let tips = [];

    // Check resolution (at least 400x300 recommended)
    const minWidth = 400;
    const minHeight = 300;
    
    if (img.width < minWidth || img.height < minHeight) {
        quality = 'low';
        feedback += `Image is ${img.width}x${img.height}px. `;
        tips.push('Tip: Use a higher resolution image for better identification');
    } else {
        feedback += `${img.width}x${img.height}px. `;
    }

    // Check file type and compression
    const isJPEG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const fileSizeKB = (file.size / 1024).toFixed(2);

    if (isJPEG) {
        feedback += `JPEG (${fileSizeKB}KB). `;
        if (file.size > 2 * 1024 * 1024) {
            tips.push('Tip: Your JPEG is large. Consider compressing it');
        }
    } else if (isPNG) {
        feedback += `PNG (${fileSizeKB}KB). `;
        if (file.size > 3 * 1024 * 1024) {
            tips.push('Tip: Your PNG is large. Consider using JPEG instead');
        }
    }

    // Additional tips
    if (tips.length === 0) {
        feedback += 'Ready to upload!';
    }

    // Display feedback
    qualityDiv.innerHTML = feedback + (tips.length > 0 ? `<br>${tips.join('<br>')}` : '');
    qualityDiv.style.background = quality === 'good' ? '#d1fae5' : '#fef3c7';
    qualityDiv.style.borderLeftColor = quality === 'good' ? '#10b981' : '#f59e0b';
    qualityDiv.style.display = 'block';
}

/* ========================
   SEARCH & FILTER
   ======================== */

function displayAllItems() {
    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
    const allItems = [...lostItems, ...foundItems];

    updateItemsGrid(allItems);
}

function filterItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const locationFilter = document.getElementById('filterLocation').value.toLowerCase();

    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
    let allItems = [...lostItems, ...foundItems];

    allItems = allItems.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(searchTerm) ||
                           item.description.toLowerCase().includes(searchTerm);
        const matchStatus = statusFilter === '' || item.status === statusFilter;
        const matchLocation = item.location.toLowerCase().includes(locationFilter);

        return matchSearch && matchStatus && matchLocation;
    });

    updateItemsGrid(allItems);
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterLocation').value = '';
    displayAllItems();
}

function updateItemsGrid(items) {
    const grid = document.getElementById('itemsGrid');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');

    if (items.length === 0) {
        grid.innerHTML = '';
        if (noResults) {
            noResults.style.display = 'block';
        }
        if (resultCount) {
            resultCount.textContent = '0';
        }
        return;
    }

    if (noResults) {
        noResults.style.display = 'none';
    }

    if (resultCount) {
        resultCount.textContent = items.length;
    }

    // Sort items by date (newest first)
    items.sort((a, b) => new Date(b.date) - new Date(a.date));

    grid.innerHTML = items.map(item => createItemCard(item)).join('');

    // Add click listeners
    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', function() {
            showItemDetail(this.dataset.id);
        });
    });
}

function createItemCard(item) {
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const statusClass = `status-${item.status.toLowerCase()}`;

    return `
        <div class="item-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-content">
                <div class="item-header">
                    <h3 class="item-name">${item.name}</h3>
                    <span class="item-status ${statusClass}">${item.status}</span>
                </div>
                <div class="item-location">${item.location}</div>
                <div class="item-date">${formattedDate}</div>
                <p class="item-description">${item.description}</p>
                <div class="item-contact">
                    <div class="contact-info">
                        <span>📧 ${item.email}</span>
                        <span>📱 ${item.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayRecentItems() {
    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
    const allItems = [...lostItems, ...foundItems];

    // Sort by date and get first 6 items
    allItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentItems = allItems.slice(0, 6);

    const grid = document.getElementById('recentItemsGrid');
    if (grid) {
        grid.innerHTML = recentItems.map(item => createItemCard(item)).join('');

        // Add click listeners
        document.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', function() {
                showItemDetail(this.dataset.id);
            });
        });
    }
}

function showItemDetail(itemId) {
    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
    const allItems = [...lostItems, ...foundItems];

    const item = allItems.find(i => i.id == itemId);
    if (!item) return;

    const modal = document.getElementById('itemModal');
    const modalBody = document.getElementById('modalBody');
    const statusClass = `status-${item.status.toLowerCase()}`;

    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let contactSection = `
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-color);">
            <h4 style="margin-bottom: 15px; color: var(--text-dark);">Contact Information:</h4>
            <p><strong>Email:</strong> ${item.email}</p>
            <p><strong>Phone:</strong> ${item.phone}</p>
    `;

    if (item.currentLocation) {
        contactSection += `<p><strong>Item Location:</strong> ${item.currentLocation}</p>`;
    }

    contactSection += `</div>`;

    let actionButtons = `
        <div style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
    `;

    // Add "Mark as Found/Returned" button
    if (item.status !== 'Returned') {
        const buttonText = item.status === 'Lost' ? 'Mark as Found ✓' : 'Mark as Returned ✓';
        const buttonColor = item.status === 'Lost' ? '#10b981' : '#06b6d4';
        actionButtons += `
            <button onclick="confirmItemAction(${item.id}, 'markFound')" 
                    style="flex: 1; padding: 10px 15px; background: ${buttonColor}; color: white; border: none; 
                            border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;"
                    onmouseover="this.style.opacity='0.8'"
                    onmouseout="this.style.opacity='1'">
                ${buttonText}
            </button>
        `;
    }

    // Add Delete button
    actionButtons += `
        <button onclick="confirmItemAction(${item.id}, 'delete')" 
                style="flex: 1; padding: 10px 15px; background: #ef4444; color: white; border: none; 
                        border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;"
                onmouseover="this.style.opacity='0.8'"
                onmouseout="this.style.opacity='1'">
            Delete ✕
        </button>
    `;

    actionButtons += `</div>`;

    modalBody.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
            <h2 style="color: var(--text-dark); margin: 0; flex: 1;">${item.name}</h2>
            <span class="item-status ${statusClass}" style="margin-left: 10px;">${item.status}</span>
        </div>
        <p style="color: var(--text-light); margin-bottom: 10px;">
            <strong>📍 Location:</strong> ${item.location}
        </p>
        <p style="color: var(--text-light); margin-bottom: 10px;">
            <strong>📅 Date:</strong> ${formattedDate}
        </p>
        <div style="background: var(--bg-light); padding: 15px; border-radius: 10px; margin: 20px 0;">
            <h4 style="margin-bottom: 10px; color: var(--text-dark);">Description:</h4>
            <p style="color: var(--text-dark); line-height: 1.6; margin: 0;">${item.description}</p>
        </div>
        ${contactSection}
        ${actionButtons}
    `;

    modal.style.display = 'block';
}

// Handle item actions (delete, mark found)
function confirmItemAction(itemId, action) {
    if (action === 'delete') {
        if (confirm('Are you sure you want to delete this item? This cannot be undone.')) {
            deleteItem(itemId);
            document.getElementById('itemModal').style.display = 'none';
        }
    } else if (action === 'markFound') {
        const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
        const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
        
        let item = lostItems.find(i => i.id == itemId);
        if (item) {
            item.status = item.status === 'Lost' ? 'Found' : 'Returned';
            localStorage.setItem('lostItems', JSON.stringify(lostItems));
        }

        item = foundItems.find(i => i.id == itemId);
        if (item) {
            item.status = 'Returned';
            localStorage.setItem('foundItems', JSON.stringify(foundItems));
        }

        updateStats();
        
        // Refresh modal or close it
        document.getElementById('itemModal').style.display = 'none';
        if (document.getElementById('itemsGrid')) {
            displayAllItems();
        }
        
        // Show success message
        alert('✅ Item status updated successfully!');
    }
}

// Modal close functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('itemModal');
    if (modal) {
        const closeBtn = modal.querySelector('.modal-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

/* ========================
   STATISTICS
   ======================== */

function updateStats() {
    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];

    const lostCount = lostItems.filter(item => item.status === 'Lost').length;
    const foundCount = foundItems.filter(item => item.status === 'Found').length;
    const returnedCount = [...lostItems, ...foundItems].filter(item => item.status === 'Returned').length;

    const lostCountEl = document.getElementById('lostCount');
    const foundCountEl = document.getElementById('foundCount');
    const returnedCountEl = document.getElementById('returnedCount');

    if (lostCountEl) animateCounter(lostCountEl, lostCount);
    if (foundCountEl) animateCounter(foundCountEl, foundCount);
    if (returnedCountEl) animateCounter(returnedCountEl, returnedCount);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 30);
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        element.textContent = current;
    }, 30);
}

/* ========================
   SCROLL ANIMATIONS
   ======================== */

// Observe elements for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.item-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.feature-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.stat-card').forEach(el => observer.observe(el));
});

/* ========================
   UTILITY FUNCTIONS
   ======================== */

// Format date function
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Mark item as returned (future feature)
function markAsReturned(itemId) {
    const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];

    let item = lostItems.find(i => i.id == itemId);
    if (item) {
        item.status = 'Returned';
        localStorage.setItem('lostItems', JSON.stringify(lostItems));
    }

    item = foundItems.find(i => i.id == itemId);
    if (item) {
        item.status = 'Returned';
        localStorage.setItem('foundItems', JSON.stringify(foundItems));
    }

    updateStats();
    if (document.getElementById('itemsGrid')) {
        displayAllItems();
    }
}

// Delete item (admin feature)
function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        let lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
        let foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];

        lostItems = lostItems.filter(i => i.id != itemId);
        foundItems = foundItems.filter(i => i.id != itemId);

        localStorage.setItem('lostItems', JSON.stringify(lostItems));
        localStorage.setItem('foundItems', JSON.stringify(foundItems));

        updateStats();
        if (document.getElementById('itemsGrid')) {
            filterItems();
        }
    }
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hide/show scroll button based on scroll position
    window.addEventListener('scroll', function() {
        const button = document.querySelector('.scroll-to-top');
        if (button) {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        }
    });
});

// Update stats on page load
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
});

// Active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
