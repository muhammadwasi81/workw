import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Popconfirm } from 'antd';


const Edit = (handleEdit, row) => {
  return (
    <EditFilled
      style={{ color: "#1b5669" }}
      onClick={(e) =>
        handleEdit({
          id: row.id,
          designationId: row.designationId,
          description: row.description,
        })
      }
    />
  );
};

const Delete = (handleDelete, row) => {
  return (
    <Popconfirm
		title="Sure to delete?"
		onConfirm={(e) => handleDelete({ id: row.id })}
	  >
		<DeleteFilled style={{ color: '#1b5669' }} />
	  </Popconfirm>
  );
};

export const tableColumn = (
  handleEdit,
  handleDelete,
  removeButtons = false,
  rights,
  jobDescDictionary
) => {
  return [
    {
      title: jobDescDictionary.name,
      dataIndex: "designation",
      width: "15%",
    },
    {
      title: jobDescDictionary.desc,
      dataIndex: "description",
      width: "85%",
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
                  {Edit(handleEdit, row)} {Delete(handleDelete, row)}
                </>
              );

            if (rights.includes(1)) return Edit(handleEdit, row);

            if (rights.includes(2)) return Delete(handleDelete, row);
          },
        },
  ];
};
