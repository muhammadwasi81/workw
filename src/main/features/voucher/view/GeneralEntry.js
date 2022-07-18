import React from 'react'
import CreateEntryTable from './createEntryTable';
const GeneralEntry = () => {
  return (
    <div className="tabbable-container" style={{ maxWidth: "100%" }}>
      <CreateEntryTable
      defaultRows={8}
      />
    </div>
  )
}
export default GeneralEntry;