const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3001;
let employees = [
  { id: 1, name: "Anna", role: "Cashier" },
  { id: 2, name: "Mikkel", role: "Manager" }
];

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.post("/employees", (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    role: req.body.role
  };
  employees.push(newEmployee);
  res.json(newEmployee);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});