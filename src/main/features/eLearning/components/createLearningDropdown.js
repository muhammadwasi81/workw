import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { elearningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import React, { useContext } from "react";
import { handleOpenComposer } from "../store/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import {
  FeaturePermissionEnum,
  FeaturePermissionEnumList,
  FeaturesEnum,
} from "../../../../utils/Shared/enums/featuresEnums";
import { useSelector } from "react-redux";

function CreateLearningDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];
  const { user } = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions;
  const handleChange = (value) => {
    let { key } = value;
    dispatch(handleOpenComposer(key));
  };
  const items = [
    // {
    //   label: <p className="!mb-0 pl-3">{'Category'}</p>,
    //   key: 'category',
    //   onClick: handleChange,
    // },
    {
      label: <p className="!mb-0 pl-3">{"Course"}</p>,
      key: "courses",
      onClick: () => navigate(`${ROUTES.ELearning.COURSE_CREATE}`),
      permissionId: FeaturePermissionEnum.CreateCourse,
    },
    {
      label: <p className="!mb-0 pl-3">{"eBook"}</p>,
      key: "ebook",
      onClick: () => navigate(`${ROUTES.ELearning.EBOOK_CREATE}`),
      permissionId: FeaturePermissionEnum.CreateeBooks,
    },
    {
      label: <p className="!mb-0 pl-3">{"Quiz"}</p>,
      key: "quizz",
      onClick: () => navigate(`${ROUTES.ELearning.QUIZ_CREATE}`),
      permissionId: FeaturePermissionEnum.CreateQuiz,
    },
    {
      label: <p className="!mb-0 pl-3">{"TedTalk"}</p>,
      key: "tedtalks",
      // icon: <img width="17px" alt="" src={milegridIcon} />,
      onClick: () => navigate(`${ROUTES.ELearning.TEDTALK_CREATE}`),
      permissionId: FeaturePermissionEnum.CreateTedTalks,
    },
    {
      label: <p className="!mb-0 pl-3">{"Article"}</p>,
      key: "article",
      // icon: <img width="17px" alt="" src={mileshowIcon} />,
      onClick: () => navigate(`${ROUTES.ELearning.ARTICLE_CREATE}`),
      permissionId: FeaturePermissionEnum.CreateArticle,
    },
    {
      label: <p className="!mb-0 pl-3">{"Video"}</p>,
      key: "video",
      // icon: <img width="17px" alt="" src={mileshowIcon} />,
      onClick: () => navigate(`${ROUTES.ELearning.VIDEO_CREATE}`),
      permissionId: FeaturePermissionEnum.CreateVideos,
    },
  ];

  const permissionItems = items
    .filter((item) => userPermissions.includes(item.permissionId))
    .map((x) => x);

  return (
    <Dropdown
      menu={{
        items: permissionItems,
      }}
      overlay={items}
      trigger={["click"]}
    >
      <Button className="primary_btn" onClick={(e) => e.preventDefault()}>
        {elearningDictionary.create}
        <DownOutlined className="!text-sm" />
      </Button>
    </Dropdown>
  );
}

export default CreateLearningDropdown;
