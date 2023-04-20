import { Input } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function TextInput({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  error,
  children,
  label,
  reset,
  status,
  disabled,
  defaultValue,
  required,
  pattern,
  title,
  accept,
  ...props
}) {
  const [state, setstate] = useState("");
  const handleChange = (e) => {
    setstate(e.target.value, e.target.name);
    onChange(e.target.value, e.target.name);
  };

  useEffect(() => {
    if (reset) {
      setstate("");
    }
  }, [reset]);
  return (
    <>
      <Input
        id={name}
        prefix={
          props.prefix ? (
            <props.prefix style={{ color: "#bfbfbf", marginRight: "10px" }} />
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
        disabled={disabled}
        size={props.size}
        pattern={pattern}
        title={title}
        style={
          error
            ? { border: "solid 1px red", borderRadius: "5px" }
            : { borderRadius: "5px", height: "38px" }
        }
      />
    </>
  );
}

export default TextInput;
TextInput.defaultProps = {
  type: "text",
  className: "",
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  // type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "email"]),
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
