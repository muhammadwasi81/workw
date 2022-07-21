import React from 'react';
import TreeList from 'react-treelist';
import 'react-treelist/build/css/index.css';
import { STRINGS } from '../../../../utils/base';
// import { STRINGS } from '../../../utils/base';
// import { API } from '../../../utils/services';

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
const accountTypes = [{ value: "1", label: "Asset" }, { value: "2", label: "Liability" }, { value: "3", label: "Capital" }, { value: "4", label: "Revenue" }, { value: "5", label: "Expense" }, { value: "6", label: "Cost of Good Sold" }]
let data = [
  {
    id: "6d04de3d-b006-4270-af51-014048197835",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "3",
    code: "030002",
    name: "Owner's Equity",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806490000"
  },
  {
    id: "61429775-7a64-4363-ac9c-02efc05900de",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "1",
    code: "010005",
    name: "Petty Cash",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806031000"
  },
  {
    id: "14f20f72-8722-4171-94ab-0a356052a7e1",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "2",
    code: "020004",
    name: "Accounts Payable",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806348000"
  },
  {
    id: "036ed5d9-9cfd-4282-89de-0c371d3b0dd3",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050009",
    name: "Advertising and Marketing",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807104000"
  },
  {
    id: "de5e90a6-8cbd-407c-96f9-0c3b5736426a",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "3",
    code: "030001",
    name: "Retained Earning",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806455000"
  },
  {
    id: "4ee647d8-ae93-4b5d-9ce7-21890d2dcebc",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "2",
    code: "020006",
    name: "HBL Credit Card",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806427000"
  },
  {
    id: "47eba539-d719-48b1-9eb7-21c166bbe500",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050004",
    name: "Fuel ",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806943000"
  },
  {
    id: "e53da3fa-a426-4a26-97e7-2c36086e8f3d",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "4",
    code: "040001",
    name: "Other Income",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806679000"
  },
  {
    id: "65ec62a5-e3d4-48a8-9ac8-2c53d02576e6",
    pId: "5b365b20-3e44-4b32-af14-a439b69f5579",
    accountType: "2",
    code: "020007",
    name: "Syed Bilal - PF",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655809002000"
  },
  {
    id: "e59bbedc-cde4-43cf-b231-2fbc1903caf7",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "4",
    code: "040003",
    name: "Sales",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806751000"
  },
  {
    id: "1a3dd876-fea0-4491-b9df-306e5b8593af",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050010",
    name: "Bank Fees and Charges",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807127000"
  },
  {
    id: "4089223c-cb71-43fd-818b-3149ad1d5c01",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050018",
    name: "Uncategorized Expense",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807288000"
  },
  {
    id: "799029b1-b99c-4772-9782-331f5694634a",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050014",
    name: "Legal Expense",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807218000"
  },
  {
    id: "73b85fd6-b44e-4bfe-a748-344664fe149b",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "1",
    code: "010010",
    name: "Furniture and Equipment",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806200000"
  },
  {
    id: "3a7ce6aa-3cc2-4973-8f62-3660190da169",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050016",
    name: "Donation",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807248000"
  },
  {
    id: "ff476cc7-ebb1-4458-8708-3ada7deab095",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "1",
    code: "010009",
    name: "Computer and Hardware",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806173000"
  },
  {
    id: "b02f03e7-85ba-4f99-98c2-3cfacd7666f7",
    pId: "e59bbedc-cde4-43cf-b231-2fbc1903caf7",
    accountType: "4",
    code: "040005",
    name: "Product Income",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807668000"
  },
  {
    id: "385d986c-49a8-408a-9263-45860424fdaa",
    pId: "907a9fdf-142f-4650-8ac8-bc1d83684b3b",
    accountType: "3",
    code: "030004",
    name: "Owais Shaikh, Drawing",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806576000"
  },
  {
    id: "3f485325-c3f2-4855-9c00-4c5608611a26",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050019",
    name: "Dues and Subscription ",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807327000"
  },
  {
    id: "7eb7e579-af80-4731-bf7e-56255e2ee42f",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "2",
    code: "020005",
    name: "Tax Payable",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806368000"
  },
  {
    id: "0c59c31c-ec78-484c-a29d-5c1659dc9b85",
    pId: "2f9fb7cf-249d-48d0-ba6a-6dc3e3776793",
    accountType: "1",
    code: "010007",
    name: "Habib Bank Limited - HBL",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806088000"
  },
  {
    id: "64da152e-4a04-40be-b54d-5f5d90502152",
    pId: "5b365b20-3e44-4b32-af14-a439b69f5579",
    accountType: "2",
    code: "020010",
    name: "Anus Ali - PF",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655809858000"
  },
  {
    id: "d0be00c0-f804-4776-a159-6256eb2602d5",
    pId: "c8275c0c-6f57-49a5-8545-a60664da1bea",
    accountType: "5",
    code: "050007",
    name: "Electricity Bill",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807001000"
  },
  {
    id: "604566ab-2f5a-48c6-a7f4-63ca2804b2b3",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050002",
    name: "Travel Expense",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806877000"
  },
  {
    id: "2f9fb7cf-249d-48d0-ba6a-6dc3e3776793",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "1",
    code: "010006",
    name: "Bank",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806054000"
  },
  {
    id: "d84d5985-696a-4a5f-b864-6f6597b46002",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050005",
    name: "Repair and Maintaince",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806963000"
  },
  {
    id: "02d2ab60-ff1f-497e-8e5d-6fd87ad7da06",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "1",
    code: "010003",
    name: "Employee Loan",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655805953000"
  },
  {
    id: "f4f09561-51ef-4332-a8be-805c65088c3d",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050003",
    name: "Office Supplies",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806932000"
  },
  {
    id: "09251147-dc8f-4f51-9f8d-815ada6b8ca8",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "1",
    code: "010002",
    name: "Employee Advance",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655805926000"
  },
  {
    id: "9058c59f-e30e-4bb7-923d-937c5c7cae23",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "1",
    code: "010001",
    name: "Currency Clearing",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655805887000"
  },
  {
    id: "0de4205c-033c-4a89-9f00-944a4445eba6",
    pId: "5b365b20-3e44-4b32-af14-a439b69f5579",
    accountType: "2",
    code: "020008",
    name: "Abu Bakar - PF",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655809072000"
  },
  {
    id: "387ed8c2-d36d-4e30-9453-96ee3d0ad4aa",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050020",
    name: "Depreciation Expense",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807456000"
  },
  {
    id: "5b365b20-3e44-4b32-af14-a439b69f5579",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "2",
    code: "020001",
    name: "Employee Provident Fund",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806256000"
  },
  {
    id: "53a08420-9fdf-4659-9d0f-a493909866f8",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "4",
    code: "040002",
    name: "Gain on Foreign Exchange",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806721000"
  },
  {
    id: "094f56de-df59-4a83-91fb-a4b83b0b959a",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "1",
    code: "010008",
    name: "Account Receivable",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806130000"
  },
  {
    id: "c8275c0c-6f57-49a5-8545-a60664da1bea",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050006",
    name: "Utility Bills",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806984000"
  },
  {
    id: "beaf4519-257b-4e75-b06c-a893f463b9e8",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050017",
    name: "Other Expense",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807269000"
  },
  {
    id: "49b64749-44a7-4f64-b784-b03b26ea7450",
    pId: "5b365b20-3e44-4b32-af14-a439b69f5579",
    accountType: "2",
    code: "020009",
    name: "Amir Naveed - PF",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655809099000"
  },
  {
    id: "930f6802-b135-4847-bf53-b07c604c6d78",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "2",
    code: "020002",
    name: "Withholding on Payroll",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806306000"
  },
  {
    id: "40fe7a71-f5e2-4413-81b9-b14da602a3a7",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "2",
    code: "020003",
    name: "Other Payable",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806319000"
  },
  {
    id: "907a9fdf-142f-4650-8ac8-bc1d83684b3b",
    pId: "6d04de3d-b006-4270-af51-014048197835",
    accountType: "3",
    code: "030003",
    name: "Owais Shaikh, Capital",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806533000"
  },
  {
    id: "53fbbc0a-98be-4665-a442-bd4ac8e5abd3",
    pId: "c8275c0c-6f57-49a5-8545-a60664da1bea",
    accountType: "5",
    code: "050008",
    name: "Internet Bill",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807023000"
  },
  {
    id: "b11394d9-9437-4434-90b5-d6a9c3036099",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050012",
    name: "Meals and Entertainment",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807169000"
  },
  {
    id: "d668b9ab-3e67-48ec-815d-dd25c2098684",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050013",
    name: "Payroll, Salaries and Wages",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807203000"
  },
  {
    id: "e33fcc1b-ae50-4462-8119-e4b6a5f96db1",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050011",
    name: "Rent Expense",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807149000"
  },
  {
    id: "0629ebb9-a5a1-4d44-88fb-ed437fb5928d",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "1",
    code: "010004",
    name: "Undeposited Fund",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806005000"
  },
  {
    id: "1151f5ca-a473-43da-9c1b-f3d9d53b2ff5",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050015",
    name: "Loss on Foreign Exchange",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807236000"
  },
  {
    id: "45e59cd2-e60f-4991-974f-f670f639e8a3",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "3",
    code: "030006",
    name: "Opening Balance",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806646000"
  },
  {
    id: "93ec3006-928a-40f6-9e77-f67191c0d48b",
    pId: "e59bbedc-cde4-43cf-b231-2fbc1903caf7",
    accountType: "4",
    code: "040004",
    name: "Service Income",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655807641000"
  },
  {
    id: "6bb11fed-4c18-46fc-b21d-f6a1f9cfc415",
    pId: "00000000-0000-0000-0000-000000000000",
    accountType: "5",
    code: "050001",
    name: "Employee Bonus",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806824000"
  },
  {
    id: "59312981-23ab-460d-b5e0-fc019e3c13ae",
    pId: "907a9fdf-142f-4650-8ac8-bc1d83684b3b",
    accountType: "3",
    code: "030005",
    name: "Owais Shaikh, Profit Share",
    createBy: "d8ada3ca-0ec8-4eab-b1a1-e6839c7a370c",
    createDate: "1655806607000"
  }
]
data = data.map((item) => {
  return {
    ...item,
    pId: item.pId === STRINGS.DEFAULTS.guid ? null : item.pId,
    accountTypeId: item.accountType,
    accountType: accountTypes.filter(it => it.value === item.accountType)[0].label
  }
})


function COA_List({ listData }) {
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
        parentId={'pId'}>

      </TreeList>
    </div>
  )
}
export default COA_List