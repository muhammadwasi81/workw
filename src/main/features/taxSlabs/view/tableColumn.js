import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm } from "antd";
const Edit = (handleEdit, row, setClearButton) => {
  return (
    <EditFilled
      style={{color: "#1b5669"}}
      onClick={(e) => {
        handleEdit({
          id: row.id,
          name: row.name,
          min: row.min,
          max: row.max,
          percentage: row.percentage,
          previousCharge: row.previousCharge,
        }); 
        setClearButton(true)
      }
      }
    />
  );
};

const Delete = (handleDelete, row) => {
  return  <Popconfirm 
            title="Sure to delete?"
            onConfirm={(e) => handleDelete({ id: row.id})}
          >
              <DeleteFilled  style={{color: "#1b5669"}} />
          </Popconfirm>;
};

export const tableColumn = (
  taxSlab,
  handleEdit,
  handleDelete,
  removeButtons = false,
  rights,
  id,
  setClearButton,
  sharedLabels,
) => {
  return [
    { title: [sharedLabels.name], dataIndex: "name", width: "20%", key: 1 },
    { title: [sharedLabels.min], dataIndex: "min", width: "15%", key: 2 },
    { title: [sharedLabels.max], dataIndex: "max", width: "15%", key: 3 },
    { title: [sharedLabels.percentage], dataIndex: "percentage", width: "10%", key: 4 },
    { title: [sharedLabels.previousCharge], dataIndex: "previousCharge", width: "20%", key: 5 },
    removeButtons
      ? {}
      : {
          align: "right",
          key: 3,
          render: (_, row) => {
            if (id && row.id === id) return <LoadingOutlined key={row} />
            if (rights.length <= 0) return;
            
            if (rights.includes(1) && rights.includes(2))
              return (
                <>
                  {Edit(handleEdit, row, setClearButton)} {Delete(handleDelete, row)}
                </>
              );

            if (rights.includes(1)) return Edit(handleEdit, row);

            if (rights.includes(2)) return Delete(handleDelete, row);
          },
        },
  ];
};
