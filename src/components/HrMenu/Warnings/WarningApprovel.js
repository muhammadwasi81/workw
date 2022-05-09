import React, {useContext} from 'react'
import Approval from '../../SharedComponent/AppComponents/Approval/Approval'
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";


function WarningApprovel() {

    const {userLanguage} = useContext(LanguageChangeContext);
    const {warnings, Direction} = dictionaryList[userLanguage]; 

        return (
        <div className="tabbable-container ApproversDiv">
            <Approval 
                username="Salman Ahmed"
                userdesignation="React Js Internee"
                status={warnings.inprogress}   
            />
        </div>
    )
}

export default WarningApprovel
