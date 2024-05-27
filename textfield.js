document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('textFieldForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateForm()) {
      const formData = new FormData(form);

      sendData(formData);
    }
  });

  function validateForm() {
    const past = getInputValue('past');
    const needs = getInputValue('needs');
    const sweets = getInputValue('sweets');
    const sleep = getInputValue('sleep');
    const space = getInputValue('space');
    const anything = getInputValue('anything');

    if (!past || !needs || !sweets || !sleep || !space || !anything) {
      displayError('Please fill in all the required fields.');
      return false;
    }
    return true;
  }

  function getInputValue(id) {
    return document.getElementById(id).value.trim();
  }

  function sendData(formData) {
    fetch('db.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('textFieldForm').reset();
      alert('Form submitted successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while submitting the form. Please try again later.');
    });
  }

  function displayError(errorMessage) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.textContent = errorMessage;

    form.appendChild(errorElement);

    setTimeout(() => {
      errorElement.remove();
    }, 3000);
  }

  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
  });

  function scrollToSection(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    const yOffset = -50; // Adjust this value if you have a fixed header
    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
});
