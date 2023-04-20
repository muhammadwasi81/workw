import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import ExpenseList from "../../../expense/view/ExpenseList";
import ExpenseDetailsComposer from "../../../expense/view/ExpenseDetailsComposer";
import { clearExpense } from "../../../expense/store/slice";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary } from "../../../expense/localization";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
function ExpenseContainer() {
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const {keyword} = useSelector((state) => state.globalSearchSlice);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = ExpenseDictionary[userLanguage];

  const searchQuery = searchParams.get("q");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { expenses, loader, drawerOpen } = useSelector(
    (state) => state.expenseSlice
  );
  const handleExpense = (id) => {
    setId(id);
    setVisible(true);
  };
  const handleDrawerClose = () => {
    setVisible(false);
    dispatch(clearExpense());
  };
  const searchHandler = () => {
    navigate(`/expenses?q=${searchQuery}`);
  };
  return (
    <>
      {
          keyword?.Expense?.length > 0 ? (<div>
              <div className="SearchMainContainer">
        <h5 className="containerHeading">Expense</h5>
        <CardWrapper>
          {keyword?.Expense?.slice(0, 4)?.map((expense, index) => {
            return (
              <ExpenseList
                key={index}
                onExpense={handleExpense}
                expense={expense}
              />
            );
          })}
        </CardWrapper>
        {keyword?.Expense?.length > 3 ? (<div
        onClick={searchHandler}
        className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
      >
        See more
      </div>):(<div></div>)}
      </div>
      <ExpenseDetailsComposer
        direction={Direction}
        visible={visible}
        onClose={handleDrawerClose}
        id={id}
      />
          </div>) :  (<div className="SearchMainContainer">
          <div><NoDataFound/></div></div>
    )
      }
      
    </>
  );
}
export default ExpenseContainer;
