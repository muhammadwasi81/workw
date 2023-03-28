import { Button, Table, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUserLeave, updateUserLeave } from "../userLeave/store/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

const UserLeave = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserLeave(id));
  }, []);

  const { allLeaves } = useSelector((state) => state.userLeaveSlice);
  const [Initialinputs, setInitialinputs] = useState(allLeaves || []);

  useEffect(() => {
    setInitialinputs(allLeaves);
  }, [allLeaves]);
  const columns = [
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Allocated",
      dataIndex: "allocatedLeaves",
      key: "allocatedLeaves",
    },
    {
      title: "Availed",
      dataIndex: "availed",
      key: "availed",
    },
  ];

  const renderTableRows = () => {
    return Initialinputs.map((row, index) => {
      return {
        leaveType: <h2 className="w-48 mt-2">{row.leaveType}</h2>,

        allocatedLeaves: (
          <input
            defaultValue={row.allocatedLeaves}
            className="bg-transparent"
            type="number"
            value={row.name}
            onChange={(event) =>
              handleInputChange(event, index, "allocatedLeaves")
            }
          />
        ),

        availed: (
          <input
            defaultValue={row.availed}
            className="bg-transparent"
            type="number"
            value={row.age}
            onChange={(event) => handleInputChange(event, index, "availed")}
          />
        ),
      };
    });
  };

  console.log(Initialinputs, "Initialinputs");
  const handleInputChange = (event, rowIndex, field) => {
    const newData = Initialinputs.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          [field]: Number(event.target.value),
        };
      }

      return row;
    });
    setInitialinputs(newData);
  };
  const handleUpdate = () => {
    const payload = {
      Initialinputs: Initialinputs,
      id: id,
    };
    dispatch(updateUserLeave(payload));
  };
  console.log(Initialinputs, "Initialinputs");
  return (
    <div>
      <Divider orientation="left">
        <h2 style={{ fontSize: 19 }}>
          <b>Leaves info</b>
        </h2>
      </Divider>
      <Table dataSource={renderTableRows()} columns={columns} />

      <Button
        className="btn ThemeBtn mt-1"
        icon={<EditOutlined />}
        onClick={handleUpdate}
        disabled={Initialinputs.length === 0 ? true : false}
      >
        Update Leave
      </Button>
    </div>
  );
};

export default UserLeave;
