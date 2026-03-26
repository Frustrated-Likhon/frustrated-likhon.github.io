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
    
    
    function getScrollPercent() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const maxScroll = fullHeight - windowHeight;
        
        if (maxScroll <= 0) return 0;
        return (scrollTop / maxScroll) * 100;
    }
    
    function updateScrollProgress() {
        if (!scrollHint) return;
        
        const scrollPercent = getScrollPercent();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        
        
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
            
            //change the opacity from here!!!!!!
            
            if (scrollPercent > 1) {
                scrollHint.style.boxShadow = '0 0 12px rgba(86, 182, 194, 0.4)';
            } else {
                scrollHint.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            }
        }
    }
    
  
    function scrollToNext() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const scrollPercent = getScrollPercent();
        
        
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
        } else if (scrollPercent < 95) {
           
            window.scrollBy({ 
                top: windowHeight * 0.8, 
                behavior: 'smooth' 
            });
        } else {
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    
    if (scrollHint) {
        scrollHint.addEventListener('click', function(e) {
            e.stopPropagation();
            scrollToNext();
        });
        
        
        scrollHint.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scrollToNext();
        });
    }
    
    
    updateScrollProgress();
    
    
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateScrollProgress();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    
    window.addEventListener('resize', function() {
        updateScrollProgress();
    });
    
    
    document.addEventListener('keydown', function(e) {
       
        if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Space' || e.keyCode === 32 || e.keyCode === 40) {
            e.preventDefault();
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            
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
            } else {
                window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
            }
        }
        
        
        if (e.key === 'ArrowUp' || e.keyCode === 38) {
            e.preventDefault();
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            
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
    
    
    if (!('scrollBehavior' in document.documentElement.style)) {
        console.log('Smooth scrolling not supported, using fallback');
    }
});