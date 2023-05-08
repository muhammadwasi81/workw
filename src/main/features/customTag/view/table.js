import { Skeleton,Form, Select, Avatar } from "antd";
import { removeData } from "jquery";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
import { Table } from "../../../sharedComponents/customTable";

import { removeCustomTag,getAllCustomTag,getAllCustomTagMember} from "../store/action";
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

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";

export default function CustomTagTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
  visibleModal
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, grade, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];
  console.log("jkjll", sharedLabels);

  const { customTag, loadingData } = useSelector((state) => state.customTagSlice);
  //const { customTagMembers } = useSelector(state => state.customTagSlice);
  const memberData = useSelector((state) => state.customTagSlice);

  console.log(memberData,"abcfggg");

  console.log(customTag.data,"abccccc");

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

  const onRow = (record, rowIndex) => {
		return {
			onClick: event => {
         setVisible(true);
        // console.log("visibleeee",visible);
         dispatch(addMember({ status: true }));
				//dispatch(getLeadManagerDetailById(record.id));
				//dispatch(handleSectionDetailModal());
			}, // click row
			onDoubleClick: event => {}, // double click row
			onContextMenu: event => {}, // right button click row
			onMouseEnter: event => {}, // mouse enter row
			onMouseLeave: event => {}, // mouse leave row
		};
	};

  const handleModal = (id) => {
    visibleModal(true);
    dispatch(addMember({ status: true }));
    console.log("helllooooo");
	};

  return (
    <>
    <Table
			columns={tableColumn(
        grade,
        handleEdit,
        handleDelete,
        removeButtons,
        handleModal,
        actionRights,
        id,
        setClearButton,
        sharedLabels
      )}
			dragable={false}
			onRow={onRow}
			data={customTag}
			//   columns={tableColumns(dictionary)}
			// handleChange={handleColumnSorting}
			// onPageChange={onPageChange}
			// status={travelStatus}
			// loading={loader}
			// success={success}
			// onActionClick={onActionClick}
		/>
    
    {/* <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        grade,
        handleEdit,
        handleDelete,
        removeButtons,
        handleMemberModal,
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
    /> */}

   
    {visible && <MemberModal data={customTag}/>}
    

      
    </>  
  );
}
