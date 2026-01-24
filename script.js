// Loading Screen - More Reliable
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1200);
    }
});

// Fallback: Hide loading screen on window load too
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
});

// Product Gallery
const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');
const productImages = [
    'assets/product/product-front-black.jpeg',
    'assets/product/product back black.png',
    'assets/product/product zip puller.jpeg',
    'assets/product/product hood.jpeg',
    'assets/product/product outside patch.jpeg',
    'assets/product/product inside patch.jpeg'
];

if (mainImage && thumbs.length) {
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = productImages[index];
                mainImage.style.opacity = '1';
            }, 120);
        });
    });
}

// Countdown removed: production wait is communicated via hero loader.

// Video Controls (if video exists)
const productVideo = document.getElementById('productVideo');
const videoControls = document.getElementById('videoControls');
const playBtn = document.getElementById('playBtn');
const muteBtn = document.getElementById('muteBtn');

if (productVideo && videoControls && playBtn && muteBtn) {
    videoControls.style.display = 'flex';

    playBtn.addEventListener('click', () => {
        if (productVideo.paused) {
            productVideo.play();
            playBtn.textContent = '⏸';
        } else {
            productVideo.pause();
            playBtn.textContent = '▶';
        }
    });

    muteBtn.addEventListener('click', () => {
        productVideo.muted = !productVideo.muted;
        muteBtn.textContent = productVideo.muted ? '🔇' : '🔊';
    });
}

// Hero Video Controls
const heroVideo = document.getElementById('heroVideo');
const heroControls = document.getElementById('heroControls');
const heroMuteBtn = document.getElementById('heroMuteBtn');

if (heroVideo && heroControls && heroMuteBtn) {
    // Set initial button state based on video muted attribute
    heroMuteBtn.textContent = heroVideo.muted ? '🔇' : '🔊';
    
    heroMuteBtn.addEventListener('click', () => {
        heroVideo.muted = !heroVideo.muted;
        heroMuteBtn.textContent = heroVideo.muted ? '🔇' : '🔊';
    });
}

// Size Guide Modal
const sizeGuideBtn = document.getElementById('sizeGuideBtn');
const sizeModal = document.getElementById('sizeModal');
const modalClose = document.getElementById('modalClose');

if (sizeGuideBtn && sizeModal && modalClose) {
    sizeGuideBtn.addEventListener('click', () => {
        sizeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    modalClose.addEventListener('click', () => {
        sizeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    sizeModal.addEventListener('click', (e) => {
        if (e.target === sizeModal) {
            sizeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form handling
const form = document.getElementById('preorderForm');
const formMessage = document.getElementById('formMessage');

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form && formMessage) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            color: formData.get('color'),
            size: formData.get('size'),
            message: formData.get('message')
        };

        // Validate email
        if (!isValidEmail(data.email)) {
            formMessage.textContent = 'PLEASE ENTER A VALID EMAIL ADDRESS';
            formMessage.className = 'form-note error';
            return;
        }

        // Validate required fields
        const consentBox = document.getElementById('privacyConsent');
        const consentGiven = consentBox ? consentBox.checked : false;
        if (!data.name || !data.email || !data.size || !data.color || !consentGiven) {
            formMessage.textContent = consentGiven ? 'PLEASE FILL ALL REQUIRED FIELDS' : 'PLEASE ACCEPT PRIVACY TERMS';
            formMessage.className = 'form-note error';
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;

        // Format Instagram DM message
        const igHandle = 'unmarked_archive.brand';
        const timestamp = new Date().toISOString();
        
        const dmPlain = `🛍 PREORDER UNMARKED ARCHIVE

Nome: ${data.name}
Email: ${data.email}
${data.phone ? 'Tel: ' + data.phone : ''}

Colore: ${data.color}
Taglia: ${data.size}

${data.message ? 'Note: ' + data.message : ''}

Timestamp: ${timestamp}`;

        // Try to copy to clipboard
        let copied = false;
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(dmPlain);
                copied = true;
            } else {
                const temp = document.createElement('textarea');
                temp.value = dmPlain;
                document.body.appendChild(temp);
                temp.select();
                document.execCommand('copy');
                document.body.removeChild(temp);
                copied = true;
            }
        } catch (copyErr) {
            console.warn('Clipboard copy failed', copyErr);
        }

        const igLink = `https://ig.me/m/${igHandle}?text=${encodeURIComponent(dmPlain)}`;
        
        // Show copied message with the actual text in a clear format
        if (copied) {
            formMessage.innerHTML = `
                <strong>✓ MESSAGGIO COPIATO!</strong><br><br>
                <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-left: 3px solid var(--color-accent); text-align: left; font-size: 0.85rem; line-height: 1.6; max-height: 150px; overflow-y: auto;">
                    ${dmPlain.split('\n').join('<br>')}
                </div><br>
                <a href="${igLink}" target="_blank" style="display: inline-block; padding: 0.75rem 2rem; background: var(--color-accent); color: var(--color-bg); text-decoration: none; text-transform: uppercase; letter-spacing: 0.08rem; font-weight: 600; font-size: 0.9rem; margin-top: 0.5rem; border: none; cursor: pointer;">APRI INSTAGRAM DM</a>
            `;
            formMessage.className = 'form-note success';
        } else {
            formMessage.innerHTML = `
                <strong>⚠ COPIA MANUALE RICHIESTA</strong><br><br>
                <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-left: 3px solid #ff4444; text-align: left; font-size: 0.85rem; line-height: 1.6; max-height: 150px; overflow-y: auto;">
                    ${dmPlain.split('\n').join('<br>')}
                </div><br>
                <p style="margin-top: 0.5rem; font-size: 0.85rem;">Copia il messaggio sopra e invialo via DM su Instagram.</p>
                <a href="${igLink}" target="_blank" style="display: inline-block; padding: 0.75rem 2rem; background: var(--color-accent); color: var(--color-bg); text-decoration: none; text-transform: uppercase; letter-spacing: 0.08rem; font-weight: 600; font-size: 0.9rem; margin-top: 0.5rem; border: none; cursor: pointer;">APRI INSTAGRAM</a>
            `;
            formMessage.className = 'form-note error';
        }

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();

        /* EMAIL INTEGRATION OPTIONS (uncomment one to use):
        
        // Option 1: Formspree (https://formspree.io - free 50 forms/month)
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            formMessage.textContent = '✓ PREORDER RECEIVED! WE\'LL CONTACT YOU SOON.';
            formMessage.className = 'form-note success';
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
        */
        
        /* 
        // Option 2: EmailJS (free tier available)
        // Sign up at emailjs.com and add their SDK
        // Add to HTML: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
        
        emailjs.init('YOUR_PUBLIC_KEY');
        
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            name: data.name,
            email: data.email,
            phone: data.phone,
            size: data.size,
            message: data.message
        }).then(() => {
            formMessage.textContent = '✓ PREORDER RECEIVED! WE\'LL CONTACT YOU SOON.';
            formMessage.className = 'form-note success';
            form.reset();
        }).catch((error) => {
            formMessage.textContent = '✗ ERROR. PLEASE TRY AGAIN OR CONTACT US ON INSTAGRAM.';
            formMessage.className = 'form-note error';
        });
        */

        // Increment preorder counter (localStorage)
        const preorderCount = document.getElementById('preorderCount');
        if (preorderCount) {
            let count = parseInt(localStorage.getItem('preorderCount') || '23');
            count++;
            localStorage.setItem('preorderCount', count);
            preorderCount.textContent = count;
        }
    });
}

// Load preorder count from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const preorderCount = document.getElementById('preorderCount');
    if (preorderCount) {
        const savedCount = localStorage.getItem('preorderCount');
        if (savedCount) {
            preorderCount.textContent = savedCount;
        }
    }
});

// Image Lightbox with Zoom & Pan
const imageModal = document.getElementById('imageModal');
const imageModalClose = document.getElementById('imageModalClose');
const imageModalImg = document.getElementById('imageModalImg');
const zoomContainer = document.getElementById('zoomContainer');

if (imageModal && imageModalClose && imageModalImg && mainImage) {
    let scale = 1;
    let posX = 0;
    let posY = 0;
    let baseW = 0;
    let baseH = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let pointers = new Map();

    function clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    function bounds() {
        const w = baseW * scale;
        const h = baseH * scale;
        const maxX = Math.max(0, (w - baseW) / 2);
        const maxY = Math.max(0, (h - baseH) / 2);
        return { maxX, maxY };
    }

    function updateTransform() {
        const { maxX, maxY } = bounds();
        posX = clamp(posX, -maxX, maxX);
        posY = clamp(posY, -maxY, maxY);
        imageModalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }

    function openLightbox() {
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        imageModalImg.src = mainImage.src;
        requestAnimationFrame(() => {
            baseW = imageModalImg.clientWidth;
            baseH = imageModalImg.clientHeight;
            scale = 1.5; posX = 0; posY = 0;
            updateTransform();
        });
    }

    function closeLightbox() {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        pointers.clear();
        isDragging = false;
    }

    // Open on click/tap
    mainImage.addEventListener('click', (e) => { e.preventDefault(); openLightbox(); });

    // Close interactions
    imageModalClose.addEventListener('click', closeLightbox);
    imageModal.addEventListener('click', (e) => { if (e.target === imageModal) closeLightbox(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

    // Wheel zoom (desktop)
    imageModalImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale = clamp(scale * delta, 1, 4);
        updateTransform();
    }, { passive: false });

    // Mouse drag (desktop)
    imageModalImg.addEventListener('mousedown', (e) => {
        if (scale <= 1) return;
        isDragging = true;
        startX = e.clientX - posX;
        startY = e.clientY - posY;
        imageModalImg.classList.add('dragging');
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        posX = e.clientX - startX;
        posY = e.clientY - startY;
        updateTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        imageModalImg.classList.remove('dragging');
    });

    // Touch pinch-zoom & pan (mobile)
    imageModalImg.addEventListener('touchstart', (e) => {
        e.preventDefault();
        for (let touch of e.changedTouches) {
            pointers.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
        }
    }, { passive: false });

    imageModalImg.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touches = Array.from(e.touches);
        
        if (touches.length === 2 && pointers.size === 2) {
            const [t1, t2] = touches;
            const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
            const p1 = pointers.get(t1.identifier);
            const p2 = pointers.get(t2.identifier);
            if (p1 && p2) {
                const prevDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (prevDist > 0) {
                    scale = clamp(scale * (dist / prevDist), 1, 4);
                    updateTransform();
                }
            }
            for (let touch of touches) {
                pointers.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
            }
        } else if (touches.length === 1 && scale > 1) {
            const touch = touches[0];
            const prev = pointers.get(touch.identifier);
            if (prev) {
                posX += touch.clientX - prev.x;
                posY += touch.clientY - prev.y;
                updateTransform();
            }
            pointers.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
        }
    }, { passive: false });

    imageModalImg.addEventListener('touchend', (e) => {
        for (let touch of e.changedTouches) {
            pointers.delete(touch.identifier);
        }
    });
}

// Lookbook video mute toggle
const lookbookMuteBtn = document.getElementById('lookbookMuteBtn');
const lookbookVideos = document.querySelectorAll('.lookbook-video');

if (lookbookMuteBtn && lookbookVideos.length) {
    // Initialize button to show current mute state (video1 is first video)
    const video1 = document.getElementById('video1');
    const initialMuted = video1 ? video1.muted : true;
    lookbookMuteBtn.textContent = initialMuted ? '🔇' : '🔊';
    
    lookbookMuteBtn.addEventListener('click', () => {
        lookbookVideos.forEach(video => {
            video.muted = !video.muted;
        });
        lookbookMuteBtn.textContent = lookbookVideos[0].muted ? '🔇' : '🔊';
        lookbookMuteBtn.classList.toggle('active', !lookbookVideos[0].muted);
    });
}

// Individual Video Controls for Lookbook Videos
(function initVideoControls() {
    function setupVideoControls() {
        // Video 1 Controls
        const video1 = document.getElementById('video1');
        const video1MuteBtn = document.getElementById('video1MuteBtn');

        if (video1 && video1MuteBtn) {
            // Set initial emoji state
            video1MuteBtn.textContent = video1.muted ? '🔇' : '🔊';
            
            video1MuteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                video1.muted = !video1.muted;
                video1MuteBtn.textContent = video1.muted ? '🔇' : '🔊';
                console.log('Video1 muted:', video1.muted);
            });
        }

        // Video 2 Controls
        const video2 = document.getElementById('video2');
        const video2MuteBtn = document.getElementById('video2MuteBtn');

        if (video2 && video2MuteBtn) {
            // Set initial emoji state
            video2MuteBtn.textContent = video2.muted ? '🔇' : '🔊';
            
            video2MuteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                video2.muted = !video2.muted;
                video2MuteBtn.textContent = video2.muted ? '🔇' : '🔊';
                console.log('Video2 muted:', video2.muted);
            });
        }
    }
    
    // Try multiple ways to ensure code runs
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupVideoControls);
    } else {
        setupVideoControls();
    }
    
    // Fallback: also run after a short delay
    setTimeout(setupVideoControls, 100);
})();
