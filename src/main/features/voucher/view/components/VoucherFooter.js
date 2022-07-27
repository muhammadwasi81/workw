import React, { useEffect, useState } from 'react';

const VoucherFooter = ({
  dr, cr
}) => {

  return (
    <div className='totalAmountCont' >
      <div className='totalAmountItem'>
        <div className='totalAmountLabel'>Total Dr : </div>
        <div className='totalAmountValue'>{(dr).toFixed(2)}</div>
      </div>
      <div className='totalAmountItem'>
        <div className='totalAmountLabel'>Total Cr : </div>
        <div className='totalAmountValue'>{(cr).toFixed(2)}</div>
      </div>
      <div className='totalAmountItem'>
        <div className='totalAmountLabel'>Difference : </div>
        <div className='totalAmountValue'>{(dr-cr).toFixed(2)}</div>
      </div>
      {/* <butto>Save</butto> */}
      {/* <butto>Add Row</butto> */}
    </div>
  )
}
export default VoucherFooter;