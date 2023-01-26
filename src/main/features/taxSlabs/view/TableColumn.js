import { EditFilled } from "@ant-design/icons";
import { userTypeList } from "../../../../utils/Shared/enums/enums";
const Edit = (handleEdit, row) => {
  return (
    <EditFilled
      style={{ color: "#1b5669" }}
      onClick={(e) =>
        handleEdit({
          id: row.id,
          name: row.name,
          description: row.description,
          isDefault: row.isDefault,
          roleTypeId: row.roleTypeId,
        })
      }
    />
  );
};

export const tableColumns = (
  // handleEdit,
  // id,
  // accessRoles,
  //Direction,
  taxSlab
) => {
  return [
    {
      title: taxSlab.name,
      dataIndex: "name",
      ellipsis: true,
    },
    {
      title: taxSlab.min,
      dataIndex: "min",
      ellipsis: true,
    },
    {
      title: taxSlab.max,
      dataIndex: "max",
      ellipsis: true,
    },
    {
      title: taxSlab.percentage,
      dataIndex: "percentage",
      ellipsis: true,
    },
    {
      title: taxSlab.previousCharge,
      dataIndex: "previousCharge",
      ellipsis: true,
    },
  ];
};
