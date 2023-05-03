import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import {
  addUserEmailConfiguration,
  getAllBussinessEmailConfiguration,
  getAllUserEmailConfigurations,
  updateUserEmailConfiguration,
} from "../store/actions";
import EmailConfigurationForm from "./form.js";
import { useParams } from "react-router-dom";
import EmailConfigurationTable from "./table.js";
import { openNotification } from "../../../../utils/Shared/store/slice";

export default function UserEmailConfiguration(props) {
  const { renderTable = true } = props;
  let { id } = useParams();

  id = props?.id ?? id;

  console.log(id, props, "PROPS");
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
  const {
    loader,
    bussinessEmailConfigurations,
    userEmailConfigurations,
  } = useSelector((state) => state.emailUserConfigurationSlice);

  useEffect(() => {
    if (bussinessEmailConfigurations.length > 0) {
      const bussinessEmailConfig = {
        name: bussinessEmailConfigurations[0].name,
        incomingPort: bussinessEmailConfigurations[0].incomingPort,
        incomingServerAddress:
          bussinessEmailConfigurations[0].incomingServerAddress,
        outgoingPort: bussinessEmailConfigurations[0].outgoingPort,
        outgoingServerAddress:
          bussinessEmailConfigurations[0].outgoingServerAddress,
        provider: bussinessEmailConfigurations[0].provider,
      };
      setemailConfiguration(bussinessEmailConfig);
    }
    console.log(
      bussinessEmailConfigurations,
      "==bussinessEmailConfigurations=="
    );
  }, [bussinessEmailConfigurations]);

  useEffect(() => {
    dispatch(getAllBussinessEmailConfiguration());
  }, []);

  const handleDelete = (e) => {
    // dispatch(removeEmailConfiguration(e));
    console.log("handle delete");
  };

  const onSubmit = (e) => {
    if (!e.id) {
      const payload = {
        ...e,
        userId: id,
      };
      //check if there is already an configuration exist
      dispatch(addUserEmailConfiguration(payload));
      setemailConfiguration(initialState);
      // if (userEmailConfigurations.length > 0) {
      //   //todo error msg show that already exist configuration
      //   dispatch(
      //     openNotification({
      //       message: "Email configuration already exist",
      //       type: "error",
      //       duration: 2,
      //     })
      //   );
      //   setemailConfiguration(initialState);
      //   return;
      // } else {
      //   dispatch(addUserEmailConfiguration(payload));
      //   setemailConfiguration(initialState);
      // }
      return;
    }
    dispatch(updateUserEmailConfiguration(e));
    setemailConfiguration(initialState);
  };
  return (
    <AdminContainer>
      <EmailConfigurationForm
        data={emailConfiguration}
        onSubmit={onSubmit}
        loading={loader}
      />
      {renderTable && (
        <EmailConfigurationTable
          handleEdit={setemailConfiguration}
          handleDelete={handleDelete}
          actionRights={[1, 2]}
        />
      )}
    </AdminContainer>
  );
}
