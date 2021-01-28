const express = require('express');
var cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// CORS Check
app.use(cors());

// Import Routes
const authRoute = require('./routes/auth');


dotenv.config();

//Connect to DB
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB connected');
});




//  Middlewares
app.use(express.json());

// Route Middlewares
app.use('/api/', authRoute);



app.listen(3000, () => console.log('Server started on port 3000'));