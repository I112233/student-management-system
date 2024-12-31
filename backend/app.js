const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const server = express();

server.use(cors());
server.use(express.json());

const studentsFile = path.join(__dirname, "data", "students.json");
const tasksFile = path.join(__dirname, "data", "tasks.json");
const teachersFile = path.join(__dirname, "data", "teachers.json");

server.post("/api/login", (req, res) => {
  const { name, id } = req.body;

  const teachers = JSON.parse(fs.readFileSync(teachersFile));
  const teacher = teachers.find(
    (teacher) => teacher.name === name && teacher.id === id
  );

  if (teacher) {
    res.status(200).json({ message: "Logged in successfully", teacher });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

server.get("/api/students", (req, res) => {
  const studnets = JSON.parse(fs.readFileSync(studentsFile));
  res.json(studnets);
});

server.post("/api/students", (req, res) => {
  const students = JSON.parse(fs.readFileSync(studentsFile));
  const newStudent = req.body;
  console.log(req.body);

  students.push(newStudent);
  fs.writeFileSync(studentsFile, JSON.stringify(students, null, 2));
  res.json(newStudent);
});

server.get("/api/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(tasksFile));
  res.json(tasks);
});

server.post("/api/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(tasksFile));
  const newTask = req.body;

  tasks.push(newTask);
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
  res.json(newTask);
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
