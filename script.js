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

    
    const scrollHint = document.querySelector('.scroll-hint');
    const progressBar = document.querySelector('.progress-bar');
    
    function updateScrollProgress() {
        if (!scrollHint) return;
        
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const maxScroll = fullHeight - windowHeight;
        
        
        let scrollPercent = 0;
        if (maxScroll > 0) {
            scrollPercent = (scrollTop / maxScroll) * 100;
        }
        
        
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        
        
        let opacity = 0.4 + (scrollPercent / 100) * 0.5;
        opacity = Math.min(0.9, Math.max(0.4, opacity));
        
        scrollHint.style.opacity = opacity;
        
        
        
        if (scrollTop + windowHeight >= fullHeight - 80) {
            scrollHint.style.opacity = '0';
            scrollHint.style.pointerEvents = 'none';
        } else {
            scrollHint.style.pointerEvents = 'auto';
            
            
            if (scrollPercent > 70) {
                scrollHint.style.boxShadow = '0 0 12px rgba(86, 182, 194, 0.4)';
            } else {
                scrollHint.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            }
        }
    }
    
    
    if (scrollHint) {
        scrollHint.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;
            const currentProgress = (scrollTop / (fullHeight - windowHeight)) * 100;
            
            
            let nextSection = null;
            let nextSectionOffset = Infinity;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (sectionTop > scrollTop + 50 && sectionTop < nextSectionOffset) {
                    nextSectionOffset = sectionTop;
                    nextSection = section;
                }
            });
            
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (currentProgress < 95) {
               
                window.scrollBy({ top: windowHeight * 0.8, behavior: 'smooth' });
            } else {
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;
            
            let nextSection = null;
            let nextSectionOffset = Infinity;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (sectionTop > scrollTop + 50 && sectionTop < nextSectionOffset) {
                    nextSectionOffset = sectionTop;
                    nextSection = section;
                }
            });
            
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (scrollTop + windowHeight < fullHeight - 50) {
                window.scrollBy({ top: windowHeight * 0.7, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        
        
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            
            const scrollTop = window.scrollY;
            
            let prevSection = null;
            let prevSectionOffset = -Infinity;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (sectionTop < scrollTop - 50 && sectionTop > prevSectionOffset) {
                    prevSectionOffset = sectionTop;
                    prevSection = section;
                }
            });
            
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (scrollTop > 100) {
                window.scrollBy({ top: -window.innerHeight * 0.7, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});