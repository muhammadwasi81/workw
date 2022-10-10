import React, { useEffect, useState } from 'react';

const VoucherFooter = ({
  amount = 0
}) => {

  return (
    <div className='flex items-center' >
      <div className='totalAmountItem flex mx-5'>
        <div className='totalAmountLabel'>Total Amount: </div>
        <div className='totalAmountValue'>{(amount).toFixed(2)}</div>
      </div>
    </div>
  )
}
export default VoucherFooter;