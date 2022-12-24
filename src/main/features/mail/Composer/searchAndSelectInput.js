import React from 'react';
import {Select, Tag} from 'antd';

const SearchAndSelectInput = ({handleGetSelected, placeholder, defaultValue, disabled}) => {
    const [value, setValue] = React.useState([]);
    const [collapse, setCollapse] = React.useState(false);

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const handleChange = (input) => {
        const selectedValue = JSON.parse(JSON.stringify(input));
        setValue(JSON.parse(JSON.stringify(input)))
        handleGetSelected(selectedValue);
    }

    function tagRender(props) {
        const {label, value, closable, onClose} = props;
        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={validateEmail(value) ? "gold" : "red"}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{marginRight: 3}}>
                {label}

            </Tag>
        );
    }

    return (
        <Select
            mode={"tags"}
            showSearch
            allowClear
            defaultValue={defaultValue}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange}
            tagRender={tagRender}
            onBlur={() => setCollapse(false)}
            onFocus={() => setCollapse(true)}
            maxTagCount={!collapse && 4}
            maxTagTextLength={24}
            maxTagPlaceholder={({closable, onClose}) => <Tag color={"gold"}
                                                             closable={closable}
                                                             onClose={onClose}>+{value.length - 4}</Tag>}
        >
        </Select>
    );
}

export default SearchAndSelectInput;

