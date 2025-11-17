const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const childRoutes = require("./routes/childRoutes");
const questionRoutes = require("./routes/questionRoutes");
const resultRoutes = require("./routes/resultRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/parent", childRoutes);
app.use("/questions", questionRoutes);
app.use("/test", resultRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



// // 🔹 Get all questions
// app.get("/api/questions", (req, res) => {
//   const data = fs.readFileSync("./data/questions.json");
//   const questions = JSON.parse(data);
//   const { exam, subject } = req.query;

//   let filtered = questions;
//   if (exam) filtered = filtered.filter(q => q.exam === exam);
//   if (subject) filtered = filtered.filter(q => q.subject === subject);

//   res.json(filtered);
// });

// // 🔹 Get all results
// app.get("/api/results", (req, res) => {
//   const data = fs.readFileSync("./data/results.json");
//   const results = JSON.parse(data);
//   res.json(results);
// });

// // 🔹 Save new result
// app.post("/api/results", (req, res) => {
//   const newResult = req.body;
//   const data = fs.readFileSync("./data/results.json");
//   const results = JSON.parse(data);

//   results.push({ ...newResult, date: new Date().toISOString() });
//   fs.writeFileSync("./data/results.json", JSON.stringify(results, null, 2));

//   res.status(201).json({ message: "Result saved successfully" });
// });
