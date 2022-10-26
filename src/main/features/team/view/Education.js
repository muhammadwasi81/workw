import React, { useContext, useEffect, useState } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import moment from "moment";
import { getEducationDetailByUser } from "../../../features/education/store/actions";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Education() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.EducationTable;

  const {
    employee: { educationdetails },
    success,
  } = useSelector((state) => state.employeeSlice);

  useEffect(() => {
    dispatch(getEducationDetailByUser(id));
  }, []);
  const columns = [
    {
      title: labels.Degree,
      dataIndex: "degree",
      key: "degree",
    },

    {
      title: labels.Institute,
      dataIndex: "institute",
      key: "institute",
    },
    {
      title: labels.City,
      dataIndex: "city",
      key: "city",
    },
    {
      title: labels.Description,
      dataIndex: "description",
      key: "description",
    },
    {
      title: labels.ObtainedMarks,
      dataIndex: "obtainedMarks",
      key: "obtainedMarks",
    },
    {
      title: labels.TotalMarks,
      dataIndex: "totalMarks",
      key: "totalMarks",
    },
    {
      title: labels.StartEndDate,
      dataIndex: " startDate",
      key: " startDate",
      render: (value, row) => {
        return value?.length
          ? `${moment(row.startDate[0]).format("YYYY/MM/DD")} - ${moment(
              row.startDate[1]
            ).format("YYYY/MM/DD")}`
          : `${moment(row.start).format("YYYY/MM/DD")} -  Present`;
      },
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        // dragable={true}
        // scroll={{ x: true }}
        // size="small"
        className="custom_table"
        dataSource={educationdetails}
      />
    </>
  );
}
export default Education;
