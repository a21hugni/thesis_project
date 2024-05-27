document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateBookingForm()) {
                const formData = new FormData(bookingForm);
                sendData(formData, 'db.php', 'Booking form submitted successfully!');
            }
        });
    }

    const dropdownForm = document.getElementById('dropdownForm');
    if (dropdownForm) {
        dropdownForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateDropdownForm()) {
                const formData = new FormData(dropdownForm);
                sendData(formData, 'db.php', 'Dropdown form submitted successfully!');
            }
        });
    }

    const textFieldForm = document.getElementById('textFieldForm');
    if (textFieldForm) {
        textFieldForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateTextFieldForm()) {
                const formData = new FormData(textFieldForm);
                sendData(formData, 'db.php', 'Text field form submitted successfully!');
            }
        });
    }

    function validateBookingForm() {
        const from = getInputValue('from'); 
        const to = getInputValue('to'); 
        const date = getInputValue('date'); 
        const passengers = getInputValue('passengers');
        const email = getInputValue('email');
        const phone = getPhoneNumber();
        const terms = document.getElementById('terms').checked;

        return from && to && date && passengers && email && phone && terms;
    }

    function validateDropdownForm() {
        const food = getInputValue('food');
        const allergy = getInputValue('allergy');
        const gender = getInputValue('gender');
        const age = getInputValue('age');
        const education = getInputValue('education');
        const employment = getInputValue('employment');

        return food && allergy && gender && age && education && employment;
    }

    function validateTextFieldForm() {
        const past = getInputValue('past');
        const needs = getInputValue('needs');
        const sweets = getInputValue('sweets');
        const sleep = getInputValue('sleep');
        const space = getInputValue('space');
        const anything = getInputValue('anything');

        return past && needs && sweets && sleep && space && anything;
    }

    function getInputValue(id) {
        return document.getElementById(id).value.trim(); 
    }

    function getPhoneNumber() {
        const countryCode = document.getElementById('countryCode').value;
        const phoneNumber = getInputValue('phone');
        return countryCode + phoneNumber;
    }

    function sendData(formData, url, successMessage) {
        fetch (url, {
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
            document.getElementById(formData.get('formId')).reset();
            alert(successMessage);
        })
        .catch(error => {
            console.error('Error:', error);
            //alert('An error occurred while submitting the form. Please try again later.');
        });
    }
});
