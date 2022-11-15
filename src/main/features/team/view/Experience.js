import React, { useEffect, useState, useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";

import { useDispatch, useSelector } from "react-redux";
import { getUserWorkExperience } from "../../../features/experienceInfo/store/actions";
import { useParams } from "react-router-dom";
import { employmentType } from "../../../../utils/Shared/enums/enums";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";
import moment from "moment";

function Experience() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.ExperienceTable;

  const { id } = useParams();

  const {
    employee: { experiencedetails },
    success,
  } = useSelector((state) => state.employeeSlice);

  const [city, setCity] = useState([]);

  useEffect(() => {
    dispatch(getUserWorkExperience(id));
  }, []);
  const columns = [
    {
      title: labels.Position,
      dataIndex: "position",
      key: "position",
      sort: true,
      width: 200,
      // className: "experience",
    },

    {
      title: labels.EmploymentType,
      dataIndex: "employmentTypeId",
      // className: "experience",
      key: "employmentTypeId",
      sort: true,
      width: 200,
      render: (value) => {
        return employmentType[value - 1]?.name;
      },
    },
    {
      title: labels.StartEndDate,
      dataIndex: "startDate",
      key: "startDate",
      sort: true,
      width: 200,
      // className: "experience",
      render: (value, row) => {
        return value?.length
          ? `${moment(row.startDate[0]).format("YYYY/MM/DD")} - ${moment(
              row.startDate[1]
            ).format("YYYY/MM/DD")}`
          : `${moment(row.start).format("YYYY/MM/DD")} -  Present`;
      },
    },
    {
      title: labels.City,
      dataIndex: "cityId",
      key: "cityId",
      sort: true,
      width: 200,
      render: (value) => {
        return city?.filter((item) => item.id === value?.toString())?.[0]?.name;
      },
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        className="custom_table"
        dataSource={experiencedetails}
      />
    </>
  );
}
export default Experience;
