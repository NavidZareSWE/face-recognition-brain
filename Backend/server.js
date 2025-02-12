const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var cors = require("cors");

const saltRounds = 10;

const app = express();
const port = 3_000;
var corsOptions = {
  origin: "http://http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "John@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database);
});
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  )
    res.json("success");
  else res.status(400).json("error logging in");
});
app.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body;
    database.users.push({
      id: "125",
      name,
      email,
      password,
      entries: 0,
      joined: new Date(),
    });
    res.json(database.users.at(-1));
  } catch (error) {
    console.error(error);
  }
});
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  database.users.forEach((user) => {
    if (user.id === id) {
      return res.json(user);
    }
  });
  res.status(404).json("no such user");
});
app.post("/image", (req, res) => {
  const { id } = req.body;
  database.users.forEach((user) => {
    if (user.id === id) {
      ++user.entries;
      return res.json(user.entries);
    }
  });
});

const isValidPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
/*
/ ---> res = API is working
/signin ---> POST = success/fail
/register ---> POST = user
/profile/:userid ---> GET = user
/image ---> PUT/POST ---> user
*/
