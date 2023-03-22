import React, { useContext,useEffect } from 'react';
import { TeamTable } from './TaskTable/TeamTable';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';
import { teamDictionaryList } from '../localization/index';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import { getCourseAction } from "../store/action";
import moment from "moment";

function Courses({ userId = null }) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.CoursesTable;
  
  const { id } = useParams();

  //const {coursedetails} = useSelector((state) => state.teamSlice);
  const {
    team: { coursedetails },
    success,
  } = useSelector((state) => state.teamSlice);

  console.log("ccccccoursedetails",coursedetails);
  let myId = userId ? userId : id;

  useEffect(() => {
    dispatch(getCourseAction('47D7929B-5B7D-4FFE-859D-2059ECE13191'));
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex:'user',
      render: (user) => (
        <>
          {user.email}
        </>
      ),
      sort: true,
      width: 200,
      key: "email",

    },
    
    // {
    //   title: "Designation",
    //   dataIndex: 'user',
    //   sort: true,
    //   width: 200,
    //   render: (user) => (
    //     <>
    //       {user.designation}
    //     </>
    //   ),
    // },

    {
      title: "Name",
      dataIndex: 'user',
      sort: true,
      width: 200,
      render: (user) => (
        <>
          {user.name}
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
        dataSource={coursedetails}
      />
    </>
  );
}
export default Courses;
