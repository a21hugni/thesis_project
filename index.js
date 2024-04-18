document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookingForm');

  form.addEventListener('submit', function(event) {
      event.preventDefault(); 

      if (validateForm()) {
          const formData = new FormData();

          formData.append('from', getInputValue('from'));
          formData.append('to', getInputValue('to'));
          formData.append('date', getInputValue('date'));
          formData.append('passengers', getInputValue('passengers'));
          formData.append('email', getInputValue('email'));
          
          const countryCode = document.getElementById('countryCode').value;
          const phoneNumber = getInputValue('phone');
          formData.append('phone', countryCode + phoneNumber);

          formData.append('terms', document.getElementById('terms').checked);

          sendData(formData);
      }
  });

  function validateForm() {
      const from = getInputValue('from'); 
      const to = getInputValue('to'); 
      const date = getInputValue('date'); 
      const passengers = getInputValue('passengers');
      const email = getInputValue('email');
      const phone = getPhoneNumber();
      const terms = document.getElementById('terms').checked;

      if (!from || !to || !date || !passengers || !email || !phone || !terms) {
          displayError('Please fill in all the required fields.'); 
          return false;
      }
      return true;
  }

  function getInputValue(id) {
      return document.getElementById(id).value.trim(); 
  }

  function getPhoneNumber() {
      const countryCode = document.getElementById('countryCode').value;
      const phoneNumber = getInputValue('phone');
      return countryCode + phoneNumber;
  }

  function sendData(formData) {
      fetch (window.location.href, {
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
            alert(data);
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