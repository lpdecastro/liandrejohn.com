// Bootstrap handles the navbar collapse and both project carousels.
// This small handler preserves the original static-demo mailto behavior.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get('fullName');
    const email = data.get('email');
    const details = data.get('projectDetails');
    const wantsResume = data.get('requestResume') ? 'Yes' : 'No';

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Liandre,\n\n${details}\n\nRequesting resume: ${wantsResume}\n\nFrom: ${name}\nEmail: ${email}`
    );

    formStatus.textContent = 'Opening your email app…';
    window.location.href = `mailto:liandrejohn88@gmail.com?subject=${subject}&body=${body}`;
  });
}
