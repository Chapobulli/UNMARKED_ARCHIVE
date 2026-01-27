// Scroll Text Motion inspired by Codrops demo, adapted for UNMARKED ARCHIVE
// Requires GSAP + ScrollTrigger + ScrollSmoother + Flip + ScrambleText

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip, ScrambleTextPlugin);

// Smooth scrolling
ScrollSmoother.create({ smooth: 1, normalizeScroll: true });

const textElements = document.querySelectorAll('.el');
const logoEl = document.querySelector('.logo > span');
const logoText = logoEl ? logoEl.textContent : '';

// Cache original text
textElements.forEach((el) => { el.dataset.text = el.textContent; });
if (logoEl) logoEl.dataset.text = logoText;

function resetTextElements() {
  textElements.forEach((el) => {
    gsap.set(el, { clearProps: 'transform,opacity,filter' });
  });
}

function initFlips() {
  resetTextElements();

  textElements.forEach((el) => {
    const originalClass = [...el.classList].find((c) => c.startsWith('pos-'));
    const targetClass = el.dataset.altPos;
    const flipEase = el.dataset.flipEase || 'expo.inOut';
    if (!originalClass || !targetClass) return;

    el.classList.add(targetClass);
    el.classList.remove(originalClass);
    const flipState = Flip.getState(el, { props: 'opacity,filter,width' });
    el.classList.add(originalClass);
    el.classList.remove(targetClass);

    Flip.to(flipState, {
      ease: flipEase,
      scrollTrigger: {
        trigger: el,
        start: 'clamp(bottom bottom-=10%)',
        end: 'clamp(center center)',
        scrub: true,
      },
    });

    Flip.from(flipState, {
      ease: flipEase,
      scrollTrigger: {
        trigger: el,
        start: 'clamp(center center)',
        end: 'clamp(top top)',
        scrub: true,
      },
    });
  });
}

const scrambleChars = 'upperAndLowerCase';

function scramble(el, { duration, revealDelay = 0 } = {}) {
  const text = el.dataset.text ?? el.textContent;
  const finalDuration = duration ?? (el.dataset.scrambleDuration ? parseFloat(el.dataset.scrambleDuration) : 1);
  gsap.killTweensOf(el);
  gsap.fromTo(el, { scrambleText: { text: '', chars: '' } }, {
    scrambleText: { text, chars: scrambleChars, revealDelay },
    duration: finalDuration,
  });
}

function killScrambleTriggers() {
  ScrollTrigger.getAll().forEach((st) => { if (st.vars.id === 'scramble') st.kill(); });
}

function initScramble() {
  killScrambleTriggers();
  textElements.forEach((el) => {
    ScrollTrigger.create({
      id: 'scramble',
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => scramble(el),
      onEnterBack: () => scramble(el),
    });
  });
  if (logoEl) scramble(logoEl, { revealDelay: 0.5 });
}

window.addEventListener('resize', () => {
  ScrollTrigger.refresh(true);
  initFlips();
  initScramble();
});

initFlips();
initScramble();
