function ShiftList({ shifts, onDeleteShift }) {
  return (
    <div>
      <h2>Shifts</h2>
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>
            {shift.date} — {shift.employee_name}: {shift.start_time} to {shift.end_time}
            <button onClick={() => onDeleteShift(shift.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShiftList