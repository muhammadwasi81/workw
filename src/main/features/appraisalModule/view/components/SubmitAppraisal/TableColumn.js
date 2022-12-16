import moment from "moment";
import TagAvatar from "../../../../../sharedComponents/Avatar/TagAvatar";
import AvatarCustom from "../../../../../sharedComponents/Avatar/avatarOLD";

//subject, startdate, enddate, progress, rating, assignby

export const tableColumn = () => {
  return [
    {
      title: 'Subject',
      dataIndex: "subject",
      ellipsis: true,
      sort: true,
    //   width: 160,
    },
    {
        title: 'Start Date',
        dataIndex: "startDate",
        render: (startDate) => moment(startDate).format("DD MMM YYYY"),
        ellipsis: true,
        sort: true,
        // width: 160,
      },
      {
        title: 'End Date',
        dataIndex: "endDate",
        render: (endDate) => moment(endDate).format("DD MMM YYYY"),
        ellipsis: true,
        sort: true,
        // width: 100,
      },
      {
        title: 'Progress',
        dataIndex: "progress",
        ellipsis: true,
        sort: true,
        // width: 100,
      },
      {
        title: 'Rating',
        dataIndex: "rating",
        ellipsis: true,
        sort: true,
        // width: 100,
      },
   
    // {
    //   title: 'Assign by',
    //   dataIndex: "creator",
    //   ellipsis: true,
    //   width: 100,
    //   render: (creator) => (
    //     <TagAvatar
    //       text={creator.name}
    //       img={
    //         <AvatarCustom
    //           width={20}
    //           height={20}
    //           src={creator.image}
    //           name={creator.name}
    //           round
    //         ></AvatarCustom>
    //       }
    //     />
    //   ),
    //   sort: true,
    // },
    
  ];
};
