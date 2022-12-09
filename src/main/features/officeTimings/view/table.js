import { Table, Checkbox, TimePicker, InputNumber  } from "antd";
import { useEffect ,useContext} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllOfficeTimingGroups } from "../store/actions";
import { tableColumn } from "./tableColumn";
import moment from "moment";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext"
import { dictionaryList } from "../../../../utils/localization/languages";



const expandedRowRender = (officeTimingGroup) => {
  console.log(officeTimingGroup)
  const columns = [
    {
      title: "Days",
      dataIndex: "name",
      className: "drag-td-name",
      width: "min-content",
      width: "12%",
      editable: true,
      align: 'center',
    },
    {
      title: "Is Working",
      dataIndex: "isWorking",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: 'center',
      render: (text, row) => {
        function onChange(e) {
          console.log(text, "hello text")
        }
        return <Checkbox defaultChecked={text} onChange={onChange} />
      }
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: 'center',
      render: (text, row) => {
        const format = 'HH:mm a';
        return (
            <>
              <TimePicker defaultValue={moment(text, format)} format={format} />
            </>
          )
      }
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: 'center',
      render: (text, row) => {
        const format = 'HH:mm a';
        return (
            <>
              <TimePicker defaultValue={moment(text, format)} format={format} />
            </>
          )
      }
    },
    {
      title: "Grace Time",
      dataIndex: "graceTime",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: 'center',
      render: (text, row) => {
        let num = text / 60;
        function onChange(value) {
          console.log('changed', value);
        }
        return (
            <>
              <InputNumber min={1} max={100} defaultValue={num} onChange={onChange} /> min
            </>
        );
      }
    },
    
    // {
    //   title: 'Action',
    //   dataIndex: 'operation',
    //   key: 'operation',
    //   // render: () => (
    //   //   <Space size="middle">
    //   //     <a>Pause</a>
    //   //     <a>Stop</a>
    //   //     <Dropdown overlay={menu}>
    //   //       <a>
    //   //         More <DownOutlined />
    //   //       </a>
    //   //     </Dropdown>
    //   //   </Space>
    // //   ),
    // },
  ];

  return <Table columns={columns} dataSource={officeTimingGroup.details} pagination={false} />;
};


export default function OfficeTimingTable({
  handleEdit,
  handleDelete,
  removeButtons,
  actionRights = [],
}) {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,office,sharedLabels,Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration);

  const { officeTimingGroups, loadingData } = useSelector((state) => state.officeTimingSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOfficeTimingGroups());
  }, []);

  return (
    <AdminTable
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        sharedLabels,
      )}
      dataSource={officeTimingGroups}
      pagination={false}
      expandable={{expandedRowRender: expandedRowRender}}
      rowKey="id"
      scroll={{ x: true }}
      size="small"
    />
  );
}
