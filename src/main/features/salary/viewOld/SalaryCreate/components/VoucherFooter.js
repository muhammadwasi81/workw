import React, { useEffect, useState,useContext } from 'react';
import { LanguageChangeContext } from '../../../../../../utils/localization/localContext/LocalContext';
import { salaryDictionary } from '../../../localization';


const VoucherFooter = ({
  amount = 0
}) => {

  const { userLanguage } = useContext(LanguageChangeContext);
  const { salary_Dictionary } = salaryDictionary[userLanguage];

  return (
    <div className='flex items-center' >
      <div className='totalAmountItem flex mx-5'>
        <div className='totalAmountLabel'>{salaryDictionary.TotalAmount}</div>
        <div className='totalAmountValue'>{(amount).toFixed(2)}</div>
      </div>
    </div>
  )
}
export default VoucherFooter;