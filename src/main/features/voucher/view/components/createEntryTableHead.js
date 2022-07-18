import React, { useEffect, useState } from 'react';
// import CustomizedSnackbars from '../../../snackbar/CustomizedSnackbars';
// import { API } from '../../../utils/services';
// import { STRINGS } from '../../../utils/base';

const CreateEntryHead = () => {

  return (
    <thead>
      <tr>
        <th style={{ width: "50px" }} >
          S.No.
        </th>
        <th style={{ width: "230px" }}>
          Account
        </th>
        <th style={{ width: "120px" }}>
          Cheque No.
        </th>
        <th>
          Naration
        </th>
        <th style={{ width: "150px" }}>
          Amount
        </th>
        <th style={{ width: "120px" }}>
          Dr/Cr
        </th>
        <th style={{ width: "45px" }}>

        </th>
      </tr>
    </thead>
  )
}
export default CreateEntryHead;