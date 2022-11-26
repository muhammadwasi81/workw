import { useEffect, useContext, useState } from 'react';
import { Button, Drawer } from 'antd';
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton } from "antd";
import { requisitionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Composer from "./composer";
import DetailedView from "./DetailedView";
import "./style.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllRequisition, GetRequisitionById } from "../store/actions";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
// import ListItemMyRequisition from "./ListItem";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import ListItem from "./ListItem";
import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";

import { ROUTES } from "../../../../utils/routes";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
=======
>>>>>>> 21df76c1848e6ff0d5eae7f82f80f772067509c4

const Requisition = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const { items, drawerOpen } = useSelector((state) => state.requisitionSlice);
  const [detailId, setDetailId] = useState(false);
>>>>>>> 21df76c1848e6ff0d5eae7f82f80f772067509c4
  const { userLanguage } = useContext(LanguageChangeContext);
  const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
  const [filter, setFilter] = useState({ filterType: 0, search: '' });

<<<<<<< HEAD
  const [tableView, setTableView] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const [detailId, setDetailId] = useState(false);
  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({
    filterType: 0,
    search: "",
    sortBy: 1,
  });

  const dispatch = useDispatch();
  const { items, drawerOpen, loader } = useSelector(
    (state) => state.requisitionSlice
  );

  const [searchFilterValues, setSearchFilterValues] = useState();
=======
  const title = [
    {
      name: 'Requisition',
      renderButton: [1],
      to: `${ROUTES.REQUISITION.REQUISITION}`,
    },
  ];
>>>>>>> 21df76c1848e6ff0d5eae7f82f80f772067509c4

  const onClose = () => {
    setDetailId(null);
  };

  useEffect(() => {
    dispatch(getAllRequisition(filter));
  }, [filter]);

  const openMyRequisitionDetail = (id) => {
<<<<<<< HEAD
=======
    console.log(id, 'my Career Id');
>>>>>>> 21df76c1848e6ff0d5eae7f82f80f772067509c4
    dispatch(GetRequisitionById(id));
    navigate(`requisitionDetail/${id}`);
  };
  const headerItem = [
    {
      name: "Requisition",
      // to: `${ROUTES.REQUISITION.DEFAULT}`,
      renderButton: [1],
    },
  ];
  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        // console.log(record.id, "ID");
        setDetailId(record.id);
        setVisible(true);
      },
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };
  return (
    <>
      <TabbableContainer>
        <Header
<<<<<<< HEAD
          items={headerItem}
=======
          items={title}
>>>>>>> 21df76c1848e6ff0d5eae7f82f80f772067509c4
          buttons={[
            {
              buttonText: requisitionDictionary.createRequisition,
              render: (
<<<<<<< HEAD
                <SideDrawer
                  title={requisitionDictionary.createRequisition}
                  buttonText={requisitionDictionary.createRequisition}
                  handleClose={() => dispatch(handleOpenComposer(false))}
                  handleOpen={() => dispatch(handleOpenComposer(true))}
                  isOpen={drawerOpen}
                  children={<Composer />}
                />
=======
                <Button
                  className="ThemeBtn"
                  onClick={() => dispatch(handleOpenComposer(true))}
                >
                  <PlusOutlined />
                  {requisitionDictionary.createRequisition}
                </Button>
>>>>>>> 21df76c1848e6ff0d5eae7f82f80f772067509c4
              ),
            },
          ]}
        />
        <TopBar
          onSearch={(value) => {
            setFilter({ ...filter, search: value });
          }}
          buttons={[
            {
              name: requisitionDictionary.Requisitions,
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: requisitionDictionary.MyRequisitions,
              onClick: () => setFilter({ filterType: 1 }),
            },
            {
              name: requisitionDictionary.forApproval,
              onClick: () => setFilter({ filterType: 2 }),
            },
            {
              name: requisitionDictionary.forFinalApproval,
              onClick: () => setFilter({ filterType: 3 }),
            },
          ]}
          segment={{
            onSegment: (value) => {
              if (value === "Table") {
                setTableView(true);
              } else {
                setTableView(false);
              }
            },
            label1: "List",
            label2: "Table",
          }}
        />
        <ContBody>
          {loader && <Skeleton avatar paragraph={{ rows: 4 }} />}
          {tableView && (
            <Table
              columns={tableColumn()}
              dragable={true}
              data={items}
              onRow={onRow}
            />
          )}
          {items?.length > 0 && !loader && !tableView ? (
            <CardWrapper>
              {items.map((item, index) => {
                return (
                  <>
                    {filter.filterType === 1 ? (
                      <ListItem
                        item={item}
                        id={item.id}
                        key={index}
                        isDetail={true}
                        onClick={() => openMyRequisitionDetail(item.id)}
                      />
                    ) : (
                      <ListItem
                        item={item}
                        id={item.id}
                        key={index}
                        isDetail={false}
                        onClick={() => setDetailId(item.id)}
                      />
                    )}
                  </>
                );
              })}
            </CardWrapper>
          ) : (
            !loader && !tableView && <NoDataFound />
          )}
        </ContBody>
        {<DetailedView onClose={onClose} id={detailId} visible={visible} />}

        {/* <Drawer
          title={
            <h1
              style={{
                fontSize: '20px',
                margin: 0,
              }}
            >
              {requisitionDictionary.createRequisition}
            </h1>
          }
          width="768"
          onClose={() => {
            dispatch(handleOpenComposer(false));
          }}
          visible={drawerOpen}
          destroyOnClose={true}
          className="detailedViewComposer drawerSecondary"
        >
          <Composer />
        </Drawer> */}
      </TabbableContainer>
    </>
  );
};

export default Requisition;
