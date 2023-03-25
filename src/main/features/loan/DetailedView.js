import React, { useContext } from 'react';
import { Drawer } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { LoanDictionary } from './localization/index';
import { LanguageChangeContext } from '../../../utils/localization/localContext/LocalContext';
import LoanDetail from './LoanDetail';

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { loanDictionaryList, Direction } = LoanDictionary[userLanguage];

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: '20px', margin: 0 }}>
          {loanDictionaryList.loans}
        </h1>
      }
      width="768"
      placement={
        (Direction === 'ltr' ? 'left' : 'right', isTablet ? 'bottom' : 'right')
      }
      onClose={props.onClose}
      visible={props.visible}
      destroyOnClose={true}
      className="detailedViewComposer drawerSecondary"
      style={{
        cursor: 'pointer',
      }}
    >
      <LoanDetail id={props.id} />
    </Drawer>
  );
}

export default DetailedView;
