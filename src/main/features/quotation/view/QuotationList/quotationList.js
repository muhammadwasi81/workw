import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import { clearSalaryDetail } from "../../store/slice";
import QuotationDetailedView from "./detailedView";
import QuotationListItem from "./QuotationListItem";

const QuotationList = ({ data }) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);
  const onClose = () => {
    setItemId(null);
    dispatch(clearSalaryDetail());
  };
  return (
    <CardWrapper>
      {data.map((item) => (
        <QuotationListItem item={item} onClick={(id) => setItemId(id)} />
      ))}
      {<QuotationDetailedView onClose={onClose} id={itemId} />}
    </CardWrapper>
  );
};
export default QuotationList;
