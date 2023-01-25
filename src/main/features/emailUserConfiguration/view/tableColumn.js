import { DeleteFilled, EditFilled } from "@ant-design/icons";
const Edit = (handleEdit, row) => {
  return (
    <EditFilled
      style={{ color: "#1b5669" }}
      onClick={(e) =>
        handleEdit({
          id: row.id,
          name: row.name,
          incomingPort: row.incomingPort,
          incomingServerAddress: row.incomingServerAddress,
          outgoingPort: row.outgoingPort,
          outgoingServerAddress: row.outgoingServerAddress,
          provider: row.provider,
        })
      }
    />
  );
};

// const Delete = (handleDelete, row) => {
//   return (
//     <DeleteFilled
//       style={{ color: "#1b5669" }}
//       onClick={(e) => handleDelete({ id: row.id })}
//     />
//   );
// };

export const tableColumn = (
  handleEdit,
  handleDelete,
  removeButtons = false,
  rights,
  emailConfiDictionary
) => {
  return [
    { title: emailConfiDictionary.name, dataIndex: "name", width: "10%" },
    {
      title: emailConfiDictionary.incomingPort,
      dataIndex: "incomingPort",
      width: "10%",
    },
    {
      title: emailConfiDictionary.incomingServerAddress,
      dataIndex: "incomingServerAddress",
      width: "15%",
    },
    {
      title: emailConfiDictionary.outgoingPort,
      dataIndex: "outgoingPort",
      width: "10%",
    },
    {
      title: emailConfiDictionary.outgoingServerAddress,
      dataIndex: "outgoingServerAddress",
      width: "20%",
    },
    {
      title: emailConfiDictionary.provider,
      dataIndex: "provider",
      width: "15%",
    },

    removeButtons
      ? {}
      : {
          align: "right",
          render: (_, row) => {
            if (rights.length <= 0) return;

            if (rights.includes(1) && rights.includes(2))
              return (
                <>
                  {Edit(handleEdit, row)}
                  {/* {Delete(handleDelete, row)} */}
                </>
              );

            if (rights.includes(1)) return Edit(handleEdit, row);

            // if (rights.includes(2)) return Delete(handleDelete, row);
          },
        },
  ];
};
