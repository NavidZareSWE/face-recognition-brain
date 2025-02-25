import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import AIRouter from "./routes/AIRoute.js";
import knex from "knex";

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(password, saltRounds);
  return hashedPass;
};

const isValidPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

/**********************************
 ********** App Config ************
 ********************************** */
const app = express();
const port = 3_000;
var corsOptions = {
  origin: "*",
};
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

app.use(cors());
app.use(bodyParser.json());

/**********************************
 **********************************
 ********************************** */
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  db.transaction(async (trx) => {
    try {
      const data = await trx
        .select("email", "hash")
        .from("login")
        .where({ email });
      if (data.length !== 0) {
        const isValid = await isValidPassword(password, data[0].hash);
        if (isValid) {
          const user = await trx("users").select("*").where({ email });
          res.json({ success: true, message: "Success", user: user[0] });
        } else {
          res.status(400).json("Wrong Credentials");
        }
      } else {
        res.status(400).json("Wrong Credentials");
      }
    } catch (err) {
      res.status(400).json("Failed to SignIn, Try Again Later!");
    }
  });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await hashPassword(password);
  db.transaction((trx) => {
    trx
      .insert({ hash, email })
      .into("login")
      .returning("email")
      .then((loginEmail) =>
        trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then((user) => res.json(user[0]))
          .catch((err) => res.status(400).json("Unable to Register"))
      )
      .then(trx.commit)
      .catch(trx.rollback);
  });
});
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) res.json(user[0]);
      else res.status(400).json("No such user");
    })
    .catch((err) => res.status(400).json("Error getting user"));
});
app.post("/image", (req, res) => {
  const { id } = req.body;
  let prevEntries = -1;
  db.select("entries")
    .from("users")
    .where("id", "=", id)
    .then((arr) => (prevEntries = arr[0].entries));
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries !== prevEntries)
        res.json({ success: true, entries: entries[0] });
      else res.status(400).json("Error Incriminating Entries");
    })
    .catch((err) => res.status(400).json("Error"));
});

/*
/ ---> res = API is working
/signin ---> POST = success/fail
/register ---> POST = user
/profile/:userid ---> GET = user
/image ---> PUT/POST ---> user
*/
/**********************************
 ********* API Endpoints **********
 ********************************** */
app.use("/api/ai", AIRouter);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
