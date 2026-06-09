# 🌍 TravelEase - Travel Package Booking System

A full-stack, production-ready travel package booking platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. TravelEase allows users to browse exquisite travel destinations, filter by price or location, and seamlessly book their next adventure.

---

## ✨ Features

### 🧑‍💻 User Features
- **Browse Packages**: View available travel packages with beautiful, responsive cards.
- **Search & Filter**: Debounced search by destination and sorting by price (Low-to-High, High-to-Low) or recently added.
- **Detailed Views**: Dive deep into package specifics including duration, available seats, pricing, and start dates.
- **Seamless Booking**: Real-time seat validation, dynamic price calculation, and instant confirmation screens.
- **My Bookings**: Users can view their past and upcoming reservations.

### 🛡️ Admin & Security Features
- **JWT Authentication**: Secure login and registration flows.
- **Role-Based Access Control**: Only administrators can create, update, or delete travel packages.
- **Admin UI Controls**: Dedicated "Add New Package" button and functionality displayed exclusively for admin roles.
- **Transaction Safety**: Atomic MongoDB sessions ensure that `availableSeats` are decremented synchronously with booking creation to prevent double-booking.
- **Robust Validation**: `Joi` validation on the backend and `React Hook Form` on the frontend ensure data integrity.

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios (with interceptors)
- React Hook Form
- React Toastify

**Backend**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js
- Joi Validation
- Helmet, XSS-Clean, CORS

**DevOps**
- Docker & Docker Compose
- Render (Deployment)

---

## 🚀 Installation & Local Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas URL)
- Docker (Optional)

### Using Docker (Recommended)
1. Clone the repository.
2. Run the following command in the root directory:
   ```bash
   docker-compose up --build
   ```
3. Access the frontend at `http://localhost` and the API at `http://localhost:5000`.

### Manual Setup
1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file (see Environment Variables section below).
   *Optional: Run `node src/seed.js` to populate the database with sample data.*
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the frontend folder if your API is not running on `localhost:5000`.
   ```bash
   npm run dev
   ```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/travelease
# Or use MongoDB Atlas: mongodb+srv://<user>:<password>@cluster.mongodb.net/travelease
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=90d
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Documentation

### Auth Routes (`/api/auth`)
- `POST /register` - Register a new user (admin/user)
- `POST /login` - Authenticate user and receive JWT

### Package Routes (`/api/packages`)
- `GET /` - Get all packages (Supports `?destination=`, `?sort=`, `?page=`, `?limit=`)
- `GET /:id` - Get a single package
- `POST /` - Create a new package *(Admin Only, JWT Required)*
- `PATCH /:id` - Update a package *(Admin Only, JWT Required)*
- `DELETE /:id` - Delete a package *(Admin Only, JWT Required)*

### Booking Routes (`/api/bookings`) - *JWT Required*
- `GET /` - Get all bookings
- `POST /` - Create a new booking (requires `packageId`, `customerName`, `email`, `seats`)

---

## ☁️ Deployment (Render)

This project is configured for seamless deployment on Render.

1. Create a MongoDB Atlas cluster and allow network access from `0.0.0.0/0`.
2. Connect your GitHub repository to Render.
3. **Backend**: Create a new **Web Service**.
   - Root Dir: `backend`
   - Build Cmd: `npm install`
   - Start Cmd: `npm start`
   - Add `DATABASE_URL` and `JWT_SECRET` to environment variables.
4. **Frontend**: Create a new **Static Site**.
   - Root Dir: `frontend`
   - Build Cmd: `npm install && npm run build`
   - Publish Dir: `frontend/dist`
   - Add `VITE_API_URL` (pointing to your live Render backend URL).
   - In the "Redirects/Rewrites" tab, rewrite `/*` to `/index.html` to support React Router.

---

## 📸 Screenshots

*(Replace these placeholder links with actual screenshots of your application)*

| Home Page | Package Details |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250/0f172a/0ea5e9?text=Home+Page+Screenshot" alt="Home Page" /> | <img src="https://via.placeholder.com/400x250/0f172a/0ea5e9?text=Details+Screenshot" alt="Details" /> |

| Booking Form | Admin Dashboard |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250/0f172a/0ea5e9?text=Booking+Form+Screenshot" alt="Booking Form" /> | <img src="https://via.placeholder.com/400x250/0f172a/0ea5e9?text=Admin+Dashboard+Screenshot" alt="Admin Dashboard" /> |

---
*Built with ❤️ for adventurers everywhere.*