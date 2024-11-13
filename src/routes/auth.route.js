import express from "express";
import { registerUser, authUser } from "../controllers/auth.controller.js";
import '../config/passport.js';
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => { 
        res.redirect('/'); 
    }
);

export default router;