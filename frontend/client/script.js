// script.js

document.getElementById('city').addEventListener('change', function() {
    let junctionField = document.getElementById('junctionField');
    let junctionInput = document.getElementById('junctionName');

    if (this.value === 'Awka') {
        junctionField.style.display = 'block';
        junctionInput.setAttribute('required', 'true'); // Make it required when Awka is selected
    } else {
        junctionField.style.display = 'none';
        junctionInput.removeAttribute('required'); // Remove required attribute when not needed
    }
});

document.getElementById('waterRequestForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const spinner = document.getElementById('spinner'); // Spinner element

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable the button

    submitButton.innerHTML = `<span class="spinner"></span> Submitting...`;

    const API_URL = "https://water-request-management-backend.onrender.com/api/v1/requests/";

    const requestData = {
        lodgeName: document.getElementById('lodgeName').value,
        roomNumber: document.getElementById('roomNumber').value,
        quantity: document.getElementById('quantity').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        city: document.getElementById('city').value
    };

    // Add junction name only if the city is Awka
    if (requestData.city === 'Awka') {
        requestData.junctionName = document.getElementById('junctionName').value;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        if (response.ok) {
            // Show success alert
            alert('✅ Request submitted successfully!');

            document.getElementById('waterRequestForm').reset();
        } else {
            alert(`⚠️ Error: ${data.error || 'An error occurred while submitting the request'}`);
        }
    } catch (error) {
        console.error('Error submitting request:', error);
        alert('❌ Failed to submit request. Please try again later.');
    }finally {
        submitButton.disabled = false; // Re-enable the button after request completes
        submitButton.innerHTML = "Submit Request";
    }
});

