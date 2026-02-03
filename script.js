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
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
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

        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
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
    let currentZoom = 100;
    const minZoom = 100;
    const maxZoom = 300;
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;

    masonryImgs.forEach(img => {
        img.addEventListener('click', function() {
            currentImageIndex = parseInt(this.getAttribute('data-index'));
            currentZoom = 100;
            translateX = 0;
            translateY = 0;
            openImageModal();
        });
    });

    function openImageModal() {
        imageModal.classList.add('active');
        updateSliderImage();
        resetZoom();
        document.body.style.overflow = 'hidden';
    }

    function updateSliderImage() {
        imageModalImg.src = productImages[currentImageIndex];
        sliderCounter.textContent = `${currentImageIndex + 1} / ${productImages.length}`;
        currentZoom = 100;
        translateX = 0;
        translateY = 0;
        updateZoomUI();
        updateImageTransform();
    }

    function resetZoom() {
        currentZoom = 100;
        translateX = 0;
        translateY = 0;
        updateImageTransform();
        updateZoomUI();
    }

    function updateZoomUI() {
        document.getElementById('zoomLevel').textContent = `${currentZoom}%`;
    }

    function updateImageTransform() {
        const scale = currentZoom / 100;
        imageModalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        
        // Update cursor
        if (currentZoom > 100) {
            imageModalImg.style.cursor = isDragging ? 'grabbing' : 'grab';
            imageModalImg.classList.add('zoomed');
        } else {
            imageModalImg.style.cursor = 'zoom-in';
            imageModalImg.classList.remove('zoomed');
        }
    }

    function setZoom(level) {
        const oldZoom = currentZoom;
        currentZoom = Math.max(minZoom, Math.min(maxZoom, level));
        
        // Reset pan when zooming out to 100%
        if (currentZoom === 100) {
            translateX = 0;
            translateY = 0;
        }
        
        updateImageTransform();
        updateZoomUI();
    }

    // Zoom controls
    document.getElementById('zoomIn').addEventListener('click', function() {
        setZoom(currentZoom + 20);
    });

    document.getElementById('zoomOut').addEventListener('click', function() {
        setZoom(currentZoom - 20);
    });

    // Mouse wheel zoom
    imageModalImg.addEventListener('wheel', function(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -10 : 10;
        setZoom(currentZoom + delta);
    }, { passive: false });

    // Double click to zoom in/out
    imageModalImg.addEventListener('dblclick', function(e) {
        if (currentZoom === 100) {
            setZoom(200);
        } else {
            resetZoom();
        }
    });

    // Pan (drag) functionality - Desktop
    imageModalImg.addEventListener('mousedown', function(e) {
        if (currentZoom <= 100) return;
        
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        imageModalImg.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateImageTransform();
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            imageModalImg.style.cursor = currentZoom > 100 ? 'grab' : 'zoom-in';
        }
    });

    // Touch pan functionality - Mobile
    let touchStartX, touchStartY;

    imageModalImg.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            // Pinch zoom setup
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            initialDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            initialZoom = currentZoom;
        } else if (e.touches.length === 1 && currentZoom > 100) {
            // Pan setup
            touchStartX = e.touches[0].clientX - translateX;
            touchStartY = e.touches[0].clientY - translateY;
        }
    }, { passive: true });

    imageModalImg.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            // Pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            
            const scale = distance / initialDistance;
            const newZoom = initialZoom * scale;
            setZoom(newZoom);
            e.preventDefault();
        } else if (e.touches.length === 1 && currentZoom > 100) {
            // Pan
            translateX = e.touches[0].clientX - touchStartX;
            translateY = e.touches[0].clientY - touchStartY;
            updateImageTransform();
            e.preventDefault();
        }
    }, { passive: false });

    // Pinch to zoom variables
    let initialDistance = 0;
    let initialZoom = 100;

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

    // Email Notification Form (Mailchimp)
    const notifyForm = document.getElementById('notifyForm');
    const formMessage = document.getElementById('formMessage');

    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            // Let the form submit naturally to Mailchimp
            formMessage.textContent = '✓ Redirecting to subscription...';
            formMessage.style.color = '#47f2d0';
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
