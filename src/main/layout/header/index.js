import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

function Header({ items }) {
  const { pathname } = useLocation();
  const [activeLinks, setActiveLinks] = useState(items.map(() => false));
  useEffect(() => {
    const actives = items.map((navitem, index) => {});
    setActiveLinks(actives);
  }, [pathname]);

  return (
    <div className="header">
      <div className="left">
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
      <div className="right"></div>
    </div>
  );
}

export default Header;
