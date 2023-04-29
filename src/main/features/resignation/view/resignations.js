import { Button, Drawer, Skeleton } from 'antd';
import React, { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Header from '../../../layout/header';
import {
  ContBody,
  TabbableContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import { CardWrapper } from '../../../sharedComponents/Card/CardStyle';
import TopBar from '../../../sharedComponents/topBar/topBar';
import { Table } from '../../../sharedComponents/customTable';
import { getAllResignations } from '../store/action';
import ListItem from './ListItem';
import './style.css';
import DetailedView from './detaileView';
import { NoDataFound } from '../../../sharedComponents/NoDataIcon';
import { handleOpenComposer } from '../store/slice';
import Composer from './composer';
import { tableColumn } from './TableColumn';
import { ROUTES } from '../../../../utils/routes';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { resignationDictionaryList } from '../localization';
import { FeaturePermissionEnum } from '../../../../utils/Shared/enums/featuresEnums';

const Resignation = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { resignationDictionary, Direction } = resignationDictionaryList[
    userLanguage
  ];
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    filterType: 1,
    search: '',
    pageNo: 0,
    pageSize: 20,
    sortBy: 1,
  });
  const [tableView, setTableView] = useState(false);
  const [detailId, setDetailId] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const { user } = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions;

  const { drawerOpen, items, loader } = useSelector(
    (state) => state.resignationSlice
  );
  console.log("detailIddetailId",items);

  const onSearch = (value) => {
    const filtered = items.filter((item) => {
      return (
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.referenceNo.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredItems(filtered);
  };

  const onClose = () => {
    setDetailId(null);
  };

  useEffect(() => {
    dispatch(getAllResignations(filter));
  }, [filter]);

  const headerButtons = [
    {
      name: resignationDictionary.resignation,
      renderButton: [1],
      to: `${ROUTES.RESIGNATION.RESIGNATION}`,
    },
  ];

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        console.log(record.id, 'ID');
        //setDetailId(record.id);
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
          items={headerButtons}
          buttons={
            userPermissions.includes(FeaturePermissionEnum.CreateResignation)
              ? [
                  {
                    buttonText: 'Create Resignation',
                    render: (
                      <Button
                        className="ThemeBtn"
                        onClick={() => dispatch(handleOpenComposer(true))}
                      >
                        {resignationDictionary.createResignation}
                      </Button>
                    ),
                  },
                ]
              : []
          }
        />
        <TopBar
          onSearch={(value) => {
            console.log('New search value:', value);
            setFilter({ ...filter, search: value });
            onSearch(value);
          }}
          buttons={[
            {
              name: resignationDictionary.resignation,
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: resignationDictionary.createdByMe,
              onClick: () => setFilter({ filterType: 1 }),
            },
            {
              name: resignationDictionary.forApproval,
              onClick: () => setFilter({ filterType: 2 }),
            },
          ]}
          segment={{
            onSegment: (value) => {
              if (value === resignationDictionary.table) {
                setTableView(true);
              } else {
                setTableView(false);
              }
            },
            label1: resignationDictionary.list,
            label2: resignationDictionary.table,
          }}
        />
        <ContBody>
          {loader && <Skeleton avatar paragraph={{ rows: 4 }} />}

          {tableView && (
            <Table
              columns={tableColumn(resignationDictionary)}
              dragable={true}
              data={items}
              onRow={onRow}
            />
          )}

          {items?.length > 0 && !loader && !tableView ? (
            <CardWrapper>
              {items.map((item, index) => {
                return (
                  <ListItem
                    item={item}
                    id={item.id}
                    key={index}
                    onClick={() => setDetailId(item.id)}
                  />
                );
              })}
            </CardWrapper>
          ) : (
            !loader && !tableView && <NoDataFound />
          )}
        </ContBody>
        {<DetailedView onClose={onClose} id={detailId} />}

        <Drawer
          title={
            <h1
              style={{
                fontSize: '20px',
                margin: 0,
              }}
            >
              {resignationDictionary.createResignation}
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
        </Drawer>
      </TabbableContainer>
    </>
  );
};

export default Resignation;
