/**
 * Sibghatullah Portfolio - Main JavaScript
 * =========================================
 * Handles: Theme toggle, navigation, projects loading, modal, form validation
 * 
 * @author Sibghatullah
 * @version 2.0.0
 */

(function () {
    'use strict';

    // ==========================================================================
    // Configuration
    // ==========================================================================

    const CONFIG = {
        projectsDataUrl: './assets/data/projects.json',
        formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID', // TODO: Replace with actual Formspree ID
        typewriterWords: [
            'Web Developer',
            'Flutter Developer',
            'React Native Dev',
            'DevOps Engineer',
            'Security Enthusiast',
            'AI/ML Explorer',
            'Network Architect'
        ],
        typewriterSpeed: {
            typing: 100,
            deleting: 50,
            pause: 1500
        }
    };

    // ==========================================================================
    // DOM Elements
    // ==========================================================================

    const DOM = {
        // Header & Navigation
        header: document.querySelector('.header'),
        navToggle: document.querySelector('.nav-toggle'),
        navMobile: document.querySelector('.nav-mobile'),
        navLinks: document.querySelectorAll('.nav__link, .nav-mobile__link'),

        // Theme
        themeToggle: document.getElementById('themeToggle'),

        // Hero
        typewriter: document.getElementById('typewriter'),

        // Projects
        projectsGrid: document.getElementById('projectsGrid'),
        filterChips: document.querySelectorAll('.filter-chip'),

        // Modal
        modal: document.getElementById('projectModal'),
        modalClose: document.querySelector('.modal__close'),
        modalBackdrop: document.querySelector('.modal__backdrop'),

        // Contact Form
        contactForm: document.getElementById('contactForm'),
        formSuccess: document.querySelector('.contact-form__success'),

        // Chat Demo
        chatDemo: document.getElementById('chatDemo'),
        chatToggle: document.getElementById('chatToggle'),
        chatClose: document.querySelector('.chat-demo__close'),
        chatInput: document.getElementById('chatInput'),
        chatSend: document.getElementById('chatSend'),
        chatBody: document.querySelector('.chat-demo__body'),

        // Skill Bars
        skillBars: document.querySelectorAll('.skill-bar__fill'),

        // Floating Tech
        floatingTech: document.querySelectorAll('.floating-tech__icon')
    };

    // ==========================================================================
    // State
    // ==========================================================================

    let state = {
        projects: [],
        currentFilter: 'all',
        modalOpen: false,
        mobileNavOpen: false
    };

    // ==========================================================================
    // Theme Management
    // ==========================================================================

    const ThemeManager = {
        init() {
            // Check for saved theme or system preference
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const hour = new Date().getHours();
            const isNightTime = hour >= 18 || hour < 6;

            // Priority: saved > system preference > time-based
            const theme = savedTheme || (prefersDark || isNightTime ? 'dark' : 'light');
            this.setTheme(theme);

            // Listen for system preference changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        },

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            this.updateToggleIcon(theme);
        },

        toggle() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            this.setTheme(next);
            localStorage.setItem('theme', next);
        },

        updateToggleIcon(theme) {
            if (DOM.themeToggle) {
                DOM.themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
                DOM.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
        }
    };

    // ==========================================================================
    // Navigation
    // ==========================================================================

    const Navigation = {
        init() {
            // Scroll spy for active link
            this.setupScrollSpy();

            // Header shadow on scroll
            this.setupHeaderScroll();

            // Smooth scroll for nav links
            DOM.navLinks.forEach(link => {
                link.addEventListener('click', (e) => this.handleNavClick(e));
            });
        },

        setupScrollSpy() {
            const sections = document.querySelectorAll('section[id]');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        this.setActiveLink(id);
                    }
                });
            }, {
                rootMargin: '-50% 0px -50% 0px'
            });

            sections.forEach(section => observer.observe(section));
        },

        setActiveLink(id) {
            DOM.navLinks.forEach(link => {
                link.classList.remove('nav__link--active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('nav__link--active');
                }
            });
        },

        setupHeaderScroll() {
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 50) {
                    DOM.header?.classList.add('header--scrolled');
                } else {
                    DOM.header?.classList.remove('header--scrolled');
                }

                lastScroll = currentScroll;
            }, { passive: true });
        },

        handleNavClick(e) {
            const href = e.currentTarget.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = DOM.header?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile nav if open
                    if (state.mobileNavOpen) {
                        MobileNav.close();
                    }
                }
            }
        }
    };

    // ==========================================================================
    // Mobile Navigation
    // ==========================================================================

    const MobileNav = {
        init() {
            if (DOM.navToggle) {
                DOM.navToggle.addEventListener('click', () => this.toggle());
            }

            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && state.mobileNavOpen) {
                    this.close();
                }
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (state.mobileNavOpen &&
                    !DOM.navMobile?.contains(e.target) &&
                    !DOM.navToggle?.contains(e.target)) {
                    this.close();
                }
            });
        },

        toggle() {
            state.mobileNavOpen ? this.close() : this.open();
        },

        open() {
            state.mobileNavOpen = true;
            DOM.navToggle?.setAttribute('aria-expanded', 'true');
            DOM.navMobile?.classList.add('nav-mobile--open');
            document.body.style.overflow = 'hidden';
        },

        close() {
            state.mobileNavOpen = false;
            DOM.navToggle?.setAttribute('aria-expanded', 'false');
            DOM.navMobile?.classList.remove('nav-mobile--open');
            document.body.style.overflow = '';
        }
    };

    // ==========================================================================
    // Typewriter Effect
    // ==========================================================================

    const Typewriter = {
        wordIndex: 0,
        charIndex: 0,
        isDeleting: false,

        init() {
            if (DOM.typewriter) {
                this.type();
            }
        },

        type() {
            const word = CONFIG.typewriterWords[this.wordIndex];

            if (this.isDeleting) {
                this.charIndex--;
            } else {
                this.charIndex++;
            }

            DOM.typewriter.textContent = word.substring(0, this.charIndex);

            let typeSpeed = this.isDeleting ?
                CONFIG.typewriterSpeed.deleting :
                CONFIG.typewriterSpeed.typing;

            if (!this.isDeleting && this.charIndex === word.length) {
                typeSpeed = CONFIG.typewriterSpeed.pause;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.wordIndex = (this.wordIndex + 1) % CONFIG.typewriterWords.length;
                typeSpeed = 300;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    };

    // ==========================================================================
    // Projects
    // ==========================================================================

    const Projects = {
        async init() {
            await this.loadProjects();
            this.setupFilters();
        },

        async loadProjects() {
            try {
                const response = await fetch(CONFIG.projectsDataUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                state.projects = data.projects || [];
                this.renderProjects(state.projects);
                this.renderFilters(data.filters || []);
            } catch (error) {
                console.error('Error loading projects:', error);
                this.renderFallback();
            }
        },

        renderProjects(projects) {
            if (!DOM.projectsGrid) return;

            const html = projects.map(project => this.createProjectCard(project)).join('');
            DOM.projectsGrid.innerHTML = html;

            // Add click handlers
            DOM.projectsGrid.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', () => {
                    const projectId = card.dataset.projectId;
                    const project = state.projects.find(p => p.id === projectId);
                    if (project) {
                        Modal.open(project);
                    }
                });

                // Keyboard accessibility
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });
            });
        },

        createProjectCard(project) {
            const tagsHtml = project.tags.slice(0, 3).map(tag =>
                `<span class="project-card__tag">${tag}</span>`
            ).join('');

            const imageHtml = project.image ?
                `<img src="${project.image}" alt="${project.title}" loading="lazy">` :
                `<div class="project-card__placeholder" style="background: ${project.imagePlaceholder || 'var(--accent-primary)'}">📁</div>`;

            return `
        <article class="project-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="View ${project.title} details">
          <div class="project-card__image">
            ${imageHtml}
            <div class="project-card__overlay"></div>
          </div>
          <div class="project-card__content">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__desc">${project.shortDesc}</p>
            <div class="project-card__tags">${tagsHtml}</div>
          </div>
        </article>
      `;
        },

        renderFilters(filters) {
            const container = document.querySelector('.filter-chips');
            if (!container || !filters.length) return;

            const html = filters.map(filter => `
        <button class="filter-chip ${filter.id === 'all' ? 'filter-chip--active' : ''}" 
                data-filter="${filter.id}"
                aria-pressed="${filter.id === 'all'}">
          ${filter.label}
        </button>
      `).join('');

            container.innerHTML = html;

            // Add click handlers
            container.querySelectorAll('.filter-chip').forEach(chip => {
                chip.addEventListener('click', () => this.filterProjects(chip.dataset.filter));
            });
        },

        setupFilters() {
            document.querySelectorAll('.filter-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    this.filterProjects(chip.dataset.filter);
                });
            });
        },

        filterProjects(filter) {
            state.currentFilter = filter;

            // Update active state
            document.querySelectorAll('.filter-chip').forEach(chip => {
                const isActive = chip.dataset.filter === filter;
                chip.classList.toggle('filter-chip--active', isActive);
                chip.setAttribute('aria-pressed', isActive);
            });

            // Filter projects
            const filtered = filter === 'all' ?
                state.projects :
                state.projects.filter(p => p.tags.includes(filter));

            this.renderProjects(filtered);
        },

        renderFallback() {
            // Fallback if JSON fails to load
            if (!DOM.projectsGrid) return;

            DOM.projectsGrid.innerHTML = `
        <div class="projects-fallback" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
          <p>Unable to load projects. Please check back later.</p>
        </div>
      `;
        }
    };

    // ==========================================================================
    // Modal
    // ==========================================================================

    const Modal = {
        init() {
            // Close button
            DOM.modalClose?.addEventListener('click', () => this.close());

            // Backdrop click
            DOM.modalBackdrop?.addEventListener('click', () => this.close());

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && state.modalOpen) {
                    this.close();
                }
            });
        },

        open(project) {
            if (!DOM.modal) return;

            state.modalOpen = true;
            this.render(project);

            DOM.modal.classList.add('modal--open');
            DOM.modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            // Focus trap
            DOM.modalClose?.focus();
        },

        close() {
            if (!DOM.modal) return;

            state.modalOpen = false;
            DOM.modal.classList.remove('modal--open');
            DOM.modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        },

        render(project) {
            const modalContent = DOM.modal?.querySelector('.modal__body');
            if (!modalContent) return;

            // Update image
            const modalImage = DOM.modal.querySelector('.modal__image');
            if (modalImage) {
                modalImage.src = project.image || '';
                modalImage.alt = project.title;
                modalImage.style.display = project.image ? 'block' : 'none';
            }

            // Tech list
            const techHtml = project.tech.map(t =>
                `<span class="modal__tech-item">${t}</span>`
            ).join('');

            // Contributions
            const contributionsHtml = project.contributions.map(c =>
                `<li>${c}</li>`
            ).join('');

            // Action buttons
            let actionsHtml = '';
            if (project.demoUrl) {
                actionsHtml += `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">Live Demo</a>`;
            }
            if (project.repoUrl) {
                actionsHtml += `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">View Code</a>`;
            }

            modalContent.innerHTML = `
        <h2 class="modal__title">${project.title}</h2>
        <div class="modal__meta">
          <span>📅 ${project.year}</span>
          <span>👤 ${project.role}</span>
        </div>
        <p class="modal__desc">${project.fullDesc}</p>
        
        <div class="modal__section">
          <h3 class="modal__section-title">Technologies Used</h3>
          <div class="modal__tech-list">${techHtml}</div>
        </div>
        
        <div class="modal__section">
          <h3 class="modal__section-title">My Contributions</h3>
          <ul class="modal__contributions">${contributionsHtml}</ul>
        </div>
        
        ${actionsHtml ? `<div class="modal__actions">${actionsHtml}</div>` : ''}
      `;
        }
    };

    // ==========================================================================
    // Contact Form
    // ==========================================================================

    const ContactForm = {
        init() {
            if (!DOM.contactForm) return;

            DOM.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));

            // Real-time validation
            DOM.contactForm.querySelectorAll('input, textarea').forEach(field => {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearError(field));
            });
        },

        handleSubmit(e) {
            e.preventDefault();

            const isValid = this.validateForm();

            if (isValid) {
                this.submitForm();
            }
        },

        validateForm() {
            const fields = DOM.contactForm.querySelectorAll('[required]');
            let isValid = true;

            fields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });

            return isValid;
        },

        validateField(field) {
            const value = field.value.trim();
            const type = field.type;
            const group = field.closest('.form-group');

            let isValid = true;
            let errorMessage = '';

            // Required check
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            }

            // Email validation
            if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            }

            // Show/hide error
            if (group) {
                const errorEl = group.querySelector('.form-group__error');

                if (!isValid) {
                    group.classList.add('form-group--error');
                    if (errorEl) errorEl.textContent = errorMessage;
                } else {
                    group.classList.remove('form-group--error');
                }
            }

            return isValid;
        },

        clearError(field) {
            const group = field.closest('.form-group');
            if (group && field.value.trim()) {
                group.classList.remove('form-group--error');
            }
        },

        async submitForm() {
            const submitBtn = DOM.contactForm.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const formData = new FormData(DOM.contactForm);

                // For Formspree
                const response = await fetch(CONFIG.formEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    this.showSuccess();
                    DOM.contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form error:', error);
                // Fallback to mailto
                this.fallbackMailto();
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        },

        showSuccess() {
            if (DOM.formSuccess) {
                DOM.formSuccess.classList.add('contact-form__success--visible');
                setTimeout(() => {
                    DOM.formSuccess.classList.remove('contact-form__success--visible');
                }, 5000);
            }
        },

        fallbackMailto() {
            const name = DOM.contactForm.querySelector('[name="name"]')?.value || '';
            const email = DOM.contactForm.querySelector('[name="email"]')?.value || '';
            const message = DOM.contactForm.querySelector('[name="message"]')?.value || '';

            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

            window.location.href = `mailto:sibghatullah1a2a3a@gmail.com?subject=${subject}&body=${body}`;
        }
    };

    // ==========================================================================
    // Chat Demo
    // ==========================================================================

    const ChatDemo = {
        init() {
            DOM.chatToggle?.addEventListener('click', () => this.toggle());
            DOM.chatClose?.addEventListener('click', () => this.close());
            DOM.chatSend?.addEventListener('click', () => this.send());

            DOM.chatInput?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.send();
                }
            });
        },

        toggle() {
            DOM.chatDemo?.classList.toggle('chat-demo--open');
        },

        close() {
            DOM.chatDemo?.classList.remove('chat-demo--open');
        },

        send() {
            const message = DOM.chatInput?.value.trim();
            if (!message) return;

            const msgEl = document.createElement('div');
            msgEl.className = 'chat-demo__msg chat-demo__msg--me';
            msgEl.textContent = message;

            DOM.chatBody?.appendChild(msgEl);
            DOM.chatInput.value = '';
            DOM.chatBody.scrollTop = DOM.chatBody.scrollHeight;
        }
    };

    // ==========================================================================
    // Skill Bars Animation
    // ==========================================================================

    const SkillBars = {
        init() {
            if (!DOM.skillBars.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            DOM.skillBars.forEach(bar => observer.observe(bar));
        },

        animate(bar) {
            const level = bar.dataset.level || 0;
            setTimeout(() => {
                bar.style.width = `${level}%`;
            }, 100);
        }
    };

    // ==========================================================================
    // Floating Animation
    // ==========================================================================

    const FloatingAnimation = {
        t: 0,

        init() {
            if (!DOM.floatingTech.length) return;
            this.animate();
        },

        animate() {
            DOM.floatingTech.forEach((icon, i) => {
                const y = Math.sin((this.t + i * 10) / 15) * 8;
                const rotate = Math.sin((this.t + i * 10) / 25) * 5;
                icon.style.transform = `translateY(${y}px) rotate(${rotate}deg)`;
            });

            this.t++;
            requestAnimationFrame(() => this.animate());
        }
    };

    // ==========================================================================
    // Smooth Scroll Utility
    // ==========================================================================

    function smoothScrollTo(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const headerHeight = DOM.header?.offsetHeight || 0;
            const targetPosition = element.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Expose for inline onclick handlers
    window.scrollToSection = smoothScrollTo;

    // ==========================================================================
    // Initialize
    // ==========================================================================

    function init() {
        // Remove no-js class
        document.documentElement.classList.remove('no-js');

        // Initialize all modules
        ThemeManager.init();
        Navigation.init();
        MobileNav.init();
        Typewriter.init();
        Projects.init();
        Modal.init();
        ContactForm.init();
        ChatDemo.init();
        SkillBars.init();
        FloatingAnimation.init();

        // Event listeners for theme toggle
        DOM.themeToggle?.addEventListener('click', () => ThemeManager.toggle());

        console.log('🚀 Portfolio initialized successfully!');
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
