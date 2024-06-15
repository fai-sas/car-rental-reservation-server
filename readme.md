# TypeScript Express Project

This is a simple Express server written in TypeScript.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm (Node Package Manager).
- You have a MongoDB instance running (local or cloud-based).

## Getting Started

Follow these instructions to set up and run the project locally.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/fai-sas/car-rental-reservation-server
   cd car-rental-reservation-server
   ```

2. **Install dependencies:**

   ```typescript
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and add your configuration:

   ```env
   NODE_ENV="development"
   PORT=5000
   DATABASE_URL="your-mongodb-connection-string"
   JWT_ACCESS_SECRET="your jwt access secret"
   JWT_ACCESS_EXPIRES_IN="your jwt expiry in"
   ```

### Running the Project

There are two ways to run the project: in development mode and in production mode.

#### Development Mode

In development mode, the server will restart automatically whenever you make changes to the source files.

1. **Start the server in development mode:**

   ```sh
   npm run start:dev
   ```

   This uses `ts-node-dev` for live reloading.

#### Production Mode

In production mode, the server will run the compiled JavaScript files.

1. **Build the project:**

   ```sh
   npm run build
   ```

   This compiles the TypeScript files into the `dist` directory.

2. **Start the server in production mode:**

   ```sh
   npm run start:prod
   ```

### Additional Scripts

- **Build the project:**

  ```sh
  npm run build
  ```

  This compiles the TypeScript files into the `dist` directory.

- **Run the server in production mode:**

  ```sh
  npm start
  ```

  This is an alias for `npm run start:prod`.

### Testing

Currently, there are no tests defined for this project. You can add your tests and run them using:

```sh
npm test
```

### Project Structure

```typescript
typescript-express/
│
├── dist/                   # Compiled JavaScript files (generated)
├── node_modules/           # Node.js modules
├── src/                    # Source files
│   ├── app/                # Application setup
│   │   ├── config/         # Configuration files
│   │   ├── modules/        # Feature modules
│   │   │   ├── car/    # Car module
│   │   │   │   ├── car.controller.ts   # Car controller
│   │   │   │   ├── car.interface.ts    # Car interface
│   │   │   │   ├── car.model.ts        # Car model
│   │   │   │   ├── car.route.ts        # Car routes
│   │   │   │   ├── car.service.ts      # Car service
│   │   │   │   ├── car.validation.ts   # Car validation
│   │   │   │   ├── car.utils.ts        # Car utils
│   │   │   ├── booking/    # Booking module
│   │   │   │   ├── booking.controller.ts   # Booking controller
│   │   │   │   ├── booking.interface.ts    # Booking interface
│   │   │   │   ├── booking.model.ts        # Booking model
│   │   │   │   ├── booking.route.ts        # Booking routes
│   │   │   │   ├── booking.service.ts      # Booking service
│   │   │   │   ├── booking.validation.ts   # Booking validation
│   │   │   ├── user/    # User module
│   │   │   │   ├── user.controller.ts   # User controller
│   │   │   │   ├── user.interface.ts    # User interface
│   │   │   │   ├── user.model.ts        # User model
│   │   │   │   ├── user.route.ts        # User routes
│   │   │   │   ├── user.service.ts      # User service
│   │   │   │   ├── user.validation.ts   # User utils
│   │   │   │   ├── user.utils.ts   # User validation
│   │   ├── app.ts           # Express app setup
│   │   ├── app.ts           # Express app setup
│   │   ├── server.ts        # Server setup
│
├── .env
├── .gitignore
├── .package.json
├── .tsconfig.json
├── .vercel.json


```

### Deployment

```typescript
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}

```
