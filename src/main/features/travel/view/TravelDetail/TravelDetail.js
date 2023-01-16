import React, { useContext, useEffect, useState } from "react";
import { Skeleton } from "antd";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ROUTES } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import CardProfileTopView from "../ListView/CardProfileTopView";
import { getTravelById } from "../../store/actions";
import { TravelDictionary } from "../../localization";
import TravelDetailSkeleton from "./TravelDetailSkeleton";
import Approval from "../../../../sharedComponents/AppComponents/Approvals/view";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../../sharedComponents/AppComponents/Approvals/enums";
import NewTravelDetailCard from "../UI/NewTravelDetailCard";
import { fileExtentionPreview } from "../../utils/fileExtentionHelper";
import { handleAttachmentModal, resetTravelDetail } from "../../store/slice";

function TravelDetail(props) {
  const { travelId } = props;
  const [status, setStatus] = useState();
  const [travelStatus, setTravelStatus] = useState({});
  const { travelDetail, success, loader, loadingData } = useSelector(
    (state) => state.travelSlice
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTravelById(travelId));
    return () => {
      dispatch(resetTravelDetail());
    };
  }, [travelId]);

  useEffect(() => {
    if (Object.keys(travelStatus).length !== 0) {
      const travelStatusArr = Object.keys(travelStatus).map((k) => {
        return { [k]: travelStatus[k] };
      });

      const updateList = [...travelStatusArr].reduce((acc, val, index) => {
        const ac = Object?.values(acc)?.toString();
        const va = Object?.values(val)?.toString();
        if (ac === va) return va;
        else return ApprovalStatus.InProcess;
      });
      setStatus(updateList);
    }
  }, [travelStatus]);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { TravelDictionaryList, Direction } = TravelDictionary[userLanguage];
  const { headings } = TravelDictionaryList;
  const items = [
    {
      name: travelDetail && travelDetail.subject,
      to: `${ROUTES.TRAVEL.TREAVELDETAIL + travelId}`,
    },
  ];

  if (loadingData) return <Skeleton />;

  return (
    <div className="p-4 bg-white rounded" direction={Direction}>
      <div className="flex flex-col gap-4">
        {!travelDetail ? (
          <TravelDetailSkeleton />
        ) : (
          <>
            <CardProfileTopView
              profileImgSrc={travelDetail && travelDetail.creator.image}
              createDate={travelDetail && travelDetail.createDate}
              isPublic={true}
              name={travelDetail && travelDetail.creator.name}
              destination={
                travelDetail && travelDetail.creator.designation
                  ? travelDetail.creator.designation
                  : "No Designation"
              }
              refNo={travelDetail && travelDetail.referenceNo}
              status={status || travelDetail?.status}
              profileImgSize={40}
              showIcon={false}
            />
            <div className="flex justify-between flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-black font-bold ">
                  {travelDetail && travelDetail.subject}
                </span>
                <span className="text-gray-500 font-bold ">
                  {/* {headings.description}:{" "} */}
                  <span className="text-sm text-black font-normal">
                    {travelDetail && travelDetail.description}
                  </span>
                </span>
              </div>
              <div>
                {/* <h3 className=" text-primary-color font-semibold">
									{headings.desctination}
								</h3> */}
                <div
                  className={`flex overflow-x-auto gap-5 ${travelDetail?.cities
                    .length === 1 && "justify-center"} `}
                >
                  {travelDetail &&
                    travelDetail.cities.map((detail, index) => (
                      <div className="">
                        <NewTravelDetailCard
                          travel={detail}
                          isCloseable={false}
                          index={index}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="">
                <hr className="border-t-[2px]" />
                <h6 className="text-[16px] font-semibold py-2">Attachments</h6>
                <div
                  className="flex gap-4 items-center overflow-auto cursor-pointer"
                  onClick={() =>
                    dispatch(handleAttachmentModal(travelDetail?.attachments))
                  }
                >
                  {travelDetail?.attachments.map((file) => (
                    <div className="rounded-lg h-[80px] w-[80px]  min-w-[80px] border overflow-hidden">
                      <img
                        className=" object-cover h-full w-full"
                        src={fileExtentionPreview(file.path)}
                        alt={file.id}
                        key={file.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <hr className="border-t-[2px]" />

                <Approval
                  title={"Approvers"}
                  module={ApprovalsModule.TravelApproval}
                  data={travelDetail && travelDetail.approvers}
                  onStatusChanged={(status) => {
                    setTravelStatus((prev) => {
                      return { ...prev, ...status };
                    });
                  }}
                  status={travelDetail && travelDetail.approverStatus}
                />
                <Approval
                  title={"Agents"}
                  module={ApprovalsModule.TravelAgent}
                  data={travelDetail && travelDetail.agents}
                  onStatusChanged={(status) => {
                    setTravelStatus((prev) => {
                      return { ...prev, ...status };
                    });
                  }}
                  status={travelDetail && travelDetail.agentStatus}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TravelDetail;
