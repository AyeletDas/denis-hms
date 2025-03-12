const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allows sending cookies
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

connectDB();
app.get('/', (req, res) => {
  res.send('If I see this => it means that the server working good ! '); 
});

// db -> models -> Repo -> Service -> Controller -> main.js
app.use('/api/users', require('./controllers/usersController')); // controllers- logic for CRUD

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});