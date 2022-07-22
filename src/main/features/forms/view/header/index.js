import React, { useContext } from "react";
import Header from "../../../../layout/header/index";
import { ROUTES } from "../../../../../utils/routes";
import { Button } from "antd";

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
          render: <Button className="headerBtn" >
            Create Form
          </Button>,
        }
      ]}
    />
  );
};

export default Index;
