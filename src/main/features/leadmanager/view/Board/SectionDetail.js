import { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Button,
  Collapse,
  Drawer,
  Form,
  Input,
  Radio,
  Tag,
  Tooltip,
} from "antd";
import { FaGlobe, FaUserAlt, FaUserPlus } from "react-icons/fa";
import {
  EnvironmentFilled,
  MailFilled,
  PhoneFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./sectionDetail.css";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import UploadBgImg from "../../../workboard/WorkBoardDetail/UploadBgImg";
import {
  getAllLeadManagerContactDetail,
  updateLeadManagerDetail,
  getAllScheduleAction,
} from "../../store/actions";
import { getNameForImage, jsonToFormData } from "../../../../../utils/base";
import SectionDetailSkeleton from "../../UI/Skeleton/SectionDetailSkeleton";
import { DEFAULT_GUID } from "../../../../../utils/constants";
import { LeadManagerDictionary } from "../../localization";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import AvatarGroup from "../../../../sharedComponents/Avatar/AvatarGroup";
import CreateSchedule from "../../../schedule/view/createSchedule";
import Calender from "../../../../../content/NewContent/leadManager/svg/Calender-ic.svg";
import RefreshIcon from "../../../../../content/NewContent/leadManager/svg/refresh.svg";
import "./event.css";
import Event from "./event";
import EventDetail from "../../../schedule/view/eventDetail";
import { toggleEventDetailComposer } from "../../../schedule/store/slice";
import { useParams } from "react-router-dom";
import { ScheduleReferenceTypeEnum } from "../../enum/enum";

const { Panel } = Collapse;

function SectionDetail(props) {
  const { id } = useParams();
  const {
    data,
    isSectionDetailLoading,
    handleSelectedMembers,
    setLeadSectionId,
    handleMemberModal,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(
    data?.image
      ? data.image
      : "https://gocrm.io/wp-content/uploads/2020/09/lead-management.jpg"
  );
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { LeadManagerDictionaryList } = LeadManagerDictionary[userLanguage];
  const { detail, labels, placeHolder } = LeadManagerDictionaryList;
  const scheduleSuccess = useSelector((state) => state.scheduleSlice.success);
  const { meetingDetail } = useSelector((state) => state.leadMangerSlice);
  console.log('meetingDetail', meetingDetail);
  useEffect(() => {
    dispatch(
      getAllScheduleAction({
        referenceType: ScheduleReferenceTypeEnum.Lead,
        referenceId: id,
      })
    );
  }, []);

  useEffect(() => {
    if (scheduleSuccess) {
      setIsOpen(false);
    }
  }, [scheduleSuccess]);

  const handleScheduleDetailComposer = (data) => {
    dispatch(
      toggleEventDetailComposer({
        id: data.id,
        scheduleType: data.scheduleType,
      })
    );
  };
  const onFinish = (values) => {
    dispatch(
      updateLeadManagerDetail(
        jsonToFormData({
          image: {
            id: typeof image === "object" ? DEFAULT_GUID : data.imageId,
            file: image ? image : null,
          },
          ...values,
          id: data.id,
          sectionId: data.sectionId,
        })
      )
    );
  };
  if (isSectionDetailLoading && !data) {
    return <SectionDetailSkeleton />;
  }

  const handleRefresh = (e) => {
    console.log("refresh");
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      getAllScheduleAction({
        referenceType: ScheduleReferenceTypeEnum.Lead,
        referenceId: id,
      })
    );
  };
  return (
    <>
      <div className="gap-5 flex flex-col 2xl:flex-row">
        <section className="flex flex-col gap-3 basis-7/12">
          <div className="overflow-hidden relative h-[200px]">
            <img
              className="object-cover h-[200px] w-full rounded-2xl"
              src={
                image && image.length > 0
                  ? image
                  : (window.URL || window.webkitURL).createObjectURL(image)
              }
              alt="lead manager"
            />
            <UploadBgImg
              onUploadImg={(value) => {
                setImage(value.fileList[0].originFileObj);
              }}
            >
              <div
                className="bg-gray-500 absolute text-white w-full bottom-0 left-0 flex justify-center py-3 bg-opacity-90 rounded-b-2xl cursor-pointer hover:bg-opacity-95 transition hover:font-semibold"
                onClick={() => {
                  console.log("upload");
                }}
              >
                {labels.uplpadImage}
              </div>
            </UploadBgImg>
          </div>
          <div className="flex justify-end gap-2 items-center">
            <AvatarGroup
              membersData={data?.members}
              nestedObjProperty={"member"}
            />
            <Tooltip title="Select Assign Members">
              <PlusCircleFilled
                className="!text-[20px] !cursor-pointer !text-primary-color"
                onClick={() => {
                  handleSelectedMembers("", data?.members);
                  handleMemberModal(data.id);
                  setLeadSectionId(data.sectionId);
                }}
              />
            </Tooltip>
          </div>
          <Form
            name="basic"
            autoComplete="off"
            layout="vertical"
            initialValues={{ ...data }}
            onFinish={onFinish}
          >
            <Form.Item name="typeId">
              <Radio.Group>
                <Radio value={1}> {detail.business}</Radio>
                <Radio value={2}>{detail.individual}</Radio>
              </Radio.Group>
            </Form.Item>
            <div className='flex gap-x-1.5'>
                <div className='w-full'>
                  <Form.Item
                    label={<span className="text-primary-color">{detail.name}</span>}
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input
                      prefix={<FaUserAlt className="text-gray-500" />}
                      placeholder={placeHolder.writeName}
                    />
                  </Form.Item>
                </div>
                <div className='w-full'>
                  <Form.Item
                      name="phoneNumber"
                      label={
                        <span className="text-primary-color">{detail.phoneNumber}</span>
                      }
                      rules={[{ required: true }]}
                    >
                      <Input
                        prefix={<PhoneFilled rotate={90} className="!text-gray-500" />}
                        placeholder={placeHolder.leadPhoneNumber}
                        type="number"
                      />
                    </Form.Item>
                </div>
            </div>
            <div className='flex gap-x-1.5'>
              <div className='w-full'>
                <Form.Item
                  name="emailAddress"
                  label={<span className="text-primary-color">{detail.email}</span>}
                  rules={[{ required: true }, { type: 'email' }]}
                >
                  <Input
                    type={'email'}
                    prefix={<MailFilled className="!text-gray-500" />}
                    placeholder={placeHolder.leadEmailAddress}
                  />
                </Form.Item>
              </div>
              <div className='w-full'>
                <Form.Item
                  name="address"
                  label={
                    <span className="text-primary-color">{detail.address}</span>
                  }
                  rules={[{ required: true }]}
                >
                  <Input
                    type="text"
                    prefix={<EnvironmentFilled className="!text-gray-500" />}
                    placeholder={placeHolder.leadAddress}
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              name="website"
              label={
                <span className="text-primary-color">{detail.website}</span>
              }
              rules={[{ required: true }]}
            >
              <Input
                prefix={<FaGlobe className="!text-gray-500" />}
                placeholder={placeHolder.leadUrl}
              />
            </Form.Item>
            <Form.Item className="!mb-0">
              <Button
                htmlType="submit"
                className="ThemeBtn !block ml-auto"
                loading={props.loading}
              >
                {labels.update}
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section className="basis-5/12 flex flex-col gap-5">
          <div className="bg-neutral-100 p-2 rounded-lg h-fit">
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              ghost={true}
              expandIconPosition="end"
              className="site-collapse-custom-collapse !overflow-hidden"
            >
              <Panel
                header={
                  <p className="text-white w-full !m-0">{detail.meetings}</p>
                }
                key="1"
                className=" site-collapse-custom-panel"
                showArrow={false}
                extra={
                  <div className="flex flex-wrap justify-end gap-3">
                    <div
                      className="h-[32px] w-[32px] rounded-lg bg-white hover:bg-neutral-200 transition"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsOpen(true);
                      }}
                    >
                      <img
                        src={Calender}
                        width="21px"
                        alt="calender logo"
                        loading="lazy"
                        className="cursor-pointer m-auto mt-1"
                      />
                    </div>
                    <div
                      className="h-[32px] w-[32px] rounded-lg bg-white hover:bg-neutral-200 transition"
                      onClick={(e) => {
                        handleRefresh(e);
                      }}
                    >
                      <img
                        src={RefreshIcon}
                        width="20px"
                        alt="calender logo"
                        loading="lazy"
                        className="cursor-pointer m-auto mt-2"
                      />
                    </div>
                  </div>
                }
              >
                <div className="eventWrapper">
                  <div className="eventWrapper__body">
                    <EventDetail />
                    {meetingDetail && meetingDetail.length > 0 ? (
                      meetingDetail?.map((event) => (
                        <Event
                          data={event}
                          handleScheduleDetailComposer={
                            handleScheduleDetailComposer
                          }
                        />
                      ))
                    ) : (
                      <div className="flex justify-center text-primary-color">
                        {detail.noMeetings}
                      </div>
                    )}
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>

          <div className="bg-neutral-100 p-2 rounded-lg h-fit">
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              ghost={true}
              expandIconPosition="end"
              className="site-collapse-custom-collapse !overflow-hidden"
            >
              <Panel
                header={
                  <p className="text-white w-full !m-0">{detail.contacts}</p>
                }
                key="1"
                className=" site-collapse-custom-panel "
                showArrow={false}
                extra={
                  <div
                    className="p-2 rounded-lg bg-white hover:bg-neutral-200 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.handleContactDetailModal();
                      props.onClickContact(false);
                    }}
                  >
                    <FaUserPlus className="!text-primary-color !text-base" />
                  </div>
                }
              >
                {/* contacts list */}
                <div className="max-h-60 overflow-y-auto flex flex-col gap-3">
                  {data?.contacts.length > 0 ? (
                    data?.contacts.map((contact) => (
                      <div
                        className="bg-white rounded-lg p-2 cursor-pointer hover:bg-primary-color group text-black hover:text-white transition "
                        onClick={() => {
                          dispatch(getAllLeadManagerContactDetail(contact.id));
                          props.handleContactDetailModal();
                          props.onClickContact(true);
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex gap-3 items-center ">
                            <Avatar src={contact.image}>
                              {getNameForImage(contact.name)}
                            </Avatar>
                            <p className=" !m-0">{contact.name}</p>
                          </div>
                          <Tag
                            color={
                              contact.activeStatusId === 1 ? `green` : `red`
                            }
                          >
                            {contact.activeStatusId === 1
                              ? `Active`
                              : `In-Active`}
                          </Tag>
                          {/* <DeleteFilled
												className="!text-gray-500 cursor-pointer group-hover:!text-white"
												onClick={e => {
													e.preventDefault();
													e.stopPropagation();
													dispatch(
														deleteLeadManagerContact(
															contact.id
														)
													);
												}}
											/> */}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center text-primary-color">
                      {detail.noContacts}
                    </div>
                  )}
                </div>
              </Panel>
            </Collapse>
          </div>

          <div className="bg-white rounded-xl py-2 max-h-96 overflow-y-auto">
            <CommentWrapper
              referenceId={data?.id}
              isCommentLoad={true}
              module={7}
              loadSkeleton={true}
            />
          </div>
        </section>
      </div>
      <Drawer
        title={"Create Schedule"}
        width="768"
        onClose={() => {
          setIsOpen(false);
        }}
        open={isOpen}
        destroyOnClose={true}
        className=" drawerSecondary"
      >
        <CreateSchedule
          // scheduleDetail={{ referenceType: 4, referenceId: id, members: [] }}
          referenceType={ScheduleReferenceTypeEnum.Lead}
          referenceId={id}
        />
      </Drawer>
    </>
  );
}

export default SectionDetail;
