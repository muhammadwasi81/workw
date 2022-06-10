import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const DropDownMenu = ({ items }) => (
  <Menu
    items={[
      ...items.map(({ buttonText, onClick, to }, index) => {
        return {
          key: index,
          label: to ? (
            <Link to={to}>{buttonText}</Link>
          ) : (
            <a
              href={buttonText}
              onClick={(e) => {
                e.preventDefault();
                onClick();
              }}
            >
              {buttonText}
            </a>
          ),
        };
      }),
    ]}
  />
);

export default DropDownMenu;
