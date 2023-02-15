import React, { useEffect } from "react";
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

function LeadDashboard({ isTableView, dictionary, data, onChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const loading = useSelector((state) => state.leadMangerSlice.loading);
  const { loading, success, isComposerOpen, isEditComposer } = useSelector(
    (state) => state.leadMangerSlice
  );
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
  const handleEditComposer = () => {
    dispatch(handleComposer({ isOpen: false, isEdit: false }));
  };
  return (
    <>
      {isTableView && (
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
