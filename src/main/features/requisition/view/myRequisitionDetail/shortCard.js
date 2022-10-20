import { Image, Tag } from "antd";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import { Skeleton } from "antd";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { requisitionDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import moment from "moment";

function ShortCard() {
    const { userLanguage } = useContext(LanguageChangeContext);
	const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
    const { Detail } = useSelector((state) => state.requisitionSlice);

    console.log(Detail, "DETAIL REQUISITION"); // set these in component

    return (
        <>
            <SingleItem>
                <div className="careersDetailCard">
                    <div className="cardLabel">{requisitionDictionary.detail}</div>
                    <div className="careersSections">
                        <div className="">
                            <div className="text-[14px] font-bold text-[grey]">
                                {requisitionDictionary.name}
                            </div>
                            <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                                {Detail?.name ? (
                                    Detail?.name
                                ) : (
                                    <Skeleton.Input active={true} size="small" />
                                )}
                            </div>
                        </div>
                        <div className="">
                            <div className="text-[14px] font-bold text-[grey]">{requisitionDictionary.Budget}</div>
                            <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                                {Detail?.budget ? (
                                    Detail?.budget
                                ) : (
                                    <Skeleton.Input active={true} size="small" />
                                )}
                            </div>
                        </div>
                        <div className="">
                            <div className="text-[14px] font-bold text-[grey]">
                                {requisitionDictionary.CreatedBy}
                            </div>
                            <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                                {Detail?.creator?.name ? (
                                    Detail?.creator?.name
                                ) : (
                                    <Skeleton.Input active={true} size="small" />
                                )}
                            </div>
                        </div>
                        <div className="">
                            <div className="text-[14px] font-bold text-[grey]">{requisitionDictionary.Email}</div>
                            <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                                {Detail?.creator?.email ? (
                                    Detail?.creator?.email
                                ) : (
                                    <Skeleton.Input active={true} size="small" />
                                )}
                            </div>
                        </div>
                        {/* <div className="">
                            <div className="text-[14px] font-bold text-[grey]">
                                REASON
                            </div>
                            <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                                {Detail?.reason ? (
                                    Detail?.reason
                                ) : (
                                    <Skeleton.Input active={true} size="small" />
                                )}
                            </div>
                        </div> */}
                        <div className="">
                            <div className="text-[14px] font-bold text-[grey]">
                                {requisitionDictionary.approvers}
                            </div>
                            <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                                <div className="cardSectionItem">
                                    {Detail.approvers &&
                                        <Avatar
                                            isAvatarGroup={true}
                                            isTag={false}
                                            heading={"approvers"}
                                            membersData={Detail.approvers ? Detail.approvers : []}
                                            text={"Approvers"}
                                            image={"https://joeschmoe.io/api/v1/random"}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SingleItem>
        </>
    );
}

export default ShortCard;
