import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ROUTES } from "../../../../../../utils/routes";
import LayoutHeader from "../../../../../layout/header";

function Header() {
  const { id } = useParams();
  const items = [
    {
      name: "Form",
      renderButton: [1],
      to: `${ROUTES.FORMS.ROOT}/${ROUTES.FORMS.RESPONSE_DETAIL_FORM}/${id}`,
    },
    {
      name: "Response",
      renderButton: [1],
      to: `${ROUTES.FORMS.ROOT}/${ROUTES.FORMS.RESPONSE}/${id}`,
    },
  ];

  return <LayoutHeader backButton={false} items={items} />;
}

export default Header;
