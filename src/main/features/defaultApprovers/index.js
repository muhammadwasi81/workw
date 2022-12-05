import { useState, useEffect, useContext } from 'react';
import { AdminContainer } from './../../sharedComponents/StyledComponents/admin';
import { FormContainer } from './../../sharedComponents/StyledComponents/adminForm';
import { Collapse, Modal, Tooltip, Button } from 'antd';
import { FormHeader } from '../../../components/HrMenu/Administration/StyledComponents/adminForm';
import './styles.css';
import { PlusCircleFilled } from '@ant-design/icons';
import { NoDataFound } from './../../sharedComponents/NoDataIcon/index';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEmployees } from './../../../utils/Shared/store/actions';
import Avatar from '../../sharedComponents/Avatar/avatarOLD';
import {
  addDefaultApproversAction,
  getAllDefaultApproversAction,
  deleteDefaultApproversByIdAction,
} from './store/action';
import { defaultApprovers } from './utils';
import CustomSelect from '../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { customApprovalDictionaryList } from '../CustomApprovals/localization';
import { LanguageChangeContext } from '../../../utils/localization/localContext/LocalContext';
import { DeleteOutlined } from '@ant-design/icons';
import TableHead from './view/table/tableHead';
import { handleApproversDelete } from './store/slice';
const { Panel } = Collapse;

const DefaultApprovers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [value, setValue] = useState([]);
  const [currentType, setCurrentType] = useState('');

  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = customApprovalDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.sharedSlice.employees);
  const { approversData } = useSelector((state) => state.approverSlice);

  const payloadData = {
    pageNo: 1,
    pageSize: 20,
    search: '',
  };

  useEffect(() => {
    dispatch(getAllDefaultApproversAction(payloadData));
  }, []);

  const filterType = (type) => {
    return approversData.filter((item) => item.type === type);
  };
  const showModal = (type) => {
    console.log(type, 'type');
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
    console.log(key, 'key');
  };

  const handleChange = (e) => {
    console.log(e, 'e');
    const payload = {
      memberId: [e],
      type: currentType,
    };
    console.log(payload, 'payload');
    dispatch(addDefaultApproversAction(payload));
  };
  const handleDelete = (id) => {
    console.log(id, 'handleDelete');
    dispatch(deleteDefaultApproversByIdAction(id));
  };
  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    fetchEmployees('', 0);
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
      {defaultApprovers.length > 0 ? (
        <AdminContainer>
          {defaultApprovers?.map((item, index) => {
            return (
              <>
                <div className="collapseWrapper" key={index}>
                  <Collapse onChange={handleCollapse} defaultActiveKey={['1']}>
                    <Panel
                      header={item.label}
                      key={item._id}
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
                      <div className="createEntryTable">
                        <table className="!min-w-full">
                          {filterType(item.type).length > 0 ? (
                            <TableHead />
                          ) : (
                            <div
                              style={{
                                width: 100,
                                height: 100,
                                margin: 'auto',
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
                                      <td>
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
                                            'No Designation'}
                                        </span>
                                      </td>
                                      <td>
                                        <Button
                                          type="primary"
                                          danger
                                          shape="circle"
                                          icon={<DeleteOutlined />}
                                          onClick={() => handleDelete(item.id)}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })
                              : null}
                          </tbody>
                        </table>
                      </div>
                      <Modal
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <div className="flex flex-col space-y-5">
                          <div className="flex flex-col space-y-2">
                            <label className="text-sm font-bold text-gray-700">
                              Select Default Approval
                            </label>
                            <CustomSelect
                              style={{ marginBottom: '0px' }}
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
                                      width={'30px'}
                                      height={'30px'}
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
                          {filterType(currentType).length > 0 ? (
                            filterType(currentType).map((item, index) => {
                              return (
                                <div key={index}>
                                  <Avatar
                                    name={item.member.name}
                                    src={item.member.image}
                                    round={true}
                                    width={'30px'}
                                    height={'30px'}
                                  />
                                  {item.member.name}
                                </div>
                              );
                            })
                          ) : (
                            <div
                              style={{
                                width: 100,
                                height: 200,
                                margin: 'auto',
                              }}
                            >
                              <NoDataFound />
                            </div>
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
