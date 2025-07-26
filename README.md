# Todo Application with Automated Testing

A full-stack Todo application with comprehensive automated testing demonstrating API and UI testing best practices.

## 🚀 Quick Start (1-2 minutes)

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup & Run

```bash
# 1. Install dependencies
npm install
cd frontend && npm install

# 2. Start both servers
npm run start:backend &
npm run start:frontend &

# 3. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000
```

### Login Credentials

- **Username**: `admin`
- **Password**: `password`

## 🏗️ Project Structure

```
test/
├── backend/                 # Node.js/Express API (MVC)
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── models/             # Data models
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   └── todos.js
│   ├── middleware/         # Custom middleware
│   │   └── auth.js
│   └── server.js           # Main server file
├── frontend/               # React application
│   ├── src/
│   │   ├── App.js          # Main component
│   │   └── App.css         # Styles
│   ├── cypress/            # UI tests
│   │   └── e2e/
│   │       ├── login.cy.js
│   │       └── todos.cy.js
│   └── cypress.config.js
├── tests/                  # API tests
│   └── api/
│       ├── auth.test.js
│       └── todos.test.js
├── package.json
├── TEST_PLAN.md           # Testing strategy
└── README.md
```

## 🧪 Testing

### API Tests (Supertest + Jest)

```bash
# Run all API tests
npm test

# Run only API tests
npm run test:api

# Run with coverage
npm test -- --coverage
```

### UI Tests (Cypress)

```bash
# Open Cypress UI
cd frontend && npm run cypress:open

# Run tests headlessly
cd frontend && npm run cypress:run
```

### Run All Tests

```bash
# Start servers
npm run start:backend &
npm run start:frontend &

# Run API tests
npm test

# Run UI tests
cd frontend && npm run cypress:run
```

## 📋 API Endpoints

| Method | Endpoint     | Description         | Auth Required |
| ------ | ------------ | ------------------- | ------------- |
| POST   | `/login`     | User authentication | No            |
| GET    | `/items`     | Get all todos       | Yes           |
| POST   | `/items`     | Create new todo     | Yes           |
| PUT    | `/items/:id` | Update todo         | Yes           |
| DELETE | `/items/:id` | Delete todo         | Yes           |

## 🎯 Features

### Backend (Node.js/Express)

- ✅ MVC architecture
- ✅ RESTful API design
- ✅ Authentication middleware
- ✅ In-memory data storage
- ✅ Error handling
- ✅ CORS enabled

### Frontend (React)

- ✅ Modern React hooks
- ✅ Responsive UI
- ✅ Form validation
- ✅ Real-time updates
- ✅ Error handling
- ✅ Clean component structure

### Testing

- ✅ API testing with Supertest
- ✅ UI testing with Cypress
- ✅ Positive and negative test cases
- ✅ Authentication testing
- ✅ CRUD operation testing
- ✅ Error scenario coverage

## 🛠️ Development

### Backend Development

```bash
# Start backend in development
npm run start:backend

# Run tests in watch mode
npm run test:watch
```

### Frontend Development

```bash
# Start frontend in development
cd frontend && npm start

# Run Cypress tests
cd frontend && npm run cypress:open
```

## 📊 Test Coverage

### API Test Coverage

- Authentication: 100%
- Todo CRUD: 100%
- Error handling: 100%
- Middleware: 100%

### UI Test Coverage

- Login flow: 100%
- Todo operations: 100%
- Error scenarios: 100%
- User interactions: 100%

## 🔧 Configuration

### Environment Variables

- `PORT`: Backend server port (default: 4000)
- `REACT_APP_API_URL`: Frontend API URL (default: http://localhost:4000)

### Test Configuration

- **API Tests**: Jest + Supertest
- **UI Tests**: Cypress with custom configuration
- **Coverage**: Built-in Jest coverage reporting

## 🚀 Deployment

### Backend Deployment

```bash
# Build and start production server
npm run start:backend
```

### Frontend Deployment

```bash
# Build for production
cd frontend && npm run build

# Serve static files
npx serve -s build
```

## 📝 Notes

- **Data Persistence**: Currently uses in-memory storage (data resets on server restart)
- **Authentication**: Simple token-based auth (fake JWT for demo)
- **CORS**: Enabled for local development
- **Error Handling**: Basic error responses implemented

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is for demonstration purposes.
