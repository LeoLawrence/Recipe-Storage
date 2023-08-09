import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router(); // create router in express

router.post("/register", async (req, res) => {
    const { username, password } = req.body; // defines endpoints for username and password API
    const user = await UserModel.findOne({username: username}); // note: if the key and value are the same, can just write {username}. Keeping it separate for legibility.

    if (user) {
        return res.json({message: "User already exists!"}); // returns message instead of creating new user.
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({message: "User registered successfully!"}); // sends back the user found as a JSON
});



router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({message: "User does not exist!"}); // check to make sure the user exists
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // cannot unhash password, but can hash new password to see if they're the same.

    if (!isPasswordValid) {
        return res.json({message: "Username or password is incorrect. Please try again."});
    }

    const token = jwt.sign({id: user._id}, "secret"); // creates a token. Currently using secret as "secret" but may want to switch to env later
    res.json({token, userID: user._id});
});

 

export {router as userRouter }; // export router object

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
      jwt.verify(token, "secret", (err) => {
          if (err) return res.sendStatus(403);
          next();
      });
  } else {
      res.sendStatus(401);
  }
};