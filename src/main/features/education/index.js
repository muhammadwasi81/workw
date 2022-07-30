import React, { useState } from 'react'
import EducationForm from "../employee/view/educationForm"

function Index() {
  const [educationInfo, setEducationInfo] = useState([]);
  return (
    <EducationForm
      educationInfo={educationInfo}
      onEducationInfo={setEducationInfo}
      isEdit={true}
    />
  )
}

export default Index