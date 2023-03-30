import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { rewardDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import DetailCard from "./DetailCard";
import { useMediaQuery } from "react-responsive";
import { Modal } from "antd";

const RewardDetail = ({ id }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, rewardDictionary } = rewardDictionaryList[userLanguage];
  const { rewardDetail } = useSelector((state) => state.rewardSlice);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const handleOk = () => {
    setIsOpenModal(false);
  };
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal
        title={
          <h1 style={{ fontSize: "20px", margin: 0 }}>
            {rewardDictionary.reward}
          </h1>
        }
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DetailCard id={id} />
      </Modal>
    </>
  );
};
export default RewardDetail;
