import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import Forms from "./forms";
import EditForm from "./forms/EditForm/EditForm";
import { CreateFormParent } from "./forms/CreateForm/CreateFormParent";
import ResponseFormDetails from "./forms/formDetail";
import ResponseComponent from "./forms/formDetail/responseComponent";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Forms />} />
      <Route
        path={`${ROUTES.FORMS.CREATE_FORM}`}
        element={<CreateFormParent />}
      />
      <Route
        path={`${ROUTES.FORMS.RESPONSE_DETAIL_FORM}/:id`}
        element={<ResponseFormDetails />}
      />
      <Route
        path={`${ROUTES.FORMS.RESPONSE}/:id`}
        element={<ResponseComponent />}
      />
      <Route path={`${ROUTES.FORMS.EDIT_FORM}/:id`} element={<EditForm />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
