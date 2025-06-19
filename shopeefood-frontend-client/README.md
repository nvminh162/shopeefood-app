# ShopeeFood Client App

## Overview

ShopeeFood Client is a mobile application built with React Native and Expo that provides a food delivery experience similar to Shopee Food. The app enables users to browse restaurants, view menus, add items to cart, and place orders. This client-side application communicates with a backend service to handle data and user authentication.

## Features

- **User Authentication** - Register, login, and verification system
- **Restaurant Discovery** - Browse top-rated restaurants and new places
- **Menu Browsing** - View restaurant menus with item details and options
- **Search Functionality** - Find restaurants and dishes
- **Order Management** - Place and track food orders
- **Cart System** - Add, remove, and modify items in cart
- **User Profile** - View and edit user information

## Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: Expo Router (File-based routing)
- **State Management**: React Context API
- **API Communication**: Axios
- **Form Handling**: Formik & Yup
- **UI Components**: Custom components with React Native elements
- **Animation**: React Native Reanimated & Gesture Handler
- **Local Storage**: AsyncStorage

## Project Structure

```
src/
├── app/                  # Application screens using file-based routing
│   ├── (auth)/           # Authentication screens
│   ├── (tabs)/           # Main tab navigation screens
│   ├── (user)/           # User-related screens
│   ├── _layout.tsx       # Root layout configuration
│   └── index.tsx         # Entry point
├── assets/               # App assets (images, fonts, icons)
├── components/           # Reusable UI components
│   ├── button/           # Button components
│   ├── home/             # Home screen components
│   ├── input/            # Input field components
│   ├── loading/          # Loading indicators
│   ├── restaurant/       # Restaurant-related components
│   └── search/           # Search components
├── context/              # React Context for state management
├── scripts/              # Utility scripts
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and constants
    ├── api.ts            # API integration functions
    ├── axios.customize.ts # Axios configuration
    ├── constants.ts      # App constants
    └── validate.schema.ts # Validation schemas
```

## Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd shopeefood-frontend-client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Follow the Expo CLI instructions to run on your preferred platform (iOS, Android, or web)

## Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run reset-project` - Reset the project cache and dependencies
- `npm run android` - Start the app on Android emulator/device
- `npm run ios` - Start the app on iOS simulator/device
- `npm run web` - Start the app in web browser
- `npm run lint` - Run ESLint for code quality checks

### Design Resources

The app design is based on a Figma template:
- [Figma Design Link](https://www.figma.com/design/HP6zajub0oqkH8qiuzyTv8/React-Native--basic-?node-id=0-1&p=f)

## Backend Integration

This frontend application is designed to work with the ShopeeFood backend service. The backend provides APIs for:

- User authentication and management
- Restaurant and menu data
- Order processing and tracking
- Search functionality

Ensure the backend server is running and properly configured in the `axios.customize.ts` file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

- **Developer**: nvminh162
- **Contact**: [Facebook](https://www.facebook.com/nvminh162)

## Acknowledgments

- Design inspiration from ShopeeFood
- Built with Expo and React Native
- Icons from Expo Vector Icons (Ionicons)