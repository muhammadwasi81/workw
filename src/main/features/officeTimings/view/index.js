import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import OfficeTimingComposer from "./officeTimingComposer";
import { getOfficeTimingByIdAction } from "../store/actions";
import { Form } from "antd";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";

import OfficeTimingTable from "./table.js";
import { handleComposer } from "../store/slice";
import { getAllOfficeTimingService } from "../services/service";

export default function OfficeTiming() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, office, Direction } = dictionaryList[userLanguage];
  const [isEdited, setIsEdited] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { editData, success } = useSelector((state) => state.officeTimingSlice);

  const handleEdit = async (data) => {
    // const result = await getAllOfficeTimingService();
    // const filteredData = result.data.filter((itm) => data.id === itm.id);
    // setFormData(filteredData);
    console.log(data.id, "idddd");
    setIsEdited(true);
    dispatch(getOfficeTimingByIdAction(data.id));
    dispatch(handleComposer(data));
  };
  return (
    <AdminContainer>
      <div
        className="headerView"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "10px",
        }}
      >
        <div className="right-menu">
          <div className="btn-hld">
            <SideDrawer
              title={isEdited ? "Update Office Timing" : "Create Office Timing"}
              buttonText={"Create Office Timing"}
              success={success}
              openDrawer={openDrawer || !!editData}
              setOpenDrawer={setOpenDrawer}
              setIsEdited={setIsEdited}
              handleClose={() => dispatch(handleComposer(null))}
              form={form}
              isAccessDrawer={true}
              children={
                <OfficeTimingComposer
                  editData={editData}
                  isEdited={isEdited}
                  //formData={formData}
                  form={form}
                />
              }
            />
          </div>
        </div>
      </div>
      <OfficeTimingTable
        handleEdit={handleEdit}
        // handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
