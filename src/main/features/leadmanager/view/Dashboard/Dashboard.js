import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";
import { Table } from "../../../../sharedComponents/customTable";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import ComposeEmail from "../Email/ComposeEmail";
import GridView from "./GridView/GridView";
import { tableColumn } from "./TableView/tableColumn";
import { Drawer } from "antd";
import BoardComposer from "../Composer/BoardComposer";
import { handleComposer } from "../../store/slice";
import { handleItemDetailModal } from "../../../../../utils/Shared/store/slice";
import ItemDetailModal from "../../../../sharedComponents/ItemDetails";
import { addLeadManagerService } from "../../services/services";
import {
  addLeadManagereMember,
  getAllLeadManagerMember,
} from "../../store/actions";

function LeadDashboard({ isTableView, dictionary, data, onChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payloadId, setPayloadId] = useState("");
  const { loading, memberData } = useSelector((state) => state.leadMangerSlice);
  const [visible, setVisible] = useState(false);
  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        const { id } = record;
        handleClickNavigation(id);
      }, // click row
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };
  const handleClickNavigation = (id) => {
    navigate(`${ROUTES.LEAD_MANAGER.LEAD_GROUP_DETAIL}${id}`);
  };

  const handleModalOpen = (e, rowData) => {
    e.stopPropagation();
    e.preventDefault();
    setVisible(true);
    dispatch(getAllLeadManagerMember(rowData.id));
    setPayloadId(rowData.id);
  };

  const addLeadMemberFunc = (id) => {
    let memberId = id.toString();
    const membersData = {
      id: payloadId,
      memberId: memberId,
    };
    dispatch(addLeadManagereMember(membersData));
  };

  return (
    <>
      <ItemDetailModal
        data={memberData} //Data of members will pass here in array
        isDeleteDisabled={true} //Pass true to hide delete icon
        addEnabled={true} //Pass false to hide select member
        addFunc={addLeadMemberFunc} // define and pass addMember action of particular members
        onDelete={false} // define and pass onDeletemember actions of particular members
        isSearch={false} //Pass true if you want to search the list
        openModal={true} // pass true if you want to open member details in modal other wise it display in listing
        visible={visible}
        setVisible={(da) => setVisible(da)}
      />
      {isTableView && (
        <Table
          columns={tableColumn(dictionary, (e, rowData) =>
            handleModalOpen(e, rowData)
          )}
          dragable={true}
          handleChange={onChange}
          // onPageChange={onPageChange}
          onRow={onRow}
          data={data ? data : []}
          // status={travelStatus}
          loading={loading}
          // success={success}
          // onActionClick={onActionClick}
        />
      )}
      {data?.length > 0 && !loading && !isTableView ? (
        <GridView
          data={data}
          loading={loading}
          dispatch={dispatch}
          handleClickNavigation={handleClickNavigation}
          dictionary={dictionary}
        />
      ) : (
        !loading && !isTableView && <NoDataFound />
      )}

      {/* 
	 		{!isTableView ? (
				<GridView
					data={data}
					loading={loading}
					dispatch={dispatch}
					handleClickNavigation={handleClickNavigation}
					dictionary={dictionary}
				/>
			) : (
				<Table
					columns={tableColumn(dictionary)}
					dragable={true}
					handleChange={onChange}
					// onPageChange={onPageChange}
					onRow={onRow}
					data={data ? data : []}
					// status={travelStatus}
					loading={loading}
					// success={success}
					// onActionClick={onActionClick}
				/>
			)} 
		*/}
      <ComposeEmail />
      {/* <Drawer
        open={isComposerOpen}
        width={"786px"}
        onClose={handleEditComposer}
        title={"Update Lead Manager"}
        className={"shared_drawer drawerSecondary"}
      >
        <BoardComposer isEdit={isEditComposer} loading={loading} />
      </Drawer> */}
    </>
  );
}

export default LeadDashboard;
