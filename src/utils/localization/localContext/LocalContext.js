import React, {createContext, useState} from "react";
import {dictionaryList} from "../languages";

export const LanguageChangeContext = createContext({
    userLanguage: "en",
    dictionary: dictionaryList
})

export const LanguageProvider = ({children}) => {
    const [userLanguage, setUserLanguage] = useState('en');

    const provider = {
        userLanguage,
        dictionary: dictionaryList[userLanguage],
        userLanguageChange: selected => {
            const newLanguage = dictionaryList[selected] ? selected : "en"
            setUserLanguage(newLanguage);
            window.localStorage.setItem('rcml-lang', newLanguage)
        }
    }
    return (
        <LanguageChangeContext.Provider value={provider}>
            {children}
        </LanguageChangeContext.Provider>
    )
}