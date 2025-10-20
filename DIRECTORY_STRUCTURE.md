# Akario Mart - Directory Structure

## Root Directory

```
akario-mart/
├── client/              # React frontend application
├── server/              # Node.js backend application
├── README.md            # Project overview and documentation
├── DIRECTORY_STRUCTURE.md # This file
└── start-dev.js         # Development server starter script
```

## Client Directory

```
client/
├── public/              # Static assets
│   └── vite.svg         # Vite logo
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication components
│   │   │   └── ...      # Login, Register forms
│   │   ├── dashboard/   # Dashboard components
│   │   │   └── ...      # Dashboard-specific components
│   │   ├── product/     # Product-related components
│   │   │   ├── ProductCard.jsx
│   │   │   └── ...      # Other product components
│   │   ├── cart/        # Cart components
│   │   │   ├── CartItem.jsx
│   │   │   └── ...      # Other cart components
│   │   └── wishlist/    # Wishlist components
│   │       ├── WishlistItem.jsx
│   │       └── ...      # Other wishlist components
│   ├── contexts/        # React context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── hooks/           # Custom React hooks
│   │   └── useAuth.js
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Homepage
│   │   ├── Products.jsx # Products listing page
│   │   ├── ProductDetail.jsx # Product detail page
│   │   ├── auth/        # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── user/        # User dashboard pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Wishlist.jsx
│   │   ├── admin/       # Admin dashboard pages
│   │   │   └── Dashboard.jsx
│   │   └── seller/      # Seller dashboard pages
│   │       └── Dashboard.jsx
│   ├── services/        # API service files
│   │   └── api.js       # API service functions
│   ├── utils/           # Utility functions
│   │   └── format.js    # Formatting utilities
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│   └── App.css          # App-specific styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── package.json         # Client dependencies and scripts
└── README.md            # Client-specific documentation
```

## Server Directory

```
server/
├── config/              # Configuration files
│   └── db.js            # Database connection
├── controllers/         # Request handlers
│   └── ...              # Controller files (to be implemented)
├── middleware/          # Custom middleware
│   └── ...              # Middleware files (to be implemented)
├── models/              # Database models
│   └── User.js          # User model
├── routes/              # API routes
│   └── ...              # Route files (to be implemented)
├── utils/               # Utility functions
│   └── ...              # Utility files (to be implemented)
├── uploads/             # Uploaded files (images, etc.)
├── .env                 # Environment variables
├── server.js            # Entry point
├── package.json         # Server dependencies and scripts
└── README.md            # Server-specific documentation
```

## Key Files and Their Purposes

### Client Files

1. **src/main.jsx** - Entry point that renders the App component and sets up context providers
2. **src/App.jsx** - Main application component with routing
3. **src/index.css** - Global styles and Tailwind directives
4. **src/App.css** - App-specific styles
5. **src/components/** - Reusable UI components organized by feature
6. **src/pages/** - Page components organized by role and feature
7. **src/contexts/** - React context providers for global state management
8. **src/hooks/** - Custom React hooks for reusable logic
9. **src/services/api.js** - API service functions for backend communication
10. **src/utils/format.js** - Utility functions for data formatting

### Server Files

1. **server.js** - Main server entry point
2. **config/db.js** - Database connection configuration
3. **models/User.js** - User data model
4. **.env** - Environment variables
5. **package.json** - Server dependencies and scripts

## Development Workflow

1. **Frontend Development**: Work in the `client/` directory
2. **Backend Development**: Work in the `server/` directory
3. **Shared Development**: Use the `start-dev.js` script to run both servers simultaneously

## Build Process

1. **Frontend**: `cd client && npm run build` creates a `dist/` folder
2. **Backend**: `cd server && npm start` runs the production server

This structure follows best practices for full-stack JavaScript applications with clear separation of concerns and organized code placement.