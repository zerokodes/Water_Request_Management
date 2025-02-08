document.getElementById('adminLoginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:5000/api/v1/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        // Debugging: Log the response
        console.log("Response Data:", data);

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        if (!data.data) { // Since token is inside data field
            throw new Error("Token missing in response");
        }

        // Store token
        localStorage.setItem('token', data.data);

        // Decode JWT to extract city
        const tokenPayload = JSON.parse(atob(data.data.split('.')[1])); // Decode base64 payload
        
        if (!tokenPayload.city) {
            throw new Error("City missing in token");
        }

        // Store city
        localStorage.setItem('city', tokenPayload.city);

        console.log("Stored Token:", localStorage.getItem('token'));
        console.log("Stored City:", localStorage.getItem('city'));

        // Redirect to dashboard
        window.location.href = 'dashboard.html';

    } catch (error) {
        console.error("Login Error:", error.message);
        alert(error.message);
    }
});

