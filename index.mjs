import express from "express";

const app = express();
app.use(express.json());
let employees = [];

app.post("/employees", (req, res) => {
  const { name, skills, address, bio, yearsOfExperience } = req.body;

  const userId = employees.length + 1;

  if (!name || !skills || !address || !bio || yearsOfExperience === undefined) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newEmployee = {
    name,
    userId,
    skills,
    address,
    bio,
    yearsOfExperience,
  };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.delete("/employees/:userId", (req, res) => {
  const { userId } = req.params; 
  const index = employees.findIndex((employee) => employee.userId == userId);

  if (index === -1) {
    return res.status(404).json({ error: "Employee not found." });
  }

  employees.splice(index, 1);
  res.status(204).send(); 
});

app.put("/employees/:userId", (req, res) => {
  const { userId } = req.params;
  const index = employees.findIndex((employee) => employee.userId == userId);

  if (index === -1) {
    return res.status(404).json({ error: "Employee not found." });
  }

  const { name, skills, address, bio, yearsOfExperience } = req.body;

  if (!name || !skills || !address || !bio || yearsOfExperience === undefined) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const updatedEmployee = {
    name,
    userId: parseInt(userId), 
    skills,
    address,
    bio,
    yearsOfExperience,
  };

  employees[index] = updatedEmployee;
  res.json(updatedEmployee); 
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
