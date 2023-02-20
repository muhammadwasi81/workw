import React, { useContext, useEffect, useState } from "react";
import TeamCard, { CardGrid } from "./TeamCard";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import TopBar from "../../../sharedComponents/topBar/topBar";
import "../Styles/table.css";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { teamDictionaryList } from "../localization/index";
import { getTeamsAction } from "../store/action";
import TeamTableView from "./TeamTableView";
import { getAllEmployees } from "../../employee/store/actions";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";

function TeamList() {
  const [view, setView] = useState("List");
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { teamDictionary, Direction } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.sharedLabels;
  const { teams } = useSelector((state) => state.teamSlice);
  const { loader } = useSelector((state) => state.employeeSlice);
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getAllEmployees(signal));
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    dispatch(getTeamsAction(user.id));
  }, []);

  const searchHandler = (value) => {
    dispatch(getTeamsAction({ search: value }));
    console.log(value, "value");
  };

  let classes = "teamListContainer ";
  classes += Direction === "ltr" ? "ltr" : "rtl";

  if (loader)
    return [...Array(40)].map((_, index) => (
      <div className={`${classes} teamListContainer`}>
        <Skeleton key={index} loading={true} active />
      </div>
    ));

  if (teams.length === 0) return <NoDataFound />;

  return (
    <>
      <div style={{ flexDirection: "column", width: "100%" }}>
        <TopBar
          style={{ margin: 0, width: "100%" }}
          onSearch={(value) => searchHandler(value)}
          segment={{
            onSegment: (value) => {
              setView(value);
            },
            label1: labels.list,
            label2: labels.table,
          }}
        />
        {view === "List" ? (
          <CardGrid>
            {teams.map((team, index) => {
              return <TeamCard teams={team} key={index} />;
            })}
          </CardGrid>
        ) : (
          <TeamTableView />
        )}
      </div>
    </>
  );
}
export default TeamList;
