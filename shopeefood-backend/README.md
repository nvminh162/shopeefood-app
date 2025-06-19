# Production - ShopeeFood Backend API

A backend service for the ShopeeFood application built with NestJS. This service provides the necessary APIs for user authentication, restaurant management, menu management, and order processing.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contact](#contact)

## 🚀 Overview

The ShopeeFood Backend API is designed to support the ShopeeFood client applications. It provides a comprehensive set of endpoints for managing users, restaurants, menus, and orders. The API is built using NestJS, a progressive Node.js framework, and MongoDB for data storage.

## ✨ Features

- **User Authentication**: Register, login, and email verification
- **Restaurant Management**: Create, read, update, and delete restaurants
- **Menu Management**: Manage restaurant menus and menu items
- **Order Processing**: Place and track orders
- **Cache Management**: Optimize performance using caching
- **Email Service**: Send verification emails and notifications

## 💻 Tech Stack

- **Framework**: NestJS (10.x)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport
- **Email**: Nodemailer
- **Caching**: Cache Manager
- **Validation**: Class Validator
- **API Query**: API Query Params

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- SMTP server access for email functionality

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd shopeefood-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (see [Environment Configuration](#environment-configuration))

## ⚙️ Environment Configuration

To run this application, you need to set up environment variables in a `.env` file. Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=8080

# Database Configuration
MONGODB_URI=mongodb://username:password@host:port/database
ACTIVE_KEY=your_active_key_here

# Email Configuration
MAIL_USER=your_email@example.com
MAIL_PASSWORD=your_email_password
MAIL_EXPIRE_IN=500  # Code expiration time in minutes

# Sample Data
SHOULD_INIT=true  # Initialize with sample data
INIT_PASSWORD=123456  # Default password for sample users

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_ACCESS_TOKEN_EXPIRED=1000d  # Access token expiration
```

### 🔐 Environment Variables Explanation

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | The port on which the server will run | `8080` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/shopeefood` |
| `ACTIVE_KEY` | Security key for activating accounts | `your-secure-active-key` |
| `MAIL_USER` | Email address used for sending emails | `your_email@gmail.com` |
| `MAIL_PASSWORD` | Password or app password for the email account | `your-email-password` |
| `MAIL_EXPIRE_IN` | Email verification code expiration time (minutes) | `500` |
| `SHOULD_INIT` | Whether to initialize the database with sample data | `true` or `false` |
| `INIT_PASSWORD` | Default password for sample users | `123456` |
| `JWT_SECRET` | Secret key for JWT token generation | `your-secure-jwt-secret` |
| `JWT_ACCESS_TOKEN_EXPIRED` | JWT token expiration period | `1000d` (1000 days) |

> ⚠️ **Note**: For security reasons, never commit your `.env` file to version control. To get the actual values for these environment variables, please contact the administrator at https://www.facebook.com/nvminh162

## 🚀 Running the Application

Start the application in development mode:

```bash
npm run start:dev
```

Start the application in production mode:

```bash
npm run start
# or
npm run start:prod
```

## 📚 API Documentation

The API documentation is available via Postman. Import the collection file located at:

```
data/nvminh162_shopeefood_postman_collection_nestjs.json
```

This collection contains all the endpoints available in the API, along with example requests and responses.

## 📁 Project Structure

```
shopeefood-backend/
├── dist/                # Compiled JavaScript files
├── data/                # Sample data for initialization
│   ├── menuitems.json   # Menu items data
│   ├── menus.json       # Menus data
│   └── restaurants.json # Restaurants data
├── public/              # Static files
│   ├── css/             # CSS files
│   └── images/          # Image assets
│       ├── avatar/      # User avatars
│       ├── menu/        # Menu images
│       ├── menu-item/   # Menu item images
│       └── restaurant/  # Restaurant images
└── src/                 # Source code (compiled to dist/)
    ├── auth/            # Authentication module
    ├── modules/         # Feature modules
    ├── core/            # Core functionality
    ├── mail/            # Email service
    ├── helpers/         # Helper functions
    └── main.ts          # Application entry point
```

## 📞 Contact

For any questions or support regarding this project, please contact the administrator:

- **Developer**: nvminh162
- **Contact**: [Facebook](https://www.facebook.com/nvminh162)

---

&copy; 2025 ShopeeFood Backend API. All rights reserved.

