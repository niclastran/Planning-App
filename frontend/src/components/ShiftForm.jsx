import { useState } from 'react'

function ShiftForm({ employees, onAddShift }) {
  const [employeeId, setEmployeeId] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddShift({
      employee_id: employeeId,
      date: date,
      start_time: startTime,
      end_time: endTime
    })
    setEmployeeId('')
    setDate('')
    setStartTime('')
    setEndTime('')
  }

  return (
    <div>
      <h2>Add Shift</h2>
      <form onSubmit={handleSubmit}>
        <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
          <option value="">Select employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default ShiftForm