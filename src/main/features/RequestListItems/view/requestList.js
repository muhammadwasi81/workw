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

  const onClose = () => {
    setItemId(null);
    dispatch(clearRequestDetails());
  };
  const { loader, requestItemDetail } = useSelector(
    (state) => state.requestItemSlice
  );
  return (
    <>
      {data?.length > 0 && !loader ? (
        <CardWrapper>
          {data?.length > 0 ? (
            data.map((item) => (
              <RequestListItems
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
          {<RequestDetailedView onClose={onClose} id={itemId} />}
        </CardWrapper>
      ) : (
        !loader && <NoDataFound />
      )}
      {requestItemDetail && (
        <RequestDetailedView onClose={onClose} id={itemId} />
      )}
    </>
  );
};

export default RequestList;
