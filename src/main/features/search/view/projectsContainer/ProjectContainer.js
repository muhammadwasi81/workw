import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle";
import ListItem from "../../../projects/UI/ListItem";

function ProjectContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { projects, loader } = useSelector((state) => state.projectSlice);
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/projects?q=${searchQuery}`);
  };
  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Project</h5>

        <CardWrapper2>
          {projects.slice(0, 4).map((item, index) => {
            return <ListItem item={item} id={item.id} key={index} />;
          })}
        </CardWrapper2>
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
export default ProjectContainer;
