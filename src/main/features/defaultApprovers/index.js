import { useState, useEffect, useContext } from "react";
import { AdminContainer } from "./../../sharedComponents/StyledComponents/admin";
import { FormContainer } from "./../../sharedComponents/StyledComponents/adminForm";
import { Collapse, Modal, Tooltip, Button } from "antd";
import { FormHeader } from "../../../components/HrMenu/Administration/StyledComponents/adminForm";
import "./styles.css";
import { PlusCircleFilled } from "@ant-design/icons";
import { NoDataFound } from "./../../sharedComponents/NoDataIcon/index";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployees } from "./../../../utils/Shared/store/actions";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "./../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Content from "./view/content";
import { defaultApproverDictionaryList } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";

const { Panel } = Collapse;

const DefaultApprovers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [value, setValue] = useState([]);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const {
    defaultApproverDictionary,
    Direction,
  } = defaultApproverDictionaryList[userLanguage];
  const defaultApprovers = [
    { label: defaultApproverDictionary.expense, _id: 1 },
    { label: defaultApproverDictionary.expenseFinance, _id: 2 },
    { label: defaultApproverDictionary.travel, _id: 3 },
    { label: defaultApproverDictionary.travelAgent, _id: 4 },
    { label: defaultApproverDictionary.leave, _id: 5 },
    { label: defaultApproverDictionary.assetAllocation, _id: 6 },
    { label: defaultApproverDictionary.salary, _id: 7 },
    { label: defaultApproverDictionary.payroll, _id: 8 },
    { label: defaultApproverDictionary.reward, _id: 9 },
    { label: defaultApproverDictionary.resignationHr, _id: 10 },
    { label: defaultApproverDictionary.resignationadmin, _id: 11 },
    { label: defaultApproverDictionary.resignationIT, _id: 12 },
    { label: defaultApproverDictionary.resignationFinance, _id: 13 },
    { label: defaultApproverDictionary.resignationExit, _id: 14 },
    { label: defaultApproverDictionary.requistion, _id: 15 },
  ];
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.sharedSlice.employees);

  const selectedData = (data) => {
    console.log(data, "selectedData");
    setValue(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCollapse = (key) => {
    console.log(key, "key");
  };

  const handleChange = (e) => {
    setInput(e);
    setData([...data, e]);
    console.log(data, "data");
  };

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(
      getAllEmployees({
        text,
        pgNo,
        pgSize: 20,
      })
    );
  };

  return (
    <FormContainer>
      <FormHeader>{defaultApproverDictionary.defaultApprovers}</FormHeader>
      {defaultApprovers.length > 0 ? (
        <AdminContainer>
          {defaultApprovers?.map((item, index) => {
            return (
              <>
                <div className="collapseWrapper" key={index}>
                  <Collapse onChange={handleCollapse} defaultActiveKey={["1"]}>
                    <Panel
                      header={item.label}
                      key={item._id}
                      extra={[
                        <Tooltip title={defaultApproverDictionary.approvers}>
                          <Button
                            shape="circle"
                            icon={<PlusCircleFilled />}
                            onClick={showModal}
                          />
                        </Tooltip>,
                      ]}
                    >
                      <div>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Officiis corrupti, a eius exercitationem maiores
                        velit quaerat. Provident reiciendis officia natus error
                        quis, dolores aspernatur nostrum praesentium
                        repellendus, beatae ipsam voluptatem!
                      </div>
                      <Modal
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <div className="flex flex-col space-y-5">
                          <div className="flex flex-col space-y-2">
                            <label className="text-sm font-bold text-gray-700">
                              {defaultApproverDictionary.selectdefaultApprovers}
                            </label>
                            {/* <CustomSelect
                              style={{ marginBottom: '0px' }}
                              data={firstTimeEmpData}
                              selectedData={selectedData}
                              canFetchNow={isFirstTimeDataLoaded}
                              fetchData={fetchEmployees}
                              placeholder={'Select Members'}
                              isObject={true}
                              loadDefaultData={false}
                              onChange={handleChange}
                              optionComponent={(opt) => {
                                return (
                                  <>
                                    <Avatar
                                      name={opt.name}
                                      src={opt.image}
                                      round={true}
                                      width={'30px'}
                                      height={'30px'}
                                    />
                                    {opt.name}
                                  </>
                                );
                              }}
                              dataVal={value}
                              name="handoverId"
                              showSearch={true}
                              direction={Direction}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please Select Member',
                                },
                              ]}
                            />
                            {data?.map((item, index) => {
                              return (
                                <div key={index}>
                                  <Avatar
                                    name={item.name}
                                    src={item.image}
                                    round={true}
                                    width={'30px'}
                                    height={'30px'}
                                  >
                                    {item.name}
                                  </Avatar>
                                </div>
                              );
                            })} */}
                            <Content />
                          </div>
                        </div>
                      </Modal>
                    </Panel>
                  </Collapse>
                </div>
              </>
            );
          })}
        </AdminContainer>
      ) : (
        <NoDataFound />
      )}
    </FormContainer>
  );
};

export default DefaultApprovers;
