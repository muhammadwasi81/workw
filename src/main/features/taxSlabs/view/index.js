import { useEffect, useState, useContext } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import Composer from "./Composer";
import { Form, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../style/style.css";
import {
  GetAllTaxSlabGroup,
  getTaxSlabById,
  removeTaxSlab,
} from "../store/action";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import "../style/taxSlabsGroup.css";
import { Table } from "../../../sharedComponents/customTable";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FormContainer } from "../../../sharedComponents/StyledComponents/adminForm";
import { FormHeader } from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import { handleEdit } from "../store/slice";
import { tableColumns } from "./TableColumn";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";

const { Panel } = Collapse;

const BusinessPolicy = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [filter, setFilter] = useState({ search: "", pageNo: 1, pageSize: 20 });
  const [defaultData, setDefaultData] = useState("");
  const [form] = Form.useForm();
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction, administration } = dictionaryList[
    userLanguage
  ];
  const { taxSlab } = administration;

  const { loader: loading, success, items, editData } = useSelector(
    (state) => state.taxSlabGroupSlice
  );

  useEffect(() => {
    dispatch(GetAllTaxSlabGroup(filter));
  }, [filter]);

  const handleCollapse = (key) => {};

  const handleRemove = (id) => {
    dispatch(removeTaxSlab(id));
  };

  const handleUpdate = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    //dispatch taxslabsbyID using item.id
    dispatch(getTaxSlabById(item.id));
    dispatch(handleEdit(item));
  };

  return (
    <div className="taxSlabGroupParent">
      <FormContainer>
        <FormHeader>Tax Slabs</FormHeader>
        <>
          <div className="flex justify-end py-3 mr-3">
            <SideDrawer
              title={editData ? "Update Tax Slab" : "Create Tax Slab"}
              buttonText={"Create"}
              success={success}
              openDrawer={openDrawer || !!editData}
              handleClose={() => dispatch(handleEdit(null))}
              setOpenDrawer={setOpenDrawer}
              setIsEdited={setIsEdited}
              form={form}
              isAccessDrawer={true}
              children={
                <Composer
                  editData={editData}
                  isDefault={isDefault}
                  isEdited={isEdited}
                  openDrawer={openDrawer}
                  id={id}
                  form={form}
                  defaultData={defaultData}
                />
              }
            />
          </div>
          {items.length > 0 ? (
            <AdminContainer>
              {items?.map((item, ind) => {
                return (
                  <>
                    <Collapse defaultActiveKey={0} onChange={handleCollapse}>
                      <Panel
                        header={item.name}
                        key={ind}
                        extra={[
                          <EditOutlined
                            onClick={(e) => handleUpdate(e, item)}
                          />,
                          <DeleteOutlined
                            onClick={() => handleRemove(item.id)}
                          />,
                        ]}
                      >
                        <div>
                          <Table
                            columns={tableColumns(taxSlab)}
                            dragable={true}
                            data={item.taxSlab && item.taxSlab}
                          />
                        </div>
                      </Panel>
                    </Collapse>
                  </>
                );
              })}
            </AdminContainer>
          ) : (
            <div className="flex justify-center">
              <strong>No Tax Slab Group...</strong>
            </div>
          )}
        </>
      </FormContainer>
    </div>
  );
};

export default BusinessPolicy;
