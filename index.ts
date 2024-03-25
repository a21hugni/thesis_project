interface FormData {
  from: string;
  to: string;
  date: string;
  passengers: string;
  email: string;
  phone: string;
  terms: boolean;
}

document.addEventListener('DOMContentLoaded', function() {
  const form: HTMLFormElement = document.getElementById('bookingForm') as HTMLFormElement;

  form.addEventListener('submit', function(event: Event) {
      event.preventDefault(); 

      if (validateForm()) {
          const formData: FormData = {
              from: getInputValue('from'), 
              to: getInputValue('to'), 
              date: getInputValue('date'),
              passengers: getInputValue('passengers'),
              email: getInputValue('email'),
              phone: getPhoneNumber(),
              terms: (document.getElementById('terms') as HTMLInputElement).checked
          };

          sendData(formData);
      }
  });

  function validateForm(): boolean {
      const from: string = getInputValue('from'); 
      const to: string = getInputValue('to'); 
      const date: string = getInputValue('date'); 
      const passengers: string = getInputValue('passengers');
      const email: string = getInputValue('email');
      const phone: string = getPhoneNumber();
      const terms: boolean = (document.getElementById('terms') as HTMLInputElement).checked;

      if (!from || !to || !date || !passengers || !email || !phone || !terms) {
          displayError('Please fill in all the required fields.'); 
          return false;
      }
      return true;
  }

  function getInputValue(id: string): string {
      return (document.getElementById(id) as HTMLInputElement).value.trim(); 
  }

  function getPhoneNumber(): string {
      const countryCode: string = (document.getElementById('countryCode') as HTMLInputElement).value;
      const phoneNumber: string = getInputValue('phone');
      return countryCode + phoneNumber;
  }

  function sendData(formData: FormData): void {
      fetch(window.location.href, {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json'
          }, 
          body: JSON.stringify(formData)
      })
      .then(response => {
          console.log('Response from server:', response);
          if (!response.ok) {
              throw new Error('Failed to submit form data');
          }
          return response.json();
      })
      .then(data => {
          alert(data.message);
          console.log(formData);
          form.reset(); // Change to go back to form again for loop test
      })
      .catch(error => {
          console.error('Error: ', error); 
          alert('An error has occurred while submitting the form. Please try again later');
      });
  }

  function displayError(errorMessage: string): void {
      const errorElement: HTMLDivElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.textContent = errorMessage;

      form.appendChild(errorElement);
  }

  const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
      link.addEventListener('click', scrollToSection);
  });

  function scrollToSection(event: Event) {
      event.preventDefault();
      const targetId: string = (this as HTMLAnchorElement).getAttribute('href').substring(1);
      const targetSection: HTMLElement | null = document.getElementById(targetId);
      if (targetSection) {
          const yOffset: number = -50; // Adjust this value if you have a fixed header
          const y: number = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: y, behavior: 'smooth' });
      }
  }
});