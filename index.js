// ===========================================
// NAVIGATION & MOBILE MENU
// ===========================================

class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.setActiveLink();
    }

    bindEvents() {
        // Mobile menu toggle
        this.navToggle?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Smooth scroll for anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.transform = this.navToggle.classList.contains('active') 
                ? this.getHamburgerTransform(index) 
                : '';
        });
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        
        const spans = this.navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
        });
    }

    getHamburgerTransform(index) {
        const transforms = [
            'translateY(6px) rotate(45deg)',
            'opacity: 0',
            'translateY(-6px) rotate(-45deg)'
        ];
        return transforms[index];
    }

    handleScroll() {
        const scrolled = window.pageYOffset > 50;
        this.nav.style.background = scrolled 
            ? 'rgba(10, 10, 10, 0.98)' 
            : 'rgba(10, 10, 10, 0.95)';
    }

    handleSmoothScroll(e) {
        const href = e.target.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ===========================================
// SCROLL ANIMATIONS
// ===========================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.process-card, .project-card, .hero-stats .stat');
        this.init();
    }

    init() {
        this.createObserver();
        this.bindScrollIndicator();
    }

    createObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Stagger animations for cards in the same container
                    const container = entry.target.closest('.processes-grid, .projects-grid');
                    if (container) {
                        const cards = container.querySelectorAll('.process-card, .project-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in');
                            }, index * 100);
                        });
                    }
                }
            });
        }, options);

        this.elements.forEach(el => observer.observe(el));
    }

    bindScrollIndicator() {
        const scrollIndicator = document.querySelector('.hero-scroll');
        scrollIndicator?.addEventListener('click', () => {
            const target = document.querySelector('#procesos');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// ===========================================
// INTERACTIVE EFFECTS
// ===========================================

class InteractiveEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addHoverEffects();
        this.addParallaxEffect();
        this.addTypingEffect();
    }

    addHoverEffects() {
        // Card tilt effect
        const cards = document.querySelectorAll('.process-card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.4s ease';
            });
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    addTypingEffect() {
        const subtitle = document.querySelector('.title-sub');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            
            let index = 0;
            const typeWriter = () => {
                if (index < text.length) {
                    subtitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 80);
                }
            };
            
            // Start typing effect after a delay
            setTimeout(typeWriter, 1200);
        }

        // Subtle glow effect for manifesto badge
        const manifestoBadge = document.querySelector('.manifesto-badge span:first-child');
        if (manifestoBadge) {
            setInterval(() => {
                manifestoBadge.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                setTimeout(() => {
                    manifestoBadge.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.1)';
                }, 1000);
            }, 4000);
        }
    }
}

// ===========================================
// PERFORMANCE OPTIMIZATIONS
// ===========================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.throttleScrollEvents();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    throttleScrollEvents() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-dependent operations go here
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

const Utils = {
    // Debounce function for performance
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Get random color from theme palette
    getRandomAccentColor() {
        const colors = ['#00d4ff', '#00ff88'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    // Format date for project metadata
    formatDate(date) {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long'
        }).format(date);
    }
};

// ===========================================
// PROJECT INTERACTION
// ===========================================

class ProjectInteractions {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.bindProjectEvents();
    }

    bindProjectEvents() {
        this.projectCards.forEach(card => {
            // Add click handler for future project detail views
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const projectTitle = card.querySelector('h3').textContent;
                console.log(`Clicked on project: ${projectTitle}`);
                
                // Future: Open project detail modal or navigate to project page
                this.showProjectPreview(projectTitle);
            });
            
            // Add keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    showProjectPreview(title) {
        // Placeholder for future project preview functionality
        console.log(`Preview for project: ${title}`);
        
        // Create a subtle notification
        const notification = document.createElement('div');
        notification.textContent = `Próximamente: Detalles de "${title}"`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-blue);
            color: var(--primary-dark);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new Navigation();
    new ScrollAnimations();
    new InteractiveEffects();
    new PerformanceOptimizer();
    new ProjectInteractions();
    new WaveAnimation();
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    console.log('🚀 UlaolaWeb initialized successfully');
});

// ===========================================
// RESIZE HANDLER
// ===========================================

window.addEventListener('resize', Utils.debounce(() => {
    // Handle responsive adjustments
    const nav = document.querySelector('.nav');
    if (window.innerWidth > 768) {
        // Reset mobile menu on desktop
        document.getElementById('navMenu').classList.remove('active');
        document.getElementById('navToggle').classList.remove('active');
    }
}, 250));

// ===========================================
// ERROR HANDLING
// ===========================================

window.addEventListener('error', (e) => {
    console.error('UlaolaWeb Error:', e.error);
});

// ===========================================
// WAVE ANIMATION CANVAS
// ===========================================

class WaveAnimation {
    constructor() {
        this.canvas = document.getElementById('wave-canvas');
        this.ctx = null;
        this.waves = [];
        this.animationId = null;
        this.time = 0;
        
        if (this.canvas) {
            this.init();
        }
    }

    init() {
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.createWaves();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    setupCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Set canvas size
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        // Scale context for high DPI displays
        this.ctx.scale(dpr, dpr);
        
        this.width = rect.width;
        this.height = rect.height;
    }

    createWaves() {
        this.waves = [
            {
                amplitude: 30,
                frequency: 0.01,
                baseSpeed: 0.04,
                speed: 0.04,
                speedVariation: 0.01,
                offset: 0,
                color: 'rgba(0, 180, 216, 0.15)',
                baseY: this.height * 0.7,
                turbulence: 0.3
            },
            {
                amplitude: 25,
                frequency: 0.015,
                baseSpeed: -0.03,
                speed: -0.03,
                speedVariation: 0.008,
                offset: Math.PI / 4,
                color: 'rgba(57, 255, 20, 0.1)',
                baseY: this.height * 0.6,
                turbulence: 0.25
            },
            {
                amplitude: 40,
                frequency: 0.008,
                baseSpeed: 0.05,
                speed: 0.05,
                speedVariation: 0.012,
                offset: Math.PI / 2,
                color: 'rgba(144, 224, 239, 0.12)',
                baseY: this.height * 0.8,
                turbulence: 0.4
            },
            {
                amplitude: 20,
                frequency: 0.02,
                baseSpeed: -0.06,
                speed: -0.06,
                speedVariation: 0.016,
                offset: Math.PI,
                color: 'rgba(202, 240, 248, 0.08)',
                baseY: this.height * 0.5,
                turbulence: 0.2
            }
        ];
    }

    updateWaveSpeed(wave) {
        // Crear variación suave y continua usando funciones sinusoidales
        // Cada onda tiene su propia frecuencia de variación de velocidad
        const speedOscillation = Math.sin(this.time * 0.005 + wave.offset) * wave.speedVariation;
        const speedOscillation2 = Math.sin(this.time * 0.003 + wave.offset * 2) * (wave.speedVariation * 0.5);
        
        // Aplicar variación suave sin saltos bruscos
        wave.speed = wave.baseSpeed + speedOscillation + speedOscillation2;
    }

    drawWave(wave) {
        // Update wave speed with random variation
        this.updateWaveSpeed(wave);
        
        this.ctx.beginPath();
        this.ctx.fillStyle = wave.color;
        
        // Start from bottom left
        this.ctx.moveTo(0, this.height);
        
        // Draw wave curve with natural turbulence
        for (let x = 0; x <= this.width; x += 2) {
            // Main wave with current variable speed
            const mainWave = Math.sin(x * wave.frequency + this.time * wave.speed + wave.offset) * wave.amplitude;
            
            // Secondary harmonics for more natural movement
            const harmony1 = Math.sin(x * wave.frequency * 0.5 + this.time * wave.speed * 1.5) * (wave.amplitude * 0.3);
            const harmony2 = Math.sin(x * wave.frequency * 1.8 + this.time * wave.speed * 0.7) * (wave.amplitude * 0.15);
            
            // Add subtle turbulence noise
            const turbulenceNoise = (Math.sin(x * 0.05 + this.time * 0.1) * Math.cos(x * 0.03 + this.time * 0.08)) * wave.turbulence;
            
            const y = wave.baseY + mainWave + harmony1 + harmony2 + turbulenceNoise;
            
            this.ctx.lineTo(x, y);
        }
        
        // Close the path to bottom
        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(0, this.height);
        this.ctx.closePath();
        this.ctx.fill();
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw all waves
        this.waves.forEach(wave => this.drawWave(wave));
        
        // Update time
        this.time += 0.5;
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.setupCanvas();
            this.createWaves();
        }, 100);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.handleResize);
    }
}

// ===========================================
// EXPORTS FOR POTENTIAL MODULE USAGE
// ===========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        ScrollAnimations,
        InteractiveEffects,
        Utils,
        WaveAnimation
    };
}
