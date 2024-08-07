const express = require("express");
const mongoose = require("mongoose");
const Friend = require("./model/friendModel");
const fs = require("fs");
const cors = require("cors");

const app = express();

mongoose
  .connect(
    "mongodb+srv://ankushiit21:0R1N3MLZVHNaNPlX@cluster0.ipxlzi0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to DB successfully"))
  .catch((err) => console.error("DB connection error:", err));

app.use(express.json());
app.use(cors());

let data = fs.readFileSync("./data.json", "utf-8");
let parsedData = JSON.parse(data);

// Uncomment the following lines if you want to initialize your database with data from data.json
// async function initializeData() {
//   try {
//     await Friend.insertMany(parsedData);
//     console.log("Initial data inserted successfully");
//   } catch (error) {
//     console.error("Error inserting initial data:", error.message);
//   }
// }
// initializeData();

// ROUTES
app.get("/friends", async (req, res) => {
  try {
    const friends = await Friend.find();
    console.log(friends);
    res.json(friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/friends", async (req, res) => {
  console.log(req.body);
  try {
    const newFriend = await Friend.create(req.body);
    res.status(201).json(newFriend);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// New route for updating a friend's balance
app.put("/friends/:id", async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;
  console.log(id);

  try {
    const friend = await Friend.findOne({ id: id });

    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    friend.balance = balance;
    await friend.save();

    res.json(friend);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
