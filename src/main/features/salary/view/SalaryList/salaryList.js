import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { CardWrapper } from '../../../../sharedComponents/Card/CardStyle';
import { NoDataFound } from '../../../../sharedComponents/NoDataIcon';
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

  const loader = useSelector((state) => state.salarySlice.loader);
console.log(loader, "myLoader")
  return (
    <>
  { data?.length > 0 && !loader ? (
    <CardWrapper>
      {data.map((item) => (
        <SalaryListItem item={item} onClick={(id) => setItemId(id)} />
      ))}
      {<SalaryDetailedView onClose={onClose} id={itemId} />}
    </CardWrapper>
     ) : !loader && <NoDataFound/>
  }

  </>
  );
};
export default SalaryList;
