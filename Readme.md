# 🔗 LinkSwift | URL Shortener & Analytics API

![Backend Status](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20MongoDB-green?style=for-the-badge&logo=node.js)
![Authentication](https://img.shields.io/badge/Auth-JWT%20%26%20Cookies-orange?style=for-the-badge&logo=jsonwebtokens)
![Architecture](https://img.shields.io/badge/Architecture-MVC%20Pattern-blue?style=for-the-badge&logo=architectures)

A production-oriented, high-performance URL shortener engine built to strengthen backend development skills, focusing heavily on secure authentication pipelines, automated API key systems, collision-resistant slug generation, and advanced MongoDB aggregation telemetry.

---

## 📖 Overview

This project delivers a complete backend architecture for a URL shortening service, developed using **Node.js**, **Express.js**, and **MongoDB**. It features secure JWT access/refresh token rotation, distinct developer API keys, persistent short-link routing pipelines utilizing fast string colliders, and multi-layered metric calculations following industry-standard design patterns.

---

## ✨ System Features

### 🔐 Authentication & Security

- **User Authentication:** Secured registration and credential matching login systems.
- **Token Rotation Engine:** Enhanced security using dual-cookie validation (`accessToken` and `refreshToken`).
- **Developer Provisioning:** Automatic unique, cryptographically secure API key generation using `crypto` during registration.
- **Identity Management:** Verified profile state management, structured password updates, and robust 6-digit OTP email recovery matrices.

### 🔗 Link Processing Engine

- **Short Link Lifecycle:** Dynamic ingestion of custom long URLs to produce highly optimized, unique alias slugs.
- **High-Speed Redirection:** Lightweight, rapid query paths designed to capture incoming parameters and forward clients seamlessly.
- **Collision-Resistant Slugs:** Integrated `nanoid` configurations to generate compact, URL-safe identifiers instantly.

### 📊 Metric Reporting & Analytics

- **Aggregation Pipelines:** Fast query lookups parsing system usage metrics across MongoDB data structures.
- **Telemetry Generation:** Dedicated administrative report channels evaluating total link interactions and user data snapshots.

### ⚡ Professional Engineering Standards

- **MVC Pattern Structure:** Clear operational boundaries segregating schemas, business processes, and request rules.
- **Custom Error Architectures:** Monitored global request-handling wrappers utilizing custom singletons (`ApiError` and `ApiResponse`).
- **Environment Variable Sandboxing:** Strict environmental shielding separating signing secrets and database keys from tracking code.

---

## 🛠️ Integrated Tech Stack

| Technology     | Purpose                                                                   |
| :------------- | :------------------------------------------------------------------------ |
| **Node.js**    | Asynchronous, non-blocking runtime environment                            |
| **Express.js** | Flexible server framework providing structural middleware configurations  |
| **MongoDB**    | Document database designed for high-throughput reads and writes           |
| **Mongoose**   | Strict data modeling framework (ODM) acting as the database gateway       |
| **JWT**        | Cross-origin token architecture running stateless verification claims     |
| **nanoid**     | High-performance, secure, URL-safe unique string generator for slugs      |
| **Crypto**     | Native cryptographic modules handling safe randomized API keys            |
| **Postman**    | Validation workbench for endpoint profiling and cookie lifecycle analysis |

---

## 📂 Project Structure

```text
URL-SHORTNER
│
├── public/                 # Served static files & storage assets
│
├── src/
│   ├── controllers/        # Business logic mapping data modifications (User, URL, Report)
│   ├── db/                 # Scalable database entry initializers
│   ├── middlewares/        # Custom interceptors (JWT validation, route protection)
│   ├── models/             # Mongoose schemas outlining database collection properties
│   ├── routes/             # Clean RESTful route trees separating resource paths
│   ├── utils/              # Global shared singletons (ApiError, ApiResponse, asyncHandler)
│   ├── app.js              # Base app settings configurations & parsing middleware hook-ups
│   ├── constant.js         # Global static constants & application metadata
│   └── index.js            # Entry point script initializing server listener binds
│
├── .env                    # Environment runtime variables (Excluded via .gitignore)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
