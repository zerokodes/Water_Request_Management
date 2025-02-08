# Water Request Management System

## Overview
The **Water Request Management System** is a web-based platform designed to facilitate the distribution and management of water requests. The system allows users to input their home address, room number, quantity of water needed, and phone number. The request is then sent to an admin dashboard, where it is managed and marked as complete after the service is rendered.

## Features
- **User Registration & Authentication**: Secure login and authentication using JWT.
- **Water Request Management**:
  - Users can submit water requests.
  - Admin can view pending and completed requests.
  - Admin can mark requests as "Completed" or "Cancelled".
- **Location-Based Filtering**: Requests are filtered based on the user’s city.
- **Real-Time Updates**: Pending requests update dynamically after actions.
- **Responsive Design**: Works on desktops, tablets, and mobile devices.

## Tech Stack
### Backend
- **Node.js** - Server-side JavaScript runtime.
- **Express.js** - Web framework for Node.js.
- **MongoDB** - NoSQL database for storing user and request data.
- **Mongoose** - MongoDB ORM for schema modeling.
- **JWT Authentication** - Secure authentication system.
- **Live Server Rendering**: Express renders API responses in real time.

### Frontend
- **HTML, CSS, JavaScript** - Core frontend technologies.
- **Bootstrap** - Responsive UI framework.
- **Live Server Rendering**: Fetches real-time data from the backend API.

## Live Server Rendering
The system supports live server rendering for both backend and frontend:
- **Backend**: `Express.js` serves the API dynamically.
- **Frontend**: Uses `fetch` to get real-time updates from the backend.

## Setup & Installation
### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

### Installation Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/water-request-management.git
   cd water-request-management
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
   - Start the backend server:
     ```bash
     npm start
     ```
   - The backend will run at `http://localhost:5000`

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   - Start the frontend server:
     ```bash
     npm start
     ```
   - The frontend will run at `http://localhost:3000`

## API Endpoints
### Authentication
- **Login**: `POST /api/v1/users/login`
- **Register**: `POST /api/v1/users/register`

### Water Requests
- **Create Request**: `POST /api/v1/requests`
- **Get Requests by City**: `GET /api/v1/requests/city/:city`
- **Get Pending Requests**: `GET /api/v1/requests/city/:city/pending`
- **Mark as Completed**: `PATCH /api/v1/requests/:id/status` (status = 'completed')
- **Cancel Request**: `PATCH /api/v1/requests/:id/status` (status = 'cancelled')

## Usage
1. **User logs in and submits a water request**.
2. **Admin dashboard displays pending requests filtered by city**.
3. **Admin marks requests as completed or cancelled**.
4. **Updated request status reflects instantly on the dashboard**.

## Screenshots
(Add screenshots here showing user dashboard, admin panel, etc.)

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, contact **[zerokodes]** at **nduka.henrychisom@gmail.com**.


