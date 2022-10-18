import React from "react";
import { Button, Badge } from "antd";
import AntTooltip from "../Tooltip/AntTooltip";
import { useMediaQuery } from "react-responsive";

const SharedButton = ({
  type,
  shape,
  icon,
  IconSize,
  title,
  size,
  style,
  onClick,
  IconColor,
  className,
  antIcon,
  badge,
  counter,
  toolTip,
  disabled,
  buttonClass,
  htmlType,
  loading,
  href,
}) => {
  const isTablet = useMediaQuery({ maxWidth: 650 });
  return (
    <Button
      onClick={() => onClick()}
      type={type}
      disabled={disabled}
      loading={loading}
      shape={shape}
      htmlType={htmlType}
      href={href}
      icon={
        badge ? (
          <Badge className="site-badge-count-109" count={counter} dot={true}>
            <img src={icon} height={IconSize} width={IconSize} alt="#" />
          </Badge>
        ) : antIcon ? (
          antIcon
        ) : icon ? (
          <AntTooltip value={toolTip} placement="bottom" color={"#FFFFFF"}>
            <img
              src={icon}
              height={IconSize}
              color={IconColor}
              width={IconSize}
              alt="#"
              className={className}
              style={{ marginRight: 6 }}
            />
          </AntTooltip>
        ) : null
      }
      size={size}
      // style={style}
      style={{
        backgroundColor:"transparent",
        border:"none"
      }}
      // className={`${buttonClass} ${isTablet && "CompBtnMobile w-fit"} `}
    >
      {title}
    </Button>
  );
};

export default SharedButton;
