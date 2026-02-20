document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ÜST NAVBAR AÇ/BAĞLA (Mobil üçün Hamburger Menyusu)
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                body.style.overflow = 'hidden'; // Arxanı sürüşdürməyi bağlayır
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = 'auto'; // Sürüşdürməni açır
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
    }

    // 2. SCROLL REVEAL (Aşağı düşdükcə elementlərin peyda olması)
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1, // Elementin 10%-i görünəndə işə düşür
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

    // 3. MENYU KATEQORİYA FİLTRİ (Hamısı, Setlər, Fast Food və s.)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.main-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktiv class-ı dəyiş
            const currentActive = document.querySelector('.filter-btn.active');
            if(currentActive) currentActive.classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block'; 
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

    // 4. ALT NAVİQASİYA BARI (Mobil üçün App stili - Aktiv rəngini dəyişmə)
    const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item:not(.center-btn-nav)');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const currentActive = document.querySelector('.mobile-bottom-nav .nav-item.active');
            if(currentActive) currentActive.classList.remove('active');
            item.classList.add('active');
        });
    });

});

// 5. MƏHSUL ÜÇÜN LÜKS MODAL FUNKSİYALARI (Tərkib göstərmək üçün)
// Bu funksiyalar qlobal olmalıdır ki, HTML-dən 'onclick' ilə çağırıla bilsin
window.openProductModal = function(element) {
    // Kliklənən kartdakı məlumatları (data-...) götürürük
    const title = element.getAttribute('data-title');
    const price = element.getAttribute('data-price');
    const desc = element.getAttribute('data-desc');
    const img = element.getAttribute('data-img');

    // Modaldakı uyğun yerlərə məlumatları yazırıq
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalDesc').innerHTML = desc;
    document.getElementById('modalImg').style.backgroundImage = `url('${img}')`;

    // Modalı göstəririk və arxa fonun sürüşməsini dayandırırıq
    document.getElementById('productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeProductModal = function() {
    const modal = document.getElementById('productModal');
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Scroll-u geri qaytarırıq
    }
};

// Kənara (qara fona) basdıqda modalı bağlamaq üçün
const productModal = document.getElementById('productModal');
if (productModal) {
    productModal.addEventListener('click', function(e) {
        if(e.target === this) closeProductModal();
    });
}