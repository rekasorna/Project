// Particles Effect
function createParticles() {
    const particlesContainer = document.createElement('ul');
    particlesContainer.className = 'particles';
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('li');
        particlesContainer.appendChild(particle);
    }
    
    document.querySelector('.hero').appendChild(particlesContainer);
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Add scroll reveal animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .skills-category, .timeline-item, .certification-card, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.project-card, .skills-category, .timeline-item, .certification-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});