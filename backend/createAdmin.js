const bcrypt = require("bcryptjs");
const db = require("./db");

const [email, password] = process.argv.slice(2);

if (!email || !password) {
  console.log("Brug: node createAdmin.js <email> <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

db.prepare(
  "INSERT INTO employees (name, role, email, password_hash, is_admin) VALUES (?, ?, ?, ?, 1)"
).run("Admin", "Manager", email, hash);

console.log("Admin oprettet:", email);