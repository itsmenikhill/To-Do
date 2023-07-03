import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors"; 
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import 'dotenv/config';
// dotenv.config();

const app = express();
app.use(express.json());

const secretKey = "your_secret_key";
const uri: any = process.env.MONGO_URI;

app.use(cors());

app.get("/", (req, res)=>{
  res.send(uri);
})

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("registered");
    const users = database.collection("users");
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }
    const sanitizedEmail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
      tasks: []
    };
    const insertedUser = await users.insertOne(data);
    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201).json({ token, userId: generatedUserId, status:"inserted" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("registered");
    const users = database.collection("users");

    const user = await users.findOne({ email });
    console.log(user);
    const correctPassword = await bcrypt.compare(
      password,
      user!.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id });
    }
    else{
      res.status(400).json("Invalid Credentials");
    }

  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.post("/addtask", async (req,res) => {
  const client = new MongoClient(uri);
  const { email, task, isDone } = req.body;

  try {
    await client.connect();
    const database = client.db("registered");
    const users = database.collection("users");
    await users.updateOne(
      {email: email},
      {$push: { tasks: {task, isDone} }}
    )
    .then(res=>{"request completed"})
    res.send(res);
  }
  catch(err){
    res.send(err)
  }
})

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
