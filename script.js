// =======================================================
// MARS WASTENET DASHBOARD - SCRIPT.JS
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. INITIALIZATION & CHART SETUP
    setupCharts();
    checkAuthStatus();
    loadCommunityData();
    
    // Attach event listeners for modals (clicking outside closes the modal)
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(modal.id);
            }
        });
    });
});

// =======================================================
// 2. NAVIGATION AND SECTION MANAGEMENT
// =======================================================

/**
 * Toggles the active content section based on the link clicked.
 * @param {string} sectionId - The ID of the content section to show (e.g., 'dashboard').
 */
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Update active class on nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    // Find and set the active link
    const activeLink = document.querySelector(`.nav-links a[onclick*="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// =======================================================
// 3. CHART.JS CONFIGURATION
// =======================================================

/**
 * Sets up all Chart.js visualizations.
 */
function setupCharts() {
    // --- Data for Charts ---
    const trendsData = [2500, 3100, 3600, 4000, 3800, 4500, 5100]; // Daily kg processed (7 days)
    const trendsLabels = ['Sol 1', 'Sol 2', 'Sol 3', 'Sol 4', 'Sol 5', 'Sol 6', 'Sol 7'];
    const pieData = [35, 45, 20]; // Organic, Inorganics, Hazardous (%)
    const pieLabels = ['Organic Waste (35%)', 'Inorganic Polymers (45%)', 'Hazardous Materials (20%)'];
    const efficiencyData = [85, 88, 92, 94, 91, 95, 94]; // System efficiency (%)
    const resourceData = [40, 25, 15, 20]; // Water, Oxygen, Metals, Structural
    const resourceLabels = ['Water Recovered (40%)', 'Oxygen Generated (25%)', 'Metals Separated (15%)', 'Structural Material (20%)'];

    // --- Chart Options Base ---
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#8892b0' }
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#8892b0' }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#8892b0' },
                beginAtZero: true
            }
        }
    };
    
    // 1. Trends Chart (Line)
    new Chart(document.getElementById('trendsChart'), {
        type: 'line',
        data: {
            labels: trendsLabels,
            datasets: [{
                label: 'Processed Mass (kg)',
                data: trendsData,
                borderColor: '#ff6b4a',
                backgroundColor: 'rgba(255, 107, 74, 0.1)',
                tension: 0.3,
                pointBackgroundColor: '#ff6b4a'
            }]
        },
        options: { ...chartOptions, scales: { x: chartOptions.scales.x, y: chartOptions.scales.y } }
    });

    // 2. Pie Chart (Waste Distribution)
    new Chart(document.getElementById('pieChart'), {
        type: 'doughnut',
        data: {
            labels: pieLabels,
            datasets: [{
                data: pieData,
                backgroundColor: ['#ff6b4a', '#4ade80', '#ff9933'],
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#8892b0' } },
                tooltip: { callbacks: { label: (context) => context.label + ': ' + context.formattedValue + '%' } }
            }
        }
    });

    // 3. Efficiency Chart (Bar)
    new Chart(document.getElementById('efficiencyChart'), {
        type: 'bar',
        data: {
            labels: trendsLabels, // Reusing trends labels for consistency
            datasets: [{
                label: 'Efficiency (%)',
                data: efficiencyData,
                backgroundColor: '#4ade80',
                borderColor: '#3b82f6',
                borderWidth: 1
            }]
        },
        options: {
            ...chartOptions,
            scales: {
                ...chartOptions.scales,
                y: { ...chartOptions.scales.y, max: 100, title: { display: true, text: 'Percentage (%)', color: '#8892b0' } }
            }
        }
    });

    // 4. Resource Recovery Chart (Polar Area)
    new Chart(document.getElementById('resourceChart'), {
        type: 'polarArea',
        data: {
            labels: resourceLabels,
            datasets: [{
                data: resourceData,
                backgroundColor: ['#ff6b4a', '#4ade80', '#3b82f6', '#ff9933'],
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#8892b0' } }
            },
            scales: { r: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#8892b0', backdropColor: '#0a0e1a' } } }
        }
    });
}

// =======================================================
// 4. MODAL MANAGEMENT
// =======================================================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openLoginModal() {
    openModal('loginModal');
}

function openSignupModal() {
    openModal('signupModal');
}

function openIdeaModal() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        openModal('ideaModal');
        document.getElementById('ideaName').value = localStorage.getItem('userName') || '';
    } else {
        showNotification('Please log in to contribute your ideas.', 'error');
        openLoginModal();
    }
}

// =======================================================
// 5. AUTHENTICATION (SIMULATED)
// =======================================================

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');

    if (isLoggedIn) {
        authButtons.classList.remove('active');
        userInfo.classList.add('active');
        document.getElementById('userName').textContent = `Hello, ${userName}!`;
        document.getElementById('userAvatar').textContent = userName ? userName[0].toUpperCase() : 'U';
    } else {
        authButtons.classList.add('active');
        userInfo.classList.remove('active');
    }
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const name = email.split('@')[0]; // Simple name extraction for simulation

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    
    closeModal('loginModal');
    checkAuthStatus();
    showNotification(`Welcome back, ${name}! Logged in successfully.`, 'success');
}

function signup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;

    // In a real app, you would send data to a server here.
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    
    closeModal('signupModal');
    checkAuthStatus();
    showNotification(`Account created! Welcome to MarsWasteNet, ${name}.`, 'success');
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    checkAuthStatus();
    showNotification('Logged out. See you next Sol!', 'success');
}

// =======================================================
// 6. COMMUNITY IDEAS
// =======================================================

let communityIdeas = JSON.parse(localStorage.getItem('communityIdeas')) || [];
let likes = parseInt(localStorage.getItem('ideaLikes')) || 0;

function loadCommunityData() {
    document.getElementById('ideaCount').textContent = communityIdeas.length;
    document.getElementById('likeCount').textContent = likes;

    const likeBtn = document.getElementById('likeBtn');
    if (localStorage.getItem('hasLiked') === 'true') {
        likeBtn.classList.add('liked');
    }

    likeBtn.addEventListener('click', toggleLike);
}

function toggleLike() {
    const likeBtn = document.getElementById('likeBtn');
    const likeCounter = document.getElementById('likeCount');

    if (likeBtn.classList.contains('liked')) {
        // Unlike
        likes--;
        localStorage.setItem('hasLiked', 'false');
        likeBtn.classList.remove('liked');
    } else {
        // Like
        likes++;
        localStorage.setItem('hasLiked', 'true');
        likeBtn.classList.add('liked');
    }

    likeCounter.textContent = likes;
    localStorage.setItem('ideaLikes', likes);
}

function submitIdea(event) {
    event.preventDefault();

    const name = document.getElementById('ideaName').value;
    const title = document.getElementById('ideaTitle').value;
    const description = document.getElementById('ideaDesc').value;

    const newIdea = {
        name: name,
        title: title,
        description: description,
        date: new Date().toLocaleDateString()
    };

    communityIdeas.push(newIdea);
    localStorage.setItem('communityIdeas', JSON.stringify(communityIdeas));

    closeModal('ideaModal');
    loadCommunityData();
    showNotification('Idea submitted! Thank you for contributing to Mars innovation.', 'success');

    // Clear form fields
    document.getElementById('ideaTitle').value = '';
    document.getElementById('ideaDesc').value = '';
}

function showIdeas() {
    const ideasListContainer = document.getElementById('ideasList');
    ideasListContainer.innerHTML = ''; // Clear previous ideas

    if (communityIdeas.length === 0) {
        ideasListContainer.innerHTML = '<p style="color: #8892b0; text-align: center;">No innovations submitted yet. Be the first!</p>';
    } else {
        communityIdeas.forEach(idea => {
            const ideaCard = document.createElement('div');
            ideaCard.className = 'idea-card';
            ideaCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <h4 style="color: #ccd6f6; margin: 0; font-size: 1.1rem;">${idea.title}</h4>
                    <span class="badge" style="background: linear-gradient(135deg, #ff6b4a, #ff5533);">${idea.name}</span>
                </div>
                <p style="color: #8892b0; font-size: 0.9rem;">${idea.description}</p>
                <p style="color: #4ade80; font-size: 0.75rem; text-align: right; margin-top: 0.5rem;">Submitted: ${idea.date}</p>
            `;
            ideasListContainer.appendChild(ideaCard);
        });
    }

    openModal('ideasViewModal');
}

// =======================================================
// 7. NOTIFICATIONS
// =======================================================

/**
 * Displays a temporary notification banner.
 * @param {string} message - The message to display.
 * @param {string} type - 'success' or 'error' (optional, adjusts border color).
 */
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;

    // Optional: Change border based on type
    if (type === 'error') {
        notification.style.borderColor = '#ff6b4a';
        notification.style.borderLeftColor = '#ff6b4a';
        notification.style.boxShadow = '0 8px 32px rgba(255, 107, 74, 0.4)';
    } else {
        notification.style.borderColor = '#4ade80';
        notification.style.borderLeftColor = '#4ade80';
        notification.style.boxShadow = '0 8px 32px rgba(74, 222, 128, 0.4)';
    }

    notification.classList.add('show');
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}