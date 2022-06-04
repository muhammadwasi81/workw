import React, {useContext} from 'react';
import {SearchBoxStyle} from "./searchBox.style";
import {LanguageChangeContext} from "../../../utils/localization/localContext/LocalContext";
import {dictionaryList} from "../../../utils/localization/languages";

const SearchInput = ({icon, style, placeholder, onChange, props}) => {

    const {userLanguage} = useContext(LanguageChangeContext);
    const {Direction} = dictionaryList[userLanguage];
    return (
        <SearchBoxStyle
            {...props}
            prefix={Direction === "ltr" ? icon : null}
            suffix={Direction === "rtl" ? icon : null}
            style={style}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
        />
    );
};

export default SearchInput;