import React, { useContext, useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import TopBar from "../../../sharedComponents/topBar/topBar";
import "../Styles/team.css";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { teamDictionaryList } from "../localization/index";
import { getTeamsAction } from "../store/action";
import TeamTableView from "./TeamTableView";

function TeamList() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { teamDictionary, Direction } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.sharedLabels;

  const { teams, loader } = useSelector((state) => state.teamSlice);

  useEffect(() => {
    dispatch(getTeamsAction());
  }, []);

  const [view, setView] = useState("List");
  let classes = "teamListContainer ";
  classes += Direction === "ltr" ? "ltr" : "rtl";
  if (loader) {
    return (
      <div className={classes}>
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
            label1: labels.list,
            label2: labels.table,
          }}
        />
        {view === "List" ? (
          <div className={classes}>
            {teams.map((team, index) => {
              return <TeamCard teams={team} key={index} />;
            })}
          </div>
        ) : (
          <TeamTableView />
        )}
      </div>
    );
  }
}
export default TeamList;
