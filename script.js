// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const resetBtn = document.getElementById('reset-btn');
const cards = document.querySelectorAll('.card');
const animationBox = document.getElementById('animation-box');
const animationControls = document.querySelectorAll('[data-animation]');
const decrementBtn = document.getElementById('decrement');
const incrementBtn = document.getElementById('increment');
const countValue = document.getElementById('count-value');
const counterMessage = document.getElementById('counter-message');
const actionButtons = document.querySelectorAll('.action-btn');

// Global variables
let count = 0;
let activeAnimation = null;

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Update button text based on current mode
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Toggle Light Mode';
        // Save preference to localStorage
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = 'Toggle Dark Mode';
        // Save preference to localStorage
        localStorage.setItem('theme', 'light');
    }
}

// Function to reset all animations
function resetAnimations() {
    // Remove all animation classes from the box
    animationBox.querySelector('.box').className = 'box';
    
    // Reset card flips
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
    
    // Reset counter
    count = 0;
    updateCounter();
    
    // Show reset confirmation message
    showMessage('All animations have been reset!', 'success');
}

// Function to handle card flip
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Function to apply animation to box
function applyAnimation(animationType) {
    const box = animationBox.querySelector('.box');
    
    // Remove previous animation classes
    if (activeAnimation) {
        box.classList.remove(activeAnimation);
    }
    
    // Apply new animation
    box.classList.add(animationType);
    activeAnimation = animationType;
    
    // For one-time animations, remove class after animation completes
    if (animationType === 'shake') {
        box.addEventListener('animationend', () => {
            box.classList.remove('shake');
            activeAnimation = null;
        }, { once: true });
    }
}

// Function to update counter display
function updateCounter() {
    countValue.textContent = count;
    
    // Update message based on count value
    if (count === 0) {
        counterMessage.textContent = 'Start counting!';
    } else if (count > 0) {
        counterMessage.textContent = `You've counted up to ${count}!`;
    } else {
        counterMessage.textContent = `You've counted down to ${count}!`;
    }
    
    // Add visual feedback
    countValue.classList.add('pulse');
    setTimeout(() => {
        countValue.classList.remove('pulse');
    }, 300);
}

// Function to show message
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        messageEl.style.background = 'linear-gradient(45deg, #00b09b, #96c93d)';
    } else {
        messageEl.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
    }
    
    // Add to DOM
    document.body.appendChild(messageEl);
    
    // Trigger animation
    setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 3000);
}

// Function to handle action button clicks
function handleActionButtonClick() {
    showMessage('Button clicked! Action performed.', 'success');
}

// Function to load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Toggle Light Mode';
    }
}

// Function to initialize the application
function init() {
    // Load theme preference
    loadThemePreference();
    
    // Set up event listeners
    themeToggle.addEventListener('click', toggleDarkMode);
    resetBtn.addEventListener('click', resetAnimations);
    
    // Card flip events
    cards.forEach(card => {
        card.addEventListener('click', () => flipCard(card));
    });
    
    // Animation control events
    animationControls.forEach(control => {
        control.addEventListener('click', () => {
            const animationType = control.getAttribute('data-animation');
            applyAnimation(animationType);
        });
    });
    
    // Counter events
    decrementBtn.addEventListener('click', () => {
        count--;
        updateCounter();
    });
    
    incrementBtn.addEventListener('click', () => {
        count++;
        updateCounter();
    });
    
    // Action button events
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionButtonClick);
    });
    
    // Initial counter update
    updateCounter();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);