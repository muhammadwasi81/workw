import React, { useEffect, useState } from 'react';

const VoucherFooter = ({
  dr, cr
}) => {

  return (
    <div className='flex items-center' >
      <div className='totalAmountItem flex mx-5'>
        <div className='totalAmountLabel'>Dr : </div>
        <div className='totalAmountValue'>{(dr).toFixed(2)}</div>
      </div>
      <div className='totalAmountItem flex mx-5'>
        <div className='totalAmountLabel'>Cr : </div>
        <div className='totalAmountValue'>{(cr).toFixed(2)}</div>
      </div>
      <div className='totalAmountItem flex mx-5'>
        <div className='totalAmountLabel'>Difference : </div>
        <div className='totalAmountValue'>{(dr - cr).toFixed(2)}</div>
      </div>
    </div>
  )
}
export default VoucherFooter;