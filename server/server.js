const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv'); // to read form .env file
// const movieRoutes = require('./routes/movies');

const app = express();

dotenv.config(); //to load the variables from .env file
// Middleware
app.use(cors());
app.use(bodyParser.json());


//Scheme
const movieSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique: true,
    },
    category: {
        type:String,
        required: true,
    },
    watchedDate: Date,
  });

// Model
const Movie = mongoose.model('Movie', movieSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
// app.use('/movies', movieRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
