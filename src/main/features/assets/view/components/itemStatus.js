import { Tag } from 'antd';

const ItemStatus = ({ status }) => {
  if (status === 1) {
    return <Tag color="default">Waiting For Approval</Tag>;
  }
  if (status === 2) {
    return <Tag color="default">Waiting For Handover</Tag>;
  }
  if (status === 3) {
    return <Tag color="success">Allocated</Tag>;
  }
  if (status === 4) {
    return <Tag color="success">Available </Tag>;
  }
  if (status === 5) {
    return <Tag color="error">Lost</Tag>;
  }
  if (status === 6) {
    return <Tag color="warning">Damage</Tag>;
  }
  if (status === 7) {
    return <Tag color="processing">For Maintenance</Tag>;
  }
};

export default ItemStatus;
