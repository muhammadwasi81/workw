import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { elearningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import React, { useContext } from "react";
import { handleOpenComposer } from "../store/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateLearningDropdown() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];
  const handleChange = (value) => {
    let { key } = value;
    dispatch(handleOpenComposer(key));
  };
  const CreateOptions = [
    {
      label: <p className="!mb-0 pl-3">{"Category"}</p>,
      key: "category",
      onClick: handleChange,
    },
    {
      label: <p className="!mb-0 pl-3">{"Course"}</p>,
      key: "courses",
      onClick: () => navigate("/eLearning/courses/create"),
    },
    {
      label: <p className="!mb-0 pl-3">{"eBook"}</p>,
      key: "ebook",
      onClick: () => navigate("/eLearning/ebook/create")
    },
    {
      label: <p className="!mb-0 pl-3">{"Quiz"}</p>,
      key: "quizz",
      onClick: () => navigate("/eLearning/quiz/create"),
    },
    {
      label: <p className="!mb-0 pl-3">{"TedTalk"}</p>,
      key: "tedtalks",
      // icon: <img width="17px" alt="" src={milegridIcon} />,
      onClick: () => navigate("/eLearning/tedtalk/create"),
    },
    {
      label: <p className="!mb-0 pl-3">{"Article"}</p>,
      key: "article",
      // icon: <img width="17px" alt="" src={mileshowIcon} />,
      onClick: () => navigate("/eLearning/article/create"),
    },
    {
      label: <p className="!mb-0 pl-3">{"Video"}</p>,
      key: "video",
      // icon: <img width="17px" alt="" src={mileshowIcon} />,
      onClick: () => navigate("/eLearning/video/create"),
    },
  ];
  return (
    <Dropdown overlay={<Menu items={CreateOptions} />} trigger={["click"]}>
      <Button className="primary_btn  ">
        {elearningDictionary.create}
        <DownOutlined className="!text-sm" />
      </Button>
    </Dropdown>
  );
}

export default CreateLearningDropdown;
