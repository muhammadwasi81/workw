import Avatar from '../../../sharedComponents/Avatar/avatar';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';

export const TableColumn = () => {
  return [
    {
      title: 'Code',
      dataIndex: 'code',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Date',
      dataIndex: 'createDate',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Serial No',
      dataIndex: 'serialNo',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Item Type',
      dataIndex: 'type',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Allocated To',
      dataIndex: 'handoverId',
      ellipsis: true,
      sort: true,
    },
    // TODO: // PERSON name will be displayed
    // {
    //   title: 'Allocated to',
    //   dataIndex: 'handover',
    //   ellipsis: true,
    //   render: (value) => (
    //     <Avatar
    //       heading={'handover'}
    //       isAvatarGroup={true}
    //       membersData={value ? value : []}
    //     />
    //   ),
    //   sort: true,
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => <StatusTag status={value} />,
      ellipsis: true,
    },
  ];
};
