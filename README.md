# SpiritX_ImagineX_Syntax404

# 🐝 SportsHive – Your Sports Hub

Welcome to **SportsHive**, your one-stop platform for everything sports! From booking coaches and grounds to applying for sports academies, joining clubs, and staying updated with competitions — SportsHive empowers athletes, organizers, and enthusiasts.

---

## 🤝 Contributors  
👨‍💻 Syntax_404  
Members - Rahavi Sirithar (@RahaviSiri), Shaamma Sajahan (@Shaamma), Parkkavi Sivakaran (@ParkkaviSivakaran72), Suwasthiga Nagendramoorthy (@suwasthi), Arthikha Sooriyakumar (@Arthikha)

---

## 🚀 Features

### 🧑‍💼 Admin Panel  
- 🔐 Secure Admin Login  
- ⚙️ Approve & Manage Coaches, Grounds, Academies  
- 📝 View all user applications, registrations and bookings

### 🎯 Coach Booking System  
- 📋 Coach Profiles: Details, experience, availability  
- 🗓️ Book by schedule with real-time availability   

### 🏟️ Ground Booking  
- 🗺️ View Grounds 
- 📸 Images and Amenities
- 🕒 Real-time availability & Booking system  

### 🎓 Academies Application  
- 📜 Apply to sports academies 
- 🔄 Flexible vs Fixed Start Dates 

### 🏘️ Clubs & Communities and 🏆 Competitions
- 📍 Find nearest clubs using Google Maps  
- 🤝 Join by sport or city
- 📣 Stay updated with community events     
- 📆 Event Listings with Registration  
 
---

## ⚙️ Tech Stack  

- **Frontend**: React.js, Tailwind CSS, Leaflet  
- **Backend**: Node.js, Express.js, MongoDB, Stripe, Twilio  
- **Admin Panel**: React, Chart.js, Tailwind  
- **Authentication**: JWT (JSON Web Token)  
- **File Uploads**: Cloudinary + Multer  
- **Maps & Location**: Google Maps API  

---

## 📜 Rules & Restrictions  
✅ Coaches and grounds must be verified by admin before being listed  
✅ JWT-based user access control for secure operations  
✅ Payments (if integrated) are securely handled via Stripe (or similar)  
✅ No duplicate bookings for overlapping time slots  

---

## 📦 Installation & Setup  

### 1. Clone the repository  
```bash
git clone https://github.com/your-repo/sportshive.git](https://github.com/RahaviSiri/SpiritX_Syntax404.git
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install @radix-ui/react-avatar @tailwindcss/vite animate.css aos axios framer-motion leaflet lucide-react react react-dom react-icons react-leaflet react-router-dom react-toastify tailwind-scrollbar-hide

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install axios bcrypt bcryptjs cloudinary cookie-parser cors dotenv express follow-redirects jsonwebtoken moment mongoose multer nodemailer nodemon stripe twilio validator

# Start development server
npm run dev
```

### 4. Admin Setup
```bash
cd admin

# Install dependencies
npm install @tailwindcss/vite axios chart.js lucide-react react react-chartjs-2 react-dom react-icons react-router-dom react-toastify tailwindcss

# Start development server
npm run dev
```

### 5. 🔗 Third-Party Integrations
To ensure full functionality of SportsHive, set up accounts with the following third-party services:

🗄️ MongoDB Atlas – For secure, cloud-based NoSQL database storage.
💳 Stripe – To enable secure online payments and transactions.
📧 Brevo (formerly Sendinblue) – For managing transactional and promotional emails (e.g., verifications, notifications).
🖼️ Cloudinary – To upload, store, and optimize images used throughout the platform.

Be sure to securely store the credentials (API keys, secrets, etc.) from each service in your .env file for backend integration.


### 6. Environmental File Setup (.env file)
```bash
cd backend

# mongodb.js
MONGODB_URL = "Your Mongo db Atlas URL"
port = Your desired port number

# server.js
frontendURL = "..."

# cloudinary.js
CLOUDINARY_CLOUD_NAME = "Your CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY = "Your API key"
CLOUDINARY_API_SECRET = "Your API secret"

# nodemailer.js
SMTP_USER = "Your user"
SMTP_PASS = "Your password"
SENDER_EMAIL = "The sending email"
ADMIN_EMAIL = "Admin email"

# academicsController.js
STRIPE_SECRET_KEY="Your Stripe key"

# jsonwebtoken  middleware authCoach
JWT_SECRET="Your JWT secret"

```

---

## 🔐 Authentication & Token Storage
Upon successful login, the JWT token is stored securely in localStorage and used for authorization headers in future requests.
