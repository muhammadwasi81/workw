import { CloseCircleOutlined } from '@ant-design/icons';
import { Avatar, Select } from 'antd';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { getNameForImage } from '../../../../../utils/base';
// import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
// import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
// import { getNameForImage } from "../../../../utils/base";
// import { getAllEmployees } from "../../../../utils/Shared/store/actions";
// import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";

function AssignMemberModal({
  onChange,
  defaultData = [],
  placeholder = 'Search',
  selectedMembers = [],
  handleDeleteMember = () => {},
  leadManagerDetail = {},
}) {
  const { Option } = Select;

  const handleSelectChange = (value) => {
    const filterArrOfObj = defaultData.filter((val) => val.memberId === value);
    onChange('', filterArrOfObj);
  };
  console.log('leadManagerDetail', leadManagerDetail);
  return (
    <>
      <Select
        size="large"
        value={[]}
        onChange={(value) => {
          handleSelectChange(value);
        }}
        className="w-full"
        placeholder={placeholder}
        showSearch={true}
        optionFilterProp="children"
      >
        {defaultData
          .filter(
            (value) =>
              !selectedMembers.map((item) => item.id).includes(value.member.id)
          )
          .map((data, index) => (
            <>
              <Option key={index} value={data.member.id}>
                <Avatar src={data.member.image} className="!bg-black !mr-3">
                  {getNameForImage(data.member.name)}
                </Avatar>
                {data.member.name}
              </Option>
            </>
          ))}
      </Select>

      <hr className="my-2" />
      <div className="max-h-96 overflow-y-auto">
        {selectedMembers.map((element, index) => (
          <div
            className="flex justify-between border-b py-3 border-b-neutral-300"
            key={index}
          >
            <div className="flex gap-3">
              <Avatar
                src={
                  defaultData
                    .map((item) => item.member)
                    .filter((item) => item.id === element.id)[0].image
                }
                className="!bg-black"
              >
                {getNameForImage(element.name)}
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="!m-0">{element.name}</p>
                <p className="!m-0 text-neutral-400">
                  {element.description ? element.description : 'No Designation'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CloseCircleOutlined
                className="!text-red-400 hover:!text-red-600  !border-red-400 hover:!border-red-600 !text-xl cursor-pointer transition"
                onClick={() => {
                  handleDeleteMember(element.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AssignMemberModal;
