import { Drawer } from 'antd';
import RequestDetailCard from './requestDetailedCard';

const RequestDetailedView = (props) => {
  return (
    <Drawer
      title={<h1 style={{ fontSize: '20px', margin: 0 }}>Detailed view</h1>}
      width="768"
      height={'85%'}
      placement={'right'}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
    >
      <RequestDetailCard id={props.id} />
    </Drawer>
  );
};

export default RequestDetailedView;
