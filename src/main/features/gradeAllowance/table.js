import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAllowanceGreadeData,
  removeGradeAllowance,
} from "./store/action";
import { updateInput } from "./store/slice";
import { handleUpdateButton, deleteSliceGradeAllowance } from "./store/slice";

import { AdminTable } from "../../sharedComponents/Administration/StyledComponents/adminTable";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const LeaveTable = () => {
  const { gradeAllowances } = useSelector((state) => state.AllGreadeAllowance);
  const [allowanceData, setAllowanceData] = useState(gradeAllowances);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAllowanceGreadeData());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "allowanceName",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "20%",
    },
    {
      title: "Amount",
      dataIndex: "value",
      width: "20%",
    },
    {
      title: "Grade Name",
      dataIndex: "gradeName",
      render: (text, record) => <span>{record.gradeName}</span>,
      width: "20%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            style={{ color: "blue", marginRight: 8 }}
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            style={{ color: "blue" }}
            onClick={() => handleRemove(record)}
          />
        </div>
      ),
      width: "20%",
    },
  ];
  useEffect(() => {
    setAllowanceData(gradeAllowances);
  }, [gradeAllowances]);
  const handleEdit = (record) => {
    dispatch(updateInput(record));
    dispatch(handleUpdateButton());
  };

  const handleRemove = (record) => {
    dispatch(deleteSliceGradeAllowance(record));
    dispatch(removeGradeAllowance(record.id));
    // dispatch(getAllAllowanceGreadeData());
  };
  return (
    <AdminTable
      className="allowanceTable"
      columns={columns}
      dataSource={allowanceData}
      rowHeight={20}
    />
  );
};

export default LeaveTable;
