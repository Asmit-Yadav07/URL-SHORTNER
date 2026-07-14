# 🔗 LinkSwift | URL Shortener & Analytics API

<div align="center">

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens"/>
<img src="https://img.shields.io/badge/NanoID-000000?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman"/>

### 🚀 A production-ready, high-performance URL Shortening & Analytics Backend built using Express.js, MongoDB Atlas, and Mongoose.

</div>

---

# 📖 Overview

LinkSwift is a complete backend for a **URL Shortener & Analytics Platform** inspired by modern enterprise link management systems.

It provides REST APIs for secure user authentication, automatic developer API key provisioning, collision-resistant short URL generation, dynamic redirection, and multi-layered analytics powered by MongoDB aggregation pipelines.

The project focuses on building clean, modular, and scalable backend architecture while following professional software engineering practices and design principles.

---

# ✨ Features

## 👤 Authentication

- User Registration
- Login
- Logout
- JWT Authentication
- Access Token & Refresh Token Rotation
- Automated API Key Generation using Crypto
- Secure Password Hashing with Bcrypt
- HTTP Only Cookie Authentication
- Protected Routes & Middleware Authorization

---

## 🔗 URL Management

- Generate Short URLs
- Dynamic Long URL Ingestion
- Collision-Resistant Alias Slugs using NanoID
- Access-Controlled Link Ownership
- Fast Redirection Routing
- Secure URL Operations

---

## 📊 Analytics & Reporting

- Traffic Telemetry Collection
- Total Click Tracking
- Aggregated Analytics Reports
- MongoDB Aggregation Pipelines
- Usage Insights and Metrics
- User Activity Snapshots

---

## 👤 User Profile Management

- Fetch Aggregated User Profile
- Update Profile Information
- Change Password
- Forgot Password Workflow
- 6-Digit OTP Verification
- Password Reset with OTP Expiry Validation

---

# 🛠 Tech Stack

| Technology    | Purpose                        |
| ------------- | ------------------------------ |
| Node.js       | JavaScript Runtime Environment |
| Express.js    | Backend Framework              |
| MongoDB Atlas | Cloud Database                 |
| Mongoose      | MongoDB ODM                    |
| JWT           | Authentication & Authorization |
| Bcrypt        | Password Hashing               |
| NanoID        | URL-Safe Slug Generation       |
| Crypto        | Secure API Key Generation      |
| Cookie Parser | Cookie Management              |
| dotenv        | Environment Variables          |
| Nodemon       | Development Server Reloading   |
| Postman       | API Testing                    |

---

# 📂 Project Structure

```text
URL-SHORTNER/
├── public/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── constants.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/URL-SHORTNER.git
```

## Move into the project directory

```bash
cd URL-SHORTNER
```

## Install dependencies

```bash
npm install
```

## Create a `.env` file

```env
PORT=8000

MONGODB_URI=your_mongodb_atlas_connection

CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=10d
```

## Run the project

```bash
npm run dev
```

---

# 🚀 API Modules

- Authentication Services
- User Profile Services
- URL Operations (Shorten / Redirect)
- Analytics & Reporting
- Health Check Endpoints

---

# 🔐 Authentication

The project uses:

- JWT Access Tokens
- Refresh Tokens
- HTTP Only Cookies
- Protected Routes
- Middleware-based Authorization
- Secure Developer API Keys generated automatically using Crypto

---

# ☁️ Database

MongoDB Atlas is used as the primary database.

Collections include:

- Users
- Urls
- Reports (Interaction Logs)

---

# 📌 Design Principles

✔ MVC Architecture
✔ Modular Routing
✔ Reusable Middleware
✔ Global Error Handling
✔ Async Wrapper Functions
✔ Custom API Response Classes
✔ Clean Folder Structure
✔ Scalable Codebase
✔ Separation of Concerns

---

# 🚧 Current Development Status

The core backend infrastructure of LinkSwift is currently complete and includes:

- Secure JWT Authentication
- Refresh Token Rotation
- Developer API Key Generation
- URL Creation and Redirection
- Ownership-Based Access Control
- Analytics Tracking
- MongoDB Aggregation Reports
- User Profile Management
- Password Recovery using OTP Verification
- Modular MVC Architecture
- Custom Error Handling
- Reusable Middleware Components

The project is now entering its optimization and scaling phase, where future iterations will focus on caching strategies, asynchronous processing, advanced analytics, and high-traffic performance improvements.

---

# 📈 Future Improvements

- Redis Caching for Faster Redirect Responses
- BullMQ Event Queues for Asynchronous Click Processing
- Background Analytics Workers
- Distributed Telemetry Processing
- Geolocation/IP Click Analytics
- Browser and Device Analytics
- QR Code Generation for Short Links
- Custom Alias Support
- Expiring and Timed Links
- Rate Limiting per API Key
- Admin Dashboard UI
- Public Analytics Dashboard

---

# 🧪 API Testing

All APIs were tested using:

- Postman

---

# 💡 Learning Outcomes

During the development of this project, I learned:

- Express.js Application Architecture
- Higher Order Functions and Async Wrappers
- MongoDB Aggregation Framework
- JWT Authentication
- Refresh Token Rotation
- API Key Management
- Collision Management using NanoID
- REST API Design Principles
- Middleware Execution Flow
- MVC Architecture
- Global Error Handling
- Production-Ready Backend Organization
- Scalable Project Structure

---

# 🎯 Project Summary

LinkSwift is more than a simple URL shortener.

It is a backend engineering project focused on scalability, security, maintainability, and analytics.

The project demonstrates practical implementation of:

- Secure Authentication Systems
- API Key Management
- URL Shortening Strategies
- Aggregation Based Reporting
- Modular Backend Design
- Production-Oriented Development Practices

The long-term goal is to evolve LinkSwift into a complete enterprise-grade link management platform capable of handling high traffic workloads and real-time analytics processing.

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes

```bash
git commit -m "Added New Feature"
```

4. Push your branch

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

# ⭐ Show Your Support

If you found this project useful:

- ⭐ Star the repository
- 🍴 Fork the project
- 📢 Share it with others

Your support motivates future improvements and new features.

---

# 👨‍💻 Author

## Asmit Yadav

**MERN Stack Developer | Full Stack Developer**

Built with ❤️ using **Node.js**, **Express.js**, and **MongoDB Atlas**.
