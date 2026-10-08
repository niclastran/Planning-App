const express = require("express");
const db = require("./db");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;

function requireLogin(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Ikke logget ind" });
  }
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Ugyldig eller udløbet token" });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: "Kun admin har adgang" });
  }
  next();
}

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
//Employees
app.get("/employees", (req, res) => {
  const employees = db.prepare("SELECT id, name, role, email, is_admin FROM employees").all();
  res.json(employees);
});

app.post("/employees", requireLogin, requireAdmin, (req, res) => {
  const { name, role } = req.body;
  const result = db.prepare("INSERT INTO employees (name, role) VALUES (?, ?)").run(name, role);
  res.json({ id: result.lastInsertRowid, name, role });
});

app.delete("/employees/:id", requireLogin, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  db.prepare("DELETE FROM employees WHERE id = ?").run(id);
  res.json({ message: "Employee deleted" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM employees WHERE email = ?").get(email);

  if (!user || !user.password_hash || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Forkert email eller adgangskode" });
  }

  const token = jwt.sign(
    { id: user.id, is_admin: user.is_admin },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token, name: user.name, is_admin: user.is_admin });
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

app.post("/shifts", requireLogin, requireAdmin, (req, res) => {
  const { employee_id, date, start_time, end_time } = req.body;
  const result = db.prepare(`
    INSERT INTO shifts (employee_id, date, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `).run(employee_id, date, start_time, end_time);
  res.json({ id: result.lastInsertRowid, employee_id, date, start_time, end_time });
});

app.delete("/shifts/:id", requireLogin, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  db.prepare("DELETE FROM shifts WHERE id = ?").run(id);
  res.json({ message: "Shift deleted" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});