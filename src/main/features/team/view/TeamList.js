import React, { useContext, useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";
import TopBar from "../../../sharedComponents/topBar/topBar";
import "../Styles/team.css";
import { getTeamsAction } from "../store/action";

function TeamList() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const dispatch = useDispatch();
  const { sharedLabels } = dictionaryList[userLanguage];
  const label = dictionaryList[userLanguage];
  const { teams, loader } = useSelector((state) => state.teamSlice);
  console.log(teams, "TEAMS");

  useEffect(() => {
    dispatch(getTeamsAction());
  }, []);

  const [view, setView] = useState("List");
  let classes = "teamListContainer  ";
  classes += Direction === "ltr" ? "ltr" : "rtl";
  if (loader) {
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
          segment={{
            onSegment: (value) => {
              setView(value);
            },
            label1: sharedLabels.List,
            label2: sharedLabels.Table,
          }}
        />
        {view === "List" ? (
          <div className={classes}>
            {teams.map((team, index) => {
              return <TeamCard teams={team} key={index} />;
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
