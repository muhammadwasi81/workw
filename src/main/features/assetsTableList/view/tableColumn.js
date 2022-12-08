import moment from "moment";
import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import ItemStatus from "../../assets/view/components/itemStatus";

export const TableColumn = (assestsListDictionary) => {
  return [
    {
      title: assestsListDictionary.code,
      dataIndex: "code",
      ellipsis: true,
      sort: true,
      width: 150,
    },
    {
      title: assestsListDictionary.name,
      dataIndex: "name",
      ellipsis: true,
      sort: true,
      width: 150,
    },
    {
      title: assestsListDictionary.category,
      dataIndex: "category",
      render: (category) => (category ? category : "N/A"),
      ellipsis: true,
      sort: true,
      width: 150,
    },
    {
      title: assestsListDictionary.value,
      dataIndex: "value",
      ellipsis: true,
      sort: true,
      width: 150,
    },
    {
      title: assestsListDictionary.date,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
      width: 150,
    },
    {
      title: assestsListDictionary.serialNo,
      dataIndex: "serialNo",
      ellipsis: true,
      sort: true,
      width: 150,
    },
    {
      title: assestsListDictionary.itemType,
      dataIndex: "type",
      render: (type) => {
        if (type === 3) {
          return <div>{assestsListDictionary.nonConsumable}</div>;
        }
        if (type === 2) {
          return <div>{assestsListDictionary.consumable}</div>;
        }
        if (type === 1) {
          return <div>{assestsListDictionary.service}</div>;
        }
      },
      ellipsis: true,
      sort: true,
      width: 150,
    },
    {
      title: assestsListDictionary.handover,
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
      width: 150,
    },
    {
      title: assestsListDictionary.status,
      dataIndex: "status",
      render: (value) => <ItemStatus status={value} />,
      ellipsis: true,
      sort: true,
      width: 150,
    },
  ];
};
