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
});

// User model
const Player = mongoose.model("User", new mongoose.Schema({
  id: Number,
  name: String,
  team: String,
  role: String,
  points: Number
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
// app.post("/users", async (req, res) => {
//     const { name, email } = req.body;

//     const newUser = new User({ name, email });

//     try {
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

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
