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

document
  .getElementById('contactForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Capture form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
      alert('All fields are required.');
      return;
    }

    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      // Call the email API
      const response = await fetch(
        'https://qnssm33tsa.execute-api.ap-southeast-1.amazonaws.com/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (!response.ok) throw new Error('Failed to send email.');

      // Reset form and show success modal
      e.target.reset();
      submitButton.textContent = 'Submit';
      submitButton.disabled = false;
      showSuccessModal();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send your message. Please try again.');
      submitButton.textContent = 'Submit';
      submitButton.disabled = false;
    }
  });

// Function to display success modal
function showSuccessModal() {
  const modalHtml = `
      <div
        class="modal fade"
        id="successModal"
        tabindex="-1"
        aria-labelledby="successModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content text-dark">
            <div class="modal-header">
              <h5 class="modal-title" id="successModalLabel">Message Sent</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Thank you for contacting me! Your message has been sent successfully.
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

  // Append modal to the body
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Show the modal
  const successModal = new bootstrap.Modal(
    document.getElementById('successModal')
  );
  successModal.show();

  // Remove modal from DOM after hiding
  document
    .getElementById('successModal')
    .addEventListener('hidden.bs.modal', () => {
      document.getElementById('successModal').remove();
    });
}
