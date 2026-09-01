const express = require("express");
const db = require("./db");
const app = express();
app.use(express.json());
const PORT = 3001;


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/employees", (req, res) => {
  const employees = db.prepare("SELECT * FROM employees").all();
  res.json(employees);
});

app.post("/employees", (req, res) => {
  const { name, role } = req.body;
  const result = db.prepare("INSERT INTO employees (name, role) VALUES (?, ?)").run(name, role);
  res.json({ id: result.lastInsertRowid, name, role });
});

app.delete("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.prepare("DELETE FROM employees WHERE id = ?").run(id);
  res.json({ message: "Employee deleted" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});