import { Button, Modal } from "antd";
import React, { useState } from "react";

import { useSelector } from "react-redux";

const TabElement = () => {
  const { offers } = useSelector((state) => state.requisitionSlice);
  const [offerDetail, setOfferDetail] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    name,
    description,
    offer,
    businessAddress,
    businessName,
    phoneNumber,


  } = offerDetail;

  console.log(offerDetail, "OFFER DETAIL")

  const showModal = (item) => {
    setOfferDetail(item)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {offers?.map((item, index) => {
        return (
          <div
            className="bg-white flex justify-around rounded-lg h-9 items-center font-bold"
            key={index}
          >
            {/* <div>{`${item.firstName} ${item.lastName}`}</div> */}
            <Button onClick={() => {showModal(item)}} className="ThemeBtn">Click Me</Button>
            <div >{item.email ? item.email : "-"}</div>
            <div>{item.phoneNumber ? item.phoneNumber : "-"}</div>
            {/* <span>Offer Sent</span> */}
          </div>
        );
      })}
       <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{name}</p>
        <p>{description}</p>
        <p>{offer}</p>
        <p>{phoneNumber}</p>
        <p>{businessAddress}</p>
        <p>{businessName}</p>
      </Modal>
    </>
  );
};

export default TabElement;
