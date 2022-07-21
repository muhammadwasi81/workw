import React, { useEffect, useState } from 'react'
import COA_Composer from './Composer';
import TabHeader from '../Shared/Header/header';
import COA_List from '../listView';
import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import { API } from '../../../utils/services';
import { STRINGS } from '../../../utils/base';
import { TabbableContainer, ContBody } from '../../../../sharedComponents/AppComponents/MainFlexContainer';

const ChartOfAccounts = () => {
  const TabsData = [
    {
      title: "Accounts",
      route: "MyAccounts"
    },
    {
      title: "General Entries",
      route: "GeneralEntries"
    },
    {
      title: "Reports",
      route: "Reports"
    }
  ]
  const Buttons = [
    {
      title: "Create Account",
      onClick: () => setIsOpenComposer(true)
    }
  ]
  const accountTypes = [{ value: 1, label: "Asset" }, { value: 2, label: "Liability" }, { value: 3, label: "Capital" }, { value: 4, label: "Revenue" }, { value: 5, label: "Expense" }, { value: 6, label: "Cost of Good Sold" }]
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    Message: '',
    variant: 'error'
  });
  const { isOpen, variant, Message } = snackbarStatus;
  const [isOpenComposer, setIsOpenComposer] = useState(false);
  const [listData, setListData] = useState(null);
  const cancelSnackbar = () => setSnackbarStatus({ ...snackbarStatus, isOpen: false })
  const onSuccessCreate = (newItem) => {
    setSnackbarStatus({
      isOpen: true,
      Message: "Account Successfully Created.",
      variant: 'success'
    });
    setIsOpenComposer(false);
    setListData([...listData,
    {
      ...newItem,
      pId: newItem.pId === STRINGS.DEFAULTS.guid ? null : newItem.pId,
      accountType: accountTypes.filter(it => it.value === newItem.accountType)[0].label
    }]);
  }
  const getListData = () => {
    API.FINANCE.CHART_OF_ACCOUNT.getAllChartOfAccount()
      .then(({ status, error, data }) => {
        if (status) {
          const filteredData = data.map((item) => {
            return {
              ...item,
              pId: item.pId === STRINGS.DEFAULTS.guid ? null : item.pId,
              accountTypeId: item.accountType,
              accountType: accountTypes.filter(it => it.value === item.accountType)[0].label
            }
          })
          setListData(filteredData)
        }
        else
          alert(error)
      })
  }
  useEffect(() => {
    getListData()
  }, [])

  return (
    <TabbableContainer>
        <TabHeader tabs={TabsData} buttons={Buttons} />
        <ContBody>
          <COA_List listData={listData} />
        </ContBody>
        {
          isOpenComposer &&
          <COA_Composer onClose={() => setIsOpenComposer(false)}
            onSuccess={onSuccessCreate}
            allAccounts={listData}
          />
        }
        <CustomizedSnackbars
          isOpen={isOpen}
          cancel={cancelSnackbar}
          variant={variant}
          message={Message}
          duration={2000}
        />
    </TabbableContainer >
  )
}
export default ChartOfAccounts;