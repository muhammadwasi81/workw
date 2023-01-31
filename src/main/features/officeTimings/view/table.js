import { Table, Checkbox, TimePicker, InputNumber } from "antd";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllOfficeTimingGroups } from "../store/actions";
import { tableColumn } from "./tableColumn";
import moment from "moment";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
const secondsToHms = (d) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? String(h).padStart(2, "0") : "00";
  var mDisplay = m > 0 ? String(m).padStart(2, "0") : "00";
  var sDisplay = s > 0 ? String(s).padStart(2, "0") : "00";
  return hDisplay + ":" + mDisplay + ":" + sDisplay;
};
const expandedRowRender = (officeTimingGroup) => {
  console.log(officeTimingGroup, "officeTiming group");
  const columns = [
    {
      title: "Days",
      dataIndex: "name",
      className: "drag-td-name",
      width: "min-content",
      width: "12%",
      editable: true,
      align: "center",
    },
    {
      title: "Is Working",
      dataIndex: "isWorking",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: "center",
      render: (text, row) => {
        function onChange(e) {
          console.log(text, "hello text");
        }
        return <Checkbox defaultChecked={text} onChange={onChange} />;
      },
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: "center",
      render: (text, row) => {
        const format = "HH:mm a";
        return (
          <>
            <TimePicker defaultValue={moment(secondsToHms(text), format)} />
          </>
        );
      },
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: "center",
      render: (text, row) => {
        const format = "HH:mm a";
        return (
          <>
            <TimePicker defaultValue={moment(secondsToHms(text), format)} />
          </>
        );
      },
    },
    {
      title: "Grace Time",
      dataIndex: "graceTime",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: "center",
      render: (text, row) => {
        let num = text;
        function onChange(value) {
          console.log("changed", value);
        }
        return (
          <>
            <InputNumber
              min={1}
              max={100}
              defaultValue={num}
              onChange={onChange}
            />{" "}
            min
          </>
        );
      },
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

  return (
    <Table
      columns={columns}
      dataSource={officeTimingGroup.details}
      pagination={false}
    />
  );
};

export default function OfficeTimingTable({
  handleEdit,
  handleDelete,
  removeButtons,
  actionRights = [],
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, office, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];

  const { officeTimingGroups, loadingData } = useSelector(
    (state) => state.officeTimingSlice
  );

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
        sharedLabels
      )}
      dataSource={officeTimingGroups}
      pagination={false}
      expandable={{ expandedRowRender: expandedRowRender }}
      rowKey="id"
      scroll={{ x: true }}
      size="small"
    />
  );
}
