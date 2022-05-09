import React, { useContext } from 'react'
import { dictionaryList } from '../../../utils/localization/languages'
import { LanguageChangeContext } from '../../../utils/localization/localContext/LocalContext'
import ComplainListItem from './ComplainList/ComplainListItem'
import "./complain.css"


function WarningList() {
    const {userLanguage} = useContext(LanguageChangeContext);

    const label = dictionaryList[userLanguage];
    return ( <ComplainListItem /> )
}

export default WarningList
