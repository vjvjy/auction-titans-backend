// server.js
// const http = require('http');

// const server = http.createServer((req, res) => {
//   if (req.url === '/api/players' && req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//     res.end(JSON.stringify(playerData));
//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('Not Found');
//   }
// });

// const PORT = 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(cors()); // Enables CORS for all requests
const uri = "mongodb+srv://vijayaraajan:5spdpax50d22Yex9@auction.u0pxx.mongodb.net/?retryWrites=true&w=majority&appName=Auction";

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB 
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// User model
const Player = mongoose.model("Player", new mongoose.Schema({
  id: Number,
  name: String,
  team: String,
  role: String,
  points: Number
}));

//Sign up model
const User = mongoose.model("NewTeam", new mongoose.Schema({
    username: String,
    teamname: String,
    password: String
}));

// Routes

// GET - Fetch list of users
app.get("/players", async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST - Add a new user
app.post("/signup", async (req, res) => {
    debugger;
    console.log("printing req============", req);
     // Check if the username already exists
     const existingUser = await User.findOne({ username });

     if (existingUser) {
        return res.status(400).json({ message: "Username already exists!" });
     }
    const { username, teamname, password } = req.body.input;

    const newUser = new User({ username, teamname, password });

    try {
        const test = await newUser.save();
        console.log("testing entry----------->", test)
        res.status(201).json(test);
    } catch (error) {
        res.status(400).send(error);
    }
});

// POST - Login User
app.post("/login", async (req, res) => {
    const { username, password } = req.body.input;

    try {
        // Check if user exists
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password!" });
        }

        // If login is successful, return the user data (or token if you're using JWT for authentication)
        res.status(200).json({
            message: "Login successful",
            user: {
                username: user.username,
                teamname: user.teamname,
                // You can send more user data here if needed
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// PUT - Update user details
// app.put("/users/:id", async (req, res) => {
//     const userId = req.params.id;
//     const { name, email } = req.body;

//     try {
//         const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
//         if (!updatedUser) {
//             return res.status(404).send("User not found");
//         }
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// Start server

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
