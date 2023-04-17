import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRewards } from "../../reward/store/actions";
import { Table } from "antd";
import { AwardsDataTable } from "./awardsTable";

const AwardsTable = () => {
  const dispatch = useDispatch();
  const { rewards } = useSelector((state) => state.rewardSlice);
  useEffect(() => {
    dispatch(getAllRewards({ filter: 3 }));
  }, []);

  return (
    <Table
      bordered
      columns={AwardsDataTable}
      className="custom_table"
      dataSource={rewards ? rewards : []}
    />
  );
};

export default AwardsTable;
