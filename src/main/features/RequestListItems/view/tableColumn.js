import Avatar from '../../../sharedComponents/Avatar/avatar';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';

export const ListTableColumn = () => {
  return [
    {
      title: 'Category',
      dataIndex: 'category',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Reference No',
      dataIndex: 'referenceNo',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
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
          membersData={value}
        />
      ),
      sort: true,
    },
    {
      title: 'Asset Controller',
      dataIndex: 'assetController',
      ellipsis: true,
      render: (value) => (
        <Avatar
          heading={'approvers'}
          isAvatarGroup={true}
          membersData={value}
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
