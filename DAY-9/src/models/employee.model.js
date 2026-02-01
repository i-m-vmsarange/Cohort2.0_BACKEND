const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    empId: Number,
    empName: String,
    desig: String,
    
})

const empModel = mongoose.model("employee",employeeSchema);

module.exports = empModel;