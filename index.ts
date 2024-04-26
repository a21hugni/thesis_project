interface MyFormData {
    from: string;
    to: string;
    date: string;
    passengers: string;
    email: string;
    phone: string;
    terms: string; // Change type to string
}

document.addEventListener('DOMContentLoaded', function() {
    const form: HTMLFormElement | null = document.getElementById('bookingForm') as HTMLFormElement | null;

    if (form) {
        form.addEventListener('submit', function(event: Event) {
            event.preventDefault();

            if (validateForm()) {
                const formData: MyFormData = {
                    from: getInputValue('from'),
                    to: getInputValue('to'),
                    date: getInputValue('date'),
                    passengers: getInputValue('passengers'),
                    email: getInputValue('email'),
                    phone: getPhoneNumber(),
                    terms: (document.getElementById('terms') as HTMLInputElement).checked.toString() // Convert boolean to string
                };

                sendData(formData);
            }
        });
    }

    function validateForm(): boolean {
        const from: string = getInputValue('from');
        const to: string = getInputValue('to');
        const date: string = getInputValue('date');
        const passengers: string = getInputValue('passengers');
        const email: string = getInputValue('email');
        const phone: string = getPhoneNumber();
        const terms: boolean = (document.getElementById('terms') as HTMLInputElement).checked === true;
    
        if (!from || !to || !date || !passengers || !email || !phone || !terms) {
            displayError('Please fill in all the required fields.');
            return false;
        }
        return true;
    }

    function getInputValue(id: string): string {
        const element: HTMLInputElement | null = document.getElementById(id) as HTMLInputElement | null;
        return element ? element.value.trim() : '';
    }

    function getPhoneNumber(): string {
        const countryCodeElement: HTMLInputElement | null = document.getElementById('countryCode') as HTMLInputElement | null;
        const phoneNumberElement: HTMLInputElement | null = document.getElementById('phone') as HTMLInputElement | null;
    
        const countryCode: string = countryCodeElement ? countryCodeElement.value : '';
        const phoneNumber: string = phoneNumberElement ? phoneNumberElement.value.trim() : '';
    
        return countryCode + phoneNumber;
    }

    function sendData(formData: MyFormData): void {
        fetch(window.location.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }

            return response.text();
        })
        .then(data => {
           const reset = document.getElementById("bookingForm") as HTMLFormElement;
           reset.reset();
        })
        .catch(error => {
            console.error('Error: ', error);
            alert('An error has occurred while submitting the form. Please try again later');
        });
    }

    function displayError(errorMessage: string): void {
        const form: HTMLFormElement | null = document.getElementById('bookingForm') as HTMLFormElement | null;
        if (form) {
            const errorElement: HTMLDivElement = document.createElement('div');
            errorElement.classList.add('error');
            errorElement.textContent = errorMessage;

            form.appendChild(errorElement);
        }
    }

    const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    function scrollToSection(event: Event) {
        event.preventDefault();
        const hrefAttribute: string | null = (this as HTMLAnchorElement).getAttribute('href');
        if (hrefAttribute) {
            const targetId: string = hrefAttribute.substring(1);
            const targetSection: HTMLElement | null = document.getElementById(targetId);
            if (targetSection) {
                const yOffset: number = -50; // Adjust this value if you have a fixed header
                const y: number = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    }
});