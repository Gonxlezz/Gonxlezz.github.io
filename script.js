// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registrado'))
      .catch(error => console.log('SW falló', error));
  });
}

// Efectos de parallax
document.addEventListener('mousemove', (e) => {
  const profile = document.querySelector('.profile-img');
  if (profile) {
    const x = (e.clientX / window.innerWidth) * 10;
    const y = (e.clientY / window.innerHeight) * 10;
    profile.style.transform = `scale(1) rotateX(${y}deg) rotateY(${x}deg)`;
  }
});

// Restaurar posición al salir
document.addEventListener('mouseleave', () => {
  const profile = document.querySelector('.profile-img');
  if (profile) {
    profile.style.transform = 'scale(1) rotateX(0) rotateY(0)';
  }
});

// Abrir modal de compartir
function openShare() {
  const modal = document.getElementById('shareModal');
  const linkDisplay = document.getElementById('linkDisplay');
  
  // Usar la URL actual o una URL base si es local
  let shareUrl = window.location.href;
  if (shareUrl.includes('file://') || shareUrl.includes('localhost')) {
    shareUrl = 'https://gonxlezz.github.io/'; // Cambia esto por tu URL real
  }
  
  linkDisplay.textContent = shareUrl;
  modal.style.display = 'flex';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeShare() {
  const modal = document.getElementById('shareModal');
  modal.style.display = 'none';
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Copiar link
function copyLink(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const url = document.getElementById('linkDisplay').textContent;
  
  if (!url || url.trim() === '') {
    alert('No hay link para copiar');
    return;
  }
  
  navigator.clipboard.writeText(url).then(() => {
    // Encontrar el botón de copiar
    const button = document.querySelector('.social-btn.copy');
    
    if (button) {
      // Efecto visual del botón
      button.innerHTML = '<span class="social-icon">✓</span><span>Copiado</span>';
      button.classList.add('button-pulse');
      button.style.background = 'linear-gradient(135deg, #a8d5ba 0%, #7ab894 100%)';
      button.style.color = '#0a0704';
    }
    
    // Crear notificación flotante
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = 'Link copiado';
    document.body.appendChild(notification);
    
    // Eliminar notificación después de la animación
    setTimeout(() => {
      notification.classList.add('fadeOut');
      setTimeout(() => notification.remove(), 500);
    }, 2000);
    
    // Restaurar botón
    setTimeout(() => {
      if (button) {
        button.innerHTML = '<span class="social-icon">📋</span><span>Copiar</span>';
        button.style.background = '';
        button.style.color = '';
        button.classList.remove('button-pulse');
      }
    }, 1500);
  }).catch((err) => {
    console.error('Error al copiar:', err);
    alert('Error al copiar el link');
  });
}

// Compartir en WhatsApp
function shareToWhatsApp() {
  const url = document.getElementById('linkDisplay').textContent;
  const text = 'Mira esta página: ';
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + url)}`;
  window.open(whatsappUrl, '_blank');
}

// Compartir en Facebook
function shareToFacebook() {
  const url = document.getElementById('linkDisplay').textContent;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank');
}

// Compartir en Twitter/X
function shareToTwitter() {
  const url = document.getElementById('linkDisplay').textContent;
  const text = 'Mira mi página de KXYVG18';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank');
}

// Compartir en Telegram
function shareToTelegram() {
  const url = document.getElementById('linkDisplay').textContent;
  const text = 'Mira esta página: ';
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  window.open(telegramUrl, '_blank');
}

// Compartir en Instagram (abre el perfil)
function shareToInstagram() {
  window.open('https://www.instagram.com/kxyvg18/', '_blank');
}

// Cerrar modal al hacer clic fuera
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('shareModal');
  
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeShare();
    }
  });
  
  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeShare();
    }
  });
});

// Ripple effect en botones
document.querySelectorAll('button, a').forEach(element => {
  element.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Animación de carga
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  // Agregar un pequeño delay a cada link
  const links = document.querySelectorAll('.links a');
  links.forEach((link, index) => {
    link.style.animation = `fadeInSlide 0.6s ease-out ${1 + (index * 0.1)}s both`;
  });
});

// Animar números (si existen)
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.profile-img').forEach(el => {
  observer.observe(el);
});

// Scroll smooth para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Detectar tema oscuro del sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-theme');
}

// Efecto de hover mejorado
document.querySelectorAll('.links a').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 12px 30px rgba(214, 169, 108, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
  });
});

// Log para desarrollo
console.log('KXYVG18 - Página cargada correctamente');
