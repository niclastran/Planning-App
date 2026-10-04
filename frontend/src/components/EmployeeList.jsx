function EmployeeList({ employees, onDeleteEmployee }) {
  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.role}
            <button onClick={() => onDeleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EmployeeList