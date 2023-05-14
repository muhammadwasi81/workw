import { Skeleton,Form, Select, Avatar } from "antd";
import { removeData } from "jquery";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
import { Table } from "../../../sharedComponents/customTable";
import { removeCustomTag,getAllCustomTag,addCustomTagMember} from "../store/action";
import {
  AlignLeftOutlined,
  EyeOutlined,
  PaperClipOutlined,
  PlusOutlined,
  UnorderedListOutlined, 
  PictureOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { customDeleted , addMember,handleMemberModal} from "../store/slice";
import { tableColumn } from "./tableColumn";
import  MemberModal  from "./MemberModal";
import DetailModal from "../../../sharedComponents/ItemDetails";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
export default function CustomTagTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {
  //console.log(data,"customtagdatais");
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, grade, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];
  console.log("jkjll", sharedLabels);
  const [recordData,setrecordData] = useState({});
  const [selectedRecord,setselectedRecord] = useState([]);
  console.log(recordData,"recordDatarecordData");
  const { customTag, loadingData } = useSelector((state) => state.customTagSlice);
  //const { customTagMembers } = useSelector(state => state.customTagSlice);
  const memberData = useSelector((state) => state.customTagSlice);
  
  console.log(memberData,"abcfggg");
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    dispatch(
      getAllCustomTag({
        pageNo: 1,
        pageSize: 20,
        search:"",
        sortBy: 1,
      })
    );
  }, []);
  const [id, setId] = useState();
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
  const addFunc = (myid) => {
    console.log(myid, "myid");
    let memberId = myid.toString();
    const membersData = {
      id: recordData.id,
      memberId: memberId,
    };
   dispatch(addCustomTagMember(membersData));
  //   console.log(membersData, "membersData");
  //   let a = recordData.members.filter((item) => {
  //     return item.member.id === membersData.memberId;
  //   });
  //   let b = a[0] ? a[0].memberId : "";
  //   if (membersData.memberId === b) {
  //     //return error("Member Already Added");
  //   } else {
  //     dispatch(addCustomTagMember(membersData));
  //   }
   };
    const onDelete = (myid) => {
      const memberId = myid.toString();
      const delMembers = {
        //id: data.id,
        memberId: memberId,
      };
  
      //dispatch(deleteLeadManagerById(delMembers));
    };
  const handelState = () =>{
    setVisible(true);
    dispatch(addMember({ status: true }));
    console.log("helooooo");
  }
 
  return (
    <>
    <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        handelState,
        grade,
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        id,
        setClearButton,
        sharedLabels,
        setrecordData,
        setselectedRecord,
        selectedRecord,
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
       <DetailModal
          data={recordData?.members}     //Data of members will pass here in array
          isDeleteDisabled={false}          //Pass true to hide delete icon
          addEnabled={true}                 //Pass false to hide select member
          addFunc={addFunc}               // define and pass addMember action of particular members
          onDelete={onDelete}             // define and pass onDeletemember actions of particular members
          isSearch={false}                  //Pass true if you want to search the list
          openModal={true}                  // pass true if you want to open member details in modal other wise it display in listing
          visible={visible}
          setVisible={(da) => setVisible(da)}
        />
      
    </>  
  );
}