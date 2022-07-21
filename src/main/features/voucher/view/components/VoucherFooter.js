import React, { useEffect, useState } from 'react';
// import CustomizedSnackbars from '../../../snackbar/CustomizedSnackbars';
// import { API } from '../../../utils/services';
// import { STRINGS } from '../../../utils/base';

const VoucherFooter = () => {

  return (
    <div className='totalAmountCont' >
      <div className='totalAmountItem'>
        <div className='totalAmountLabel'>Total Dr : </div>
        <div>0.00</div>
      </div>
      <div className='totalAmountItem'>
        <div className='totalAmountLabel'>Total Cr : </div>
        <div>0.00</div>
      </div>
      <div className='totalAmountItem'>
        <div className='totalAmountLabel'>Difference : </div>
        <div>0.00</div>
      </div>
      {/* <butto>Save</butto> */}
      {/* <butto>Add Row</butto> */}
    </div>
  )
}
export default VoucherFooter;