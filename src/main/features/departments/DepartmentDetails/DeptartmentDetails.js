import React, { useEffect, useState } from "react";
import { ROUTES } from "../../../../utils/routes";
import { useSelector } from "react-redux";
import {
  ContBody,
  TabContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import Tab from "../../../sharedComponents/Tab";
import LayoutHeader from "../../../layout/header/index";
import { EditOutlined } from "@ant-design/icons";
import CoverDetail from "../view/CoverDetail";
import CoverImage from "../view/CoverImage";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDepartmentById, getDepartmentMemberAction } from "../store/actions";
import Appraisal from "../appraisal/index";
import { handleParentId } from "../store/slice";
import SubDepartment from "./SubDepartment";
import WhiteCard from "../view/WhiteCard";
import MemberCollapse from "../../../sharedComponents/Collapseable/MemberCollapse";
import ComposeEmail from "../../leadmanager/view/Email/ComposeEmail";
import { handleComposeEmail } from "../../leadmanager/store/slice";
import MemberModal from "./MemberModal";
import { addMember } from "../store/slice";
import { Members } from "../constant/index";
import "./style.css";

function DepartmentDetails() {
  const dispatch = useDispatch();
  let param = useParams();
  const { departmentDetail, departmentMembers } = useSelector(
    (state) => state.departmentSlice
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Object.keys(departmentDetail).length > 1) {
      dispatch(handleParentId(departmentDetail.id));
    }
  }, [departmentDetail]);

  const { image, description } = departmentDetail;

  const panes = [
    {
      featureName: `Sub Departments`,
      content: <SubDepartment />,
      featureId: 0,
    },
    {
      featureName: `Appraisals`,
      content: <Appraisal />,
      featureId: 1,
    },
  ];
  const items = [
    {
      name: "Department Details",
      to: `${ROUTES.DEPARTMENTS.DEPARTMENT}`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      buttonText: "Edit Projects",
      icon: <EditOutlined />,
    },
  ];

  useEffect(() => {
    dispatch(getDepartmentById(param.id));
    dispatch(getDepartmentMemberAction(param.id));
  }, [param.id]);

  const memberHandler = () => {
    setVisible(true);
    // const userTypes = memberType === 1 ? Members.user : Members.admin;
    dispatch(addMember({ status: true }));
  };
  return (
    <>
      <TabContainer>
        {/* <LayoutHeader items={items} buttons={buttons} /> */}
        <LayoutHeader items={items} />

        <ContBody className="!block">
          <div className="flex flex-row gap-5  h-[calc(100vh_-_60px)]">
            <div className="rounded-xl basis-9/12 flex flex-col gap-5 overflow-scroll">
              <CoverImage image={image} />
              <CoverDetail data={departmentDetail} />
              <Tab panes={panes} />
            </div>

            <div className="basis-1/4 gap-5 flex flex-col overflow-scroll">
              <WhiteCard>
                <MemberCollapse
                  data={departmentDetail?.members}
                  isEmail={false}
                  isMember={true}
                  // onEmailClick={() => {
                  //   dispatch(handleComposeEmail(true));
                  // }}
                  handleAdd={(e) => memberHandler(e)}
                />
              </WhiteCard>
            </div>
          </div>
        </ContBody>
      </TabContainer>
      <ComposeEmail />
      {visible && <MemberModal data={departmentDetail} />}
    </>
  );
}

export default DepartmentDetails;
