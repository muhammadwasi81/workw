import { Collapse, Select, message } from "antd";
import { DownOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import ItemDetailModal from "../ItemDetails";
import CustomModal from "../../features/workboard/Modal/CustomModal";
import { useState } from "react";
import "./memberCollapse.css";
const { Panel } = Collapse;

function MemberCollapse({
  handleAdd,
  data = [],
  ghost = true,
  isEmail = false,
  isMember = false,
  onEmailClick = () => {},
  onDelete = () => {},
}) {
  const handleCollapseChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Collapse
        onChange={handleCollapseChange}
        expandIcon={({ isActive }) => (
          <DownOutlined
            rotate={isActive ? 0 : 180}
            className="!text-lg !font-bold !text-primary-color"
          />
        )}
        ghost={ghost}
        expandIconPosition={"end"}
        defaultActiveKey={["1"]}
      >
        <Panel
          showArrow={true}
          header={
            <div>
              <span className="text-base font-bold text-primary-color">
                Members ({data.length})
              </span>
            </div>
          }
          className="custom_member_collapse"
          extra={
            <div className="flex gap-2">
              {isEmail && (
                <div
                  onClick={(event) => {
                    event.stopPropagation();
                    onEmailClick();
                  }}
                >
                  <MailOutlined className="p-2 rounded-full bg-primary-color !text-white " />
                </div>
              )}
              {isMember && (
                <PlusOutlined
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAdd();
                  }}
                  className="p-2 rounded-full bg-primary-color !text-white "
                />
              )}
            </div>
          }
          key="1"
        >
          <ItemDetailModal
            data={data} //Data
            isDeleteDisabled={true} //Pass true to hide delete icon
            addEnabled={false} //Pass false to hide select member
            isSearch={false} //Pass true if you want to search the list
            openModal={false}
            onDelete={onDelete}
          />
        </Panel>
      </Collapse>
    </>
  );
}

export default MemberCollapse;
