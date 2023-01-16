import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { CardWrapper2 } from "../../../sharedComponents/Card/CardStyle";
import { Table } from "../../../sharedComponents/customTable";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";
import Spinner from "../../../sharedComponents/spinner/spinner";
import { WorkBoardReferenceTypeEnum } from "../enum";
import { getAllWorkBoard } from "../store/action";
import { tableColumn } from "./tableColumns";
import WorkBoardCard from "./WorkBoardCard";

function WorkBoardDashboard({
  isTableView,
  referenceType = WorkBoardReferenceTypeEnum.General,
  referenceId = defaultUiid,
  onChange,
}) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const workboardsListData = useSelector(
    (state) => state.trelloSlice.workboardsList
  );
  console.log(workboardsListData, "workboardList");
  const loader = useSelector((state) => state.trelloSlice.loader);
  // useEffect(() => {
  // 	dispatch(
  // 		getAllWorkBoard({
  // 			pageNo: 1,
  // 			pageSize: 20,
  // 			search: "",
  // 			referenceId,
  // 			referenceType,
  // 		})
  // 	);
  // }, []);

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        const { id } = record;
        navigate(`${ROUTES.WORKBOARD.BOARD}${id}`);
      }, // click row
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };

  return (
    <>
      {isTableView && (
        <Table
          columns={tableColumn()}
          dragable={true}
          handleChange={onChange}
          onRow={onRow}
          data={workboardsListData ? workboardsListData : []}
          // status={travelStatus}
          // loadding={loader}
          // success={success}
          // onActionClick={onActionClick}
          // onPageChange={onPageChange}
        />
      )}

      {workboardsListData?.length > 0 && !loader && !isTableView ? (
        <CardWrapper2>
          {workboardsListData.map((data) => (
            <WorkBoardCard data={data} />
          ))}
        </CardWrapper2>
      ) : (
        !loader && !isTableView && <NoDataFound />
      )}

      {/* {!isTableView ? (
        <CardWrapper2>
          {workboardsListData.map((data) => (
            <WorkBoardCard data={data} />
          ))}
        </CardWrapper2>
      ) : (
        <Table
          columns={tableColumn()}
          dragable={true}
          handleChange={onChange}
          // onPageChange={onPageChange}
          onRow={onRow}
          data={workboardsListData ? workboardsListData : []}
          // status={travelStatus}
          // loadding={loader}
          // success={success}
          // onActionClick={onActionClick}
        />
      )} */}
    </>
  );
}

export default WorkBoardDashboard;
