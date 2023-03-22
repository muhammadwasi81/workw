import React, { useEffect, useState } from 'react';

const SlabTableHeader = () => {

  return (
    <thead>
      <tr>
        {/* <th style={{ width: "50px" }} >
          S.No.
        </th> */}
        <th>
          Name
        </th>
        <th>
          Min
        </th>
        <th>
          Max
        </th>
        <th>
          Percentage
        </th>
        <th>
            Minimum Charge 
        </th>
        <th> 
        </th>
      </tr>
    </thead>
  )
}
export default SlabTableHeader;