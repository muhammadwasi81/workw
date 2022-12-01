import { useEffect, useState, useContext } from 'react';
import { Button, Form } from 'antd';
import { customApprovalDictionaryList } from '../../CustomApprovals/localization';
import CustomSelect from '../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from './../../../../utils/Shared/store/actions';
import { LanguageChangeContext } from './../../../../utils/localization/localContext/LocalContext';
import Avatar from '../../../sharedComponents/Avatar/avatarOLD';
import { getAllDefaultApproversAction } from '../store/action';

const Content = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[
    userLanguage
  ];
  const [form] = Form.useForm();
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [firstTimeInvData, setFirstTimeEnvData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [isFirstTimeInvLoaded, setIsFirstTimeInvLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.sharedSlice.employees);
  console.log(employees, 'employees');

  const payloadData = {
    pageNo: 2147483647,
    pageSize: 20,
    search: '',
  };
  useEffect(() => {
    dispatch(getAllDefaultApproversAction(payloadData));
  }, []);

  const selectedData = (data) => {
    console.log(data, 'selectedData');
    setValue(data);
  };

  const handleChange = (e) => {
    console.log(e, 'e');
    setInput(e);
    setData([...data, e]);
  };
  console.log(data, 'data hai');
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
    <CustomSelect
      style={{ marginBottom: '0px' }}
      data={firstTimeEmpData}
      selectedData={selectedData}
      canFetchNow={isFirstTimeDataLoaded}
      fetchData={fetchEmployees}
      placeholder={customApprovalDictionary.selectMember}
      // mode={'multiple'}
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
  );
};

export default Content;
