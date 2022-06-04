import { Input } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function PasswordInput({
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
      <Input.Password
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
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
        value={state}
        className={className}
        size={props.size}
        style={
          error
            ? { border: "solid 1px red", borderRadius: "5px" }
            : { borderRadius: "5px" }
        }
      />
      {error && <p>{error}</p>}
    </>
  );
}

export default PasswordInput;
PasswordInput.defaultProps = {
  type: "Password",
  className: "",
};

PasswordInput.propTypes = {
  // name: PropTypes.string.isRequired,
  // type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["Password"]),
  className: PropTypes.string,
  value: PropTypes.any,
  // onChange: PropTypes.func.isRequired,
};
