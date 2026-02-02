import { useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([
    {
      empId: 1001,
      empName: "Sarah Johnson",
      desig: "Software Engineer",
    },
    {
      empId: 1002,
      empName: "Michael Chen",
      desig: "Product Manager",
    },
    {
      empId: 1003,
      empName: "Emily Rodriguez",
      desig: "UX Designer",
    },
  ]);
  axios.get("http://localhost:3000/employees").then((res) => {
    setEmployees(res.data.employees);
  });
  return (
    <>
      <div className="employees">
        {employees.map((employee, index) => {
          return (
            <div className="employee" key={index}>
              <h2>{employee.empId}</h2>
              <h2>{employee.empName}</h2>
              <h3>{employee.desig}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default App;
