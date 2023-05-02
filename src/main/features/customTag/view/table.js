import { Skeleton } from "antd";
import { removeData } from "jquery";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
import { removeCustomTag,getAllCustomTag} from "../store/action";
import MemberModal from "./MemberModal";
import {
  AlignLeftOutlined,
  EyeOutlined,
  PaperClipOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  PictureOutlined,
  TagOutlined,
} from "@ant-design/icons";

import { customDeleted , addMember} from "../store/slice";
import { tableColumn } from "./tableColumn";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";

export default function CustomTagTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, grade, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];
  console.log("jkjll", sharedLabels);

  const { customTag , loadingData } = useSelector((state) => state.customTagSlice); 
  console.log(customTag,"customTag");

  const [id, setId] = useState();
  const [visible, setVisible] = useState(false);

  console.log(id,"idddd");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCustomTag());
  }, []);


  
  const onSuccess = (e) => {
    console.log(e.id);
    setId(null);
    dispatch(customDeleted(e));
    setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (e) => {
    setId(e.id);
    dispatch(removeCustomTag(e)).then(() => onSuccess(e), onError);
  };

  const handleMember =() => {
    dispatch(addMember({ status: true }));
    setVisible(true);
    console.log(visible,"visiblee");
  }

  return (
    <>
    <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        //grade,
        handleEdit,
        handleDelete,
        handleMember,
        removeButtons,
        actionRights,
        id,
        setClearButton,
        sharedLabels
      )}
      dataSource={customTag}
      pagination={false}
      rowKey="id"
      scroll={{ x: true }}
      size="small"
      locale={
        loadingData && {
          emptyText: (
            <Skeleton.Input
              active="true"
              size="small"
              block={true}
              loading={loadingData}
              round="true"
              shape="circle"
              style={{ width: "100%", marginBottom: 2 }}
            />
          ),
        }
      }
         
    />
    {visible && <MemberModal data={customTag}/>}
  </>        
  );
}
