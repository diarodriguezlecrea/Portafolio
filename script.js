/**
 * Diego Rodríguez Leyton - Portafolio Artístico
 * Lógica Interactiva: Filtrado, Modal Lightbox, Generador de Cotizaciones WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Element References
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.querySelector('.main-nav');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  
  // Lightbox Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxMeta = document.getElementById('lightboxMeta');
  
  // Form Elements
  const quoteForm = document.getElementById('quoteForm');

  // 2. Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (mainNav.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 4. Gallery Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Lightbox Modal Functionality
  galleryCards.forEach(card => {
    const btnZoom = card.querySelector('.btn-zoom');
    const img = card.querySelector('img');
    const title = card.querySelector('.card-title') ? card.querySelector('.card-title').innerText : '';
    const category = card.querySelector('.card-tag') ? card.querySelector('.card-tag').innerText : '';
    const meta = card.querySelector('.card-meta') ? card.querySelector('.card-meta').innerText : '';

    const openLightbox = () => {
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || title;
      lightboxTitle.innerText = title;
      lightboxCategory.innerText = category;
      lightboxMeta.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${meta}`;
      
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    if (btnZoom) {
      btnZoom.addEventListener('click', openLightbox);
    }
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn-zoom')) {
        openLightbox();
      }
    });
  });

  const closeLightboxModal = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxModal);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightboxModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightboxModal();
    }
  });

  // 6. WhatsApp Quote Form Handler
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const discipline = document.getElementById('discipline').value;
      const city = document.getElementById('city').value.trim();
      const details = document.getElementById('projectDetails').value.trim();

      // Artist's contact prompt or default WhatsApp number format
      const whatsappMessage = `Hola Diego! Mi nombre es *${name}*.%0A%0AMe gustaría cotizar un proyecto de *${discipline}* en *${city}*.%0A%0A*Detalles del proyecto:*%0A${encodeURIComponent(details)}%0A%0AQuedo atento a tus comentarios. ¡Gracias!`;

      // Open WhatsApp with prefilled message
      const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 7. Dynamic Copyright Year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.innerText = new Date().getFullYear();
  }

});
