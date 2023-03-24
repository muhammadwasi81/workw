import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import DocShortCard from "../../../documents/view/components/shortCard";
import { createGuid } from "../../../../../utils/base";
import DocSceleton from "../../../documents/view/skeleton";

function DocumentContainer() {
  const [previewPath, setPreviewPath] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const navigate = useNavigate();
  const listData = useSelector((state) => state.documentSlice.listData);
  const loader = useSelector((state) => state.documentSlice.listLoader);

  const handlePreview = (item) => {
    setPreviewPath(item);
  };
  const searchHandler = () => {
    navigate(`/documents?q=${searchQuery}`);
  };
  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Document</h5>
        <div className="d_AllShortCard">
          <DocSceleton type="short" isActive={loader} />
          {listData.slice(0, 4).map((item, index) => (
            <DocShortCard
              data={item}
              handlePreview={handlePreview}
              key={createGuid()}
            />
          ))}
        </div>
        <div
          onClick={searchHandler}
          className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
        >
          See more
        </div>
      </div>
    </>
  );
}
export default DocumentContainer;
