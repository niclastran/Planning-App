import { useState, useEffect } from 'react'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'
import ShiftList from './components/ShiftList'
import ShiftForm from './components/ShiftForm'
import './App.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

function App() {
  const [employees, setEmployees] = useState([])
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))

    fetch('http://localhost:3001/shifts')
      .then(res => res.json())
      .then(data => setShifts(data))
  }, [])

  const handleAddEmployee = (employee) => {
    fetch('http://localhost:3001/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    })
      .then(res => res.json())
      .then(newEmployee => {
        setEmployees([...employees, newEmployee])
      })
  }

  const handleDeleteEmployee = (id) => {
    fetch(`http://localhost:3001/employees/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setEmployees(employees.filter(emp => emp.id !== id))
      })
  }

  const handleAddShift = (shift) => {
    fetch('http://localhost:3001/shifts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shift)
    })
      .then(res => res.json())
      .then(() => {
        // Re-fetch shifts so we get the employee_name from the JOIN
        fetch('http://localhost:3001/shifts')
          .then(res => res.json())
          .then(data => setShifts(data))
      })
  }

  const handleDeleteShift = (id) => {
    fetch(`http://localhost:3001/shifts/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setShifts(shifts.filter(shift => shift.id !== id))
      })
  }

return (
  <div className="app">
    <h1>Shift Planner</h1>

    <nav>
      <Link to="/employees">Employees</Link>
      <Link to="/shifts">Shifts</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Navigate to="/employees" />} />
      <Route
        path="/employees"
        element={
          <>
            <EmployeeList employees={employees} onDeleteEmployee={handleDeleteEmployee} />
            <EmployeeForm onAddEmployee={handleAddEmployee} />
          </>
        }
      />
      <Route
        path="/shifts"
        element={
          <>
            <ShiftList shifts={shifts} onDeleteShift={handleDeleteShift} />
            <ShiftForm employees={employees} onAddShift={handleAddShift} />
          </>
        }
      />
    </Routes>
  </div>
)
}

export default App