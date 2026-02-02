const express = require("express");
const empModel = require("./models/employee.model");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
// POST API

app.post("/employees", async (req, res) => {
  const { empId, empName, desig } = req.body;

  const employee = await empModel.create({
    empId,
    empName,
    desig,
  });

  res.status(201).json({
    message: "Employee saved successfully",
    employee,
  });
});
// GET API
app.get("/employees", async (req, res) => {
  const employees = await empModel.find();

  res.status(200).json({
    message: "Employees present",
    employees,
  });
});

// DELETE API

app.delete("/employees/:id", async (req, res) => {
  const id = req.params.id;

  const employee = await empModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
    employee,
  });
});

// PATCH EMPLOYEE BY ID
app.patch("/employees/:id", async (req, res) => {
  const id = req.params.id;
  const { desig } = req.body;
  const employee = await empModel.findByIdAndUpdate(id, { desig });
  res.status(201).json({
    message: "Employee updated successfully",
    employee,
  });
});
module.exports = app;
