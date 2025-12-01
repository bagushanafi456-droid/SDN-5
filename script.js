document.addEventListener('DOMContentLoaded', function() {
    console.log('Website SDN GAYAM 5 SUKOHARJO loaded successfully!');
    
    // Initialize all features
    initCarousel();
    initNewsFilter();
    initGalleryFilter();
    initForms();
    initScrollAnimations();
    initSmoothScroll();
});

// Navbar Active
    // Dapatkan nama file halaman saat ini (misal: profil.html)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Dapatkan semua link navbar
    const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');

        navbarLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Jangan hapus class di link PPDB, biar tetap kuning dan bold
        if (href === 'ppdb.html') {
            link.classList.add('fw-bold', 'text-warning');
            // Jangan sentuh active class di PPDB
            link.classList.remove('active'); 
            return;
        }

        // Hapus class active di link selain PPDB
        link.classList.remove('active');

        // Tambahkan active di link yang href-nya sama dengan halaman sekarang
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
// Carousel Auto-play
function initCarousel() {
    const carousel = document.querySelector('#heroCarousel');
    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    }
}

// Gallery Filter - Show category cards on galeri.html load
function initGalleryFilter() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'galeri.html' || currentPage.includes('galeri')) {
        const categoryContainer = document.getElementById('categoryContainer');
        if (categoryContainer && categoryContainer.parentElement) {
            categoryContainer.parentElement.parentElement.style.display = 'block';
        }
    }
}

// News Filter
function initNewsFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const newsItems = document.querySelectorAll('[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('btn-outline-primary');
                btn.classList.remove('btn-primary');
            });
            this.classList.add('active');
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-primary');
            
            // Filter news items
            newsItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Gallery Category System
let currentCategory = null;
let currentSubfolder = null;

const categoryData = {
    ekstrakurikuler: {
        title: 'Ekstrakurikuler',
        icon: 'bi-star-fill'
    },
    fasilitas: {
        title: 'Fasilitas',
        icon: 'bi-building'
    },
    kegiatan: {
        title: 'Kegiatan',
        icon: 'bi-calendar-event'
    }
};

// Load categories dari API pada saat halaman dimuat
async function loadGalleryCategories() {
    try {
        const response = await fetch('/api/galeri/categories');
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error loading categories:', error);
        return {};
    }
}

async function openCategory(category, event) {
    event.preventDefault();
    
    currentCategory = category;
    const categoryContainer = document.getElementById('categoryContainer').parentElement.parentElement;
    const subfoldersSection = document.getElementById('subfoldersSection');
    
    if (!categoryData[category]) return;
    
    const data = categoryData[category];
    
    // Load subfolders dari API
    const categories = await loadGalleryCategories();
    const subfolders = categories[category] || [];
    
    // Update category title
    document.getElementById('categoryTitle').textContent = data.title;
    
    // Generate subfolder cards
    const subfolderContainer = document.getElementById('subfolderContainer');
    subfolderContainer.innerHTML = '';
    
    // Load first image for each subfolder
    for (const subfolder of subfolders) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        
        // Use different icons for different subfolders
        let icon = 'bi-images';
        const name = subfolder.name.toLowerCase();
        if (name.includes('futsal') || name.includes('basket')) {
            icon = 'bi-dribbble';
        } else if (name.includes('suara') || name.includes('tari')) {
            icon = 'bi-music-note-beamed';
        } else if (name.includes('sekolah') || name.includes('lapangan') || name.includes('aula')) {
            icon = 'bi-building';
        } else if (name.includes('perpustakaan')) {
            icon = 'bi-book-half';
        } else if (name.includes('komputer')) {
            icon = 'bi-laptop';
        } else if (name.includes('upacara') || name.includes('kemerdekaan')) {
            icon = 'bi-flag-fill';
        } else if (name.includes('pembelajaran')) {
            icon = 'bi-book-fill';
        } else if (name.includes('pramuka')) {
            icon = 'bi-person-badge-fill';
        }
        
        // Try to load first image
        let thumbnailHtml = `<div class="subfolder-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"><i class="bi ${icon}"></i></div>`;
        
        try {
            const imagesResponse = await fetch(`/api/galeri/images?path=${encodeURIComponent(`${category}/${subfolder.name}`)}`);
            const images = await imagesResponse.json();
            if (images.length > 0) {
                thumbnailHtml = `<img src="${images[0].path}" alt="${subfolder.display_name}" class="subfolder-thumbnail" style="width: 100%; height: 100%; object-fit: cover;">`;
            }
        } catch (error) {
            console.warn(`Could not load images for ${subfolder.name}`, error);
        }
        
        col.innerHTML = `
            <div class="subfolder-card" onclick="openGallery('${category}', '${subfolder.name}')">
                ${thumbnailHtml}
                <div class="subfolder-info">
                    <div class="subfolder-name">${subfolder.display_name}</div>
                    <div class="subfolder-count"><i class="bi bi-images"></i> ${subfolder.image_count} foto</div>
                </div>
            </div>
        `;
        
        subfolderContainer.appendChild(col);
    }
    
    // Hide categories, show subfolders
    categoryContainer.style.display = 'none';
    subfoldersSection.style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function openGallery(category, subfolder) {
    currentSubfolder = subfolder;
    
    const subfoldersSection = document.getElementById('subfoldersSection');
    const galleryImagesSection = document.getElementById('galleryImagesSection');
    
    // Load images dari API
    const path = `${category}/${subfolder}`;
    try {
        const response = await fetch(`/api/galeri/images?path=${encodeURIComponent(path)}`);
        const images = await response.json();
        
        // Update gallery title
        const displayName = subfolder.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        document.getElementById('galleryTitle').textContent = displayName;
        
        // Generate gallery cards
        const galleryContainer = document.getElementById('galleryImagesContainer');
        galleryContainer.innerHTML = '';
        
        if (images.length === 0) {
            galleryContainer.innerHTML = '<div class="col-12"><p class="text-center text-muted">Belum ada gambar di folder ini.</p></div>';
        } else {
            images.forEach((image, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-6 col-lg-4';
                
                col.innerHTML = `
                    <div class="gallery-image-card" data-bs-toggle="modal" data-bs-target="#imageModal" onclick="setModalImage('${image.path}', '${displayName}', ${index})">
                        <img src="${image.path}" alt="${image.filename}" class="gallery-image">
                        <div class="gallery-image-overlay">
                            <i class="bi bi-eye-fill"></i> Lihat
                        </div>
                    </div>
                `;
                
                galleryContainer.appendChild(col);
            });
        }
        
        // Hide subfolders, show gallery
        subfoldersSection.style.display = 'none';
        galleryImagesSection.style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading images:', error);
        alert('Gagal memuat gambar. Pastikan folder sudah berisi gambar.');
    }
}

function backToSubfolders() {
    document.getElementById('subfoldersSection').style.display = 'block';
    document.getElementById('galleryImagesSection').style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToCategories() {
    document.getElementById('categoryContainer').parentElement.parentElement.style.display = 'block';
    document.getElementById('subfoldersSection').style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setModalImage(imagePath, title, index) {
    const modal = document.getElementById('imageModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = `<img src="${imagePath}" style="max-width: 100%; height: auto; border-radius: 10px;">`;
}

// Form Handling
function initForms() {
    // PPDB Form
    const ppdbForm = document.getElementById('ppdbForm');
    if (ppdbForm) {
        ppdbForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (this.checkValidity()) {
                // Get form data
                const formData = {
                    namaLengkap: document.getElementById('namaLengkap').value,
                    nikSiswa: document.getElementById('nikSiswa').value,
                    tempatLahir: document.getElementById('tempatLahir').value,
                    tanggalLahir: document.getElementById('tanggalLahir').value,
                    jenisKelamin: document.getElementById('jenisKelamin').value,
                    agama: document.getElementById('agama').value,
                    alamat: document.getElementById('alamat').value,
                    rt: document.getElementById('rt').value,
                    rw: document.getElementById('rw').value,
                    kelurahan: document.getElementById('kelurahan').value,
                    kecamatan: document.getElementById('kecamatan').value,
                    namaAyah: document.getElementById('namaAyah').value,
                    pekerjaanAyah: document.getElementById('pekerjaanAyah').value,
                    namaIbu: document.getElementById('namaIbu').value,
                    pekerjaanIbu: document.getElementById('pekerjaanIbu').value,
                    noTelepon: document.getElementById('noTelepon').value,
                    email: document.getElementById('email').value,
                    jalurPendaftaran: document.getElementById('jalurPendaftaran').value,
                    keterangan: document.getElementById('keterangan').value
                };
                
                // Store in localStorage
                const registrations = JSON.parse(localStorage.getItem('ppdbRegistrations') || '[]');
                registrations.push({
                    ...formData,
                    timestamp: new Date().toISOString(),
                    id: 'REG-' + Date.now()
                });
                localStorage.setItem('ppdbRegistrations', JSON.stringify(registrations));
                
                // Show success message
                alert('Pendaftaran berhasil dikirim! Nomor registrasi Anda: REG-' + Date.now() + '\n\nSilakan datang ke sekolah untuk verifikasi berkas sesuai jadwal yang telah ditentukan.');
                
                // Reset form
                this.reset();
            } else {
                alert('Mohon lengkapi semua field yang wajib diisi!');
            }
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.checkValidity()) {
                const formData = {
                    nama: document.getElementById('nama').value,
                    email: document.getElementById('emailKontak').value,
                    telepon: document.getElementById('telepon').value,
                    subjek: document.getElementById('subjek').value,
                    pesan: document.getElementById('pesan').value
                };
                
                // Store in localStorage
                const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                messages.push({
                    ...formData,
                    timestamp: new Date().toISOString(),
                    id: 'MSG-' + Date.now()
                });
                localStorage.setItem('contactMessages', JSON.stringify(messages));
                
                // Show success message
                alert('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
                
                // Reset form
                this.reset();
            } else {
                alert('Mohon lengkapi semua field yang wajib diisi!');
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease-in-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all cards and gallery items
    document.querySelectorAll('.card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#imageModal') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Search functionality for news
const searchInput = document.querySelector('input[placeholder="Cari berita..."]');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const newsItems = document.querySelectorAll('#newsContainer .card');
        
        newsItems.forEach(item => {
            const title = item.querySelector('.card-title').textContent.toLowerCase();
            const content = item.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                item.parentElement.style.display = 'block';
            } else {
                item.parentElement.style.display = 'none';
            }
        });
    });
}

// Back to top button (optional enhancement)
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="bi bi-arrow-up"></i>';
    button.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4';
    button.style.display = 'none';
    button.style.zIndex = '1000';
    button.style.borderRadius = '50%';
    button.style.width = '50px';
    button.style.height = '50px';
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

// Initialize back to top button
createBackToTopButton();

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10,13}$/;
    return re.test(phone.replace(/[\s-]/g, ''));
}

// Age calculation for PPDB
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Check age when date is selected in PPDB form
const tanggalLahirInput = document.getElementById('tanggalLahir');
if (tanggalLahirInput) {
    tanggalLahirInput.addEventListener('change', function() {
        const age = calculateAge(this.value);
        if (age < 6) {
            alert('Perhatian: Calon siswa harus berusia minimal 6 tahun pada tanggal 1 Juli 2024.');
        }
    });
}

console.log('All scripts initialized successfully!');