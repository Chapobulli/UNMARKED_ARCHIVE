// UNMARKED ARCHIVE - KICKSTARTER EDITION
// Minimal & Storyteller JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);

    // Product Image Gallery
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            const newImage = this.getAttribute('data-image');
            mainImage.src = newImage;

            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Email Notification Form
    const notifyForm = document.getElementById('notifyForm');
    const formMessage = document.getElementById('formMessage');

    if (notifyForm) {
        notifyForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const submitBtn = notifyForm.querySelector('.btn-submit');

            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'SENDING...';

            try {
                // Netlify Forms submission
                const formData = new FormData(notifyForm);

                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    formMessage.textContent = '✓ You\'re on the list! We\'ll notify you at launch.';
                    formMessage.style.color = '#47f2d0';
                    notifyForm.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                formMessage.textContent = '✗ Something went wrong. Please try again.';
                formMessage.style.color = '#ff4444';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'NOTIFY ME';
            }
        });
    }

    // Parallax effect for visual break
    window.addEventListener('scroll', function() {
        const visualBreak = document.querySelector('.visual-break');
        if (visualBreak) {
            const scrolled = window.pageYOffset;
            const offset = visualBreak.offsetTop;
            const height = visualBreak.offsetHeight;

            if (scrolled > offset - window.innerHeight && scrolled < offset + height) {
                const parallax = (scrolled - offset) * 0.5;
                visualBreak.style.backgroundPositionY = parallax + 'px';
            }
        }
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade effect to key elements
    const fadeElements = document.querySelectorAll('.story-block, .philosophy-card, .product-showcase');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Size Guide Modal
    const sizeGuideBtn = document.getElementById('sizeGuideBtn');
    const sizeModal = document.getElementById('sizeModal');
    const modalClose = document.getElementById('modalClose');

    if (sizeGuideBtn && sizeModal) {
        sizeGuideBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sizeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (modalClose && sizeModal) {
        modalClose.addEventListener('click', function() {
            sizeModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on outside click
        sizeModal.addEventListener('click', function(e) {
            if (e.target === sizeModal) {
                sizeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sizeModal.classList.contains('active')) {
                sizeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
