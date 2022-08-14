import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TreeList from 'react-treelist';
import 'react-treelist/build/css/index.css';
import { STRINGS } from '../../../../utils/base';
import { getAllChartOfAccount } from '../store/actions';
import {
  EditOutlined
} from '@ant-design/icons';
import { handleEdit } from '../store/slice';


export const accountTypes = [{ value: 1, label: "Asset" }, { value: 2, label: "Liability" }, { value: 3, label: "Capital" }, { value: 4, label: "Revenue" }, { value: 5, label: "Expense" }, { value: 6, label: "Cost of Good Sold" }]

function COA_List() {
  const treeColumns = [
    {
      "title": "Name",
      "field": "name",
      "type": "string",
    },
    {
      "title": "Account Type",
      "field": "accountType",
      "type": "string"
    },
    {
      "title": "Clossing Balance",
      "field": "currentBalance",
      "type": "string"
    },
    {
      "title": "Action",
      "field": "name",
      "expand": false,
      "formatter":(item, row)=><EditOutlined onClick={(e) => onEdit(item,row)} />,
    },
  ];


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

  const onEdit = ((e, item) => {
    dispatch(handleEdit(item))
    // console.log(item, "ITEM !!!!")
  })

  return (
    <div className="table-holder COA_TableView" style={{ width: '100%', padding: "30px 20px 10px 20px" }}>
      <TreeList
        data={data}
        columns={treeColumns}
        options={{
          "minimumColWidth": 100,
          "expandAll": false
        }}
        
        // handlers={HANDLERS}
        id={'id'}
        parentId={'parentId'}>

      </TreeList>
    </div>
  )
}
export default COA_List