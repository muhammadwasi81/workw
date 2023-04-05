import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { BsFileText } from "react-icons/bs";
import WhiteCard from "../../../../UI/WhiteCard";
import DetailLayout from "../../Layout/DetailLayout";
import DetailPageTopDetail from "../../../Detail/components/UIElements/DetailHead";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GetArticleById,
  GetTedTalkById,
  GetVideoById,
} from "../../../../store/action";
import Avatar from "../../../../../../sharedComponents/Avatar/avatar";
import { useSelector } from "react-redux";
import "../../../courses/style.css";
import { addAssignMember, addMember } from "../../../../store/slice";
import AssignMemberModal from "../../Components/AssignMemModal";
import { AssignMemEnum, MemberEnum } from "../../../../constant/index";
import MemberModal from "../../Components/MemberModal";
import DefaultImage from "../../../../../../../content/NewContent/eLearning/articleDefatulImage.svg";
import { useState } from "react";

function VideoDetail() {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const id = useParams().id;
  const { videoDetail, loaders } = useSelector((state) => state.eLearningSlice);
  let loader = loaders.videoDetailLoading;
  let {
    image,
    name,
    creator,
    assignMembers,
    members,
    description,
    attachment,
    links,
  } = videoDetail;

  useEffect(() => {
    disptach(GetVideoById(id));
  }, []);

  return (
    <>
      <DetailLayout>
        <main className="flex flex-1 gap-10 h-full overflow-hidden">
          <section className="flex basis-[75%] overflow-y-auto detail_section">
            <WhiteCard className="flex flex-col gap-5 w-full h-fit">
              {loader ? (
                <Skeleton.Input size="default" active={true} />
              ) : (
                <DetailPageTopDetail
                  // image={image ? image : Default}
                  // difficulty={{ name: tag[1], icon: LevelsIcon[1] }}
                  // lastUpdated={"Syed Danish Ali"}
                  title={name}
                  // createdBy={creator && creator.name}
                  // members={
                  // 	members &&
                  // 		<>
                  // 			<div className="members">
                  // 				<Avatar
                  // 					className="MembersList"
                  // 					isAvatarGroup={true}
                  // 					isTag={false}
                  // 					heading={"members"}
                  // 					membersData={members ? members : []}
                  // 					text={"Members"}
                  // 					image={"https://joeschmoe.io/api/v1/random"}
                  // 				/>
                  // 				<div className="addMemberBtn" onClick={() => disptach(addMember({status: true, type: MemberEnum.ebook}))} >+</div>
                  // 			</div>
                  // 			<MemberModal />
                  // 		</>
                  // }
                  // assignedTo={
                  // 	assignMembers &&
                  // 		<>
                  // 			<div className="members">
                  // 				<Avatar
                  // 					className="MembersList"
                  // 					isAvatarGroup={true}
                  // 					isTag={false}
                  // 					heading={"members"}
                  // 					membersData={assignMembers ? assignMembers : []}
                  // 					text={"Members"}
                  // 					image={"https://joeschmoe.io/api/v1/random"}
                  // 				/>
                  // 				<div className="addMemberBtn" onClick={() => disptach(addAssignMember({status: true, type: AssignMemEnum.ebook}))} >+</div>
                  // 			</div>
                  // 			<AssignMemberModal />
                  // 		</>
                  // 	}
                />
              )}
              {/* <h3 style={{color: "#222",fontSize: "17px",fontWeight: '600',marginBottom: '0px'}} >Description</h3>
						{
							description && description 
						} */}
              {loader ? (
                <Skeleton.Image active={true} />
              ) : (
                <video class="w-full h-400" controls>
                  <source src={links} type="video/mp4" />
                </video>
              )}
            </WhiteCard>
          </section>
          <section
            className="flex basis-[25%] overflow-y-auto h-fit"
            onScroll={() => {
              console.log("scroll");
            }}
          >
            <WhiteCard className="flex flex-col gap-1 w-full">
              {loader ? (
                <>
                  <Skeleton.Image active={true} />
                  <Skeleton paragraph={{ rows: 4 }} />
                </>
              ) : (
                <DetailPageTopDetail
                  image={image ? image : DefaultImage}
                  title={"Latest Trend In Business"}
                  description={
                    description === ""
                      ? "Information will come here"
                      : description
                  }
                />
              )}
            </WhiteCard>
          </section>
        </main>
      </DetailLayout>
    </>
  );
}

export default VideoDetail;
