import React, { useEffect, useState } from 'react';
import CreateEntryHead from './createEntryTableHead';

const CreateEntryTable = ({ children }) => {

  return (
    <div className='bg-white p-4 rounded-md ' >
      <div className='overflow-x-auto'>
        <table>
          <CreateEntryHead />
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default CreateEntryTable;