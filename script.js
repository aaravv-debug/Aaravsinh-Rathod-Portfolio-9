/**
 * Aaravsinh Rathod — High-Fashion Behance Editorial Portfolio Engine
 * Luxury Cursor, 3D Card Tilt, Modal Engine, Theme Persistence, and Scroll Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
    initIntroPreloader();
    initLuxuryCursor();
    initCard3DTilt();
    initThemeToggle();
    initMobileNav();
    initScrollSpy();
    initCaseStudyModal();
    initCopyEmail();
    initContactForm();
    initBackToTop();
    initScrollReveal();
    initHeroInteractions();
    initEducationPipeAnimation();
    initAboutMeSection();
});

/* =========================================
   1. Luxury Cursor Follower
========================================= */
function initLuxuryCursor() {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    if (!dot || !outline) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
        if (!document.body.classList.contains('cursor-active')) {
            document.body.classList.add('cursor-active');
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateCursor() {
        // Smooth trailing interpolation
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Enlarge cursor on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .tilt-card, input, textarea');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

/* =========================================
   2. Interactive 3D Perspective Card Tilt
========================================= */
function initCard3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* =========================================
   3. Theme Toggle (Light / Dark Mode)
========================================= */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('aaravsinh-editorial-theme') || 'theme-light';

    document.body.className = savedTheme;
    updateThemeIcon(savedTheme);

    toggleBtn?.addEventListener('click', () => {
        const isDark = document.body.classList.contains('theme-dark');
        const nextTheme = isDark ? 'theme-light' : 'theme-dark';

        document.body.className = nextTheme;
        localStorage.setItem('aaravsinh-editorial-theme', nextTheme);
        updateThemeIcon(nextTheme);
        showToast(isDark ? 'Editorial Canvas Mode' : 'Brutalist Dark Mode');
    });

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        themeIcon.textContent = theme === 'theme-dark' ? 'light_mode' : 'dark_mode';
    }
}

/* =========================================
   4. Mobile Navigation Drawer
========================================= */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        const isOpen = navMenu.classList.contains('mobile-open');
        mobileToggle.querySelector('.material-symbols-outlined').textContent = isOpen ? 'close' : 'menu';
    });

    navMenu?.querySelectorAll('.nav-item, .mobile-menu-cta').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-open');
            if (mobileToggle) {
                mobileToggle.querySelector('.material-symbols-outlined').textContent = 'menu';
            }
        });
    });
}

/* =========================================
   5. ScrollSpy
========================================= */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

/* =========================================
   6. Case Study Modal Engine
========================================= */
const CASE_STUDIES = {
    ecommerce: {
        title: "Cross-Border E-Commerce Platform UI/UX",
        category: "Fintech & Global Supply Chain",
        timeline: "2023 — 2024 (Client Project)",
        role: "Lead UI/UX Designer & Wireframe Architect",
        liveUrl: "https://claude.ai/public/artifacts/c6a62127-124c-4302-a00c-dd80ea4cb727",
        overview: "An enterprise-grade cross-border trading interface designed for international freight forwarders, bulk suppliers, and trade brokers. Solved complex information density through modular layout cards, multi-currency conversion, and verified checkout routing.",
        challenge: "Global logistics buyers were experiencing high cognitive fatigue due to cluttered tabular data and opaque checkout fees across different jurisdictions.",
        solution: [
            "Constructed a 12-column responsive layout system that effortlessly adapts from brokerage widescreen displays to handheld field tablets.",
            "Designed an interactive shipping corridor calculator with real-time currency conversion across 142 currencies.",
            "Standardized accessible typography and WCAG AAA compliant text-contrast scales for high-contrast logistics environments.",
            "Achieved a +41.8% conversion uplift during user prototype testing sessions."
        ],
        stack: ["Figma", "Canva", "Responsive Wireframes", "Information Architecture", "HTML5 & Tailwind"]
    },
    simulator: {
        title: "Bright Dental Clinic — Modern Patient Care Web Platform",
        category: "Healthcare UI/UX & Interactive Web Application",
        timeline: "2024 — 2025 (Production Design & Build)",
        role: "Lead Frontend Engineer & UI/UX Designer",
        liveUrl: "https://bright-dental-clinic-omega.vercel.app/",
        videoUrl: "assets/bright-dental-clinic.mp4",
        overview: "An empathetic, conversion-focused digital healthcare platform developed for Bright Dental Clinic in Prachi, Gir Somnath. Built to remove friction from clinical appointments and establish patient trust through transparent information architecture.",
        challenge: "Traditional dental practice websites suffered from confusing booking flows, language barriers in regional communities, and static, intimidating clinical presentation.",
        solution: [
            "Architected an instant calendar booking system coupled with direct WhatsApp automated appointment confirmations.",
            "Implemented an interactive before/after image comparison slider demonstrating authentic smile makeover transformations.",
            "Designed a fluid trilingual localization switcher supporting English, Hindi, and Gujarati for accessible community outreach.",
            "Engineered an emergency dental care quick-action banner with immediate one-tap calling and geolocation navigation."
        ],
        stack: ["React.js", "Tailwind CSS", "Vite", "Lucide Icons", "Responsive UI/UX", "WhatsApp API Integration"]
    },
    branding: {
        title: "Brand Identity & Digital Asset System",
        category: "Digital Brand Architecture",
        timeline: "2023 — 2026 (Client Systems)",
        role: "Brand Strategist & Asset Designer",
        liveUrl: "https://linkedin.com/in/aarav-amarsinh-rathod-743504351",
        overview: "A cohesive brand identity system built for multi-platform social media distribution, marketing collateral, and executive decks.",
        challenge: "Startups and client teams struggled with disjointed graphic collateral, spending excessive hours recreating assets without unified guidelines.",
        solution: [
            "Delivered 10+ reusable Canva templates for announcement carousels, quotation cards, and technical infographics.",
            "Engineered custom GenAI visual prompts to synthesize thematic 3D icons with consistent lighting and tailored color palettes.",
            "Established a cohesive visual language utilizing royal blue, terracotta, and deep charcoal.",
            "Reduced turnaround times for weekly graphic asset creation by 40%."
        ],
        stack: ["Canva Pro", "Generative AI Image Synthesis", "Typography Pairing", "Social Media Strategy"]
    }
};

function initCaseStudyModal() {
    const modal = document.getElementById('case-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const titleDisplay = document.getElementById('modal-title-display');
    const contentArea = document.getElementById('modal-content-area');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projKey = btn.dataset.project;
            const data = CASE_STUDIES[projKey];
            if (!data) return;

            renderModal(data);
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal();
    });

    function renderModal(p) {
        if (titleDisplay) titleDisplay.textContent = `Case Study: ${p.title}`;

        const solList = p.solution.map(s => `<li>${s}</li>`).join('');
        const stackList = p.stack.map(t => `<span class="wt-pill" style="margin-right:0.4rem; margin-bottom:0.4rem;">${t}</span>`).join('');

        contentArea.innerHTML = `
            <div style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-med); padding-bottom: 1.25rem;">
                <span class="wt-pill royal" style="display:inline-block; margin-bottom: 0.75rem;">${p.category}</span>
                <h3 style="font-family: var(--font-display); font-size: 1.85rem; font-weight: 800; color: var(--text-headline); margin-bottom: 0.5rem; line-height: 1.2;">${p.title}</h3>
                <p style="font-size: 0.95rem; color: var(--text-body); line-height: 1.7;">${p.overview}</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; background: var(--bg-main); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.75rem; font-size: 0.8rem;">
                <div>
                    <span style="display:block; color: var(--text-muted); font-size: 0.7rem; font-weight: 700;">TIMELINE</span>
                    <strong style="color: var(--text-headline);">${p.timeline}</strong>
                </div>
                <div>
                    <span style="display:block; color: var(--text-muted); font-size: 0.7rem; font-weight: 700;">ROLE</span>
                    <strong style="color: var(--text-headline);">${p.role}</strong>
                </div>
                <div>
                    <span style="display:block; color: var(--text-muted); font-size: 0.7rem; font-weight: 700;">SPECIFICATION</span>
                    <strong style="color: var(--royal-blue);">Production Verified</strong>
                </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; color: var(--royal-blue); margin-bottom: 0.5rem; letter-spacing: 0.08em;">// 01. THE PROBLEM</h4>
                <p style="font-size: 0.92rem; line-height: 1.7; color: var(--text-body);">${p.challenge}</p>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; color: var(--royal-blue); margin-bottom: 0.5rem; letter-spacing: 0.08em;">// 02. ARCHITECTURAL SOLUTION</h4>
                <ul class="capsule-bullets" style="margin-bottom: 0;">
                    ${solList}
                </ul>
            </div>

            <div style="margin-bottom: 2rem;">
                <h4 style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; color: var(--royal-blue); margin-bottom: 0.75rem; letter-spacing: 0.08em;">// 03. TOOLING &amp; STACK</h4>
                <div style="display: flex; flex-wrap: wrap;">
                    ${stackList}
                </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: center; border-top: 1px solid var(--border-med); padding-top: 1.5rem; flex-wrap: wrap;">
                <a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn-pill btn-pill-royal">
                    <span>${p.videoUrl ? 'Open Live Website' : 'Open Live Prototype'}</span>
                    <span class="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                ${p.videoUrl ? `
                <a href="${p.videoUrl}" target="_blank" rel="noopener" class="btn-pill btn-pill-outline">
                    <span>Watch Video Demo</span>
                    <span class="material-symbols-outlined text-sm">play_circle</span>
                </a>
                ` : ''}
                <button class="btn-pill btn-pill-outline" onclick="document.getElementById('case-modal').classList.remove('open'); document.body.style.overflow='';">
                    <span>Close</span>
                </button>
            </div>
        `;
    }
}

/* =========================================
   7. Copy Email with Toast
========================================= */
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const emailVal = document.getElementById('email-address')?.textContent.trim() || 'aaravrathod168@gmail.com';

    copyBtn?.addEventListener('click', () => {
        navigator.clipboard.writeText(emailVal).then(() => {
            showToast(`Copied to clipboard: ${emailVal}`);
            copyBtn.innerHTML = `
                <span class="material-symbols-outlined text-sm">check</span>
                <span>Copied!</span>
            `;
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <span class="material-symbols-outlined text-sm">content_copy</span>
                    <span>Copy</span>
                `;
            }, 2500);
        });
    });
}

/* =========================================
   8. Contact Form
========================================= */
function initContactForm() {
    const form = document.getElementById('portfolio-form');
    const submitBtn = document.getElementById('submit-btn');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();

        if (!name || !email) {
            showToast('Please fill out all required fields.');
            return;
        }

        const prevHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Sending Message...</span>
        `;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span class="material-symbols-outlined text-sm">check_circle</span>
                <span>Message Dispatched!</span>
            `;
            showToast(`Thank you, ${name}! Your transmission has been dispatched to Aaravsinh.`);
            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = prevHtml;
            }, 4000);
        }, 1000);
    });
}

/* =========================================
   9. Back To Top
========================================= */
function initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    backBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =========================================
   10. Scroll Stagger Reveal
========================================= */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.work-showcase-article, .dossier-column, .skill-pillar-card, .metric-pill-card, .behance-dossier-column');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

/* =========================================
   11. Toast Utility
========================================= */
let toastTimer;
function showToast(msg) {
    const toast = document.getElementById('toast-msg');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* =========================================
   12. Behance Hero Interactions & Parallax
========================================= */
function initHeroInteractions() {
    const hero = document.getElementById('hero');
    const portraitWrap = document.getElementById('portrait-wrap');
    const portraitImg = document.getElementById('hero-portrait-img');
    const likeBtn = document.getElementById('like-btn');

    if (hero && portraitWrap) {

        // Subtle mouse parallax on desktop
        hero.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            portraitWrap.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(${y * -10}px)`;
        });

        hero.addEventListener('mouseleave', () => {
            portraitWrap.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
        });

        // Click on portrait to toggle B&W / Color aesthetic
        let isColor = false;
        portraitWrap.addEventListener('click', () => {
            isColor = !isColor;
            if (isColor) {
                portraitImg.style.filter = 'grayscale(0%) contrast(102%) brightness(102%)';
                showToast('Aesthetic: Full Color Studio Cutout');
            } else {
                portraitImg.style.filter = 'grayscale(100%) contrast(105%) brightness(100%)';
                showToast('Aesthetic: High-Fashion Monochromatic Cutout');
            }
        });
    }

    // Interactive Floating Like Button
    if (likeBtn) {
        let likes = 42;
        let liked = false;
        likeBtn.addEventListener('click', () => {
            liked = !liked;
            likes += liked ? 1 : -1;
            const btn = likeBtn.querySelector('.like-circle-btn');
            if (liked) {
                btn.style.transform = 'scale(1.25) rotate(-15deg)';
                btn.style.backgroundColor = '#1d4ed8';
                showToast(`Appreciated! ${likes} people loved Aaravsinh's portfolio 💙`);
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 300);
            } else {
                btn.style.transform = 'scale(1)';
                btn.style.backgroundColor = 'var(--royal-blue)';
            }
        });
    }


    // Floating Hire Capsule Dismiss Handler
    const hireCapsule = document.getElementById('hire-capsule');
    const closeHireCapsule = document.getElementById('close-hire-capsule');
    if (hireCapsule && closeHireCapsule) {
        closeHireCapsule.addEventListener('click', (e) => {
            e.stopPropagation();
            hireCapsule.style.transform = 'translateX(-50%) translateY(30px) scale(0.9)';
            hireCapsule.style.opacity = '0';
            hireCapsule.style.pointerEvents = 'none';
            setTimeout(() => {
                hireCapsule.style.display = 'none';
            }, 350);
        });
    }
}

/* =========================================
   12. Academic Blue Pipe Scroll Animation
   Scroll-driven live pipeline connecting academic career
========================================= */
function initEducationPipeAnimation() {
    const timeline = document.getElementById('academic-pipe-timeline');
    const pipeFill = document.getElementById('education-pipe-fill');
    if (!timeline || !pipeFill) return;

    const items = timeline.querySelectorAll('.timeline-pipe-item');
    const track = timeline.querySelector('.timeline-pipe-track');

    function updatePipe() {
        if (!timeline || !track) return;
        const trackRect = track.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Viewport trigger line (at 55% from the top of the viewport)
        const triggerY = windowHeight * 0.55;

        // How far the trigger point has passed into the track
        const progressPx = triggerY - trackRect.top;
        const totalTrackHeight = trackRect.height;

        // Clamp between 0 and total track height
        const fillHeight = Math.max(0, Math.min(totalTrackHeight, progressPx));
        pipeFill.style.height = `${fillHeight}px`;

        // Check each milestone item against the pipe's progress
        items.forEach((item) => {
            const node = item.querySelector('.timeline-node');
            const branch = item.querySelector('.timeline-branch');
            const card = item.querySelector('.timeline-card');
            if (!node) return;

            const nodeRect = node.getBoundingClientRect();
            // When trigger line reaches or passes the node center
            if (triggerY >= nodeRect.top + nodeRect.height / 2 - 15) {
                node.classList.add('node-active');
                if (branch) branch.classList.add('branch-active');
                if (card) card.classList.add('card-active');
            } else {
                node.classList.remove('node-active');
                if (branch) branch.classList.remove('branch-active');
                if (card) card.classList.remove('card-active');
            }
        });
    }

    window.addEventListener('scroll', updatePipe, { passive: true });
    window.addEventListener('resize', updatePipe);
    // Initial calculation after layout render
    setTimeout(updatePipe, 100);
}

/* =========================================
   13. About Me Dynamic Scroll Entrance & Polaroid Tilt
========================================= */
function initAboutMeSection() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    // IntersectionObserver to trigger smooth entrance animation when scrolling to About Me
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    aboutObserver.observe(aboutSection);

    // Dynamic 3D physics tilt on hover over Polaroid Card
    const polaroidWrap = document.getElementById('polaroid-card-wrap');
    const polaroidStage = document.getElementById('polaroid-stage');
    if (polaroidWrap && polaroidStage) {
        let isHovered = false;

        polaroidStage.addEventListener('mouseenter', () => {
            if (window.innerWidth < 768) return;
            isHovered = true;
        });

        polaroidStage.addEventListener('mousemove', (e) => {
            if (!isHovered || window.innerWidth < 768) return;
            const rect = polaroidStage.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Subtle 3D tilt
            const rotX = -y * 12;
            const rotY = x * 14;
            polaroidWrap.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025, 1.025, 1.025)`;
        });

        polaroidStage.addEventListener('mouseleave', () => {
            isHovered = false;
            polaroidWrap.style.transform = '';
        });
    }
}

/* =========================================
   14. Awwwards Intro Preloader & Reveal Engine (GSAP)
========================================= */
function initIntroPreloader() {
    const preloader = document.getElementById('intro-preloader');
    if (!preloader) return;

    // Lock page scrolling while preloader runs
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP CDN not loaded; bypassing preloader gracefully.');
        preloader.style.display = 'none';
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        return;
    }

    const numEl = document.getElementById('preloader-num');
    const circleEl = document.getElementById('preloader-circle');
    const pencilOrbit = document.getElementById('preloader-pencil-orbit');
    const counterStage = document.getElementById('preloader-counter-stage');
    const greetingStage = document.getElementById('preloader-greeting-stage');
    const greetingSub = preloader.querySelector('.preloader-greeting-sub');
    const shutterTop = preloader.querySelector('.preloader-shutter-top');
    const shutterBottom = preloader.querySelector('.preloader-shutter-bottom');

    // Circumference of r=50 circle: 2 * Math.PI * 50 = ~314.16
    const circumference = 314.16;
    if (circleEl) {
        circleEl.style.strokeDasharray = circumference;
        circleEl.style.strokeDashoffset = circumference;
    }

    // Prepare Calligraphy Strokes via dynamic path length calculation
    const drawStrokes = preloader.querySelectorAll('.draw-stroke');
    drawStrokes.forEach(stroke => {
        try {
            const length = stroke.getTotalLength();
            stroke.style.strokeDasharray = length;
            stroke.style.strokeDashoffset = length;
        } catch (e) {
            stroke.style.strokeDasharray = 300;
            stroke.style.strokeDashoffset = 300;
        }
    });

    // Create Main GSAP Timeline
    const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' }
    });

    // Counter Object for smooth interpolation
    const progressObj = { value: 0 };

    // --- PHASE 1: 0% to 100% Counter & Orbital Pencil Loader (~2.5s) ---
    tl.to(progressObj, {
        value: 100,
        duration: 2.5,
        ease: 'power1.inOut',
        onUpdate: () => {
            const currentVal = Math.round(progressObj.value);
            if (numEl) numEl.textContent = currentVal;

            // Sync circular stroke
            if (circleEl) {
                const offset = circumference - (progressObj.value / 100) * circumference;
                circleEl.style.strokeDashoffset = offset;
            }

            // Sync orbiting pencil (0deg at 12 o'clock to 360deg)
            if (pencilOrbit) {
                const deg = (progressObj.value / 100) * 360;
                pencilOrbit.style.transform = `rotate(${deg}deg)`;
            }
        }
    });

    // Subtle hold at 100% (0.15s)
    tl.to({}, { duration: 0.15 });

    // Transition out Phase 1 (scale down & fade out counter and pencil)
    tl.to(counterStage, {
        opacity: 0,
        scale: 0.88,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
            if (counterStage) counterStage.style.display = 'none';
        }
    });

    // --- PHASE 2: Handwritten Calligraphy "Kem Cho?" Greeting (~1.8s) ---
    // Reveal greeting stage
    tl.to(greetingStage, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'power3.out'
    }, '-=0.08');

    // Animate handwriting strokes over ~1.4s total (0.9s duration + 15 * 0.035s stagger = ~1.42s)
    tl.to(drawStrokes, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
        stagger: 0.035
    }, '-=0.15');

    // Fade-in of Gujarati / English subtitle
    if (greetingSub) {
        tl.to(greetingSub, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out'
        }, '-=0.35');
    }

    // Pause on the completed greeting for 0.4s
    tl.to({}, { duration: 0.4 });

    // --- PHASE 3: Shutter Wipe Reveal & Hero Section Entrance ---
    // Fade out greeting
    tl.to(greetingStage, {
        opacity: 0,
        scale: 1.04,
        duration: 0.3,
        ease: 'power2.in'
    });

    // Split horizontal shutter wipe (top slides up, bottom slides down)
    tl.to(shutterTop, {
        yPercent: -100,
        duration: 0.95,
        ease: 'power4.inOut'
    }, 'shutterReveal');

    tl.to(shutterBottom, {
        yPercent: 100,
        duration: 0.95,
        ease: 'power4.inOut'
    }, 'shutterReveal');

    // === CINEMATIC HERO SECTION ENTRANCE ===
    // 1. Aaravsinh's studio portrait rises and expands smoothly as curtains pull back
    tl.fromTo('#portrait-wrap',
        { opacity: 0, y: 55, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: 'power3.out' },
        'shutterReveal+=0.12'
    );

    // 2. Monumental "PORTFOLIO" characters drop down from upwards one by one starting from 'P'
    tl.fromTo('.portfolio-char',
        {
            opacity: 0,
            y: -110,
            scaleY: 1.3,
            rotateZ: (i) => (i % 2 === 0 ? -4 : 4)
        },
        {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateZ: 0,
            duration: 0.85,
            stagger: 0.08, // Cascades from P to O one by one
            ease: 'back.out(1.6)'
        },
        'shutterReveal+=0.15'
    );

    tl.fromTo('.hero-street-watermark',
        { opacity: 0, y: 35, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: 'power2.out' },
        'shutterReveal+=0.18'
    );

    // 3. Street marker tag "My" stamps in dynamically
    tl.fromTo('.street-graffiti-my',
        { opacity: 0, scale: 1.6, rotation: -24 },
        { opacity: 1, scale: 1, rotation: -10, duration: 0.65, ease: 'back.out(1.7)' },
        'shutterReveal+=0.3'
    );

    // 4. Header navigation & top action capsules glide down smoothly
    tl.fromTo('#header',
        { opacity: 0, y: -28 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        'shutterReveal+=0.22'
    );

    tl.fromTo('.behance-hero-top-bar',
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        'shutterReveal+=0.28'
    );


    // 6. Floating hire capsule floats up into focal center position
    tl.fromTo('#hire-capsule',
        { opacity: 0, y: 35, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
        'shutterReveal+=0.38'
    );

    // 7. Behance hero headline statement typography reveals with gentle elevation
    tl.fromTo('.behance-hero-statement',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
        'shutterReveal+=0.42'
    );

    // Unlock page and remove overlay
    tl.call(() => {
        if (preloader) {
            preloader.style.display = 'none';
            preloader.style.pointerEvents = 'none';
        }
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';

        window.dispatchEvent(new Event('preloaderComplete'));
    });
}


