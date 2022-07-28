import React, { useState } from 'react'
import EmployeeForm from '../employee/view/employeeForm'
import * as S from "../employee/view/updateEmployee/styles/employee.style";

function Index(props) {
  const [bankInfo, setBankInfo] = useState([]);
  return (
    <>
      <S.Container className='basicInfoForm'>
        <EmployeeForm handleImageUpload={props.handleImageUpload} />
      </S.Container>
    </>
  )
}

export default Index