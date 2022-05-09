import React, { useContext } from 'react'
import { dictionaryList } from '../../../utils/localization/languages'
import { LanguageChangeContext } from '../../../utils/localization/localContext/LocalContext'
import WarningListItem from './WarningList/WarningListItem'


function WarningList() {
    const {userLanguage} = useContext(LanguageChangeContext);

    const label = dictionaryList[userLanguage];
    return ( <WarningListItem /> )
}

export default WarningList
