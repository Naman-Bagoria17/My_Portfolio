// Cyberpunk Portfolio - Interactive JavaScript

// Initialize EmailJS - Updated Configuration
emailjs.init("t3Qd6DV2H8w5X-hd3");

// Custom Cursor - Ultra Responsive
document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.cursor-glow');
    const cursorSymbol = document.querySelector('.cursor-symbol');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let useDirectMovement = true; // Toggle for instant movement

    // Update mouse position with ultra-fast responsiveness
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Option 1: Instant movement (uncomment for immediate response)
        if (useDirectMovement) {
            cursorX = mouseX;
            cursorY = mouseY;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            return; // Skip animation loop
        }

        // Option 2: For any movement, update cursor position immediately
        const distance = Math.sqrt(Math.pow(mouseX - cursorX, 2) + Math.pow(mouseY - cursorY, 2));
        if (distance > 20) { // Reduced threshold for faster response
            cursorX = mouseX;
            cursorY = mouseY;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
    });

    // Much faster cursor animation
    function animateCursor() {
        const baseSpeed = 0.8; // Much higher base speed
        const distance = Math.sqrt(Math.pow(mouseX - cursorX, 2) + Math.pow(mouseY - cursorY, 2));

        // Very aggressive speed scaling
        let adaptiveSpeed;
        if (distance > 100) {
            adaptiveSpeed = 1; // Instant movement for large distances
        } else if (distance > 50) {
            adaptiveSpeed = 0.9; // Very fast for medium distances
        } else {
            adaptiveSpeed = baseSpeed; // Fast for small movements
        }

        cursorX += (mouseX - cursorX) * adaptiveSpeed;
        cursorY += (mouseY - cursorY) * adaptiveSpeed;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Comprehensive cursor management system
    let isOverClickable = false;

    // Define all clickable elements with high specificity
    const clickableSelectors = [
        'a', 'button', '.cyber-btn', '.nav-link', '.nav-menu', '.nav-buttons', '.hamburger', '.social-link',
        '[role="button"]', '[onclick]', '.clickable', '.btn-submit', 'button[type="submit"]'
    ];

    const hoverSelectors = [
        '.project-card', '.info-card'
    ];

    const contactFormSelectors = [
        '#contact', '.contact-content', '.contact-form-container', '.terminal-form',
        'input', 'textarea', 'select', '.cyber-input', '.cyber-textarea', 'form'
    ];

    // Function to completely hide custom cursor
    function hideCustomCursor() {
        cursor.style.opacity = '0';
        cursor.style.visibility = 'hidden';
        cursor.style.pointerEvents = 'none';
        isOverClickable = true;
    }

    // Function to show custom cursor
    function showCustomCursor() {
        cursor.style.opacity = '1';
        cursor.style.visibility = 'visible';
        cursor.style.pointerEvents = 'none';
        isOverClickable = false;
    }

    // Function to reset cursor to default state
    function resetCursor() {
        cursor.style.transform = 'scale(1)';
        cursor.style.filter = 'drop-shadow(0 0 15px var(--cyber-emerald))';
        cursorSymbol.textContent = '</>';
        cursorSymbol.style.fontSize = '15px';
        cursorSymbol.style.color = '#ffffff';
        cursorGlow.style.background = 'radial-gradient(circle, var(--cyber-emerald) 0%, rgba(0, 255, 136, 0.4) 40%, transparent 70%)';
        cursorGlow.style.boxShadow = '0 0 25px var(--cyber-emerald), 0 0 50px rgba(0, 255, 136, 0.5), inset 0 0 15px rgba(0, 255, 136, 0.3)';
    }

    // Add clickable class to all clickable elements for CSS targeting
    clickableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('clickable-element');

            // Force cursor style and hide custom cursor
            element.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                hideCustomCursor();
            });

            element.addEventListener('mouseleave', (e) => {
                e.stopPropagation();
                showCustomCursor();
                resetCursor();
            });

            // Additional event listeners for reliability
            element.addEventListener('mouseover', (e) => {
                e.stopPropagation();
                hideCustomCursor();
            });

            element.addEventListener('mouseout', (e) => {
                e.stopPropagation();
                if (!element.contains(e.relatedTarget)) {
                    showCustomCursor();
                    resetCursor();
                }
            });
        });
    });

    // Enhanced cursor effects for project cards and info cards
    hoverSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                if (!isOverClickable) {
                    cursor.style.transform = 'scale(1.3)';
                    cursor.style.filter = 'drop-shadow(0 0 25px var(--cyber-blue)) drop-shadow(0 0 50px var(--cyber-emerald))';
                    cursorSymbol.textContent = '{}';
                    cursorSymbol.style.fontSize = '18px';
                    cursorSymbol.style.color = '#ffffff';
                    cursorGlow.style.background = 'radial-gradient(circle, var(--cyber-blue) 0%, rgba(0, 212, 255, 0.6) 40%, transparent 70%)';
                    cursorGlow.style.boxShadow = '0 0 35px var(--cyber-blue), 0 0 70px rgba(0, 212, 255, 0.8), inset 0 0 20px rgba(0, 212, 255, 0.4)';
                }
            });

            element.addEventListener('mouseleave', (e) => {
                if (!isOverClickable) {
                    resetCursor();
                }
            });
        });
    });

    // Contact section - no special cursor handling, use default behavior

    // Special handling for form elements to use themed cursor
    const formElements = document.querySelectorAll('input, textarea, select, .cyber-input, .cyber-textarea');
    formElements.forEach(element => {
        // Use themed cursor and neon red caret on focus
        element.addEventListener('focus', () => {
            element.style.cursor = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13.64 21.97C13.14 22.21 12.54 22 12.31 21.5L10.13 16.76L7.62 18.78C7.45 18.92 7.24 19 7.01 19C6.2 19 5.66 18.18 6.06 17.5L8.5 13L7.5 12.5C6.93 12.21 6.93 11.29 7.5 11L18.6 5.88C19.37 5.19 20.5 6.32 19.81 7.09L13.64 21.97Z" fill="%2300ff88" stroke="%2300d4ff" stroke-width="0.5"/></svg>\'), pointer';
            element.style.caretColor = '#ff0040';
        });

        // Keep themed cursor on blur
        element.addEventListener('blur', () => {
            element.style.cursor = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13.64 21.97C13.14 22.21 12.54 22 12.31 21.5L10.13 16.76L7.62 18.78C7.45 18.92 7.24 19 7.01 19C6.2 19 5.66 18.18 6.06 17.5L8.5 13L7.5 12.5C6.93 12.21 6.93 11.29 7.5 11L18.6 5.88C19.37 5.19 20.5 6.32 19.81 7.09L13.64 21.97Z" fill="%2300ff88" stroke="%2300d4ff" stroke-width="0.5"/></svg>\'), pointer';
        });

        // Keep themed cursor on input
        element.addEventListener('input', () => {
            element.style.cursor = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13.64 21.97C13.14 22.21 12.54 22 12.31 21.5L10.13 16.76L7.62 18.78C7.45 18.92 7.24 19 7.01 19C6.2 19 5.66 18.18 6.06 17.5L8.5 13L7.5 12.5C6.93 12.21 6.93 11.29 7.5 11L18.6 5.88C19.37 5.19 20.5 6.32 19.81 7.09L13.64 21.97Z" fill="%2300ff88" stroke="%2300d4ff" stroke-width="0.5"/></svg>\'), pointer';
            element.style.caretColor = '#ff0040';
        });
    });

    // Global mouse movement handler to ensure cursor visibility
    document.addEventListener('mousemove', (e) => {
        // Check if we're over a clickable element
        const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
        const isOverClickableElement = elementUnderMouse && (
            elementUnderMouse.matches(clickableSelectors.join(', ')) ||
            elementUnderMouse.closest(clickableSelectors.join(', '))
        );

        // Check if we're in the contact section
        const contactSection = document.querySelector('#contact');
        const isInContactArea = contactSection && contactSection.contains(elementUnderMouse);

        if (isInContactArea) {
            // Hide custom cursor completely in contact section
            hideCustomCursor();
        } else if (isOverClickableElement && !isOverClickable) {
            // Hide custom cursor for all clickable elements
            hideCustomCursor();
        } else if (!isOverClickableElement && isOverClickable) {
            showCustomCursor();
            resetCursor();
        }
    });
});

// Additional safety mechanism - periodic cursor state check with contact section override
setInterval(() => {
    const mouseX = window.mouseX || 0;
    const mouseY = window.mouseY || 0;

    if (mouseX && mouseY) {
        const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
        const clickableSelectors = [
            'a', 'button', '.cyber-btn', '.nav-link', '.hamburger', '.social-link',
            '[role="button"]', '[onclick]', '.clickable', '.clickable-element', '.btn-submit', 'button[type="submit"]'
        ];

        const isOverClickableElement = elementUnderMouse && (
            elementUnderMouse.matches(clickableSelectors.join(', ')) ||
            elementUnderMouse.closest(clickableSelectors.join(', '))
        );

        // Check if we're in contact section
        const contactSection = document.querySelector('#contact');
        const isInContactArea = contactSection && contactSection.contains(elementUnderMouse);

        const cursor = document.querySelector('.custom-cursor');
        const cursorSymbol = document.querySelector('.cursor-symbol');
        const cursorGlow = document.querySelector('.cursor-glow');

        if (cursor && cursorSymbol && cursorGlow) {
            if (isOverClickableElement || isInContactArea) {
                // Hide custom cursor for clickable elements and entire contact section
                cursor.style.opacity = '0';
                cursor.style.visibility = 'hidden';
            } else {
                cursor.style.opacity = '1';
                cursor.style.visibility = 'visible';
            }
        }
    }
}, 50); // Check every 50ms for more responsive contact section override

// Store mouse position globally for the safety check
document.addEventListener('mousemove', (e) => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
});

// Smooth Scrolling - handled in mobile navigation section below

// Navigation Background on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.cyber-nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(26, 31, 46, 0.95)';
        nav.style.backdropFilter = 'blur(30px)';
    } else {
        nav.style.background = 'rgba(26, 31, 46, 0.9)';
        nav.style.backdropFilter = 'blur(20px)';
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Prevent menu from closing when clicking inside the menu
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Universal Navigation Handler - works for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();

            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }

            // Get target element
            const target = document.querySelector(href);
            if (target) {
                // Calculate offset for fixed navbar
                const nav = document.querySelector('.cyber-nav');
                const navHeight = nav ? nav.offsetHeight : 80;

                // Different offsets for different sections
                let extraOffset = 0; // Default offset for home
                if (href === '#about') {
                    extraOffset = -20; // Minimal offset for about section
                } else if (href === '#work') {
                    extraOffset = 0; // Minimal offset for work section
                } else if (href === '#contact') {
                    extraOffset = 0; // Minimal offset for contact section
                }

                const targetPosition = target.offsetTop - navHeight - extraOffset;

                // Smooth scroll to target with offset
                window.scrollTo({
                    top: Math.max(0, targetPosition), // Ensure we don't scroll to negative position
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Terminal Typing Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.glass-panel, .project-card, .info-card');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact Form Handler - Pure EmailJS
// Contact Form Handler - Pure EmailJS
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const statusMessage = document.getElementById('status-message');
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.querySelector('.btn-text').textContent;

    // Show loading state
    submitButton.querySelector('.btn-text').textContent = 'executing...';
    submitButton.disabled = true;

    // Reset and show status message
    statusMessage.classList.remove('hidden', 'success', 'error');
    statusMessage.style.transition = 'none'; // Disable transition for initial state
    statusMessage.style.opacity = '1';
    statusMessage.textContent = 'Sending message...';
    statusMessage.style.background = 'rgba(0, 212, 255, 0.2)';
    statusMessage.style.borderColor = 'var(--cyber-blue)';
    statusMessage.style.color = 'var(--cyber-blue)';

    // Re-enable transition after state is set
    setTimeout(() => {
        statusMessage.style.transition = 'opacity 0.5s ease, background 0.3s ease, border-color 0.3s ease';
    }, 10);

    // Send email using EmailJS
    emailjs.sendForm("service_lsckxve", "template_tn3n1f5", this)
        .then(function () {
            // Success state
            statusMessage.classList.add('success');
            statusMessage.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
            statusMessage.style.background = 'rgba(0, 255, 136, 0.2)';
            statusMessage.style.borderColor = 'var(--cyber-emerald)';
            statusMessage.style.color = 'var(--cyber-emerald)';

            // Reset form
            document.getElementById('contact-form').reset();

            // Fade out after 5 seconds
            setTimeout(() => {
                statusMessage.style.opacity = '0';
                setTimeout(() => {
                    statusMessage.classList.add('hidden');
                    statusMessage.textContent = '';
                    statusMessage.style.background = '';
                    statusMessage.style.borderColor = '';
                    statusMessage.style.color = '';
                    statusMessage.style.opacity = '';
                }, 500); // Match fade-out duration
            }, 5000);

        }, function (error) {
            // Error state
            statusMessage.classList.add('error');
            statusMessage.textContent = '❌ Failed to send message. Please try again or email me directly.';
            statusMessage.style.background = 'rgba(255, 0, 64, 0.2)';
            statusMessage.style.borderColor = 'var(--cyber-red)';
            statusMessage.style.color = 'var(--cyber-red)';
            console.log('EmailJS error:', error);

            // Fade out after 5 seconds
            setTimeout(() => {
                statusMessage.style.opacity = '0';
                setTimeout(() => {
                    statusMessage.classList.add('hidden');
                    statusMessage.textContent = '';
                    statusMessage.style.background = '';
                    statusMessage.style.borderColor = '';
                    statusMessage.style.color = '';
                    statusMessage.style.opacity = '';
                }, 500); // Match fade-out duration
            }, 5000);
        })
        .finally(function () {
            // Reset button state after 1 second delay (allows visual feedback)
            setTimeout(() => {
                submitButton.querySelector('.btn-text').textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
});

// Particle Animation Enhancement
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const symbols = ['</>', '{}', '∫', 'λ', 'Σ', '01', '10', '11', 'fn', '&&', '||', '!='];
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.fontSize = (Math.random() * 8 + 10) + 'px';

    if (Math.random() > 0.5) {
        particle.style.color = 'var(--cyber-blue)';
    } else {
        particle.style.color = 'var(--cyber-emerald)';
    }

    document.querySelector('.particles-container').appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 25000);
}

// Create particles periodically
setInterval(createParticle, 3000);

// Matrix Rain Effect (subtle)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "01";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 26, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px JetBrains Mono';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 100);

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize matrix rain effect
document.addEventListener('DOMContentLoaded', createMatrixRain);

// Glitch Effect for Text
function glitchText(element) {
    // Store original text if not already stored
    if (!element.dataset.originalText) {
        element.dataset.originalText = element.textContent;
    }

    const originalText = element.dataset.originalText;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?01101001';

    // Clear any existing interval
    if (element.glitchInterval) {
        clearInterval(element.glitchInterval);
    }

    let iterations = 0;
    const maxIterations = originalText.length;

    element.glitchInterval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');

        iterations += 0.8;

        if (iterations >= maxIterations) {
            clearInterval(element.glitchInterval);
            element.textContent = originalText;
            element.glitchInterval = null;
        }
    }, 35);
}

function stopGlitch(element) {
    if (element.glitchInterval) {
        clearInterval(element.glitchInterval);
        element.glitchInterval = null;
    }

    // Restore original text
    if (element.dataset.originalText) {
        element.textContent = element.dataset.originalText;
    }
}

// Apply glitch effect to project cards on hover
document.addEventListener('DOMContentLoaded', () => {
    const projectTitles = document.querySelectorAll('.card-title');

    projectTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            glitchText(title);
        });

        title.addEventListener('mouseleave', () => {
            stopGlitch(title);
        });
    });
});

// Performance optimization
let ticking = false;

function updateOnScroll() {
    // Scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 0
});

// Typing Animation for Professions
const professions = [
    "MERN Stack Developer",
    "Competitive Programmer",
    "Problem Solver",
    "DSA Enthusiast"
];

let currentProfessionIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000;

function typeWriter() {
    const typingElement = document.getElementById('typing-text');
    const currentProfession = professions[currentProfessionIndex];

    if (!isDeleting) {
        // Typing
        typingElement.textContent = currentProfession.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentProfession.length) {
            // Finished typing, pause then start deleting
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseTime);
            return;
        }

        setTimeout(typeWriter, typingSpeed);
    } else {
        // Deleting
        typingElement.textContent = currentProfession.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            // Finished deleting, move to next profession
            isDeleting = false;
            currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
            setTimeout(typeWriter, 500); // Short pause before typing next profession
            return;
        }

        setTimeout(typeWriter, deletingSpeed);
    }
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000); // Start after 1 second delay
});

console.log('%c🚀 Cyberpunk Portfolio Loaded', 'color: #00ff88; font-size: 16px; font-weight: bold;');
console.log('%c> System initialized successfully', 'color: #00d4ff; font-size: 12px;');
console.log('%c> All modules loaded', 'color: #00d4ff; font-size: 12px;');
console.log('%c> AOS animations initialized', 'color: #00d4ff; font-size: 12px;');
console.log('%c> Ready for interaction', 'color: #00ff88; font-size: 12px;');
