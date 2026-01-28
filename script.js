// UNMARKED ARCHIVE - KICKSTARTER EDITION
// Minimal & Storyteller JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Product Image Gallery - Masonry with Slider
    const masonryImgs = document.querySelectorAll('.masonry-img');
    const imageModal = document.getElementById('imageModal');
    const imageModalImg = document.getElementById('imageModalImg');
    const imageModalClose = document.getElementById('imageModalClose');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderCounter = document.getElementById('sliderCounter');
    
    const productImages = [
        'assets/product/embroidery detail first photo.jpeg',
        'assets/product/consume & comply detail second photo.png',
        'assets/product/product inside patch third photo.jpeg',
        'assets/product/back label detail 4th photo.jpeg',
        'assets/product/foto grafica 5th photo.png'
    ];
    
    let currentImageIndex = 0;

    masonryImgs.forEach(img => {
        img.addEventListener('click', function() {
            currentImageIndex = parseInt(this.getAttribute('data-index'));
            openImageModal();
        });
    });

    function openImageModal() {
        imageModal.classList.add('active');
        updateSliderImage();
        document.body.style.overflow = 'hidden';
    }

    function updateSliderImage() {
        imageModalImg.src = productImages[currentImageIndex];
        sliderCounter.textContent = `${currentImageIndex + 1} / ${productImages.length}`;
    }

    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    sliderNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % productImages.length;
        updateSliderImage();
    });

    sliderPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
        updateSliderImage();
    });

    imageModalClose.addEventListener('click', closeImageModal);

    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (imageModal.classList.contains('active')) {
            if (e.key === 'ArrowRight') sliderNext.click();
            if (e.key === 'ArrowLeft') sliderPrev.click();
            if (e.key === 'Escape') closeImageModal();
        }
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
