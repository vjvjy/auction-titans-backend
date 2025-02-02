const mongoose = require('mongoose');
// const User = require('./models/user');  // Assuming User model is in the models folder.
const players = require('./allPlayers.json')
const uri = "mongodb+srv://vijayaraajan:5spdpax50d22Yex9@auction.u0pxx.mongodb.net/?retryWrites=true&w=majority&appName=Auction";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// const users = [
//     { name: 'Alice', email: 'alice@example.com' },
//     { name: 'Bob', email: 'bob@example.com' },
//     { name: 'Charlie', email: 'charlie@example.com' }
// ];

const Player = mongoose.model("User", new mongoose.Schema({
  id: Number,
  name: String,
  team: String,
  role: String,
  points: Number
}));

const seedDatabase = async () => {
    // await User.deleteMany({});
    await Player.insertMany(players);
    console.log("Database seeded successfully!");
    mongoose.connection.close();
};

seedDatabase();
