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
import { DeleteOutlined } from "@ant-design/icons";
import TableHead from "./view/table/tableHead";
import { Popconfirm } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const { Panel } = Collapse;

const DefaultApprovers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [value, setValue] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = customApprovalDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.sharedSlice.employees);
  const { loader, approversData } = useSelector((state) => state.approverSlice);
  console.log(loader, "loader");
  const [id, setId] = useState();

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
    console.log(e, "eeeeeeeeeeee");
    const payload = {
      memberId: [e],
      type: currentType,
    };

    dispatch(addDefaultApproversAction(payload));
    dispatch(handleApproversDelete(e));
  };
  const onSuccess = (item) => {
    console.log(item, "itemitem");
    setId(null);
    dispatch(handleApproversDelete(e));
    //setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (id) => {
    console.log(item, "iddddd");
    setId(item.id);
    dispatch(deleteDefaultApproversByIdAction({ id: item.id })).then(
      () => onSuccess(item),
      onError
    );
    //dispatch(deleteDefaultApproversByIdAction({id:item.id}));
  };

  const cancel = (e) => {
    console.log(e, "ON CANCEL");
    message.error("Click on No");
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
                                            <Button
                                              type="primary"
                                              danger
                                              shape="circle"
                                              icon={<DeleteOutlined />}
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
                                      <span className="font-semibold">
                                        &nbsp;{item.member.name}
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
