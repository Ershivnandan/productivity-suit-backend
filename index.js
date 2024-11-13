import express from 'express';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/auth.route.js';
import taskRoutes from './src/routes/task.route.js';
import session from 'express-session';
import passport from 'passport';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
