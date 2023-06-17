const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');

const AllMyStoresRoutes = require('./routes/routine.route');
AllMyStoresRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));