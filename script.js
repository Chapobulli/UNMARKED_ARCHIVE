// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
});

// Product Gallery
const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');
const productImages = [
    'assets/product/product-black.png',
    'assets/product/product-white.png',
    'assets/product/product-white1.png',
    'assets/product/product-brown.png'
];

thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = productImages[index];
            mainImage.style.opacity = '1';
            // If zoom is active, update background image to new source
            if (typeof isZoomed !== 'undefined' && isZoomed) {
                zoomContainer.style.backgroundImage = `url(${mainImage.src})`;
            }
        }, 120);
    });
});

// Countdown Timer - Set end date (14 days from now)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 14);
countdownDate.setHours(23, 59, 59);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<p>PREORDER CLOSED</p>';
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Preorder Counter Animation
let preorderCount = 47;
const counterElement = document.getElementById('preorderCount');
let currentCount = 0;

function animateCounter() {
    const increment = Math.ceil(preorderCount / 50);
    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= preorderCount) {
            currentCount = preorderCount;
            clearInterval(timer);
        }
        counterElement.textContent = currentCount;
    }, 30);
}

// Start counter animation when visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && currentCount === 0) {
            animateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterObserver.observe(document.querySelector('.social-proof'));

// Increment counter randomly every 30-60 seconds
setInterval(() => {
    if (Math.random() > 0.7) {
        preorderCount++;
        counterElement.textContent = preorderCount;
    }
}, Math.random() * 30000 + 30000);

// Size Guide Modal
const sizeGuideBtn = document.getElementById('sizeGuideBtn');
const sizeModal = document.getElementById('sizeModal');
const modalClose = document.getElementById('modalClose');

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
    if (!data.name || !data.email || !data.size || !data.color) {
        formMessage.textContent = 'PLEASE FILL ALL REQUIRED FIELDS';
        formMessage.className = 'form-note error';
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    try {
        // Preferred: Instagram DM with clipboard copy first
        const igHandle = 'opiumarchiveofficial'; // change if needed
        const dmPlain = (
            `PREORDER - SAMPLE 001\n` +
            `NAME: ${data.name}\n` +
            `EMAIL: ${data.email}\n` +
            `PHONE: ${data.phone || 'N/A'}\n` +
            `COLOR: ${data.color}\n` +
            `SIZE: ${data.size}\n` +
            `NOTE: ${data.message || 'N/A'}\n` +
            `DATE: ${new Date().toLocaleString()}`
        );

        // Copy to clipboard (with fallback)
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
        
        // DON'T auto-open Instagram - let user see the copied message first
        // const opened = window.open(igLink, '_blank');

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
                <a href="${igLink}" target="_blank" style="display: inline-block; padding: 0.75rem 2rem; background: var(--color-accent); color: var(--color-bg); text-decoration: none; text-transform: uppercase; letter-spacing: 0.08rem; font-weight: 600; font-size: 0.9rem; margin-top: 0.5rem; border: none; cursor: pointer;">APRI INSTAGRAM DM</a>
            `;
            formMessage.className = 'form-note success';
        }
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            formMessage.textContent = '';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 10000);
        
        /* 
        // Option 2: Use a free service like Formspree (email fallback)
        // Sign up at formspree.io and replace YOUR_FORM_ID
        
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
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
        // Option 3: Use EmailJS (free tier available)
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
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }).catch((error) => {
            throw error;
        });
        */
        
    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = '✗ ERROR. PLEASE DM US ON INSTAGRAM @OPIUMARCHIVEOFFICIAL';
        formMessage.className = 'form-note error';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');

newsletterForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    if (!isValidEmail(email)) {
        newsletterMessage.textContent = '✗ INVALID EMAIL ADDRESS';
        newsletterMessage.className = 'newsletter-message error';
        return;
    }
    
    const submitBtn = this.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SUBSCRIBING...';
    submitBtn.disabled = true;
    
    try {
        // For now, just show success. Integrate with Mailchimp/Buttondown later
        setTimeout(() => {
            newsletterMessage.textContent = '✓ SUBSCRIBED! THANK YOU.';
            newsletterMessage.className = 'newsletter-message success';
            newsletterForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                newsletterMessage.textContent = '';
            }, 3000);
        }, 1000);
        
        /* 
        // To integrate with a service like Mailchimp or Buttondown:
        
        const response = await fetch('YOUR_NEWSLETTER_ENDPOINT', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });
        
        if (response.ok) {
            newsletterMessage.textContent = '✓ SUBSCRIBED! THANK YOU.';
            newsletterMessage.className = 'newsletter-message success';
            newsletterForm.reset();
        } else {
            throw new Error('Subscription failed');
        }
        */
        
    } catch (error) {
        console.error('Error:', error);
        newsletterMessage.textContent = '✗ ERROR. TRY AGAIN.';
        newsletterMessage.className = 'newsletter-message error';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Add intersection observer for scroll animations (optional)
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
document.querySelectorAll('.product-section, .contact-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Product Gallery + Zoom
const zoomContainer = document.getElementById('zoomContainer');
const zoomIndicator = document.getElementById('zoomIndicator');

let isZoomed = false;

// Background-position zoom/pan (reliable and simple)
const ZOOM_SCALE = 2.0; // 2x zoom

function enterZoom() {
    isZoomed = true;
    zoomContainer.classList.add('zoomed');
    zoomContainer.style.backgroundImage = `url(${mainImage.src})`;
    zoomContainer.style.backgroundSize = `${ZOOM_SCALE * 100}%`;
    zoomContainer.style.backgroundPosition = '50% 50%';
    zoomIndicator.textContent = '↔ DRAG TO EXPLORE — CLICK TO EXIT';
}

function exitZoom() {
    isZoomed = false;
    zoomContainer.classList.remove('zoomed');
    zoomContainer.style.backgroundImage = '';
    zoomIndicator.textContent = '🔍 SCROLL TO ZOOM';
}

zoomContainer.addEventListener('click', () => {
    if (!isZoomed) enterZoom();
    else exitZoom();
});

// Allow mouse wheel to enter zoom for users trying to scroll
zoomContainer.addEventListener('wheel', (e) => {
    if (!isZoomed) {
        e.preventDefault();
        enterZoom();
    }
}, { passive: false });

// Also bind click on the image to toggle zoom (some browsers capture image click differently)
mainImage.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isZoomed) enterZoom();
    else exitZoom();
});

// Prevent native image drag behavior
mainImage.addEventListener('dragstart', (e) => e.preventDefault());

function updateBackgroundPosition(evt) {
    const rect = zoomContainer.getBoundingClientRect();
    let clientX, clientY;
    if (evt.touches && evt.touches.length) {
        clientX = evt.touches[0].clientX;
        clientY = evt.touches[0].clientY;
    } else {
        clientX = evt.clientX;
        clientY = evt.clientY;
    }
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    zoomContainer.style.backgroundPosition = `${x}% ${y}%`;
}

zoomContainer.addEventListener('mousemove', (e) => {
    if (isZoomed) updateBackgroundPosition(e);
});

zoomContainer.addEventListener('touchmove', (e) => {
    if (isZoomed) updateBackgroundPosition(e);
}, { passive: true });

// Video Controls for Product Section
const productVideo = document.getElementById('productVideo');
const videoControls = document.getElementById('videoControls');
const playBtn = document.getElementById('playBtn');
const muteBtn = document.getElementById('muteBtn');

if (productVideo && videoControls) {
    productVideo.addEventListener('mouseenter', () => {
        videoControls.style.display = 'flex';
    });
    productVideo.addEventListener('mouseleave', () => {
        videoControls.style.display = 'none';
    });
    
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
        muteBtn.classList.toggle('active');
        muteBtn.textContent = productVideo.muted ? '🔇' : '🔊';
    });
}

// (Countdown already initialized above)
