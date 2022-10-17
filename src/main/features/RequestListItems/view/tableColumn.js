import Avatar from '../../../sharedComponents/Avatar/avatarOLD';

export const ListTableColumn = () => {
  return [
    {
      title: 'Category',
      dataIndex: 'categoryId',
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
          isAvatarGroup={true}
          heading={'approvers'}
          membersData={value ? value : []}
        />
      ),
      sort: true,
    },
  ];
};
