import React, { useContext, useEffect, useId, useState } from "react";
import { Tag, Image, Button, Skeleton } from "antd";
import { PlusCircleFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { documentDictionaryList } from "../../localization/index";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import {
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import moment from "moment";
import { AddDocumentMember, GetDocumentById, RemoveDocumentMember, UpdateDocumentById } from "../../store/actions";
import {
  getDocumentRightLabel,
  getIconByExtensionType,
} from "../../constant/helpers";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { DOCUMENT_ENUM } from "../../constant";
import Approvals from "../../../../sharedComponents/AppComponents/Approvals/view";
import { ApprovalsModule } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import DocumentStatusTag from "../components/documentStatusTag/StatusTag";
import { createGuid } from "../../../../../utils/base";
import DocShortCard from "../components/shortCard";
import RemarksApproval from "../../../../sharedComponents/AppComponents/Approvals/view";
import PreviewModal from "../components/modal";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import { PostPrivacyType } from "../../../../../utils/Shared/enums/enums";
import ItemDetailModal from "../../../../sharedComponents/ItemDetails";
import DocumentReaderCollaboratorsEnum from "../../localization/enum";
import { openNotification } from "../../../../../utils/Shared/store/slice";
// import "../fullCard/style.css";



function DetailCard(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const [previewPath, setPreviewPath] = useState(false);
  const ducomentDetail = useSelector(
    (state) => state.documentSlice.documentDetail
  );
  const AddDocReaderAndCollabrator = useSelector((state) => state?.documentSlice?.AddDocReaderAndCollabrator)
  console.log("DocumentDetail",ducomentDetail)
  const detailLoader = useSelector((state) => state.documentSlice.detailLoader);

  

  const [openModalforCollaborators,setopenModalforCollaborators]=useState(false)
  const [openModalforReaders,setopenModalforReaders]  = useState(false);
  const { user} = useSelector((state) => state.userSlice)
  const [isRigthtoAddReaderorCollab, setisRigthtoAddReaderorCollab] = useState(false)
  const [stateforColaborattors , setstateforColaborattors] = useState([]);
  const [stateforReaders , setstateforReaders] = useState([]);

  useEffect(() => {
    props.id && dispatch(GetDocumentById(props.id));
  }, [props.id]);


  const handlePreview = (item) => {
    setPreviewPath(item);
  };
  const handleClose = (item) => {
    setPreviewPath(null);
  };

  if (detailLoader || !ducomentDetail.id) return <Skeleton />;

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
  } = ducomentDetail;
  let { DUCOMENT_TYPE, MEMBER_RIGHT_TYPE } = DOCUMENT_ENUM;

  let documentFile = attachments[0] ? attachments[0] : {};
  let collaborators = members.filter(
    (it) => it.memberRightType === MEMBER_RIGHT_TYPE.COLLABRATOR
  );
  let readers = members.filter(
    (it) => it.memberRightType === MEMBER_RIGHT_TYPE.READER
  );
  documentFile = {
    ...documentFile,
    documentType,
  };
 
  let isUserExistInColab = collaborators?.some(obj => obj?.memberId === user?.id);

  const handleModalOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();

    collaborators && setopenModalforCollaborators(true);
    setstateforColaborattors(collaborators)


    const isUserIdExistsforColabrator = collaborators?.some(obj => obj?.memberId === user?.id);
    isUserIdExistsforColabrator && setisRigthtoAddReaderorCollab(true)

  };
  const setReaderModal = (e) =>
  {
    e.stopPropagation();
    e.preventDefault();
    readers && setopenModalforReaders(true)
    setstateforReaders(readers)

    const isUserIdExistsforColabrator = collaborators?.some(obj => obj?.memberId === user?.id);
    isUserIdExistsforColabrator && setisRigthtoAddReaderorCollab(true)
  }
  const CollabratorOrReader = (memeberId) =>
  { 
      const promise = openModalforCollaborators === true ? 
      dispatch(AddDocumentMember(
       [{
          id:ducomentDetail?.id , 
          memberId:memeberId[0],
          memberRightType:DocumentReaderCollaboratorsEnum.Collabrator
        }]
      )) 
      : 
      dispatch(AddDocumentMember(
        [{
          id:ducomentDetail?.id , 
          memberId:memeberId[0],
          memberRightType:DocumentReaderCollaboratorsEnum.Reader
        }]
      )) 

      promise
        .then((res)=>
          {
          if(res?.payload?.length > 0)
          {
            openModalforCollaborators ? setstateforColaborattors([...stateforColaborattors , res?.payload[0]]) : setstateforReaders([...stateforReaders , res?.payload[0]])}  
          }
        )
      .catch((error)=>
        console.log(error)
      )
  } 

  const onClosePopUp =(da)=> 
  {
    openModalforCollaborators && setopenModalforCollaborators(da)
    openModalforReaders && setopenModalforReaders(da)
    setisRigthtoAddReaderorCollab(false);
    props.id && dispatch(GetDocumentById(props.id));

  }

  const onDelete = (userId) => {
    const promise = openModalforCollaborators === true ? 
    dispatch(RemoveDocumentMember(
     [{
        id:ducomentDetail?.id , 
        memberId:userId,
        memberRightType:DocumentReaderCollaboratorsEnum.Collabrator
      }]
    )) 
    : 
    dispatch(RemoveDocumentMember(
      [{
        id:ducomentDetail?.id , 
        memberId:userId,
        memberRightType:DocumentReaderCollaboratorsEnum.Reader
      }]
    )) 
    
    promise.then((res)=>
    {
      openModalforCollaborators === true ?
       setstateforColaborattors(stateforColaborattors?.filter(obj => obj?.memberId !== userId))
      :
      setstateforReaders(stateforReaders?.filter(obj => obj?.memberId !== userId))
      
      res?.payload?.message==="success" && dispatch(
        openNotification({
          message: "Deleted",
          type: "success",
          duration: 2,
        })
      );
    })

  };

  return (
    <>
    {
          <ItemDetailModal
            data={(openModalforCollaborators ? stateforColaborattors : stateforReaders)} //Data of members will pass here in array
            isDeleteDisabled={!isRigthtoAddReaderorCollab} //Pass true to hide delete icon
            addEnabled={isRigthtoAddReaderorCollab} //Pass false to hide select member
            addFunc={CollabratorOrReader} // define and pass addMember action of particular members
            onDelete={onDelete} // define and pass onDeletemember actions of particular members
            isSearch={isRigthtoAddReaderorCollab} //Pass true if you want to search the list
            openModal={true} // pass true if you want to open member details in modal other wise it display in listing
            visible={openModalforCollaborators || openModalforReaders}
            setVisible={(da) => onClosePopUp(da)}
          />
      }
      <SingleItem>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator.designation ? creator.designation : ""}
                  time={moment(createDate).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            {/* <Tag className="IdTag">{referenceNo}</Tag> */}
            {/* <DocumentStatusTag status={status} ></DocumentStatusTag> */}
          </div>
        </ItemHeader>
        {/* <div className="description w-full pt-3 pb-5 h-[100px]">
                               {description.length > 0 ? (
                                   <p>{description}</p>
                               ) : (
                                   <p> No description </p>
                               )}
                           </div> */}

        <div className="doc_detail_media">
          <DocShortCard
            data={documentFile}
            handlePreview={handlePreview}
            key={createGuid()}
            hideControls={true}
          />
          {/* <div className="downloadBtn">
                            {
                                documentType === DUCOMENT_TYPE.attachment ?
                                    <Button className="ThemeBtn downloadBtn">{documentDictionary.Download}</Button> : ""
                            }
                        </div> */}
        </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Create Date</div>
            <div className="cardSection__body">
              {moment().format("Do MMM YY")}
            </div>
          </div>

          <div className="cardSectionItem">
            <div className="cardSection__title">Readers</div>
            <div className="cardSection__body" onClick={(e) => setReaderModal(e)}>
              {privacyId === PostPrivacyType.PUBLIC ? (
                "Public"
              ) : readers.length > 0 ? (
                <>
                <Avatar
                  isAvatarGroup={true}
                  heading={"members"}
                  membersData={readers ? readers : []}
                />
                {isUserExistInColab && <PlusCircleFilled style={{ fontSize: '20px' }}/>}</>
              ) : (
                "Not Available"
              )}
            </div>
          </div>

          <div className="cardSectionItem"> 
            <div className="cardSection__title">
              {getDocumentRightLabel(documentType)}
            </div>
            <div className="cardSection__body" onClick={(e) => getDocumentRightLabel(documentType)==="Collaborators"  && handleModalOpen(e)} >
              {collaborators.length > 0 ? (
               <>
               <Avatar
                  isAvatarGroup={true}
                  heading={"members"}
                  membersData={collaborators ? collaborators : []}
                />
               {getDocumentRightLabel(documentType)==="Collaborators" && isUserExistInColab && <PlusCircleFilled style={{ fontSize: '20px' }}/> }
                </>
              ) : (
                "Not Available"
              )}
            </div>
          </div>

          {/* <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">
              {approvers.length > 0 ? (
                <Avatar
                  isAvatarGroup={true}
                  heading={"approvers"}
                  membersData={approvers ? approvers : []}
                />
              ) : (
                "Not Available"
              )}
            </div>
          </div> */}
        </div>
        {/* <RemarksApproval
          module={ApprovalsModule.DocumentApproval}
          status={status}
          onStatusChanged={(statusChanged) => {
            // dispatch(UpdateDocumentById(props.id))
          }}
          data={approvers}
          title="Approvers"
        /> */}
        <div className="comments mt-[20px]">
          <CommentWrapper
            initailComments={[]}
            referenceId={props.id}
            module={DOCUMENT_ENUM.MODULE_NO}
            isCommentLoad={true}
          />
        </div>
        <PreviewModal previewItem={previewPath} handleClose={handleClose} />
      </SingleItem>
    </>
  );
}

export default DetailCard;
