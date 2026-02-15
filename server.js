const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

let families = [];
let children = [];
let blockedUsers = [];

app.get("/api/children", (req, res) => res.json(children));

app.post("/api/families", (req, res) => {
  const family = { ...req.body, verified: false };
  families.push(family);
  res.json({ success: true, family });
});

app.post("/api/children", (req, res) => {
  children.push(req.body);
  res.json({ success: true });
});

app.put("/api/families/:id/verify", (req, res) => {
  const id = parseInt(req.params.id);
  const family = families.find((f) => f.id === id);
  if (family) {
    family.verified = true;
    res.json({ success: true });
  } else res.status(404).send("Family not found");
});

app.get("/api/match/:childId", (req, res) => {
  const childId = parseInt(req.params.childId);
  const child = children.find((c) => c.id === childId);
  if (!child) return res.status(404).send("Child not found");
  const matches = families.filter(
    (f) =>
      f.verified &&
      !blockedUsers.includes(f.id) &&
      f.prefAgeMin <= child.age &&
      child.age <= f.prefAgeMax
  );
  res.json(matches);
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
