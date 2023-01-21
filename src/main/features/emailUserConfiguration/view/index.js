import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import {
  addUserEmailConfiguration,
  getAllBussinessEmailConfiguration,
} from "../store/actions";
import EmailConfigurationForm from "./form.js";
import EmailConfigurationTable from "./table.js";

export default function UserEmailConfiguration() {
  //TODO: changes will be done according to the user configuration
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
  const { loader } = useSelector((state) => state.emailUserConfigurationSlice);

  useEffect(() => {
    console.log("getall userConfiguration");
    dispatch(getAllBussinessEmailConfiguration());
  }, []);

  const handleDelete = (e) => {
    // dispatch(removeEmailConfiguration(e));
    console.log("handle delete");
  };

  const onSubmit = (e) => {
    if (!e.id) {
      dispatch(addUserEmailConfiguration(e));
      setemailConfiguration(initialState);
      return;
    }
    // dispatch(updateEmailConfiguration(e));
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
