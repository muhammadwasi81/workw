import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
//import { fiscalYearEnum } from "../enum/index";
import { getMonthName } from "../helper/helpers";
import moment from "moment";

const Edit = (handleEdit, row, setClearButton) => {
  return (
    <EditFilled
      style={{ color: "#1b5669" }}
      onClick={(e) => {
        handleEdit({
          id: row.id,
          name: row.name,
          description: row.description,
          startMonth: row.startMonth,
          endMonth: row.endMonth,
          startYear: row.startYear,
          endYear: row.endYear,
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
  sharedLabels
) => {
  return [
    { title: [sharedLabels.name], dataIndex: "name", width: "15%", key: 1 },
    {
      title: [sharedLabels.description],
      dataIndex: "description",
      width: "20%",
      key: 2,
    },
    {
      title: [sharedLabels.startMonth],
      dataIndex: "startMonth",
      render: (startMonth) => getMonthName(startMonth),
      width: "15%",
      key: 3,
    },
    {
      title: [sharedLabels.endMonth],
      dataIndex: "endMonth",
      render: (endMonth) => getMonthName(endMonth),
      width: "15%",
      key: 4,
    },
    {
      title: [sharedLabels.startyear],
      dataIndex: "startYear",
      width: "15%",
      key: 5,
    },
    {
      title: [sharedLabels.endyear],
      dataIndex: "endYear",
      width: "15%",
      key: 6,
    },
    removeButtons
      ? {}
      : {
          align: "right",
          key: 3,
          width: "500px",
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
