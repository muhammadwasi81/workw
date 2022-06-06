import { Input,InputNumber,Select } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function CurrencyInput({
           name,
           placeholder,
           onChange,
           className,
           value,
           error,
           children,
           label,
           reset,
           status,
           defaultValue,
           ...props
}) {
    const [state, setstate] = useState("");
    const handleChange = e => {
        setstate(e.target.value, e.target.name);
        onChange(e.target.value, e.target.name);
    };
console.log(value,'CurrencyValue');
    useEffect(() => {
        if (reset) {
            setstate("");
        }
    }, [reset]);

    const currency = (
        <Select
            name="currencyId"
            defaultValue="USD"
            style={{
                width: 60,
            }}
            onChange={(e)=>{
                console.log(e)
            }}
        >
            <Option value="USD">$</Option>
            <Option value="EUR">€</Option>
            <Option value="GBP">£</Option>
            <Option value="CNY">¥</Option>
        </Select>
    );
    return (
        <>
            <InputNumber  addonBefore={currency}
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          onChange={(e)=>{
                              console.log(e,'tata');
                          }}
                          value={value}
                          defaultValue={defaultValue}
                          name="currencyInput"


            />
            {/*<Input
                id={name}
                prefix={
                    props.prefix ? (
                        <props.prefix
                            style={{ color: "#bfbfbf", marginRight: "10px" }}
                        />
                    ) : (
                        false
                    )
                }
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={props.onKeyDown}
                value={value}
                defaultValue={defaultValue}
                className={className}
                size={props.size}
                style={
                    error
                        ? { border: "solid 1px red", borderRadius: "5px" }
                        : { borderRadius: "5px", height: "38px" }
                }
            />*/}
        </>
    );
}

export default CurrencyInput;

CurrencyInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};
