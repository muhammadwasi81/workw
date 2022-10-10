import React, { useState,useContext } from 'react';
import { useDispatch } from 'react-redux';
import { CardWrapper } from '../../../../sharedComponents/Card/CardStyle';
import { clearSalaryDetail } from '../../store/slice';
import SalaryDetailedView from './detailedView';
import SalaryListItem from './SalaryListItem';

const SalaryList = ({ data }) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);
  const onClose = () => {
    setItemId(null);
    dispatch(clearSalaryDetail());
  };
  return (
    <CardWrapper>
      {data.map((item) => (
        <SalaryListItem item={item} onClick={(id) => setItemId(id)} />
      ))}
      {<SalaryDetailedView onClose={onClose} id={itemId} />}
    </CardWrapper>
  );
};
export default SalaryList;
