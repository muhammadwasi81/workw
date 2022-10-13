import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardWrapper } from '../../../sharedComponents/Card/CardStyle';
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
  return (
    <CardWrapper>
      {data.map((item) => (
        <RequestListItems
          key={item.id}
          item={item}
          onClick={(id) => setItemId(id)}
        />
      ))}
      {<RequestDetailedView onClose={onClose} id={itemId} />}
    </CardWrapper>
  );
};

export default RequestList;
