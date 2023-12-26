// Import statements using ES6 syntax
import express from "express";
import mongoose from "mongoose";
// import User from "./userModel";
import bcrypt from "bcrypt";
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import dotenv from 'dotenv';
dotenv.config();

const app = express();


mongoose
  .connect(
    process.env.DB_URL
  )
  .then(() => {
    console.log("mongodb connected");
    app.listen(4000, () => {
      console.log("server is running on port 4000");
    });
  });

  const testUser = new mongoose.Schema({
    email : {type : String},
    name : {type : String},
    password : {type : String}
})


const User = mongoose.model('User', testUser)

app.use(morgan('combined')); // IT WILL HELP ENHANCE THE SECURITY OF APP
app.use(helmet()); // IT WILL SHOW THE DETAILS OF SYSTEM LIKE TIME TAKEN BY SYSTEM TO EXECUTE THE FUNCTION AND ETC.
app.use(express.json());
 // To parse JSON bodies
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if you're using https
}));

app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
    });
    const response = await user.save();
    console.log("user Register Success");
    res.send({
      user: response,
      message: "user registration success",
    });
  } catch (e) {
    console.log(e, "error occured");
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log('hitting')
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      const IsValid = await bcrypt.compare(password, isUser.password);
      if (IsValid) {
        console.log("user Logged In Success");
         req.session.user = isUser;
        //  console.log( req.session.user,'session')
        res.json({
          success: true,
          message: "Login Success",
          user: isUser,
        });
      }
    }
  } catch (e) {
    console.log(e, "error occured");
  }
});

app.get("/", (req, res) => {
  if (!req.session.user) {
    console.log("session not present");
    res.send("session not present");
  } else {
    const user = req.session.user
    console.log("session  present",user);
    res.send("session present");
  }
});




  //helmet npm 
  // morgon 
