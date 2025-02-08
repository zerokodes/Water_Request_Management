// Ensure user is logged in
const token = localStorage.getItem('token');
const city = localStorage.getItem('city');

document.addEventListener('DOMContentLoaded', function () {
    if (!token || !city) {
        window.location.href = 'login.html'; // Redirect to login if no token
    }
    if (city) {
        console.log("City found in localStorage:", city);
        fetchRequests(`city/${city}/pending`);
    } else {
        console.error("City not found in localStorage");
        alert("Error: City information missing. Please log in again.");
        window.location.href = 'login.html';
    }
});

document.getElementById('viewAllRequests').addEventListener('click', function () {
    fetchRequests(`city/${city}`);
});

document.getElementById('viewPendingRequests').addEventListener('click', function () {
    fetchRequests(`city/${city}/pending`);
});

async function fetchRequests(endpoint) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/requests/${endpoint}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        console.log("Parsed JSON:", data)

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch requests");
        }

         // Ensure data.data exists before calling .length
        if (!data.data || !Array.isArray(data.data)) {
            throw new Error("Invalid response format: 'data' field missing or incorrect.");
        }

        displayRequests(data.data);
    } catch (error) {
        console.error("Error fetching requests:", error);
        alert(error.message);
    }
}

function displayRequests(requests) {

        const tableBody = document.getElementById('requestsBody');
        tableBody.innerHTML = ''; // Clear previous content
    
        if (!requests.length || requests.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8">No pending requests found</td></tr>';
            return;
        }
    
        requests.forEach((request, index) => {
            const row = document.createElement('tr');
    
            let actionButtons = '';
            if (request.status !== 'Completed' && request.status !== 'Cancelled') {
                actionButtons = `
                    <button class="complete-btn" onclick="markRequestComplete('${request._id}')">Complete</button>
                    <button class="cancel-btn" onclick="cancelRequest('${request._id}')">Cancel</button>
                `;
            }

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${request.lodgeName || 'N/A'}</td>
                <td>${request.city || 'N/A'}</td>
                <td>${request.roomNumber || 'N/A'}</td>
                <td>${request.quantity || 'N/A'}</td>
                <td>${request.phoneNumber || 'N/A'}</td>
                <td>${request.status || 'N/A'}</td>
                <td>${actionButtons}</td>
            `;
    
            tableBody.appendChild(row);
        });
        console.log('Data displayed:', requests);
}

async function markRequestComplete(id) {
    try {
        await fetch(`http://localhost:5000/api/v1/requests/${id}/complete`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'completed' })
        });

        fetchRequests(`city/${city}/pending`);
    } catch (error) {
        console.error("Error marking request complete:", error);
    }
}

async function cancelRequest(id) {
    try {
        await fetch(`http://localhost:5000/api/v1/requests/${id}/cancel`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'cancelled' })
        });
        fetchRequests(`city/${city}/pending`);
    } catch (error) {
        console.error("Error cancelling request:", error);
    }
}
