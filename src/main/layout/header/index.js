import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "antd";
import DropDownMenu from "./DropDownMenu";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
function Header({ items, buttons, backButton }) {
  const { pathname } = useLocation();
  const [activeLinks, setActiveLinks] = useState(items.map(() => false));
  const env = process.env.NODE_ENV === "development";
  const length = env ? 2 : 3;
  const [currentLink, setCurrentLink] = useState(0);
  const navigate = useNavigate();
  const pathLength = pathname.split("/").length;
  const backBtnShow = pathLength > length;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  useEffect(() => {
    const actives = items.map((navitem, index) => {
      if (navitem.to.includes(pathname)) {
        setCurrentLink(index);
        return true;
      } else {
        return false;
      }
    });
    setActiveLinks(actives);
  }, [pathname]);
  const renderButtonArr =
    items[currentLink].renderButton && items[currentLink].renderButton;

  const filterButtons = buttons.filter((button, index) => {
    return renderButtonArr && renderButtonArr.includes(index + 1);
  });

  const renderButton = (button, index) => {
    const { onClick, icon, buttonText, to, render } = button;
    if (render) {
      return render;
    } else {
      if (to) {
        if (!pathname.includes(to)) {
          return (
            <Link key={index} className="headerBtn" onClick={onClick} to={to}>
              {icon && icon}
              {buttonText}
            </Link>
          );
        }
      } else {
        return (
          <Button key={index} className="headerBtn" onClick={onClick}>
            {icon && icon}
            {buttonText}
          </Button>
        );
      }
    }
  };
  let classes = "header ";
  classes += Direction === "rtl" ? "rtl" : "";
  return (
    <div className={classes}>
      <div className="left">
        {backBtnShow && backButton && (
          <Button className="backBtn" onClick={() => navigate(-1)}>
            <LeftOutlined />
          </Button>
        )}
        <ul className="list">
          {items.map(({ name, to }, index) => (
            <li className="list__item" key={index}>
              <Link to={to} className={activeLinks[index] ? "active" : ""}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="right">
        <div className="buttons">
          {filterButtons.map((button, index) => renderButton(button, index))}
        </div>
        <div className="dropDown">
          <Dropdown
            overlayClassName="headerDropDown"
            overlay={<DropDownMenu items={filterButtons} />}
            placement="left"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <Button className="addBtn">
              <PlusOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
Header.defaultProps = {
  buttons: [],
  backButton: true,
};
export default Header;
