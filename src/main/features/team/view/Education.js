import React, { useContext, useEffect } from "react";
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
      sort: true,
      width: 200,
    },

    {
      title: labels.Institute,
      dataIndex: "institute",
      key: "institute",
      sort: true,
      width: 200,
    },
    {
      title: labels.StartEndDate,
      dataIndex: "startDate",
      key: "startDate",
      render: (value, row) => {
        console.log(value, "value in table");
        return value?.length
          ? `${moment(value).format("DD/MM/YYYY")} - ${moment(
              row.endDate
            ).format("DD/MM/YYYY")}`
          : `${moment(row.start).format("DD/MM/YYYY")} -  Present`;
      },
    },
    {
      title: labels.ObtainedMarks,
      dataIndex: "obtainedMarks",
      key: "obtainedMarks",
      sort: true,
      width: 80,
    },
    {
      title: labels.TotalMarks,
      dataIndex: "totalMarks",
      key: "totalMarks",
      sort: true,
      width: 80,
    },
    {
      title: labels.Description,
      dataIndex: "description",
      key: "description",
      sort: true,
      width: 200,
    },
    {
      title: labels.City,
      dataIndex: "city",
      key: "city",
      sort: true,
      width: 200,
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
