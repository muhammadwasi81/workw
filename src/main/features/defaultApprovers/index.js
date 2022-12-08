import { useState, useEffect, useContext } from "react";
import { AdminContainer } from "./../../sharedComponents/StyledComponents/admin";
import { FormContainer } from "./../../sharedComponents/StyledComponents/adminForm";
import { Collapse, Modal, Tooltip, Button, Skeleton } from "antd";
import { FormHeader } from "../../../components/HrMenu/Administration/StyledComponents/adminForm";
import "./styles.css";
import { PlusCircleFilled } from "@ant-design/icons";
import { NoDataFound } from "./../../sharedComponents/NoDataIcon/index";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployees } from "./../../../utils/Shared/store/actions";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "./../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { defaultApproverDictionaryList } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";

const { Panel } = Collapse;

const DefaultApprovers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [value, setValue] = useState([]);
  const [currentType, setCurrentType] = useState("");

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
  const { loader, approversData } = useSelector((state) => state.approverSlice);
  console.log(loader, "loader");
  const payloadData = {
    pageNo: 1,
    pageSize: 20,
    search: "",
  };

  useEffect(() => {
    dispatch(getAllDefaultApproversAction(payloadData));
  }, []);

  const filterType = (type) => {
    return approversData.filter((item) => item.type === type);
  };
  const showModal = (type) => {
    console.log(type, "type");
    setIsModalOpen(true);
    setCurrentType(type);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const selectedData = (data) => {
    setValue(data);
  };

  const handleCollapse = (key) => {
    console.log(key, "key");
  };

  const handleChange = (e) => {
    console.log(e, "e");
    const payload = {
      memberId: [e],
      type: currentType,
    };
    console.log(payload, "payload");
    dispatch(addDefaultApproversAction(payload));
  };

  const handleDelete = (id) => {
    console.log(id, "handleDelete");
    dispatch(deleteDefaultApproversByIdAction(id));
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
                            onClick={() => showModal(item.type)}
                          />
                        </Tooltip>,
                      ]}
                    >
                      {loader ? (
                        <Skeleton active />
                      ) : (
                        <div className="createEntryTable">
                          <table className="!min-w-full">
                            {filterType(item.type).length > 0 ? (
                              <TableHead />
                            ) : (
                              <div
                                style={{
                                  width: 100,
                                  height: 100,
                                  margin: "auto",
                                }}
                              >
                                <NoDataFound />
                              </div>
                            )}
                            <tbody>
                              {filterType(item.type).length > 0
                                ? filterType(item.type).map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td style={{ maxWidth: "15px" }}>
                                          <Avatar
                                            size={35}
                                            round={true}
                                            name={item?.member?.name}
                                            src={item?.member?.image}
                                          />
                                        </td>
                                        <td>
                                          <span className="font-bold">
                                            {item?.member?.name}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="font-semibold">
                                            {item?.member?.designation ||
                                              "No Designation"}
                                          </span>
                                        </td>
                                        <td style={{ maxWidth: "15px" }}>
                                          <Button
                                            type="primary"
                                            danger
                                            shape="circle"
                                            icon={<DeleteOutlined />}
                                            onClick={() =>
                                              handleDelete(item.id)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    );
                                  })
                                : null}
                            </tbody>
                          </table>
                        </div>
                      )}
                      <Modal
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        className="modalWrapper"
                      >
                        <div className="flex flex-col space-y-5">
                          <div className="flex flex-col space-y-2">
                            <label className="text-sm font-bold text-gray-700">
                              {defaultApproverDictionary.selectdefaultApprovers}
                            </label>
                            <CustomSelect
                              data={firstTimeEmpData}
                              selectedData={selectedData}
                              canFetchNow={isFirstTimeDataLoaded}
                              fetchData={fetchEmployees}
                              placeholder={
                                customApprovalDictionaryList.selectMember
                              }
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
                                      width={"30px"}
                                      height={"30px"}
                                    />
                                    {opt.name}
                                  </>
                                );
                              }}
                              dataVal={value}
                              name="approvers"
                              showSearch={true}
                              direction={Direction}
                            />
                          </div>
                          {loader ? (
                            <Skeleton active />
                          ) : (
                            <>
                              {filterType(currentType).length > 0 ? (
                                filterType(currentType).map((item, index) => {
                                  return (
                                    <div key={index}>
                                      <Avatar
                                        name={item.member.name}
                                        src={item.member.image}
                                        round={true}
                                        width={"30px"}
                                        height={"30px"}
                                      />
                                      <span className="font-semibold">
                                        {" "}
                                        {item.member.name}
                                      </span>
                                    </div>
                                  );
                                })
                              ) : (
                                <div
                                  style={{
                                    width: 100,
                                    height: 200,
                                    margin: "auto",
                                  }}
                                >
                                  <NoDataFound />
                                </div>
                              )}
                            </>
                          )}
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
