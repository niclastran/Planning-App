const express = require("express");
const db = require("./db");
const app = express();
app.use(express.json());
const PORT = 3001;


app.get("/", (req, res) => {
  res.send("Backend is running!");
});
//Employees
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

//Shifts
app.get("/shifts", (req, res) => {
  const shifts = db.prepare(`
    SELECT shifts.*, employees.name AS employee_name
    FROM shifts
    JOIN employees ON shifts.employee_id = employees.id
  `).all();
  res.json(shifts);
});

app.post("/shifts", (req, res) => {
  const { employee_id, date, start_time, end_time } = req.body;
  const result = db.prepare(`
    INSERT INTO shifts (employee_id, date, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `).run(employee_id, date, start_time, end_time);
  res.json({ id: result.lastInsertRowid, employee_id, date, start_time, end_time });
});

app.delete("/shifts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.prepare("DELETE FROM shifts WHERE id = ?").run(id);
  res.json({ message: "Shift deleted" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});