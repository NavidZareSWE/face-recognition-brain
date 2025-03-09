const imageHandler = (db) => (req, res) => {
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
};
export { imageHandler };
