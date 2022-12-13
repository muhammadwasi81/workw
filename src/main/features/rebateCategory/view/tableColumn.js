import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { RebateTypeEnum, RebateTypes } from "./enums";

const Edit = (handleEdit, row, setClearButton) => {
  return (
    <EditFilled
      style={{ color: "#1b5669" }}
      onClick={(e) => {
        handleEdit({
          id: row.id,
          name: row.name,
          maxPercentage: row.maxPercentage,
          maxAmount: row.maxAmount,
          rebateType: row.rebateType,
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
  rebateDictionary
) => {
  const { Basic, Tax, FullAmount } = RebateTypes;

  return [
    { title: rebateDictionary.name, dataIndex: "name", width: "20%", key: 1 },
    {
      title: rebateDictionary.maxPercentage,
      dataIndex: "maxPercentage",
      width: "20%",
      key: 3,
      render: (text, row) => {
        return `${text}%`;
      },
    },
    {
      title: rebateDictionary.maxAmount,
      dataIndex: "maxAmount",
      width: "20%",
      key: 3,
    },
    {
      title: rebateDictionary.rebateType,
      dataIndex: "rebateType",
      width: "15%",
      render: (text, row) => {
        return text === RebateTypeEnum.Basic
          ? Basic
          : text === RebateTypeEnum.Tax
          ? Tax
          : text === RebateTypeEnum.FullAmount
          ? FullAmount
          : "";
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
