import { Button, Drawer, Skeleton } from "antd";
import React, { useEffect, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Header from "../../../layout/header";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import TopBar from "../../../sharedComponents/topBar/topBar";
import { Table } from "../../../sharedComponents/customTable";
import { getAllResignations } from "../store/action";
import ListItem from "./listItem";
import "./style.css"
import DetailedView from "./detaileView";
import Nodata from "../../../../content/NewContent/eLearning/no_data.svg";
import { handleOpenComposer } from "../store/slice";
import Composer from "./composer";
import { tableColumn } from "./TableColumn";
import { ROUTES } from "../../../../utils/routes";

const Resignation = props => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState({ filterType: 0, search: "" })
  const [tableView, setTableView] = useState(false);
  const [detailId, setDetailId] = useState(false);

  const { drawerOpen, items, loader } = useSelector(
    state => state.resignationSlice
  );

  const onClose = () => {
    setDetailId(null);
  };

  console.log(loader, "LOADER")
  console.log(items, "ITEMS !!!")

  useEffect(() => {
    dispatch(getAllResignations(filter))
  }, [filter])

  const headerButtuns = [
    {
      name: "Resignation",
      renderButton: [1],
      to: `${ROUTES.RESIGNATION.RESIGNATION}`,
    },
  ];

  return (
    <>
      <TabbableContainer>
        <Header
          items={headerButtuns}
          buttons={[
            {
              buttonText: "Create Reward",
              render: (
                <Button className="ThemeBtn" onClick={() => dispatch(handleOpenComposer(true))} >
                  Create Resignation
                </Button>
              ),
            },
          ]}
        />
        <TopBar
          onSearch={(value) => {
            setFilter({ ...filter, search: value })
          }}
          buttons={[
            {
              name: "Resignations",
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: "Created By Me",
              onClick: () => setFilter({ filterType: 1 }),
            },
            {
              name: "For Approval",
              onClick: () => setFilter({ filterType: 2 }),
            }
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
          {items?.length > 0 ? (
            tableView ? (
              <Table
                columns={tableColumn()}
                dragable={true}
                data={items}
              />
            ) : (
              <>
                {loader ? (
                  <>
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                  </>
                ) : (
                  <CardWrapper>
                    {items.map((item, index) => {
                      return (
                        <>
                          <ListItem item={item} id={item.id} key={index} onClick={() => setDetailId(item.id)} />
                        </>
                      );
                    })}
                  </CardWrapper>
                )}
              </>
            )
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <img src={Nodata} />
            </div>
          )}
          {/* {items?.length > 0 ? (
            <>
              {
                loader === false ?
                  <>
                    {tableView ? <Table
                      columns={tableColumn()}
                      dragable={true}
                      data={items}
                    /> :
                      <CardWrapper>
                        {items.map((item, index) => {
                          return (
                            <>
                              <ListItem item={item} id={item.id} key={index} onClick={() => setDetailId(item.id)} />
                            </>
                          );
                        })}
                      </CardWrapper>
                    }
                  </>
                  : <>
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                  </>

              }
            </>) : <Skeleton avatar paragraph={{ rows: 4 }} />} */}
        </ContBody>
        {<DetailedView onClose={onClose} id={detailId} />}

        <Drawer
          title={
            <h1
              style={{
                fontSize: "20px",
                margin: 0,
              }}
            >
              Create Resignation
            </h1>
          }
          width="768"
          onClose={() => {
            dispatch(handleOpenComposer(false))
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
};

export default Resignation;
