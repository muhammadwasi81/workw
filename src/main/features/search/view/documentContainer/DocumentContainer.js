import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import DocShortCard from "../../../documents/view/components/shortCard";
import { createGuid } from "../../../../../utils/base";
import DocSceleton from "../../../documents/view/skeleton";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { handleTab } from "../../store/slice";
import { getSearchDocument } from "../../store/actions";
function DocumentContainer() {
  const [previewPath, setPreviewPath] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const {keyword ,tab , DocumentData } = useSelector((state) => state.globalSearchSlice);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.documentSlice.listLoader);

  const handlePreview = (item) => {
    setPreviewPath(item);
  };
  
  const searchHandler = () => {
    dispatch(handleTab("Document"))
    callApiAgain();
    
  };

  const callApiAgain = () =>{
    dispatch(getSearchDocument({
      pageNo:1,
      pageSize: 20,
      search: searchQuery,
      filterType: 4,
    }))
  }

 const loadMoreHandler = () =>{
  callApiAgain();
 }

 useEffect(()=>{
  callApiAgain();
 },[tab==="Document"])

  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Document</h5>
          <div className="d_AllShortCard">
            <DocSceleton type="short" isActive={loader} />
            {
              tab === "All"  ? 
                (
                  keyword?.Document?.map((item, index) => (
                  <DocShortCard
                    data={item}
                    handlePreview={handlePreview}
                    key={createGuid()}
                  />))
              )
              :
              (
                DocumentData?.map((item, index) => (
                  <DocShortCard
                    data={item}
                    handlePreview={handlePreview}
                    key={createGuid()}
                  />))
              )
            }
          </div>
          {tab==="All" && keyword?.Document?.length === 3 && 
              (
                <div
                  onClick={searchHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  See more
                </div>
              )
            
          }
          {tab==="Document" && DocumentData?.length === 20 &&
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
    </>
  );
}
export default DocumentContainer;
