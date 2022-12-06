import React, { useContext } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import TreeList from "react-treelist";
import "react-treelist/build/css/index.css";
import { STRINGS } from "../../../../utils/base";
import { getAllChartOfAccount } from "../store/actions";
import { EditOutlined } from "@ant-design/icons";
import { handleEdit } from "../store/slice";
import { charOfAccountDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

export const accountTypes = [
  { value: 1, label: "Asset" },
  { value: 2, label: "Liability" },
  { value: 3, label: "Capital" },
  { value: 4, label: "Revenue" },
  { value: 5, label: "Expense" },
  { value: 6, label: "Cost of Good Sold" },
];

function COA_List() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { chartOfAccountDictionary } = charOfAccountDictionaryList[
    userLanguage
  ];
  const treeColumns = [
    {
      title: chartOfAccountDictionary.name,
      field: "name",
      type: "string",
      class: "min-w-max",
    },
    {
      title: chartOfAccountDictionary.accountType,
      field: "accountType",
      type: "string",
      width: 170,
    },
    {
      title: chartOfAccountDictionary.clossingBalance,
      field: "currentBalance",
      type: "string",
      width: 170,
    },
    {
      title: chartOfAccountDictionary.edit,
      field: "currentBalance",
      formatter: (item, row) => (
        <EditOutlined onClick={(e) => onEdit(item, row)} />
      ),
      width: 80,
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChartOfAccount());
  }, []);
  const listData = useSelector((state) => state.chartOfAccountsSlice.listData);
  let data = listData.map((item) => {
    return {
      ...item,
      parentId: item.parentId === STRINGS.DEFAULTS.guid ? null : item.parentId,
      accountTypeId: item.accountType,
      accountType: accountTypes.filter((it) => it.value == item.accountType)[0]
        .label,
    };
  });

  const onEdit = (e, item) => {
    dispatch(handleEdit(item));
    // console.log(item, "ITEM !!!!")
  };

  return (
    <div className="table-holder COA_TableView w-full bg-white rounded-md h-max !py-4 !px-4 mt-2">
      <TreeList
        data={data}
        columns={treeColumns}
        options={{
          minimumColWidth: 100,
          expandAll: false,
        }}
        // handlers={HANDLERS}
        id={"id"}
        parentId={"parentId"}
      ></TreeList>
    </div>
  );
}
export default COA_List;
