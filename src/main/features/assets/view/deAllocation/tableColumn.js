import StatusTag from '../../../../sharedComponents/Tag/StatusTag';

export const DeAllocationTableColumn = () => {
  return [
    {
      title: 'Category Name',
      dataIndex: 'name',
      ellipsis: true,
      sort: true,
    },
    {
      title: 'Asset',
      dataIndex: 'code',
      // render: (assetItems) => <>{assetItems}</>,
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
      title: 'Status',
      dataIndex: 'status',
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
  ];
};
