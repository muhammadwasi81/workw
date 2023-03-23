import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import ThumbnailSkeleton from "../../../eLearning/view/Dashboard/UI/thumbnailSkeleton";
import EbookCard from "../../../eLearning/view/Dashboard/Components/EbookCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";

function BookContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { books, loaders } = useSelector((state) => state.eLearningSlice);
  let loading = loaders.bookLoading;
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/eLearning?q=${searchQuery}`);
  };
  return (
    <>
      <h5 className="containerHeading">eBooks</h5>
      <div
        className={
          loading || books?.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
            : !loading && ""
        }
      >
        {loading ? (
          <ThumbnailSkeleton count={[1, 2]} />
        ) : books?.length > 0 ? (
          books.slice(0, 4).map((item) => {
            return <EbookCard data={item} />;
          })
        ) : (
          !loading && (
            <>
              {" "}
              <NoDataFound />
            </>
          )
        )}
      </div>
      <div
        onClick={searchHandler}
        className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
      >
        See more
      </div>
    </>
  );
}
export default BookContainer;
