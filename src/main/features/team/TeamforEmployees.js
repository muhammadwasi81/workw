import React, { useContext, useEffect, useState } from "react";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import { teamDictionaryList } from "./localization/index";
import TeamCard, { CardGrid } from "./view/TeamCard";
import { useSelector, useDispatch } from "react-redux";
import { addTeamMemberAction, getTeamsAction } from "./store/action";
import { Form, Select, Avatar, Skeleton } from "antd";
import { getAllEmployees } from "../../../utils/Shared/store/actions";
import { getNameForImage } from "../../../utils/base";
import { useParams } from "react-router-dom";
import TopBar from "../../sharedComponents/topBar/topBar";
import TeamTableView from "./view/TeamTableView";
import { NoDataFound } from "../../sharedComponents/NoDataIcon";

const { Option } = Select;

const MyTeam = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const [form] = Form.useForm();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const [employeesData, setEmployeesData] = useState([]);
  const [view, setView] = useState("List");
  const labels = teamDictionary.sharedLabels;
  const { teams } = useSelector((state) => state.teamSlice);
  const { loader } = useSelector((state) => state.employeeSlice);

  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);

  useEffect(() => {
    if (employees.length > 0) {
      setEmployeesData(employees);
    }
  }, [employees]);

  useEffect(() => {
    dispatch(getTeamsAction(param.id));
    fetchEmployees("", 0);
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const handleOnSelect = (val) => {
    console.log(val, "val");
    //TODO: here we will add employess
    let payload = {
      userId: val,
      managerId: param.id,
    };
    dispatch(addTeamMemberAction(payload));
  };

  if (loader)
    return [...Array(40)].map((_, index) => (
      <div className={` teamListContainer`}>
        <Skeleton key={index} loading={true} active />
      </div>
    ));

  // if (teams.length === 0) return <NoDataFound />;

  return (
    <>
      <span className="text-xl font-bold">Add Members</span>
      <Form.Item
        name="assign"
        rules={[
          {
            required: true,
            message: "Please Select Assign Member!",
          },
        ]}
      >
        <Select
          mode="multiple"
          name="assign"
          size="large"
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder={"Add"}
          onSelect={handleOnSelect}
          onDeselect={(value) => {
            let memberArr = [...employeesData];
            memberArr = memberArr.filter((item) => item.id !== value);
            setEmployeesData(memberArr);
            form.setFieldValue("assign", memberArr);
          }}
        >
          {employeesData.map((item, index) => {
            return (
              <Option
                key={item?.id}
                value={item?.id}
                className="hover:!bg-primary-color hover:!text-white"
              >
                <Avatar src={item?.image} className="!bg-black flex !mr-1">
                  {getNameForImage(item?.name)}
                </Avatar>

                {item?.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      {teams.length === 0 ? (
        <NoDataFound />
      ) : (
        <>
          <div style={{ flexDirection: "column", width: "100%" }}>
            <TopBar
              style={{ margin: 0, width: "100%" }}
              // onSearch={(value) => searchHandler(value)}
              segment={{
                onSegment: (value) => {
                  setView(value);
                },
                label1: labels.list,
                label2: labels.table,
              }}
              searchEnable={false}
            />
            {view === "List" ? (
              <CardGrid>
                {teams.map((team, index) => {
                  return <TeamCard teams={team} key={index} />;
                })}
              </CardGrid>
            ) : (
              <TeamTableView />
            )}
          </div>
        </>
      )}
    </>
  );
};
export default MyTeam;
