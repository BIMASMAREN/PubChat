import express from "express";
import session from "express-session";
import cors from "cors";

const app = express();

// Middleware order: CORS first
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // Allows cookies to be sent
}));

// Body parser middleware
app.use(express.json()); // Needed for parsing JSON body
app.use(express.urlencoded({ extended: true })); // Needed for form data

// Express session setup
app.use(session({
    secret: "key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // Set to `true` in production with HTTPS
        httpOnly: true, // Prevents client-side JS from accessing cookies
        maxAge: 1000 * 60 * 60 * 24 // Session lasts for 1 day
    }
}));

// Login Route
app.post("/login", (req, res) => {
    const { username, email } = req.body; // Use req.body instead of req.query

    if (username && email) {
        req.session.user = { username, email }; // Store user in session
        console.log("Session Created:", req.session.user);
        return res.status(200).json({ message: "Logged in successfully", user: req.session.user });
    }

    return res.status(400).json({ message: "Missing credentials" });
});

// Check Authentication Route
app.get('/check_auth', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ isAuthenticated: true, user: req.session.user });
    }
    return res.status(201).json({ isAuthenticated: false });
});

// Start Server
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
