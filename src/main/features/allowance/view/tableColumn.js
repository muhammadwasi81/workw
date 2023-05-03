import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

const Edit = (handleEdit, row, setClearButton) => {
  return (
    <EditFilled
      style={{ color: "#1b5669" }}
      onClick={(e) => {
        handleEdit({
          id: row.id,
          name: row.name,
          value: row.value,
          description: row.description,
          allowanceType: row.allowanceType,
          allowanceUnit: row.allowanceUnit,
          isTaxable: row.isTaxable,
          gradeId: row.gradeId,
        });
        setClearButton(true);
      }}
    />
  );
};

const Delete = (handleDelete, row) => {
  return (
    <Popconfirm
      title="Sure to delete?"
      onConfirm={(e) => handleDelete({ id: row.id })}
    >
      <DeleteFilled style={{ color: "#1b5669" }} />
    </Popconfirm>
  );
};

export const tableColumn = (
  handleEdit,
  handleDelete,
  removeButtons = false,
  rights,
  id,
  setClearButton,
  allowanceDictionary
) => {
  return [
    {
      title: allowanceDictionary.name,
      className: "name",
      dataIndex: "name",
      width: "5%",
    },
    // { title: "Description", dataIndex: "description", width: "5%" },
    // {
    //   title: allowanceDictionary.grade,
    //   dataIndex: "gradeName",
    //   width: "5%",
    // },
    // {
    //   title: allowanceDictionary.amount,
    //   dataIndex: "value",
    //   width: "5%",
    // },
    {
      title: allowanceDictionary.allowanceType,
      dataIndex: "allowanceType",
      width: "20%",
      render: (text, row) => {
        return text === 1
          ? allowanceDictionary.percent
          : allowanceDictionary.amount;
      },
    },
    {
      title: allowanceDictionary.allowanceUnit,
      dataIndex: "allowanceUnit",
      width: "20%",
      render: (text, row) => {
        return text === 1
          ? allowanceDictionary.benefit
          : allowanceDictionary.deduction;
      },
    },
    {
      title: allowanceDictionary.istexable,
      dataIndex: "isTaxable",
      width: "15%",
      render: (text, row) => {
        return text === true ? allowanceDictionary.yes : allowanceDictionary.no;
      },
    },
    removeButtons
      ? {}
      : {
          align: "right",
          key: 3,
          render: (_, row) => {
            if (id && row.id === id) return <LoadingOutlined key={row} />;
            if (rights.length <= 0) return;

            if (rights.includes(1) && rights.includes(2))
              return (
                <>
                  {Edit(handleEdit, row, setClearButton)}{" "}
                  {Delete(handleDelete, row)}
                </>
              );

            if (rights.includes(1)) return Edit(handleEdit, row);

            if (rights.includes(2)) return Delete(handleDelete, row);
          },
        },
  ];
};
