document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm') as HTMLFormElement | null;
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            if (validateBookingForm()) {
                const formData = new FormData(bookingForm);
                sendData(formData, 'db.php', 'Booking form submitted successfully!');
            }
        });
    }

    const dropdownForm = document.getElementById('dropdownForm') as HTMLFormElement | null;
    if (dropdownForm) {
        dropdownForm.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            if (validateDropdownForm()) {
                const formData = new FormData(dropdownForm);
                sendData(formData, 'db.php', 'Dropdown form submitted successfully!');
            }
        });
    }

    const textFieldForm = document.getElementById('textFieldForm') as HTMLFormElement | null;
    if (textFieldForm) {
        textFieldForm.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            if (validateTextFieldForm()) {
                const formData = new FormData(textFieldForm);
                sendData(formData, 'db.php', 'Text field form submitted successfully!');
            }
        });
    }

    function validateBookingForm(): boolean {
        const from = getInputValue('from'); 
        const to = getInputValue('to'); 
        const date = getInputValue('date'); 
        const passengers = getInputValue('passengers');
        const email = getInputValue('email');
        const phone = getPhoneNumber();
        const terms = (document.getElementById('terms') as HTMLInputElement).checked;

        return Boolean(from && to && date && passengers && email && phone && terms);
    }

    function validateDropdownForm(): boolean {
        const food = getInputValue('food');
        const allergy = getInputValue('allergy');
        const gender = getInputValue('gender');
        const age = getInputValue('age');
        const education = getInputValue('education');
        const employment = getInputValue('employment');

        return Boolean(food && allergy && gender && age && education && employment);
    }

    function validateTextFieldForm(): boolean {
        const past = getInputValue('past');
        const needs = getInputValue('needs');
        const sweets = getInputValue('sweets');
        const sleep = getInputValue('sleep');
        const space = getInputValue('space');
        const anything = getInputValue('anything');

        return Boolean(past && needs && sweets && sleep && space && anything);
    }

    function getInputValue(id: string): string {
        const inputElement = document.getElementById(id) as HTMLInputElement;
        return inputElement ? inputElement.value.trim() : '';
    }

    function getPhoneNumber(): string {
        const countryCode = (document.getElementById('countryCode') as HTMLSelectElement).value;
        const phoneNumber = getInputValue('phone');
        return countryCode + phoneNumber;
    }

    function sendData(formData: FormData, url: string, successMessage: string): void {
        fetch(url, {
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
            const formId = formData.get('formId') as string;
            if (formId) {
                const form = document.getElementById(formId) as HTMLFormElement;
                if (form) form.reset();
            }
            alert(successMessage);
        })
        .catch(error => {
            console.error('Error:', error);
            // alert('An error occurred while submitting the form. Please try again later.');
        });
    }
});
