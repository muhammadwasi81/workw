import React, { useState } from 'react'
import ExperienceForm from '../employee/view/experienceForm'
import * as S from "../employee/view/updateEmployee/styles/employee.style";

function Index() {
  const [experienceInfo, setExperienceInfo] = useState([]);
  return (
      <S.Container className='bankDetailForm'>
        <ExperienceForm
        experienceInfo={experienceInfo}
        onExperienceInfo={setExperienceInfo}
      />
      </S.Container>
  )
}

export default Index