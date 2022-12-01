import React, { useEffect, useState } from 'react';

const SlabTableHeader = () => {

  return (
    <thead>
      <tr>
        {/* <th style={{ width: "50px" }} >
          S.No.
        </th> */}
        <th style={{ minWidth: "100px" }}>
          Name
        </th>
        <th style={{ minWidth: "100px" }}>
          Min
        </th>
        <th style={{ minWidth: "100px" }}>
          Max
        </th>
        <th style={{ minWidth: "100px" }}>
          Percentage
        </th>
        <th style={{ minWidth: "100px" }}>
            Previous Charge 
        </th>
        <th> 
        </th>
      </tr>
    </thead>
  )
}
export default SlabTableHeader;