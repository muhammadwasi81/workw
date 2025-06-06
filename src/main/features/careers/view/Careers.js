import React, { useEffect, useState, useContext } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Drawer, Button ,Modal} from "antd";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../localization";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "./Header/filterBar";
import Header from "../../../layout/header";
import CareersListView from "./CareersListView";
import { getAllCareerAction } from "../store/action";
import { handleChangeTab, handleOpenComposer } from "../store/slice";
import MyCareersListView from "./MyCareersListView";
import CareerCard from "./CareersCard/index";
import MyCareerCard from "./MyCareerCard/index";
import ForApprovalCard from "./ForApprovalCard/index";
import Composer from "./Composers/index";
import { ROUTES } from "../../../../utils/routes";
import "../view/styles/style.css";
import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import { FeaturePermissionEnum } from "../../../../utils/Shared/enums/featuresEnums";
import JobDetails from "./DetailView/DetailComposer/JobDetails";

function Careers() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];

  const CurrentTab = useSelector((state) => state.careerSlice.currentTab);
  const careers = useSelector((state) => {
    return state.careerSlice.items;
  });
  const { drawerOpen } = useSelector((state) => state.careerSlice);
  const [sort, setSort] = useState(2);
  const [search, setSearch] = useState("");
  const { labels, Careers } = CareerDictionaryList;
  const [view, setView] = useState("List");
  const { user } = useSelector((state) => state.userSlice)
  const userPermissions = user.permissions

  const [detailId, setDetailId] = useState("");
  const [visible, setVisible] = useState(false);


  const items = [
    {
      name: Careers,
      to: `${ROUTES.CAREER.CAREERLINK}`,
      renderButton: [1],
    },
  ];

  useEffect(() => {
    if (CurrentTab !== "careers") {
      dispatch(handleChangeTab("careers"));
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (CurrentTab === "careers") {
      let payload = {
        filterType: 0,
        search: search,
        sortBy: sort,
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
        sortBy: sort,
      };
      dispatch(getAllCareerAction(payload));
    }
  }, [CurrentTab, search, sort]);

  let RenderTab = {
    careers: <CareerCard view={view} />,
    myCareers: <MyCareerCard view={view} />,
    forApprovals: <ForApprovalCard view={view} />,
  };

  const segmentChange = (val) => {
    setView(val);
  };

  const handleColumnSorting = () => {
    if (sort === 1) {
      setSort(2);
    } else {
      setSort(1);
    }
  };

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        setDetailId(record.id);
        setVisible(true);
      },
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };
  const onClose = () => {
    setDetailId(null);
    setVisible(false);
  };

  return (
    <>
      <TabbableContainer>
        <Header
          items={items}
          buttons={userPermissions.includes(FeaturePermissionEnum.CreateCareer) ? [
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
          ] : []}
        />
        <TopBar
          segment={(val) => segmentChange(val)}
          onSearch={(val) => setSearch(val)}
        />
        <ContBody>
          {RenderTab[CurrentTab]}
          {view === labels.table && (
            <Table
              columns={tableColumn(CareerDictionaryList)}
              handleChange={handleColumnSorting}
              dragable={true}
              data={careers ? careers : []}
              onRow={onRow}
            />
          )}
        </ContBody>
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
       
        <Modal
          visible={visible}
          onCancel={onClose}
          footer={null}
          width={"50%"}
        >
          <JobDetails onClose={onClose} id={detailId} visible={visible} />
        </Modal>
      
      </TabbableContainer>
    </>
  );
}

export default Careers;
