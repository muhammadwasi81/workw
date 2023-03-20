import { useState } from "react";

function TableRow({ rowData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(rowData.name);
  const [age, setAge] = useState(rowData.age);

  function handleSave() {
    // Save changes to database or update local state
    setIsEditing(false);
  }

  function handleCancel() {
    // Reset data to original values
    setName(rowData.name);
    setAge(rowData.age);
    setIsEditing(false);
  }

  return (
    <tr>
      <td>{rowData.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          rowData.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        ) : (
          rowData.age
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </td>
    </tr>
  );
}
export default TableRow;
