import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { clearSalaryDetail } from "../../store/slice";
import QuotationDetailedView from "./detailedView";
import QuotationListItem from "./QuotationListItem";

const QuotationList = ({ data }) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleDrawerOpen = (id) => {
    setVisible(true);
    setItemId(id);
  };

  // const onClose = () => {
  //   setItemId(null);
  //   dispatch(clearSalaryDetail());
  // };
  const { loader, quotationDetail } = useSelector(
    (state) => state.quotationSlice
  );

  const handleDrawerClose = () => {
    setVisible(false);
    setItemId(null);
    dispatch(clearSalaryDetail());
  };

  return (
    <>
      {data?.length > 0 && !loader ? (
        <CardWrapper>
          {data.map((item) => (
            <QuotationListItem item={item} onClick={handleDrawerOpen} />
          ))}
        </CardWrapper>
      ) : (
        <NoDataFound />
      )}

      <QuotationDetailedView
        visible={visible}
        id={itemId}
        onClose={handleDrawerClose}
      />
    </>
  );
};
export default QuotationList;
