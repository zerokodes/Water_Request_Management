// script.js
document.getElementById('waterRequestForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const API_URL = "http://localhost:5000/api/v1/requests/";

    const requestData = {
        lodgeName: document.getElementById('lodgeName').value,
        roomNumber: document.getElementById('roomNumber').value,
        quantity: document.getElementById('quantity').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        city: document.getElementById('city').value
    };

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
            alert('Request submitted successfully!');
            document.getElementById('waterRequestForm').reset();
        } else {
            alert(data.error || 'An error occurred');
        }
    } catch (error) {
        console.error('Error submitting request:', error);
        alert('Failed to submit request');
    }
});

