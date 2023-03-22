import { deleteItem, editItem } from "../store/slice";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

export const tableColumn = (dispatch) => {
  return [
    {
      title: "First Name",
      dataIndex: "firstName",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sort: true,
    },
    // {
    //   title: "Type",
    //   dataIndex: "type",
    //   sort: true,
    // },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sort: true,
    },
    {
      title: "Actions",
      dataIndex: "",
      width: "8%",
      render: (value, row, index) => (
        <>
          <EditFilled
            onClick={() => {
              dispatch(editItem({ ...value, index: index }));
            }}
            style={{
              marginRight: "6px",
              color: "var(--currentThemeColor)",
            }}
          />
          <DeleteFilled
            onClick={() => {
              dispatch(deleteItem(index));
            }}
            style={{
              color: "var(--currentThemeColor)",
            }}
          />
        </>
      ),
    },
  ];
};
