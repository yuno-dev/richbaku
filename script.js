document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Üst Navbar Aç/Bağla (Hamburger) və Body Scroll qıfılı
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            body.style.overflow = 'hidden'; // Menyu açıq olanda arxa planı sürüşdürməyi bağlayır
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            body.style.overflow = 'auto';
        }
    });

    // Menyu linklərinə klikləyəndə menyunu bağla
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            body.style.overflow = 'auto';
        });
    });

    // 2. Scroll Reveal (Aşağı düşdükcə peyda olma)
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1, // Elementin 10%-i görünəndə işə düşür (mobil üçün daha yaxşıdır)
        rootMargin: "0px 0px -20px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 3. Menyu Kateqoriya Filtri (Sürətli və Smooth)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.main-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block'; // Mobildə grid/block daha yaxşı işləyir
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 4. Alt Naviqasiya Barı (Aktiv statusu dəyişmə)
    const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item:not(.center-btn-nav)');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.mobile-bottom-nav .nav-item.active')?.classList.remove('active');
            item.classList.add('active');
        });
    });
});