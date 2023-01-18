import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateExpense from '../CreateExpense';
import { Button, Drawer } from 'antd';
import { handleOpenExpenseComposer } from '../../store/slice';
import { dictionaryList } from '../../../../../utils/localization/languages';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { ExpenseDictionary } from '../../localization';
import { STRINGS } from '../../../../../utils/base';
import { ExpenseReferenceTypeEnum } from '../../enums';

function OpenCreateExpense({
  referenceId = STRINGS.DEFAULTS.guid,
  referenceType = ExpenseReferenceTypeEnum.General,
  feature = '',
}) {
  const dispatch = useDispatch();

  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList } = ExpenseDictionary[userLanguage];
  const { labels } = ExpenseDictionaryList;
  const { isCreateComposer, drawerOpen } = useSelector(
    (state) => state.expenseSlice
  );

  return (
    <>
      <Drawer
        title={
          <h1
            style={{
              fontSize: '20px',
              margin: 0,
            }}
          >
            {ExpenseDictionaryList.createTextBtn}
          </h1>
        }
        width="768"
        onClose={() => {
          dispatch(handleOpenExpenseComposer(false));
        }}
        open={drawerOpen}
        destroyOnClose={true}
        className="detailedViewComposer drawerSecondary"
      >
        <CreateExpense
          feature={feature}
          referenceId={referenceId}
          referenceType={referenceType}
        />
      </Drawer>
    </>
  );
}
export default OpenCreateExpense;
