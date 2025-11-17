const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "../data/users.json");

const createChild = (req, res) => {
  const { name, username, password, examType, parentId } = req.body;
  if (!name || !username || !password || !examType || !parentId)
    return res.status(400).json({ message: "All fields are required" });

  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

  if (users.find(u => u.username === username))
    return res.status(400).json({ message: "Username already exists" });

  const newChild = {
    id: users.length + 101,
    parentId,
    name,
    username,
    password,
    examType,
    userType: "child",
  };

  users.push(newChild);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.json({ message: "Child created successfully", child: newChild });
};

const getChildren = (req, res) => {
  const parentId = parseInt(req.params.parentId);
  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
  const children = users.filter(u => u.parentId === parentId);
  res.json(children);
};

module.exports = { createChild, getChildren };
