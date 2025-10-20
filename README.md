# Akario Mart

A full-featured e-commerce platform for technology items, clothing, and home appliances.

## Features

- Role-based dashboards (User, Admin, Seller)
- Product management with filtering and sorting
- Shopping cart and wishlist functionality
- Discount system
- User authentication and authorization
- Professional UI with light grey/white theme

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Project Structure

```
akario-mart/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── ...
├── server/          # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas Account (for cloud database) OR MongoDB installed locally

### Quick Setup

1. Install all dependencies:
   ```bash
   npm run install:all
   ```

2. Follow the [Complete Setup Guide](FINAL_SETUP_INSTRUCTIONS.md) to configure MongoDB

3. Start both servers:
   ```bash
   npm run dev
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd akario-mart
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

For MongoDB Atlas (recommended):
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.abc123.mongodb.net/akariomart?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

For local MongoDB:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/akariomart
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

### Setting up MongoDB

Follow our [Complete Setup Guide](FINAL_SETUP_INSTRUCTIONS.md) for detailed instructions on setting up either MongoDB Atlas or local MongoDB.

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (Seller/Admin)
- `PUT /api/products/:id` - Update a product (Seller/Admin)
- `DELETE /api/products/:id` - Delete a product (Seller/Admin)

### Users
- `GET /api/users` - Get all users (Admin)
- `DELETE /api/users/:id` - Delete a user (Admin)

## Folder Structure Details

### Client (Frontend)

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── auth/       # Authentication components
│   │   ├── dashboard/  # Dashboard components
│   │   ├── product/    # Product-related components
│   │   ├── cart/       # Cart components
│   │   └── wishlist/   # Wishlist components
│   ├── contexts/       # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   │   ├── auth/       # Authentication pages
│   │   ├── user/       # User dashboard pages
│   │   ├── admin/      # Admin dashboard pages
│   │   └── seller/     # Seller dashboard pages
│   ├── services/       # API service files
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
```

### Server (Backend)

```
server/
├── config/             # Configuration files
├── controllers/        # Request handlers
├── middleware/         # Custom middleware
├── models/             # Database models
├── routes/             # API routes
├── utils/              # Utility functions
├── server.js           # Entry point
└── .env                # Environment variables
```

## Role-Based Access

### User
- Browse products
- Add products to cart and wishlist
- Manage their profile
- Place orders

### Seller
- All user features
- Add/edit/delete their own products
- View sales reports
- Manage inventory

### Admin
- All user features
- Manage all products
- Manage all users
- Delete/block sellers
- View system analytics

## Development

### Frontend Development

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Development

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

### Frontend

```bash
cd client
npm run build
```

### Backend

```bash
cd server
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please open an issue on the repository.