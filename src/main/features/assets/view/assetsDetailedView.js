import { Drawer } from 'antd';
import AssetsDetailCard from './assetsDetailedCard';

const AssetsDetailedView = (props) => {
  return (
    <Drawer
      title={<h1 style={{ fontSize: '20px', margin: 0 }}>Assets</h1>}
      width="768"
      height={'85%'}
      placement={'right'}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
    >
      <AssetsDetailCard id={props.id} />
    </Drawer>
  );
};

export default AssetsDetailedView;
