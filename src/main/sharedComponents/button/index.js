import React from 'react';
import { Button, Badge } from 'antd';
import AntTooltip from '../Tooltip/AntTooltip';
import { useMediaQuery } from 'react-responsive';

const SharedButton = ({
  type = 'primary',
  shape = 'circle',
  icon,
  IconSize = 12,
  title,
  size = 'small',
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
  isHide = false,
}) => {
  const isTablet = useMediaQuery({ maxWidth: 650 });

  if (isHide) return <></>;

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
          <AntTooltip value={toolTip} placement="bottom" color={'#FFFFFF'}>
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
      className={`defaultBtn ${buttonClass}  `}
    >
      {title}
    </Button>
  );
};

export default SharedButton;
