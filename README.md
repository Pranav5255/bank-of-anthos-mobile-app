# Bank of Anthos Mobile App

A React Native mobile application for Bank of Anthos that allows users to manage their accounts, make transactions, and chat with a banking assistant.

## Features

- User authentication with JWT token handling
- Account balance display
- Send money to other accounts
- Make deposits to your account
- Chat with a banking assistant

## Project Structure

```
bank-of-anthos-mobile-app/
├── src/
│   ├── api/            # API client for backend services
│   ├── models/         # Data models
│   ├── screens/        # React Native screens
│   └── utils/          # Utility functions and services
├── App.tsx            # Main application component
├── index.js           # Entry point
└── package.json       # Dependencies and scripts
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```
3. Start the Metro bundler:
   ```
   npm start
   # or
   yarn start
   ```
4. Run on Android:
   ```
   npm run android
   # or
   yarn android
   ```
5. Run on iOS (macOS only):
   ```
   npm run ios
   # or
   yarn ios
   ```

## API Integration

The app integrates with the Bank of Anthos backend services through a REST API. The API client is located in `src/api/ChatAgentApiClient.ts` and handles all communication with the backend.

Before running the app, make sure to update the `API_BASE_URL` in the API client to point to your Bank of Anthos backend service.

## Authentication

The app uses JWT tokens for authentication. When a user logs in, the token is stored securely using AsyncStorage and included in all subsequent API requests.

## Development Guidelines

- Follow the React Native best practices
- Use TypeScript for type safety
- Use functional components with hooks
- Follow the project structure for new features

## Security Considerations

- The app uses secure storage for sensitive information
- API requests are made over HTTPS
- Authentication tokens are included in request headers
- Input validation is performed before sending data to the backend

## License

This project is licensed under the MIT License - see the LICENSE file for details.