const token = localStorage.getItem('token');
const city = localStorage.getItem('city');

let currentPage = 1;
const requestsPerPage = 20;
let allRequests = []; // Store all fetched requests for pagination

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
        const response = await fetch(`https://water-request-management-backend.onrender.com/api/v1/requests/${endpoint}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        console.log("Parsed JSON:", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch requests");
        }

        // Ensure data is valid
        if (!data.data || !Array.isArray(data.data)) {
            throw new Error("Invalid response format: 'data' field missing or incorrect.");
        }

        // Sort requests from recent to oldest
        allRequests = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        currentPage = 1; // Reset to first page on new fetch
        displayRequests();
    } catch (error) {
        console.error("Error fetching requests:", error);
        alert(error.message);
    }
}

function displayRequests() {
    const tableBody = document.getElementById('requestsBody');
    tableBody.innerHTML = ''; // Clear previous content

    if (allRequests.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8">No pending requests found</td></tr>';
        document.getElementById('paginationControls').innerHTML = ''; // Hide pagination
        return;
    }

    // Get requests for the current page
    const startIndex = (currentPage - 1) * requestsPerPage;
    const paginatedRequests = allRequests.slice(startIndex, startIndex + requestsPerPage);

    paginatedRequests.forEach((request, index) => {
        const row = document.createElement('tr');

        let actionButtons = '';
        if (request.status !== 'Completed' && request.status !== 'Cancelled') {
            actionButtons = `
                <button class="complete-btn" onclick="markRequestComplete('${request._id}')">Complete</button>
                <button class="cancel-btn" onclick="cancelRequest('${request._id}')">Cancel</button>
            `;
        }

        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
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

    renderPaginationControls();
}

function renderPaginationControls() {
    const paginationDiv = document.getElementById('paginationControls');
    paginationDiv.innerHTML = ''; // Clear previous pagination

    if (allRequests.length < requestsPerPage) {
        return; // No need for pagination if less than 20 requests
    }

    const prevButton = document.createElement('button');
    prevButton.textContent = '⬅️ Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayRequests();
        }
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next ➡️';
    nextButton.disabled = currentPage * requestsPerPage >= allRequests.length;
    nextButton.addEventListener('click', () => {
        if (currentPage * requestsPerPage < allRequests.length) {
            currentPage++;
            displayRequests();
        }
    });

    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(nextButton);
}

// Mark request as complete
async function markRequestComplete(id) {
    try {
        await fetch(`https://water-request-management-backend.onrender.com/api/v1/requests/${id}/complete`, {
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

// Cancel request
async function cancelRequest(id) {
    try {
        await fetch(`https://water-request-management-backend.onrender.com/api/v1/requests/${id}/cancel`, {
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


