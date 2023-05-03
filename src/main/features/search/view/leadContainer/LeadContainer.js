import React, { useEffect, useState, memo } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Select, Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getNameForImage  , jsonToFormData} from "../../../../../utils/base";
import { DEFAULT_GUID } from "../../../../../utils/constants";
import { addLeadManagerDetail , getLeadManagerDetailById , moveLeadManagerDetail } from "../../../leadmanager/store/actions";
import CardButton from "../../../leadmanager/UI/Button/CardButton";
import SectionForm from "../../../leadmanager/view/Board/Sections/SectionForm/SectionForm";
import SectionDetailSkeleton from "../../../leadmanager/UI/Skeleton/SectionDetailSkeleton";
import { handleAssignMemberModal , handleContactDetailModal , moveDetail } from "../../../leadmanager/store/slice";
import AvatarGroup from "../../../../sharedComponents/Avatar/AvatarGroup";
import PropTypes from "prop-types"
import SectionDetail from "../../../leadmanager/view/Board/SectionDetail";
import {Button , Modal} from 'antd';
function LeadContainer({ handleSelectedMembers = () => {}}) {
  const { Option } = Select;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [toggleForm, setToggleForm] = useState(false);
  const [leadDetailId, setLeadDetailId] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const {keyword} = useSelector((state) => state.globalSearchSlice);
  const isSectionDetailLoading = useSelector(
    (state) => state.leadMangerSlice.isSectionDetailLoading
  );
  const leadManagerSectionDetailData = useSelector(
    (state) => state.leadMangerSlice.leadManagerSectionDetailData
  );
  const leadManagerDetail = useSelector(
    (state) => state.leadMangerSlice.leadManagerDetail
  );

  const loading = useSelector((state) => state.leadMangerSlice.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (leadDetailId) {
      dispatch(getLeadManagerDetailById(leadDetailId));
    }
  }, [leadDetailId]);

  const onFinish = (values) => {
    let tempObj = {
      image: {
        id: DEFAULT_GUID,
        file: null,
      },
      ...values,
    };
    dispatch(addLeadManagerDetail(jsonToFormData(tempObj)));
  };

  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
  };

  const handleSectionChange = (
    currentSectionId,
    targetSectionId,
    currentIndex
  ) => {
    console.log("current section id: ", currentSectionId);
    console.log("target section id:", targetSectionId);
    console.log("currentIndex:", currentIndex);
    dispatch(
      moveDetail({
        sourceListId: currentSectionId,
        destListId: targetSectionId,
        oldCardIndex: Number(currentIndex),
        newCardIndex: 0,
      })
    );
    dispatch(
      moveLeadManagerDetail({
        currentSectionId,
        targetSectionId,
        currentIndexNo: Number(currentIndex) + 1,
        targetIndexNo: 1,
      })
    );
  };

  const handleDetailAssignTo = (e, id, members, sectionId) => {
    // console.log("members", members);
    // console.log("sectionId", sectionId);
    // setLeadSectionId(sectionId);
    e.stopPropagation();
    e.preventDefault();
    handleSelectedMembers("", members);
    dispatch(
      handleAssignMemberModal({
        id,
      })
    );
  };
  return (
    <>
      <h5 className="containerHeading">Lead</h5>
      <div  style={{width:'100%'}}>
        <section className="basis-[40%] flex gap-5 flex-col">
          {/* <CardButton
            className={"text-gray-400"}
            icon={<PlusOutlined className="!text-gray-500" />}
            onClick={handleToggleForm}
          /> */}
          {toggleForm && (
            <SectionForm
              onFinish={onFinish}
              handleToggleForm={handleToggleForm}
              list={true}
            />
          )}
          <div className="rounded">
            {/* {leadManagerDetail?.sections?.map((detail) => (
              <> */}
                {keyword?.Lead?.map((det, index) => {
                  // console.log("detail map", detail);
                  return (
                    <div
                      className="mb-2 px-3 py-2 rounded text-white cursor-pointer"
                      style={{
                        background: det.sectionColorCode,
                      }}
                      onClick={() => {
                        setOpenDetail(true);
                        setIsModalOpen(true);
                        setLeadDetailId(det?.id);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={det?.image}
                          className="!bg-black !min-w-[32px]"
                        >
                          {getNameForImage(det?.name)}
                        </Avatar>

                        <div className="flex flex-col gap-3 w-full">
                          <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                              <div>{det?.name}</div>
                              <div className="text-xs">
                                <p className="!m-0 truncate max-w-[200px]">
                                  {det?.address}
                                </p>
                              </div>
                            </div>
                            <div
                              className="p-[10px] bg-neutral-100 h-min rounded flex justify-center items-center font-bold"
                              style={{
                                color: det.sectionColorCode,
                              }}
                            >
                              {det.typeId === 1 ? "Business" : "Individual"}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AvatarGroup
                                nestedObjProperty={"member"}
                                membersData={det?.members}
                              />
                              <Tooltip title="Select Assign Members">
                                <div
                                  className="bg-primary-color rounded-full p-1 flex items-center"
                                  onClick={(e) => {
                                    // handleDetailAssignTo(
                                    //   e,
                                    //   det?.id,
                                    //   det?.members,
                                    //   detail.id
                                    // );
                                  }}
                                >
                                  <PlusOutlined className="!text-[15px] !cursor-pointer !text-white" />
                                </div>
                              </Tooltip>
                            </div>
                            <div>
                              <Select
                                defaultValue={det?.sectionId}
                                dropdownStyle={{
                                  minWidth: "max-content",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                }}
                                onChange={(value) => {
                                  console.log("value index", index);
                                  handleSectionChange(
                                    det?.sectionId,
                                    value,
                                    index
                                  );
                                }}
                                // value={detail?.id}
                              >

                              <Option value={det.sectionId} key={index}>
                                      <Tag color={det.sectionColorCode}>
                                        {det.section}
                                      </Tag>
                                    </Option>
 

                                {/* {leadManagerDetail?.sections.map(
                                  (leadSection, index) => (
                                    <Option value={leadSection.id} key={index}>
                                      <Tag color={leadSection.colorCode}>
                                        {leadSection.name}
                                      </Tag>
                                    </Option>
                                  )
                                )} */}
                              </Select>
                              {/* <LeadSectionSelect
																detail={det}
																sections={
																	leadManagerDetail?.sections
																}
																currentIndex={
																	det?.indexNo
																}
															/> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* </>
            ))} */}
          </div>
        </section>
        {openDetail && (<Modal title="Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  width={600}>
        <section className="basis-[60%] ">
          {openDetail ? (
            isSectionDetailLoading && !leadManagerSectionDetailData ? (
              <SectionDetailSkeleton />
            ) : (
              <div className="bg-white rounded">
                <SectionDetail
                  // setLeadSectionId={setLeadSectionId}
                  handleSelectedMembers={handleSelectedMembers}
                  handleContactDetailModal={() => {
                    dispatch(
                      handleContactDetailModal({
                        open: true,
                        add: false,
                      })
                    );
                  }}
                  handleMemberModal={(id) => {
                    dispatch(
                      handleAssignMemberModal({
                        id,
                      })
                    );
                  }}
                  data={leadManagerSectionDetailData}
                  onClickContact={(value) => {
                    dispatch(
                      handleContactDetailModal({
                        open: true,
                        add: value,
                      })
                    );
                  }}
                  loading={loading}
                />
              </div>
            )
          ) : null}
        </section>
      </Modal>)}
     
      </div>
    </>
  );
}
LeadContainer.propTypes = {
  handleSelectedMembers: PropTypes.func,
  handleContactDetailModal: PropTypes.func,
};

export default memo(LeadContainer);






