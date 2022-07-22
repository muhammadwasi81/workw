import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TreeList from 'react-treelist';
import 'react-treelist/build/css/index.css';
import { STRINGS } from '../../../../utils/base';
import { getAllChartOfAccount } from '../store/actions';

const treeColumns = [
  {
    "title": "Name",
    "field": "name",
    "type": "string",
    // "width": 100
  },
  {
    "title": "Account Type",
    "field": "accountType",
    "type": "string"
  },
  // {
  //   "title": "Description",
  //   "field": "description",
  //   "type": "string"
  // }
];
const accountTypes = [{ value: 1, label: "Asset" }, { value: 2, label: "Liability" }, { value: 3, label: "Capital" }, { value: 4, label: "Revenue" }, { value: 5, label: "Expense" }, { value: 6, label: "Cost of Good Sold" }]
// let data = [
//   {
//     id: "6d04de3d-b006-4270-af51-014048197835",
//     pId: "00000000-0000-0000-0000-000000000000",
//     accountType: "3",
//     code: "030002",
//     name: "Owner's Equity",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655806490000"
//   },
//   {
//     id: "61429775-7a64-4363-ac9c-02efc05900de",
//     pId: "00000000-0000-0000-0000-000000000000",
//     accountType: "1",
//     code: "010005",
//     name: "Petty Cash",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655806031000"
//   },
//   {
//     id: "14f20f72-8722-4171-94ab-0a356052a7e1",
//     pId: "00000000-0000-0000-0000-000000000000",
//     accountType: "2",
//     code: "020004",
//     name: "Accounts Payable",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655806348000"
//   },
//   {
//     id: "036ed5d9-9cfd-4282-89de-0c371d3b0dd3",
//     pId: "00000000-0000-0000-0000-000000000000",
//     accountType: "5",
//     code: "050009",
//     name: "Advertising and Marketing",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655807104000"
//   },
//   {
//     id: "de5e90a6-8cbd-407c-96f9-0c3b5736426a",
//     pId: "00000000-0000-0000-0000-000000000000",
//     accountType: "3",
//     code: "030001",
//     name: "Retained Earning",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655806455000"
//   },
//   {
//     id: "4ee647d8-ae93-4b5d-9ce7-21890d2dcebc",
//     pId: "00000000-0000-0000-0000-000000000000",
//     accountType: "2",
//     code: "020006",
//     name: "HBL Credit Card",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655806427000"
//   },
//   {
//     id: "47eba539-d719-48b1-9eb7-21c166bbe500",
//     pId: "00000000-0000-0000-0000-000000000000",
//     accountType: "5",
//     code: "050004",
//     name: "Fuel ",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655806943000"
//   },
//   {
//     id: "e53da3fa-a426-4a26-97e7-2c36086e8f3d",
//     pId: "00000000-0000-0000-0000-000000000000",
//     accountType: "4",
//     code: "040001",
//     name: "Other Income",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655806679000"
//   },
//   {
//     id: "65ec62a5-e3d4-48a8-9ac8-2c53d02576e6",
//     pId: "5b365b20-3e44-4b32-af14-a439b69f5579",
//     accountType: "2",
//     code: "020007",
//     name: "Syed Bilal - PF",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655809002000"
//   },
//   {
//     id: "e59bbedc-cde4-43cf-b231-2fbc1903caf7",
//     pId: "00000000-0000-0000-0000-000000000000",
//     accountType: "4",
//     code: "040003",
//     name: "Sales",
//     createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
//     createDate: "1655806751000"
//   },
// ]

function COA_List() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChartOfAccount())
  }, [])
  const listData = useSelector(state => state.chartOfAccountsSlice.listData);
  let data = listData.map((item) => {
    return {
      ...item,
      parentId: item.parentId === STRINGS.DEFAULTS.guid ? null : item.parentId,
      accountTypeId: item.accountType,
      accountType: accountTypes.filter(it => it.value == item.accountType)[0].label
    }
  })
  return (
    <div className="table-holder COA_TableView" style={{ width: '100%', padding: "30px 20px 10px 20px" }}>
      <TreeList
        data={data}
        columns={treeColumns}
        options={{
          "minimumColWidth": 100,
          "expandAll": true
        }}
        // handlers={HANDLERS}
        id={'id'}
        parentId={'parentId'}>

      </TreeList>
    </div>
  )
}
export default COA_List