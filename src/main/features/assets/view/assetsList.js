import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardWrapper } from '../../../sharedComponents/Card/CardStyle';
import { clearAssetDetail } from '../../createAssets/store/slice';
import AssetsDetailedView from './assetsDetailedView';
import AssetsListItem from './assetsListItem';
import { NoDataFound } from './../../../sharedComponents/NoDataIcon/index';

const AssetsList = ({ data }) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);

  const onClose = () => {
    setItemId(null);
    dispatch(clearAssetDetail());
  };

  return (
    <>
      {data?.length > 0 ? (
        <CardWrapper>
          {data?.map((item) => (
            <AssetsListItem
              key={item.id}
              item={item}
              onClick={(id) => setItemId(id)}
            />
          ))}
          {<AssetsDetailedView onClose={onClose} id={itemId} />}
        </CardWrapper>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default AssetsList;
