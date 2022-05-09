import React, {useContext} from 'react';
import {SearchBoxStyle} from "./searchBox.style";
import {LanguageChangeContext} from "../../../utils/localization/localContext/LocalContext";
import {dictionaryList} from "../../../utils/localization/languages";
import PropTypes from "prop-types";

const SearchInput = ({icon, style, placeholder, onChange, props, onClick, onBlur}) => {

    const {userLanguage} = useContext(LanguageChangeContext);
    const {Direction} = dictionaryList[userLanguage];
    return (
        <SearchBoxStyle
            {...props}
            prefix={Direction === "ltr" ? icon : null}
            suffix={Direction === "rtl" ? icon : null}
            style={style}
            placeholder={placeholder}
            onChange={onChange}
            onClick={onClick}
            onBlur={onBlur}
        />
    );
};

export default SearchInput;

SearchInput.propTypes = {
    onClick: PropTypes.func,
    onblur: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    style: PropTypes.object
};

SearchInput.defaultProps = {
	
};
