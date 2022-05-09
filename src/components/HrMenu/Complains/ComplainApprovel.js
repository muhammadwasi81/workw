import React, {useContext} from 'react'
import Approval from '../../SharedComponent/AppComponents/Approval/Approval'
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";


function ComplainApprovel() {

    const {userLanguage} = useContext(LanguageChangeContext);
    const {warnings, Direction} = dictionaryList[userLanguage]; 

        return (
        <div className="tabbable-container ApproversDiv">
            <Approval 
                username="Shah Fahad"
                userdesignation="React Developer"
                status={warnings.inprogress}   
            />
        </div>
    )
}

export default ComplainApprovel
