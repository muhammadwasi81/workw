import React from "react";
import { Button, Badge } from "antd";
import AntTooltip from "../Tooltip/AntTooltip";

const Index = ({
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
}) => {
  return (
    <Button
      onClick={() => onClick()}
      type={type}
      disabled={disabled}
      loading={loading}
      shape={shape}
      htmlType={htmlType}
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
      style={style}
      className={buttonClass}>
      {title}
    </Button>
  );
};

export default Index;
