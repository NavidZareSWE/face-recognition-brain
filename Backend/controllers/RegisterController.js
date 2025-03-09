const hashPassword = async (password, bcrypt) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(password, saltRounds);
  return hashedPass;
};

const handleRegister = (db, bcrypt) => async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json("Incorrect form submission.");
  const hash = await hashPassword(password, bcrypt);
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
};
export { handleRegister };
