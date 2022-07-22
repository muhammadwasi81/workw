import { useContext, useEffect, useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import Composer from "./BusinessPolicyComposer";
import { Form, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../style/businessPolicy.css";
import "../style/style.css"
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { getAllBusinessPolicy, removeBusinessPolicy } from "../store/action";
import "../style/businessPolicy.css";
import {
    EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { handleEdit } from "../store/slice";
const { Panel } = Collapse;



function BusinessPolicy(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, Direction, sharedLabels } = dictionaryList[userLanguage];
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [defaultData, setDefaultData] = useState();
  const [form] = Form.useForm();
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const { loader: loading, success, businessPolicies, editData } = useSelector((state) => state.businessPolicySlice);

  useEffect(() => {
    dispatch(getAllBusinessPolicy())
  }, [])

  const onCollpase = (key) => {
  };

  const onRemove =((e, id) => {
    e.preventDefault()
    e.stopPropagation();
    dispatch(removeBusinessPolicy(id))
  })

  const onEdit = ((e, item) => {
    e.preventDefault()
    e.stopPropagation();
    dispatch(handleEdit(item))
  })

  



  return (
    <>
      <div className="BusinessPolicyView w-full">
        <div className={"flex justify-between"}>
          <h2>
            Business Policies
          </h2>
          <SideDrawer
            title={ editData ? "Update" :  "Create" }
            buttonText={"Create"}
            success={success}
            openDrawer={openDrawer || !!editData}
            handleClose={() => dispatch(handleEdit(null))}
            setOpenDrawer={setOpenDrawer}
            setIsEdited={setIsEdited}
            form={form}
            isAccessDrawer={true}
            children={
            //  (!!editData || openDrawer ) && 
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
        {
          businessPolicies?.map((item, ind) => {
            return (<>
              <Collapse defaultActiveKey={0} onChange={onCollpase}>
                <Panel header={item.name} key={ind} extra={[<EditOutlined onClick={(e) => onEdit(e,item)} />, <DeleteOutlined onClick={(e) => onRemove(e,item.id)} />]}>
                  <div dangerouslySetInnerHTML={{__html: item.description}} ></div>
                </Panel>
              </Collapse>
            </>)
          })
        }
      </div>
    </>
  );
}

export default BusinessPolicy;
