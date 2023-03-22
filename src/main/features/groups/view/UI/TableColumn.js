import moment from "moment";
import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
export const tableColumn = (groupsDictionary) => {
  return [
    {
      title: groupsDictionary.labels.name,
      dataIndex: "name",
      ellipsis: true,
      sort: true,
    },
    {
      title: groupsDictionary.labels.desc,
      dataIndex: "description",
      ellipsis: true,
      sort: true,
    },
    {
      title: groupsDictionary.labels.creator,
      dataIndex: "creator",
      ellipsis: true,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: groupsDictionary.labels.createDate,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
    },
  ];
};
