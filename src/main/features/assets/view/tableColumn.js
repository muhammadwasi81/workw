import moment from "moment";
import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import ItemStatus from "./components/itemStatus";

export const TableColumn = (assetsDictionary) => {
  return [
    {
      title: assetsDictionary.code,
      dataIndex: "code",
      ellipsis: true,
      sort: true,
      width: 200,
    },
    {
      title: assetsDictionary.name,
      dataIndex: "name",
      ellipsis: true,
      sort: true,
      width: 200,
    },
    {
      title: assetsDictionary.category,
      dataIndex: "category",
      render: (category) => (category ? category : "N/A"),
      ellipsis: true,
      sort: true,
      width: 200,
    },
    {
      title: assetsDictionary.value,
      dataIndex: "value",
      ellipsis: true,
      sort: true,
      width: 200,
    },
    {
      title: assetsDictionary.date,
      dataIndex: "createDate",
      render: (i) => moment(i?.createDate)?.format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
    },
    {
      title: assetsDictionary.serialNo,
      dataIndex: "serialNo",
      ellipsis: true,
      sort: true,
      width: 150,
    },
    {
      title: assetsDictionary.itemType,
      dataIndex: "type",
      render: (type) => {
        if (type === 1) {
          return <div>{assetsDictionary.service}</div>;
        }
        if (type === 2) {
          return <div>{assetsDictionary.consumable}</div>;
        }
        if (type === 3) {
          return <div>{assetsDictionary.Nonconsumable}</div>;
        }
      },
      ellipsis: true,
      sort: true,
      width: 200,
    },
    {
      title: assetsDictionary.handover,
      dataIndex: "handover",
      ellipsis: true,
      render: (handover) => (
        <TagAvatar
          text={handover?.name ? handover.name : "Not Assigned"}
          img={
            handover?.image
              ? handover?.image
              : "https://konnect.im/upload/2022/10/88c35581-97aa-4e88-be91-584a667fd5eb.jpg"
          }
        />
      ),
      sort: true,
      width: 200,
    },
    {
      title: assetsDictionary.status,
      dataIndex: "status",
      render: (value) => <ItemStatus status={value} />,
      ellipsis: true,
      sort: true,
      width: 200,
    },
  ];
};
