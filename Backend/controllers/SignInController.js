const isValidPassword = async (password, hash, bcrypt) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

const signInHandler = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json("Incorrect form submission.");
  db.transaction(async (trx) => {
    try {
      const data = await trx
        .select("email", "hash")
        .from("login")
        .where({ email });
      if (data.length !== 0) {
        const isValid = await isValidPassword(password, data[0].hash, bcrypt);
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
};
export { signInHandler };
