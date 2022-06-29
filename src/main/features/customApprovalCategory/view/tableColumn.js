import { DeleteFilled, EditFilled } from "@ant-design/icons";
const Edit = (handleEdit, row) => {
  return (
    <EditFilled
      style={{ color: "#1b5669" }}
      onClick={(e) =>
        handleEdit({
          id: row.id,
          name: row.name,
          description: row.description,
        })
      }
    />
  );
};

const Delete = (handleDelete, row) => {
  return <DeleteFilled style={{ color: "#1b5669" }} onClick={(e) => handleDelete({ id: row.id })} />;
};

export const tableColumn = (handleEdit, handleDelete, removeButtons = false, rights) => {
  return [
    { title: "Name", dataIndex: "name", width: "20%" },
    { title: "Description", dataIndex: "description", width: "20%" },
    { title: "Description", dataIndex: "description", width: "20%" },
    removeButtons
      ? {}
      : {
          align: "right",
          render: (_, row) => {
            if (rights.length <= 0) return;

            if (rights.includes(1) && rights.includes(2))
              return (
                <>
                  {Edit(handleEdit, row)} {Delete(handleDelete, row)}
                </>
              );

            if (rights.includes(1)) return Edit(handleEdit, row);

            if (rights.includes(2)) return Delete(handleDelete, row);
          },
        },
  ];
};
