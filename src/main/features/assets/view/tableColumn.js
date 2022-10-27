import Avatar from '../../../sharedComponents/Avatar/avatar';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';

export const TableColumn = () => {
  return [
    {
      title: 'Category',
      dataIndex: 'category',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'value',
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
      title: 'Approvers',
      dataIndex: 'approvers',
      ellipsis: true,
      render: (value) => (
        <Avatar
          heading={'approvers'}
          isAvatarGroup={true}
          membersData={value ? value : []}
        />
      ),
      sort: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
  ];
};
