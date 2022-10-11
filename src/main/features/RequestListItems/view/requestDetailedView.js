import { Drawer } from 'antd';
import RequestDetailedCard from './requestDetailedCard';

const RequestDetailedView = (props) => {
  return (
    <Drawer
      title={
        <h1 style={{ fontSize: '20px', margin: 0 }}>Request Detailed view</h1>
      }
      width="768"
      height={'85%'}
      placement={'right'}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
    >
      <RequestDetailedCard id={props.id} />
    </Drawer>
  );
};

export default RequestDetailedView;
