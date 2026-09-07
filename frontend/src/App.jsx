import { useState, useEffect } from 'react'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'

function App() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
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

  return (
    <div>
      <h1>Shift Planner</h1>
      <EmployeeList employees={employees} />
      <EmployeeForm onAddEmployee={handleAddEmployee} />
    </div>
  )
}

export default App