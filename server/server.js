import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// For environmental variables
import dotenv from 'dotenv';

// Routes
import userRoutes from './routes/users.js';
import animeRoutes from './routes/animes.js';
import mediaRoutes from './routes/media.js';
import communityRoutes from './routes/community.js';
import commentsRoutes from './routes/comments.js';

const app = express();

// Call it to have access to env variables
dotenv.config();

// Allows for data to be passed in post requests in the body
app.use(express.json({limit:"100mb"}));   
app.use(express.urlencoded({limit: "150mb",extended: true}));

// Use cors middleware
// Protects against XSS attacks
app.use(cors());

// Greeting route
app.get('/', (req, res) => {
    res.send('Welcome to AniHub');
});

// Using routes
app.use('/user', userRoutes);
app.use('/anime', animeRoutes);
app.use('/media', mediaRoutes);
app.use('/community', communityRoutes);
app.use('/comments', commentsRoutes);


// The port

// In production
//const PORT = process.env.PORT || 5000;

// In Dev
const PORT = 5000;

// Connect to the database
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser:true, useUnifiedTopology:true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((e) => console.log(e.message));

// Makes sure there's no warnings in the console
// mongoose.set('useFindAndModify', false);
