import React, { useEffect, useContext, useState } from 'react';
import {
  ContBody,
  TabbableContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import { Button, Skeleton, Drawer, Form } from 'antd';
import { bonusDictionaryList } from '../localization/index';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import ListItem from './ListItem';
import Composer from './Composer';
import DetailedView from './DetailedView';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllBonus } from '../store/actions';
import { dictionaryList } from '../../../../utils/localization/languages';
import { CardWrapper } from '../../../sharedComponents/Card/CardStyle';

import { Table } from '../../../sharedComponents/customTable';
import { tableColumn } from './TableColumn';
import TopBar from '../../../sharedComponents/topBar/topBar';
import Header from '../../../layout/header/index';
import { handleOpenComposer } from '../store/slice';
import { ROUTES } from '../../../../utils/routes';
import { useMediaQuery } from 'react-responsive';
import SideDrawer from '../../../sharedComponents/Drawer/SideDrawer';
import { NoDataFound } from '../../../sharedComponents/NoDataIcon';
import { FeaturePermissionEnum } from '../../../../utils/Shared/enums/featuresEnums';

const initialFormData = {
  memberId: '',
  amount: 0,
  approvers: [],
  
};

const Bonus = (props) => {  
 
  const { userLanguage } = useContext(LanguageChangeContext);
  const { bonusDictionary, Direction } = bonusDictionaryList[userLanguage];
  const {tables} = bonusDictionary;
  const {user} = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions

  const [tableView, setTableView] = useState(false);

  const [visible, setVisible] = useState(false);

  const [detailId, setDetailId] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const [filter, setFilter] = useState({ filterType: 0, search: '' });
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [formData, setFormData] = useState(initialFormData);

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: 800 });

  const { bonuses, loader, bonusDetail, drawerOpen, success } = useSelector(
    (state) => state.bonusSlice
  );
  console.log(drawerOpen, 'drawerOpen');

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

  useEffect(() => {
    dispatch(getAllBonus(filter));
  }, [filter]);
  const items = [
    {
      name: bonusDictionary.bonus,
      renderButton: [1],
      to: `${ROUTES.BONUS.ROOT}`,
    },
  ];
  return (
    <TabbableContainer className="max-width-1190">
      <Header
        items={items}
        buttons={userPermissions.includes(FeaturePermissionEnum.CreateBonus) ?[
          {
            buttonText: 'Create Bonus',
            render: (
              <SideDrawer
                title={bonusDictionary.createBonus}
                buttonText={bonusDictionary.createBonus}
                handleClose={() => dispatch(handleOpenComposer(false))}
                handleOpen={() => dispatch(handleOpenComposer(true))}
                isOpen={drawerOpen}
                children={<Composer />}
              />
            ),
          },
        ]: []}
      />
      <TopBar
        onSearch={(value) => {
          setFilter({ ...filter, search: value });
        }}
        buttons={[
          {
            name:bonusDictionary.bonus,
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name:bonusDictionary.createdbyMe,
            onClick: () => setFilter({ filterType: 1 }),
          },
          {
            name: bonusDictionary.forApproval,
            onClick: () => setFilter({ filterType: 2 }),
          },
          {
            name: bonusDictionary.bonusToMe,
            onClick: () => setFilter({ filterType: 3 }),
          },
        ]}
        segment={{
          onSegment: (value) => {
            if (value === bonusDictionary.table) {
              setTableView(true);
            } else {
              setTableView(false);
            }
          },
          label1: bonusDictionary.list,
          label2: bonusDictionary.table,
        }}
      />

      <ContBody>
        {loader && <Skeleton avatar paragraph={{ rows: 4 }} />}

        {tableView && (
          <Table columns={tableColumn(tables)} dragable={false} data={bonuses} onRow={onRow} />
        )}

        {bonuses?.length > 0 && !loader && !tableView ? (
          <CardWrapper>
            {bonuses.map((item, index) => {
              return (
                <>
                  <ListItem
                    item={item}
                    id={item.id}
                    key={index}
                    onClick={() => setDetailId(item.id)}
                  />
                </>
              );
            })}
          </CardWrapper>
        ) : (
          !loader && !tableView && <NoDataFound />
        )}
      </ContBody>

      {/* {bonuses && bonuses.length > 0 ? (
          tableView ? (
            <div>
              <Table columns={tableColumn()} dragable={false} data={bonuses} />
            </div>
          ) : (
            <>
              {loader ? (
                <>
                  <Skeleton avatar paragraph={{ rows: 4 }} />
                </>
              ) : (
                <CardWrapper>
                  {bonuses.map((item, index) => {
                    return (
                      <>
                       
                        <ListItem
                          item={item}
                          id={item.id}
                          key={index}
                          onClick={() => setDetailId(item.id)}
                        />
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
        )} */}

      {bonusDetail && <DetailedView onClose={onClose} id={detailId} />}

      {/* <Drawer
        title={
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
            }}
          >
            Create Bonus
          </h1>
        }
        width="768"
        onClose={() => {
          dispatch(handleOpenComposer(false));
        }}
        visible={drawerOpen}
        destroyOnClose={true}
        placement={
          (Direction === "ltr" ? "left" : "right",
          isTablet ? "bottom" : "right")
        }
        className="detailedViewComposer drawerSecondary"
      >
        <Composer />
      </Drawer>  */}
    </TabbableContainer>
  );
};

export default Bonus;
