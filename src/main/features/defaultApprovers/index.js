import { useState, useEffect, useContext } from "react";
import { AdminContainer } from "./../../sharedComponents/StyledComponents/admin";
import { FormContainer } from "./../../sharedComponents/StyledComponents/adminForm";
import {
  Collapse,
  Modal,
  Tooltip,
  Button,
  Skeleton,
  message,
  Popconfirm,
} from "antd";
import { FormHeader } from "../../sharedComponents/Administration/StyledComponents/adminForm";
import "./styles.css";
import { PlusCircleFilled } from "@ant-design/icons";
import { NoDataFound } from "./../../sharedComponents/NoDataIcon/index";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployees } from "./../../../utils/Shared/store/actions";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";
import {
  addDefaultApproversAction,
  getAllDefaultApproversAction,
  deleteDefaultApproversByIdAction,
} from "./store/action";
import { handleApproversDelete } from "./store/slice";
import { defaultApprovers } from "./utils";
import CustomSelect from "../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { customApprovalDictionaryList } from "../CustomApprovals/localization";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { DeleteFilled } from "@ant-design/icons";
import TableHead from "./view/table/tableHead";

const { Panel } = Collapse;

const DefaultApprovers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [value, setValue] = useState([]);
  const [currentType, setCurrentType] = useState("");

  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = customApprovalDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.sharedSlice.employees);
  const { loader, approversData } = useSelector((state) => state.approverSlice);

  const payloadData = {
    pageNo: 1,
    pageSize: 20,
    search: "",
    filterType: 3,
  };

  useEffect(() => {
    dispatch(getAllDefaultApproversAction(payloadData));
  }, []);

  const filterType = (type) => {
    return approversData.filter((item) => item.type === type);
  };
  const showModal = (type) => {
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

  const handleChange = (e) => {
    const isAlreadyAdded = approversData.find(
      (item) => item.memberId === e && item.type === currentType
    );
    console.log(isAlreadyAdded, "isAlreadyAdded");
    if (isAlreadyAdded) {
      return message.error("Member Already Exists");
    }
    setValue([]);
    dispatch(addDefaultApproversAction({ memberId: [e], type: currentType }));
    dispatch(handleApproversDelete(e));
  };

  const cancel = (e) => {
    message.error(e.message);
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
      <FormHeader>Default Approvers</FormHeader>
      {defaultApprovers?.length > 0 ? (
        <AdminContainer>
          {defaultApprovers?.map((item, index) => {
            return (
              <>
                <div className="collapseWrapper" key={index}>
                  <Collapse accordion>
                    <Panel
                      header={item.label}
                      key={index}
                      extra={[
                        <Tooltip title="Approvers">
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
                                          <Popconfirm
                                            title="Sure to delete ?"
                                            description="Are you sure to delete this item?"
                                            onConfirm={() =>
                                              dispatch(
                                                deleteDefaultApproversByIdAction(
                                                  item.id
                                                )
                                              )
                                            }
                                            onCancel={cancel}
                                            okText="OK"
                                            cancelText="cancel"
                                          >
                                            <DeleteFilled
                                              style={{ color: "#1b5669" }}
                                            />
                                          </Popconfirm>
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
                              Select Default Approval
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
                                      <span className="member-name font-semibold">
                                        &nbsp; &nbsp;{item.member.name}
                                      </span>
                                    </div>
                                  );
                                })
                              ) : (
                                <div
                                  className="py-2"
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
