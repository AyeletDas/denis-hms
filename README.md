# Full-Stack Developer Technical Task

This project was built with MongoDB & Node.js & React. It implements user registration, authentication, and CRUD operations with JWT and bcrypt.

###   Backend   ### 

## Technologies:
- Node.js
- Express.js
- MongoDB 
-  JWT (JSON Web Tokens)
- bcrypt for password hashing

### Backend Setup:

1. Clone the repository
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Set up MySQL database:
   - Create a database named `userdb`
   - Update database configuration in `config/database.js`
5. Run migrations: `npm run migrate`
6. Start the server: `npm start`

###   Frontend   ### 
- React
- Axios for Rest API

### Frontend Setup:

1. Navigate to the client: `cd client`
2. Navigate to the client: `cd vite-project`
3. Start the React app: `npm run dev`

## API Endpoints

- GET `/api/users`
- GET `/api/users/:id`
- POST `/api/register`
- POST `/api/login`
- POST `/api/logout`
- POST `/api/users`
- PUT `/api/users/:id` 
- DELETE `/api/users/:id` 
