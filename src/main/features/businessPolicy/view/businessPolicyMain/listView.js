import Input from "antd/lib/input/Input";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenDetail } from "../../store/slice";
import PolicyItem from "./policyItem";
import SearchInput from "../../../../sharedComponents/searchBox/SearchInput";
import { SearchOutlined } from "@ant-design/icons";
import "./style.css";
import ApprovalDetail from "./detailView";
import { Button, Modal } from 'antd';
import { useMediaQuery } from 'react-responsive';

export default function Listing({ listData, onSearch }) {
  //   const [filter, setFilter] = useState({
  //     filterType: 0,
  //     search: "",
  //   });

  const dispatch = useDispatch();
  const {
    policyDetail,
  } = useSelector((state) => state.businessPolicySlice);


  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (item) => {
    setIsModalOpen(true);
    dispatch(handleOpenDetail(item));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="policyHeader colorTheme">Policies</div>

      <div className="searchBox">
        <SearchInput
          icon={<SearchOutlined />}
          placeholder={"Search"}
          size="larger"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="overflow-scroll h-[85vh] w-[400px] listData">
        {   
              listData.length !== 0 &&
              listData?.map((item) => (
              <PolicyItem item={item} handleClick={handleClick} />
            ))
        }
        {
           isMobile &&
           <Modal 
           title={null} 
           onCancel={handleCancel} 
           open={isModalOpen}
           footer={null}
           className="close-modal"
           >
               {
                  policyDetail && <ApprovalDetail item={policyDetail} /> 
               }
            </Modal>
        }
      </div>
    </>
  );
}
