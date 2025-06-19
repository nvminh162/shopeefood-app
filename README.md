# ShopeeFood Full-Stack Application

<div align="center">
  <img src="./README/welcome.png" alt="ShopeeFood welcome" width="200"/>
  <img src="./README/home.png" alt="ShopeeFood Home" width="200"/>
  <img src="./README/product.png" alt="ShopeeFood Product" width="200"/>
  <img src="./README/information.png" alt="ShopeeFood Info" width="200"/>
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies](#technologies)
- [Screenshots](#screenshots)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Client Frontend Setup](#client-frontend-setup)
  - [Admin Dashboard Setup](#admin-dashboard-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Development Workflow](#development-workflow)
- [Author](#author)
- [License](#license)

## 🚀 Overview

ShopeeFood is a comprehensive food delivery platform inspired by the popular Shopee Food service. This full-stack application consists of three main components:

1. **Mobile Client** - A React Native mobile application for customers to browse restaurants, view menus, and place orders
2. **Admin Dashboard** - A web-based administrative interface for managing restaurants, menus, and orders
3. **Backend API** - A NestJS-based RESTful API service that powers both the client and admin applications

The application enables users to browse restaurants, view menus, add items to cart, place orders, and track delivery status. Restaurant owners and administrators can manage their menus, view orders, and handle customer requests through the admin dashboard.

## 📁 Project Structure

The project is organized into three main directories:

```
shopeefood-app/
├── shopeefood-backend/          # NestJS backend API
├── shopeefood-frontend-client/  # React Native mobile client app
├── shopeefood-frontend-admin/   # React admin dashboard
└── README/                      # Project screenshots and documentation assets
```

## ✨ Features

### Client App Features
- User authentication (register, login, email verification)
- Restaurant discovery and browsing
- Search functionality for restaurants and dishes
- Menu browsing with item details
- Shopping cart management
- Order placement and tracking
- User profile management

### Admin Dashboard Features
- Admin authentication and authorization
- Restaurant management (add, edit, delete)
- Menu and menu item management
- Order management and status updates
- User management
- Analytics and reporting

### Backend API Features
- RESTful API architecture
- User authentication and authorization
- Data persistence with MongoDB
- Email services for verification and notifications
- File upload for images
- Caching for improved performance

## 💻 Technologies

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport
- **File Storage**: Local file system
- **Email Service**: Nodemailer
- **API Documentation**: Postman Collection

### Mobile Client
- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based)
- **State Management**: React Context API
- **API Integration**: Axios
- **Form Handling**: Formik & Yup
- **UI Components**: Custom components with React Native elements

### Admin Dashboard
- **Framework**: React.js
- **UI Library**: Ant Design
- **State Management**: React Context API / Redux
- **API Integration**: Axios
- **Routing**: React Router
- **Server**: Express.js (for production serving)

## 📱 Screenshots

<div align="center">
  <p><strong>Welcome & Home Screens</strong></p>
  <img src="./README/welcome.png" alt="ShopeeFood Welcome" width="250"/>
  <img src="./README/home.png" alt="ShopeeFood Home" width="250"/>
  
  <p><strong>Product & Search Screens</strong></p>
  <img src="./README/product.png" alt="ShopeeFood Product" width="250"/>
  <img src="./README/search.png" alt="ShopeeFood Search" width="250"/>
  
  <p><strong>Order & Information Screens</strong></p>
  <img src="./README/place-order.png" alt="ShopeeFood Order" width="250"/>
  <img src="./README/information.png" alt="ShopeeFood Information" width="250"/>
</div>

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Expo CLI (for mobile client)
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd shopeefood-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (see [Environment Configuration](#environment-configuration))

4. Start the backend server:
   ```bash
   npm start
   ```

### Client Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd shopeefood-frontend-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   ```

### Admin Dashboard Setup

1. Navigate to the admin directory:
   ```bash
   cd shopeefood-frontend-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## ⚙️ Environment Configuration

### Backend `.env` Configuration

```
# Server Configuration
PORT=8080

# Database Configuration
MONGODB_URI=mongodb://username:password@host:port/database
ACTIVE_KEY=your_active_key_here

# Email Configuration
MAIL_USER=your_email@example.com
MAIL_PASSWORD=your_email_password
MAIL_EXPIRE_IN=500

# Sample Data
SHOULD_INIT=true
INIT_PASSWORD=123456

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_ACCESS_TOKEN_EXPIRED=1000d
```

### Admin Frontend `.env` Configuration

```
PORT=3000
```

> ⚠️ **Note**: For security reasons, never commit your `.env` files to version control. To get the actual values for these environment variables, please contact the administrator at https://www.facebook.com/nvminh162

## 🚀 Running the Application

### Development Mode

Run each component in development mode:

**Backend:**
```bash
cd shopeefood-backend
npm run start:dev
```

**Client Frontend:**
```bash
cd shopeefood-frontend-client
npm start
```

**Admin Dashboard:**
```bash
cd shopeefood-frontend-admin
npm run dev
```

### Production Mode

For production deployment, you can use:

**Backend:**
```bash
cd shopeefood-backend
npm run start:prod
```

**Client Frontend:**
Build the Expo app for the appropriate platform (iOS/Android)

**Admin Dashboard:**
```bash
cd shopeefood-frontend-admin
npm start
```

## 📚 API Documentation

The API documentation is available via a Postman Collection. Import the collection file located at:

```
shopeefood-backend/data/nvminh162_shopeefood_postman_collection_nestjs.json
```

This collection contains all the endpoints available in the API, along with example requests and responses.

## 👨‍💻 Development Workflow

1. Start the backend server first
2. Launch the client and admin frontends
3. Use the Postman collection to test API endpoints
4. Make changes to the respective components as needed
5. For mobile client development, use the Expo Go app on a physical device or emulator

## 👤 Author

- **Developer**: nvminh162
- **Contact**: [Facebook](https://www.facebook.com/nvminh162)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

&copy; 2025 ShopeeFood Application. All rights reserved.