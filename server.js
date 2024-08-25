import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bodyParser from "body-parser";

// creating server with express
const port = process.env.PORT;
const app = express();
//calling it
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/post-user", async (req, res) => {
  try {
    const { animationStyle, bestAnime, email, fullName } = req.body;
    const savedUser = await User.create({
      fullName,
      email,
      bestAnime,
      animationStyle,
    });
    if (savedUser) {
      res.status(200).json({ message: "successful" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ allUsers });
    // console.log(res);
    // res.status(200).json({ allUsers });
  } catch (error) {
    console.log(error);
  }
});

// update by id
app.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { fullName } = req.body;

  const updateUser = await User.findByIdAndUpdate(id, {
    fullName: fullName,
  });
  res.status(200).json({ message: "user updated" });
});

//to delete
app.delete("/delete-user/:id", async (req, res) => {
  {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "User deleted" });
  }
});

app.listen(port, () => {
  console.log(`server running on port${port}`);
});
