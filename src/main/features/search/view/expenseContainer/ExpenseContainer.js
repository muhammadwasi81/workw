import React, { useContext, useState ,useEffect} from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import ExpenseList from "../../../expense/view/ExpenseList";
import ExpenseDetailsComposer from "../../../expense/view/ExpenseDetailsComposer";
import { clearExpense } from "../../../expense/store/slice";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary } from "../../../expense/localization";
import { handleTab } from "../../store/slice";
import { getSearchExpense } from "../../store/actions";

function ExpenseContainer() {
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const {keyword , tab , ExpenseData} = useSelector((state) => state.globalSearchSlice);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = ExpenseDictionary[userLanguage];

  const searchQuery = searchParams.get("q");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExpense = (id) => {
    setId(id);
    setVisible(true);
  };
  
  const handleDrawerClose = () => {
    setVisible(false);
    dispatch(clearExpense());
  };
  
  const searchHandler = () => {
      dispatch(handleTab("Expense"))
      callApiAgain();
  };
  
  const callApiAgain = () =>{
    dispatch(getSearchExpense({
      pageNo:1,
      pageSize: 20,
      search: searchQuery,
      filterType: 8,
    }))
  }

  
 const loadMoreHandler = () =>{
  // callApiAgain();
 }
  
  useEffect(()=>{
    callApiAgain();
   },[tab==="Expense"])

  return (
    <>
      <div>
          <div className="SearchMainContainer">
            <h5 className="containerHeading">Expense</h5>
            <CardWrapper>
              {
                tab === "All" ? 
                (
                  keyword?.Expense?.map((expense, index) => {
                    return (
                      <ExpenseList
                        key={index}
                        onExpense={handleExpense}
                        expense={expense}
                      />
                    );})
                )
                :
                (
                  ExpenseData?.map((expense, index) => {
                    return (
                      <ExpenseList
                        key={index}
                        onExpense={handleExpense}
                        expense={expense}
                      />
                    );})

                )
              }
            </CardWrapper>
            {tab==="All" && keyword?.Expense?.length === 3 && 
              (
                <div
                  onClick={searchHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  See more
                </div>
              )
            
            }
             {tab==="Expense" && ExpenseData?.length === 20 &&
              (
                <div
                  onClick={loadMoreHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  Load More
                </div>   
              )
          }
          </div>
          <ExpenseDetailsComposer
            direction={Direction}
            visible={visible}
            onClose={handleDrawerClose}
            id={id}
          />
      </div>
    </>
  );
}
export default ExpenseContainer;
