import React, { useContext } from "react";
import Header from "../../../../layout/header/index";
import { ROUTES } from "../../../../../utils/routes";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Index = () => {

  return (
    <Header
      items={[
        {
          name: "Forms",
          to: `${ROUTES.FORMS.ROOT}`,
          renderButton: [1],
        }
      ]}
      buttons={[
        {
          render:
            <Link to={ROUTES.FORMS.CREATE_FORM} >
              <Button className="headerBtn">
                Create Form
              </Button>
            </Link>,
        }
      ]}
    />
  );
};

export default Index;
