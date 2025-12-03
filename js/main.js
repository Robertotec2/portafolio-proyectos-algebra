// main.js - Funcionalidades para el portafolio

document.addEventListener('DOMContentLoaded', function() {
  console.log('Portafolio de Álgebra Lineal cargado');
  
  // Añadir clase de animación a las tarjetas cuando son visibles
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  // Observar todas las tarjetas
  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
  
  // Prevenir el comportamiento por defecto en enlaces vacíos
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });
  
  // Efecto de carga con retraso para mejor experiencia de usuario
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  // Función para mostrar información de la actividad al pasar el cursor
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const originalTitle = card.querySelector('h3').textContent;
    const originalDescription = card.querySelector('p').textContent;
    
    card.addEventListener('mouseenter', function() {
      console.log(`Hover sobre: ${originalTitle}`);
    });
    
    card.addEventListener('click', function(e) {
      // Si el enlace no tiene href válido, prevenir navegación
      if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
        e.preventDefault();
        console.log(`Clic en: ${originalTitle} (enlace no configurado)`);
        alert(`Actividad "${originalTitle}" - En desarrollo`);
      }
    });
  });
  
  // Añadir año actual al footer
  const currentYear = new Date().getFullYear();
  const footerNote = document.querySelector('.footer-note');
  if (footerNote) {
    footerNote.innerHTML += ` · ${currentYear}`;
  }
  
  // Detectar el sistema de color preferido del usuario
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Función para cambiar el favicon según el tema
  function updateFaviconForTheme(isDark) {
    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      // Aquí puedes cambiar la ruta del favicon según el tema
      // favicon.href = isDark ? 'ruta/favicon-dark.png' : 'ruta/favicon-light.png';
    }
  }
  
  // Escuchar cambios en la preferencia de tema
  prefersDarkScheme.addListener((e) => {
    updateFaviconForTheme(e.matches);
  });
  
  // Configurar favicon inicial
  updateFaviconForTheme(prefersDarkScheme.matches);
});

// Función auxiliar para formatear fechas
function formatDate(date) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString('es-ES', options);
}

// ==================== FUNCIONALIDAD DEL FOOTER ====================

// 1. Actualizar año automáticamente
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// 2. Funcionalidad del enlace de contacto
function setupContactLink() {
    const contactLink = document.getElementById('contactLink');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Crear un modal de contacto
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    animation: slideIn 0.3s ease;
                ">
                    <h3 style="color: #2c3e50; margin-bottom: 1rem;">Información de Contacto</h3>
                    <p style="margin-bottom: 1rem;">
                        <strong>Profesor:</strong> M. en C. Jorge J. Pedrozo Romero
                    </p>
                    <p style="margin-bottom: 1rem;">
                        <strong>Email:</strong> 
                        <a href="mailto:jpedrozo@tecnologico.edu.mx" style="color: #3498db;">
                            jpedrozo@tecnologico.edu.mx
                        </a>
                    </p>
                    <p style="margin-bottom: 1.5rem;">
                        <strong>Institución:</strong> Tecnológico de Software
                    </p>
                    <div style="display: flex; gap: 1rem;">
                        <button id="sendEmailBtn" style="
                            padding: 10px 20px;
                            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
                            color: white;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            📧 Abrir Correo
                        </button>
                        <button id="closeModalBtn" style="
                            padding: 10px 20px;
                            background: #ecf0f1;
                            color: #2c3e50;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            Cerrar
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Estilos de animación
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            // Eventos del modal
            document.getElementById('sendEmailBtn').addEventListener('click', function() {
                window.location.href = 'mailto:jpedrozo@tecnologico.edu.mx?subject=Consulta%20sobre%20Fundamentos%20de%20Álgebra&body=Estimado%20Profesor%20Pedrozo:';
            });
            
            document.getElementById('closeModalBtn').addEventListener('click', function() {
                modal.remove();
                style.remove();
            });
            
            // Cerrar al hacer clic fuera del modal
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                    style.remove();
                }
            });
        });
    }
}

// 3. Efecto hover mejorado para enlaces del footer
function enhanceFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        link.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        link.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
        });
    });
}

// 4. Información del sistema en consola (para debugging)
function logSystemInfo() {
    console.log('=== Sistema de Visualización de Recta Numérica ===');
    console.log('Fecha:', new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }));
    console.log('Navegador:', navigator.userAgent);
    console.log('Idioma:', navigator.language);
    console.log('Puntos actuales:', points.length);
}

// 5. Inicializar todas las funcionalidades del footer
function initializeFooterFunctionality() {
    updateFooterYear();
    setupContactLink();
    enhanceFooterLinks();
    logSystemInfo();
    
    // Añadir efecto de carga al footer
    const footer = document.querySelector('.footer');
    if (footer) {
        setTimeout(() => {
            footer.style.transition = 'opacity 0.5s ease';
            footer.style.opacity = '1';
        }, 500);
    }
}

// ==================== INICIALIZACIÓN COMPLETA ====================

// Modifica la inicialización existente para incluir el footer
document.addEventListener('DOMContentLoaded', function() {
    // Tu código existente aquí...
    
    // Inicialización del footer (agregar al final)
    setTimeout(() => {
        initializeFooterFunctionality();
    }, 100);
});

// También actualiza la función initCustomSelects para incluir el footer
function initCustomSelects() {
    // Tu código existente aquí...
    
    // Inicializar footer después de que todo esté listo
    setTimeout(initializeFooterFunctionality, 50);
}

// Exportar funciones si es necesario (para módulos)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { formatDate };
}