// Smooth Scroll + Active Menu
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });

        // Update active class
        document.querySelector('.nav__link.active').classList.remove('active');
        this.classList.add('active');
    });
});

// Theme Toggle (sama seperti sebelumnya)
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// MixItUp + Filter
const mixer = mixitup('#promo-container', {
    selectors: { target: '.promo__card' },
    animation: { duration: 300 }
});

document.querySelectorAll('.filter__item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.filter__item.active').classList.remove('active');
        item.classList.add('active');
        const filter = item.dataset.filter === 'all' ? 'all' : '.' + item.dataset.filter;
        mixer.filter(filter);
    });
});

// Tab Harga
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tab-btn.active').classList.remove('active');
        document.querySelector('.tab-panel.active').classList.remove('active');
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// ScrollReveal
ScrollReveal().reveal('.promo__card, .price-table, .contact__item', {
    delay: 200,
    distance: '30px',
    origin: 'bottom',
    interval: 100,
    easing: 'ease-out'
});