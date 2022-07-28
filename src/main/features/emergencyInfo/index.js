import React, { useState } from 'react'
import EmergencyForm from '../employee/view/emergencyForm';
import * as S from "../employee/view/updateEmployee/styles/employee.style";

function Index() {
    const [emergencyInfo, setEmergencyInfo] = useState([]);
    return (
            <S.Container className='emergencyForm'>
            <EmergencyForm
                onEmergencyInfo={setEmergencyInfo}
                emergencyInfo={emergencyInfo}
            />
            </S.Container>
    )
}

export default Index