import moment from 'moment';
import TagAvatar from '../../../sharedComponents/Avatar/TagAvatar';
import ItemStatus from './components/itemStatus';

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
      width: 100,
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
      render: (i) => moment(i.createDate).format('DD MMM YYYY'),
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
      render: (type) => {
        if (type === 3) {
          return <div>Non consumable</div>;
        }
        if (type === 2) {
          return <div>consumable</div>;
        }
        if (type === 1) {
          return <div>Service</div>;
        }
      },
      ellipsis: true,
      sort: true,
      width: 150,
    },
    {
      title: 'Handover',
      dataIndex: 'handover',
      ellipsis: true,
      render: (handover) => (
        <TagAvatar
          text={handover?.name ? handover.name : 'Not Assigned'}
          img={
            handover?.image
              ? handover?.image
              : 'https://konnect.im/upload/2022/10/88c35581-97aa-4e88-be91-584a667fd5eb.jpg'
          }
        />
      ),
      sort: true,
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => <ItemStatus status={value} />,
      width: 180,
      ellipsis: true,
      sort: true,
    },
  ];
};
