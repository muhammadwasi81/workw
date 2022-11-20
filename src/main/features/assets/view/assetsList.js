import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardWrapper } from '../../../sharedComponents/Card/CardStyle';
import { clearAssetDetail } from '../../createAssets/store/slice';
import AssetsDetailedView from './assetsDetailedView';
import AssetsListItem from './assetsListItem';

const AssetsList = ({ data }) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);

  const onClose = () => {
    setItemId(null);
    dispatch(clearAssetDetail());
  };

  return (
    <CardWrapper>
      {data?.length > 0 ? (
        data?.map((item) => (
          <AssetsListItem
            key={item.id}
            item={item}
            onClick={(id) => setItemId(id)}
          />
        ))
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <strong
            style={{
              margin: 'auto',
              marginRight: '10px',
            }}
          >
            No Result Found...
          </strong>
        </div>
      )}
      {<AssetsDetailedView onClose={onClose} id={itemId} />}
    </CardWrapper>
  );
};

export default AssetsList;
