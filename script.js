document.addEventListener('DOMContentLoaded', function() {
    const projectHeaders = document.querySelectorAll('.project-header');
    
    projectHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            const card = this.closest('.project-card');
            const wasActive = card.classList.contains('active');
            
            document.querySelectorAll('.project-card').forEach(c => {
                c.classList.remove('active');
            });
            
            if (!wasActive) {
                card.classList.add('active');
            }
        });
    });

    const paperwall = document.querySelector('.project-card.paperwall');
    if (paperwall) {
        paperwall.classList.add('active');
    }

    const cursor = document.querySelector('.cursor-blink');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

});
