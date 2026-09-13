const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Database files
const ticketsFile = path.join(__dirname, "tickets.json");
const usersFile = path.join(__dirname, "users.json");

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the public folder
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
app.use(
    session({
        secret: "7f8a91c4d2b6e8a3f1c9d7e5b2a4f6c8",
        resave: false,
        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60
        }
    })
);

// --------------------------------------------------
// Make sure database files exist
// --------------------------------------------------

if (!fs.existsSync(ticketsFile)) {
    fs.writeFileSync(ticketsFile, "[]");
}

if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, "[]");
}

// --------------------------------------------------
// Authentication Middleware
// --------------------------------------------------

function requireAuthentication(req, res, next) {

    if (req.session.authenticated) {
        next();
        return;
    }

    // API requests return JSON
    if (req.path.startsWith("/api/")) {
        return res.status(401).json({
            error: "Authentication required."
        });
    }

    // Protected webpages redirect to login
    res.redirect("/login.html");
}

// --------------------------------------------------
// Login
// --------------------------------------------------

app.post("/api/login", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Username and password are required."
        });
    }

    try {

        const users = JSON.parse(
            fs.readFileSync(usersFile, "utf8")
        );

        const user = users.find(
            user => user.username === username
        );

        if (!user) {
            return res.status(401).json({
                error: "Invalid username or password."
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                error: "Invalid username or password."
            });
        }

        // Create authenticated session
        req.session.authenticated = true;
        req.session.username = user.username;

        res.json({
            message: "Login successful."
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            error: "Authentication error."
        });
    }
});

// --------------------------------------------------
// Logout
// --------------------------------------------------

app.post("/api/logout", (req, res) => {

    req.session.destroy((error) => {

        if (error) {

            console.error("Logout error:", error);

            return res.status(500).json({
                error: "Unable to log out."
            });
        }

        res.json({
            message: "Logged out successfully."
        });
    });
});

// --------------------------------------------------
// Authentication Status
// --------------------------------------------------

app.get("/api/auth-status", (req, res) => {

    if (req.session.authenticated) {

        return res.json({
            authenticated: true,
            username: req.session.username
        });
    }

    res.json({
        authenticated: false
    });
});

// --------------------------------------------------
// Get Tickets
// --------------------------------------------------
// THIS IS PROTECTED
// Only authenticated users can view tickets.
// --------------------------------------------------

app.get(
    "/api/tickets",
    requireAuthentication,
    (req, res) => {

        try {

            const tickets = JSON.parse(
                fs.readFileSync(ticketsFile, "utf8")
            );

            res.json(tickets);

        } catch (error) {

            console.error("Ticket read error:", error);

            res.status(500).json({
                error: "Unable to read tickets."
            });
        }
    }
);

// --------------------------------------------------
// Submit Ticket
// --------------------------------------------------
// THIS IS PUBLIC
// Anyone can submit a helpdesk ticket.
// --------------------------------------------------

app.post("/api/tickets", (req, res) => {

    const {
        name,
        email,
        subject,
        description
    } = req.body;

    if (!name || !email || !subject || !description) {

        return res.status(400).json({
            error: "Please complete all fields."
        });
    }

    try {

        const tickets = JSON.parse(
            fs.readFileSync(ticketsFile, "utf8")
        );

        const newTicket = {
            id: Date.now(),
            name: name,
            email: email,
            subject: subject,
            description: description,
            status: "Open",
            created: new Date().toLocaleString()
        };

        tickets.push(newTicket);

        fs.writeFileSync(
            ticketsFile,
            JSON.stringify(tickets, null, 2)
        );

        res.status(201).json({
            message: "Ticket submitted successfully.",
            ticket: newTicket
        });

    } catch (error) {

        console.error("Ticket save error:", error);

        res.status(500).json({
            error: "Unable to save ticket."
        });
    }
});

// --------------------------------------------------
// Protected Ticket Portal
// --------------------------------------------------
// Only authenticated users can access tickets.html.
// --------------------------------------------------

app.get(
    "/tickets",
    requireAuthentication,
    (req, res) => {

        res.sendFile(
            path.join(__dirname, "public", "tickets.html")
        );
    }
);

// --------------------------------------------------
// Start Server
// --------------------------------------------------

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});