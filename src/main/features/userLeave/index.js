// import { Button, Table } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { getUserLeave } from "../userLeave/store/actions";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const UserLeave = () => {
//   const { id } = useParams();
//   console.log(id, "id");
//   const dispatch = useDispatch();
//   const { allLeaves } = useSelector((state) => state.userLeaveSlice);
//   const [allocatedLeaves, setAllocatedLeaves] = useState("");
//   const [availedLeaves, setAvailedLeaves] = useState("");
//   const [newUserId, setNewUserId] = useState("");

//   console.log(allLeaves, "allLeaves");
//   console.log(newUserId, "newUserId");

//   useEffect(() => {
//     dispatch(getUserLeave(id));
//   }, []);
//   console.log(newUserId, "newUserId");
//   const handleSubmit = () => {
//     console.log(allocatedLeaves, "allocatedLeaves");
//     console.log(availedLeaves, "availedLeaves");
//     const payload = {
//       userId: id,
//       id: newUserId.id,
//       availed: Number(availedLeaves),
//       allocatedLeaves: Number(allocatedLeaves),
//       leaveTypeId: newUserId.leaveTypeId,
//     };
//     console.log([payload], "PAYLOAD");
//   };
//   const columns = [
//     {
//       title: "Leave Type",
//       dataIndex: "leaveType",
//       key: "leaveType",
//     },
//     {
//       title: "Allocated",
//       dataIndex: "allocatedLeaves",
//       key: "allocatedLeaves",
//       editable: true,
//       render: (value, rowIndex) => {
//         setNewUserId(rowIndex);
//         console.log(value, "value");
//         console.log(
//           [rowIndex].map((x) => x.id),
//           "[rowIndex]"
//         );
//         return (
//           <input
//             type="number"
//             defaultValue={value}
//             value={allocatedLeaves || value}
//             onChange={(e) => setAllocatedLeaves(e.target.value)}
//           />
//         );
//       },
//     },
//     {
//       title: "Availed",
//       dataIndex: "availed",
//       key: "availed",
//       render: (value, rowIndex) => {
//         setNewUserId(rowIndex);
//         console.log(value, "value");
//         console.log(
//           [rowIndex].map((x) => x.id),
//           "[rowIndex]"
//         );
//         return (
//           <input
//             type="number"
//             defaultValue={value}
//             value={allocatedLeaves || value}
//             onChange={(e) => setAllocatedLeaves(e.target.value)}
//           />
//         );
//       },
//     },
//   ];

//   return (
//     <div>
//       <Table columns={columns} dragable={true} dataSource={allLeaves} />
//       <Button onClick={handleSubmit}>Update</Button>
//     </div>
//   );
// };

// export default UserLeave;
import { Button, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUserLeave, updateUserLeave } from "../userLeave/store/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserLeave = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserLeave(id));
  }, []);

  console.log(id, "id");

  const { allLeaves } = useSelector((state) => state.userLeaveSlice);
  const [Initialinputs, setInitialinputs] = useState(allLeaves || []);
  const [payload, setPayload] = useState([]);

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
      editable: true,
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
        leaveType: <h2 className="w-48">{row.leaveType}</h2>,
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
    console.log(Initialinputs, "Initialinputs2");

    dispatch(updateUserLeave({ Initialinputs: Initialinputs, id: id }));
  };
  return (
    <div>
      <Table dataSource={renderTableRows()} columns={columns} />
      <Button
        onClick={() => {
          handleUpdate();
        }}
      >
        {" "}
        Update
      </Button>
    </div>
  );
};

export default UserLeave;
