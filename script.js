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
   FORM HANDLING
   ======================== */

// Handle Lost Item Form Submission
function handleLostItemSubmit(e) {
    e.preventDefault();

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
        timestamp: new Date().toISOString()
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
        timestamp: new Date().toISOString()
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
    const preview = e.target.nextElementSibling.nextElementSibling;

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
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
    `;

    modal.style.display = 'block';
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
