import { Skeleton, Tag } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import {
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import { GetDocumentById } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import DocShortCard from "../components/shortCard";
import { createGuid } from "../../../../../utils/base";
function DetailCard(props) {
  const dispatch = useDispatch();
  const ducomentDetail = useSelector(
    (state) => state.documentSlice.documentDetail
  );

  const detailLoader = useSelector((state) => state.documentSlice.detailLoader);

  useEffect(() => {
    dispatch(GetDocumentById("2EDCD3D1-2C51-4379-BC8A-37D3705007B4"));
  }, []);
  let {
    name,
    documentType,
    creator,
    createDate,
    description,
    id,
    path,
    members,
    approvers,
    image,
    extensionTypeId,
    status,
    privacyId,
    attachments,
    referenceNo,
  } = ducomentDetail;
  let documentFile = attachments ? attachments : {};

  const localTime = moment
    .utc(createDate)
    .local()
    .format();
  if (detailLoader || !ducomentDetail.id) return <Skeleton />;

  return (
    <SingleItem>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={creator.image}
            name={creator.name}
            Subline={
              <SublineDesigWithTime
                designation={creator?.designation ? creator?.designation : ""}
                time={moment(localTime).fromNow()}
              />
            }
          />
        </div>
        <div className="right">
          <Tag className="IdTag">{referenceNo}</Tag>
        </div>
      </ItemHeader>
      <div className="doc_detail_media">
        <DocShortCard
          data={documentFile[0]}
          handlePreview={""}
          key={createGuid()}
          hideControls={false}
          detail={true}
        />
      </div>
    </SingleItem>
  );
}
export default DetailCard;
