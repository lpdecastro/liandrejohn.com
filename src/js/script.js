import * as bootstrap from 'bootstrap';

function setupScrollEffects() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  // Function to update the navbar styles based on scroll position
  const handleNavbarStyle = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-black', 'shadow');
    } else {
      navbar.classList.remove('bg-black', 'shadow');
    }
  };

  // Function to update active navigation links based on the visible section
  const updateActiveNavLink = () => {
    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const isActive =
        link.getAttribute('href').substring(1) === currentSection;
      link.classList.toggle('active', isActive);
    });
  };

  // Combined scroll event handler
  const onScroll = () => {
    handleNavbarStyle();
    updateActiveNavLink();
  };

  // Attach the scroll event listener
  window.addEventListener('scroll', onScroll);
}

// Initialize the scroll effects after the DOM is fully loaded
window.addEventListener('DOMContentLoaded', setupScrollEffects);
