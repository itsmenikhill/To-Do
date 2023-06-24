import express, {Express, Request, Response} from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());

const secretKey = "your_secret_key";

// interface Creds {
//   email: string;
//   password: string;
// }

const users: any = {
  email: "nikhil@gmail.com",
  password: "nikhil123",
};

app.use(cors());

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (item: boolean) => users.email === email && users.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: user.email, password: user.password },
    secretKey,
    {
      expiresIn: "1h", // Token expiration time
    }
  );
  res.json({token})
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
