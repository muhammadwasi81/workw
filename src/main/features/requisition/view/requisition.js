import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TabbableContainer, ContBody } from '../../../layout/GridStyle';
import Header from '../../../layout/header';
import SideDrawer from '../../../sharedComponents/Drawer/SideDrawer';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { requisitionDictionaryList } from '../localization';
import TopBar from '../../../sharedComponents/topBar/topBar';
import Composer from './composer';
import ListView from './ListView';
import DetailedView from './DetailedView';
import { CloseDetailView } from '../../../../store/appReducer/resignationSlice';
import { Table } from '../../../sharedComponents/customTable';
import { tableColumn } from './TableColumn';

function Requisition() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { requisitionDictionary } = requisitionDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const { listItem } = useSelector((state) => state.resignationSlice);

  const [tableView, setTableView] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: '' });

  const closeDetailView = () => {
    dispatch(CloseDetailView());
  };

  return (
    <TabbableContainer>
      <Header
        buttons={[
          {
            buttonText: 'Create Resignation',
            // onClick: () => setVisible(true),
            render: (
              <SideDrawer
                title={requisitionDictionary.createRequisition}
                buttonText={requisitionDictionary.createRequisition}
                isAccessDrawer={false}
              >
                <Composer />
              </SideDrawer>
            ),
          },
        ]}
      />
      <TopBar
        onSearch={(value) => {
          console.log(value);
        }}
        buttons={[
          {
            name: 'Requisition',
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name: 'For Approval',
            onClick: () => setFilter({ filterType: 1 }),
          },
          {
            name: 'Requisition To Me',
            onClick: () => setFilter({ filterType: 2 }),
          },
        ]}
        filter={{
          onFilter: () => {},
        }}
        segment={{
          onSegment: (value) => {
            if (value === 'Table') {
              setTableView(true);
            } else {
              setTableView(false);
            }
          },
          label1: 'List',
          label2: 'Table',
        }}
      />

      <ContBody>
        {tableView && <Table columns={tableColumn()} dragable={true} />}
        {!tableView && <ListView />}
      </ContBody>
      {listItem && (
        <DetailedView onClose={closeDetailView} visible={listItem} />
      )}
    </TabbableContainer>
  );
}

export default Requisition;
