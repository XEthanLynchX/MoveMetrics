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

const AllMyUserRoutes = require('./routes/user.routes');
AllMyUserRoutes(app);

const AllMyRoutineRoutes = require('./routes/routine.routes');
const routineRouter = express.Router();
routineRouter.use(requireAuth);
AllMyRoutineRoutes(routineRouter);
app.use(routineRouter);

const AllMyExerciseRoutes = require('./routes/exercise.routes');
const exerciseRouter = express.Router();
exerciseRouter.use(requireAuth);
AllMyExerciseRoutes(exerciseRouter);
app.use(exerciseRouter);

app.listen(port, () => console.log(`Listening on port: ${port}`));