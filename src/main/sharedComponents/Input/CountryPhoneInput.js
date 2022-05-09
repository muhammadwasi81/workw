// import { Input } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
function CountryPhoneInput({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  error,
  children,
  label,
  country,
  reset,
  ...props
}) {
  const [state, setstate] = useState("");

  const handleChange = (value, country, e, formattedValue) => {
    setstate(value);
    console.log(country);
    // console.log(e,"COUNTRYINPUT");

    onChange(value, (e.target.name || "countryCode"));
  };

  useEffect(() => {
    if(reset){
      setstate("")
    }
  }, [reset]);
  return (
    <>
      <PhoneInput
        country={country}
        value={state}
        name={name}
        inputProps={{
            name: "phoneNo",
            required: true,
            autoFocus: false
        }}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
    </>
  );
}

export default CountryPhoneInput;
CountryPhoneInput.defaultProps = {
  type: "number",
  className: "",
};

CountryPhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  // type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  // type: PropTypes.oneOf(["text", "number", "email"]),
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
