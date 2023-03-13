import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import {
  addEmailConfiguration,
  removeEmailConfiguration,
  updateEmailConfiguration,
} from "../store/actions";
import EmailConfigurationForm from "./form.js";
import EmailConfigurationTable from "./table.js";

export default function EmailConfiguration() {
  const initialState = {
    name: "",
    incomingPort: "",
    incomingServerAddress: "",
    outgoingPort: "",
    outgoingServerAddress: "",
    provider: "",
  };
  const [emailConfiguration, setemailConfiguration] = useState(initialState);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.emailConfigurationSlice);

  const handleDelete = (e) => {
    dispatch(removeEmailConfiguration(e));
  };

  const onSubmit = (e) => {
    if (!e.id) {
      dispatch(addEmailConfiguration(e));
      setemailConfiguration(initialState);
      return;
    }
    dispatch(updateEmailConfiguration(e));
    setemailConfiguration(initialState);
  };
  return (
    <AdminContainer>
      <EmailConfigurationForm
        data={emailConfiguration}
        onSubmit={onSubmit}
        loading={loader}
      />
      <EmailConfigurationTable
        handleEdit={setemailConfiguration}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
