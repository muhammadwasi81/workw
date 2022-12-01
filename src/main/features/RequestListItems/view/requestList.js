import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardWrapper } from '../../../sharedComponents/Card/CardStyle';
import { NoDataFound } from '../../../sharedComponents/NoDataIcon';
import { clearRequestDetails } from '../store/slice';
import RequestDetailedView from './requestDetailedView';
import RequestListItems from './requestListItems';

const RequestList = ({ data }) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);
  const { loader } = useSelector((state) => state.requestItemSlice);

  const onClose = () => {
    setItemId(null);
    dispatch(clearRequestDetails());
  };
  return (
    <>
      {data?.length > 0 && !loader ? (
        <CardWrapper>
          {data?.map((item) => (
            <RequestListItems
              key={item.id}
              item={item}
              onClick={(id) => setItemId(id)}
            />
          ))}
          {<RequestDetailedView onClose={onClose} id={itemId} />}
        </CardWrapper>
      ) : (
        !loader && <NoDataFound />
      )}
    </>
  );
};

export default RequestList;
