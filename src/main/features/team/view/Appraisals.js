import React, { useContext,useEffect } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import { getAppraisalsAction } from "../store/action";
import { teamDictionaryList } from "../localization/index";  

function Appraisals({ userId = null }) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.AppraisalsTable;
  const { id } = useParams();
  let myId = userId ? userId : id;

 // const {appraisalsdetails} = useSelector((state) => state.teamSlice);

 const {
  team: { appraisalsdetails },
  success,
} = useSelector((state) => state.teamSlice);

console.log("aaaappraisalsdetails",appraisalsdetails);

  useEffect(() => {
    dispatch(getAppraisalsAction('f44e6f72-8fd3-4088-bf9c-f9c20fedf1b2'));
  }, []);


  const columns = [
    {
      title: "Name",
      dataIndex: "creator",
      key: "name",
      render: (creator) => (
        <>
          {creator.name}
        </>
      ),
    },

    // {
    //   title: labels.EmployeeType,
    //   dataIndex: "employmentTypeId",
    //   key: "employmentTypeId",
    // },
    {
      title: "Email",
      dataIndex: "creator",
      key: "email",
      render: (creator) => (
        <>
          {creator.email}
        </>
      ),
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        className="custom_table"
        dataSource={appraisalsdetails}
      />
    </>
  );
}
export default Appraisals;
