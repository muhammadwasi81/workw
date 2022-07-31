import React, { useEffect, useState } from 'react'
import BankForm from '../employee/view/bankDetailForm'
import * as S from "../employee/view/updateEmployee/styles/employee.style";

function Index() {
  const [bankInfo, setBankInfo] = useState([]);


  return (
      <S.Container className='bankDetailForm'>
        <BankForm onBankInfo={setBankInfo} bankInfo={bankInfo} isEdit={true} />
      </S.Container>
  )
}

export default Index