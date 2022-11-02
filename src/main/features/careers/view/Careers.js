import React, { useEffect, useState, useContext } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Drawer, Button } from "antd";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../localization";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "./Header/filterBar";
import Header from "../../../layout/header/index";
import CareersListView from "./CareersListView";
import { getAllCareerAction } from "../store/action";
import { handleOpenComposer } from "../store/slice";
import MyCareersListView from "./MyCareersListView";
import CareerCard from "./CareersCard/index";
import MyCareerCard from "./MyCareerCard/index";
import ForApprovalCard from "./ForApprovalCard/index";
import Composer from "./Composers/index";
import "../view/styles/style.css";

function Careers() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const CurrentTab = useSelector((state) => state.careerSlice.currentTab);
  const { drawerOpen } = useSelector((state) => state.careerSlice);
  const [search, setSearch] = useState("");
  const { labels } = CareerDictionaryList;
  const [view, setView] = useState("List");

  // console.log(labels);

  const dispatch = useDispatch();
  useEffect(() => {
    if (CurrentTab === "careers") {
      let payload = {
        filterType: 0,
        search: search,
      };
      dispatch(getAllCareerAction(payload));
    } else {
      let payload = {
        filterType:
          CurrentTab === "myCareers"
            ? 1
            : CurrentTab === "forApprovals"
            ? 2
            : null,
        search: search,
      };
      dispatch(getAllCareerAction(payload));
    }
  }, [CurrentTab, search]);

  let RenderTab = {
    careers: <CareerCard view={view} />,
    myCareers: <MyCareerCard view={view} />,
    forApprovals: <ForApprovalCard view={view} />,
  };

  const segmentChange = (val) => {
    setView(val);
  };

  return (
    <>
      <TabbableContainer>
        <Header
          buttons={[
            {
              buttonText: CareerDictionaryList.createTextBtn,
              render: (
                <Button
                  className="ThemeBtn"
                  onClick={() => dispatch(handleOpenComposer(true))}
                >
                  {CareerDictionaryList.createTextBtn}
                </Button>
              ),
            },
          ]}
        />
        <TopBar
          segment={(val) => segmentChange(val)}
          onSearch={(val) => setSearch(val)}
        />
        <ContBody>{RenderTab[CurrentTab]}</ContBody>
        <Drawer
          title={
            <h1
              style={{
                fontSize: "20px",
                margin: 0,
                textAlign: Direction === "ltr" ? "" : "end",
              }}
            >
              {labels.createJob}
            </h1>
          }
          placement={Direction === "rtl" ? "left" : "right"}
          width="768"
          onClose={() => {
            dispatch(handleOpenComposer(false));
          }}
          visible={drawerOpen}
          destroyOnClose={true}
          className="detailedViewComposer drawerSecondary"
        >
          <Composer />
        </Drawer>
      </TabbableContainer>
    </>
  );
}

export default Careers;
