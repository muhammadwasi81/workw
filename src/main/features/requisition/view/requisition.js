import React, { useEffect, useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, Drawer } from 'antd';
import {
  ContBody,
  TabbableContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import { Skeleton } from 'antd';
import { requisitionDictionaryList } from '../localization/index';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import Composer from './Composer';
import DetailedView from './DetailedView';
import './style.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllRequisition, GetRequisitionById } from '../store/actions';
import { CardWrapper } from '../../../sharedComponents/Card/CardStyle';
import TopBar from '../../../sharedComponents/topBar/topBar';
import Header from '../../../layout/header/index';
import { handleOpenComposer } from '../store/slice';
import ListItemMyRequisition from './myRequisition';
import { useNavigate } from 'react-router-dom';
import ListItem from '../../reward/view/ListItem';

const Requisition = (props) => {
  const navigate = useNavigate();
  const { visible } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { requisitionDictionary } = requisitionDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const [detailId, setDetailId] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: '' });

  const dispatch = useDispatch();
  const { items, drawerOpen } = useSelector((state) => state.requisitionSlice);

  const [searchFilterValues, setSearchFilterValues] = useState();

  const onClose = () => {
    setDetailId(null);
  };

  useEffect(() => {
    dispatch(getAllRequisition(filter));
  }, [filter]);

  const openMyRequisitionDetail = (id) => {
    console.log(id, 'my Career Id');
    dispatch(GetRequisitionById(id));

    navigate(`requisitionDetail/${id}`);
  };

  return (
    <>
      <TabbableContainer className="">
        <Header
          buttons={[
            {
              buttonText: requisitionDictionary.createRequisition,
              render: (
                <Button
                  className="ThemeBtn"
                  onClick={() => dispatch(handleOpenComposer(true))}
                >
                  {requisitionDictionary.createRequisition}
                </Button>
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
          ]}
        />
        <ContBody>
          {items?.length > 0 ? (
            <CardWrapper>
              {items.map((item, index) => {
                return (
                  <>
                    {filter.filterType === 1 ? (
                      <ListItemMyRequisition
                        item={item}
                        id={item.id}
                        key={index}
                        onClick={() => openMyRequisitionDetail(item.id)}
                      />
                    ) : (
                      <ListItem
                        item={item}
                        id={item.id}
                        key={index}
                        onClick={() => setDetailId(item.id)}
                      />
                    )}
                  </>
                );
              })}
            </CardWrapper>
          ) : (
            <Skeleton avatar paragraph={{ rows: 4 }} />
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
        </Drawer>
      </TabbableContainer>
    </>
  );
};

export default Requisition;
