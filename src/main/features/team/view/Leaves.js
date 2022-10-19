import React, { useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

function Leaves() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.LeavesTable;

  const columns = [
    {
      title: labels.LeaveType,
      dataIndex: "leaveType",
      key: "leaveType",
    },

    {
      title: labels.Alloted,
      dataIndex: "alloted",
      key: "alloted",
    },
    {
      title: labels.Availed,
      dataIndex: "availed",
      key: "availed",
    },
    {
      title: labels.Remaining,
      dataIndex: "remaining",
      key: "remaining",
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        // dragable={true}
        // scroll={{ x: true }}
        className="custom_table"
        dataSource={[
          {
            leaveType: "0",
            alloted: "0",
            availed: "0",
            remaining: "0",
          },
        ]}
      />
    </>
  );
}
export default Leaves;
