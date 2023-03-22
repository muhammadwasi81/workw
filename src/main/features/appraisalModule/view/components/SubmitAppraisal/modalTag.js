import React, { useEffect } from "react";
import { Modal, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllPreviousAppraisalAction } from "../../../store/action";
import { NoDataFound } from "../../../../../sharedComponents/NoDataIcon";
import { CardWrapper } from "../../../../../sharedComponents/Card/CardStyle";
// import ShortCard from "./shortAppraisalCardNew";
import ShortCard from "../TeamAppraisal/shortAppraisalCardNew";
import { getAllWarnings } from "../../../../warning/store/actions";
import { getAllRewards, GetRewardById } from "../../../../reward/store/actions";
import RewardItem from "../../../../reward/view/ListItem";
import WarningItem from "../../../../warning/view/ListItem";
import {
  getAllWarningAction,
  getRewardsAction,
} from "../../../../team/store/action";

const ModalTag = ({ handleCancel, data, userId }) => {
  const dispatch = useDispatch();
  const { appraisals, previousAppraisalLoader } = useSelector(
    (state) => state.appraisalModuleSlice
  );
  const Reward = useSelector((state) => state.rewardSlice);
  const Warning = useSelector((state) => state.warningSlice);
  const { modalOpen } = useSelector((state) => state.appraisalModuleSlice);
  const { warningDetails, rewardDetails, loader } = useSelector(
    (state) => state.teamSlice
  );

  useEffect(() => {
    //TODO: call api according to the data like prev appraisals, warnings etc
    console.log("useEffect works on component mount");
    switch (data) {
      case "previousAppraisal":
        dispatch(getAllPreviousAppraisalAction(userId));
        break;
      case "warning":
        dispatch(getAllWarningAction(userId));
        break;
      case "rewards":
        dispatch(getRewardsAction(userId));
        break;
      case "course":
        // dispatch(getAllWarnings({ filterType: 3 }));
        break;
    }

    // modalContentRender(data);
  }, [data]);

  const modalContentRender = (data) => {
    switch (data) {
      case "previousAppraisal": {
        return (
          <>
            {previousAppraisalLoader ? (
              <Skeleton
                avatar
                paragraph={{
                  rows: 4,
                }}
              />
            ) : (
              <>
                {appraisals.length ? (
                  <CardWrapper>
                    {appraisals.map((item) => (
                      <ShortCard item={item} isList={false} />
                    ))}
                  </CardWrapper>
                ) : (
                  <NoDataFound />
                )}
              </>
            )}
          </>
        );
      }
      case "rewards": {
        return (
          <>
            {loader ? (
              <Skeleton
                avatar
                paragraph={{
                  rows: 4,
                }}
              />
            ) : (
              <>
                {rewardDetails?.length > 0 ? (
                  <CardWrapper>
                    {Reward.rewards.map((item, index) => (
                      <RewardItem
                        item={item}
                        id={item.id}
                        key={index}
                        // onClick={() => setDetailId(item.id)}
                      />
                    ))}
                  </CardWrapper>
                ) : (
                  <NoDataFound />
                )}
              </>
            )}
          </>
        );
      }

      case "warning": {
        return (
          <>
            {loader ? (
              <Skeleton
                avatar
                paragraph={{
                  rows: 4,
                }}
              />
            ) : (
              <>
                {warningDetails?.length > 0 ? (
                  <CardWrapper>
                    {Warning?.warnings?.map((item, index) => (
                      <WarningItem
                        item={item}
                        id={item.id}
                        key={index}
                        // onClick={() => setDetailId(item.id)}
                      />
                    ))}
                  </CardWrapper>
                ) : (
                  <NoDataFound />
                )}
              </>
            )}
          </>
        );
      }
      case "course":
        console.log("course");
        return <p>course</p>;
        break;
    }
  };

  // return modalContentRender(data);
  return (
    <>
      <Modal
        title={data}
        open={modalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            minHeight: "20rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {modalContentRender(data)}
        </div>
      </Modal>
    </>
  );
};

export default ModalTag;
