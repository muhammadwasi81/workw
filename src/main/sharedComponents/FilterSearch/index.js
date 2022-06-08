import { Button } from "antd";
import React, { useContext, useState } from "react";
import SearchModal from "./SearchModal";
import { FilterFilled } from "@ant-design/icons";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import { useMediaQuery } from "react-responsive";
import { FilterButton } from "./index.style";
function FilterSearchButton({ onFilter }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <SearchModal
        isVisible={isModalVisible}
        onClose={handleCancel}
        onFilter={onFilter}
      />
      <FilterButton onClick={showModal} className="filterBtn">
        {isTablet ? "" : sharedLabels.filter}
        <FilterFilled />
      </FilterButton>
    </>
  );
}

export default FilterSearchButton;
