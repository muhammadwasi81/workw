import React, { useContext, useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";
import TopBar from "../../../sharedComponents/topBar/topBar";
import "../Styles/team.css";

function TeamList() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const dispatch = useDispatch();
  const { sharedLabels } = dictionaryList[userLanguage];
  const label = dictionaryList[userLanguage];
  const [view, setView] = useState("List");
  let classes = "teamListContainer  ";
  classes += Direction === "ltr" ? "ltr" : "rtl";
  if (false) {
    return (
      <div className="teamListContainer">
        {[...Array(40)].map(() => (
          <>
            <Skeleton.Avatar shape={"circle"} size={"large"} />
            <Skeleton loading={true} active></Skeleton>
          </>
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ flexDirection: "column", width: "100%" }}>
        <TopBar
          style={{ margin: 0, width: "100%" }}
          onSearch={(value) => {
            console.log(value);
          }}
          filter={{
            onFilter: () => {},
          }}
        />
        {view === "List" ? (
          <div className={classes}>
            {[1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1].map((index) => {
              return <TeamCard key={index} />;
            })}
          </div>
        ) : (
          "Table view"
        )}
      </div>
    );
  }
}
export default TeamList;
