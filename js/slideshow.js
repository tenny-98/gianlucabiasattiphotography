/**
 * SLIDESHOW OBJECT - Gestione centralizzata (SOLO PER INDEX.HTML)
 */
const slideshow = {
    currentIndex: 0,
    autoTimer: null,
    slides: [],
    dots: [],

    init() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        
        if (this.slides.length === 0) {
            console.error('Nessuna slide trovata');
            return;
        }

        this.startAutoSlide();
        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    },

    handleKeyboard(e) {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
    },

    handleVisibilityChange() {
        if (document.hidden) {
            this.stopAutoSlide();
        } else {
            this.startAutoSlide();
        }
    },

    show(index) {
        index = this.validateIndex(index);
        this.currentIndex = index;

        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.setAttribute('aria-selected', i === index);
        });
    },

    next() {
        this.show(this.currentIndex + 1);
        this.resetAutoSlide();
    },

    prev() {
        this.show(this.currentIndex - 1);
        this.resetAutoSlide();
    },

    goTo(index) {
        this.show(index);
        this.resetAutoSlide();
    },

    autoAdvance() {
        this.show(this.currentIndex + 1);
    },

    validateIndex(index) {
        const total = this.slides.length;
        if (index >= total) return 0;
        if (index < 0) return total - 1;
        return index;
    },

    startAutoSlide() {
        if (this.autoTimer) return;
        this.autoTimer = setInterval(() => this.autoAdvance(), CONFIG.autoSlideInterval);
    },

    stopAutoSlide() {
        clearInterval(this.autoTimer);
        this.autoTimer = null;
    },

    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
};

/**
 * Inizializzazione slideshow
 */
document.addEventListener('DOMContentLoaded', () => {
    slideshow.init();
});
