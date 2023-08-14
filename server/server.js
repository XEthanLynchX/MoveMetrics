const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const requireAuth = require('../middleware/requireAuth');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');

require('dotenv').config();

// Apply requireAuth middleware to all routes
app.use(requireAuth);

const AllMyRoutineRoutes = require('./routes/routine.routes');
AllMyRoutineRoutes(app);

const AllMyExerciseRoutes = require('./routes/exercise.routes');
AllMyExerciseRoutes(app);

const AllMyUserRoutes = require('./routes/user.routes');
AllMyUserRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));