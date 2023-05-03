import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MessengerListItem from "./MessageItem";
import "../../../style/style.css";
import { useDispatch } from "react-redux";
import { getAllChatMessage } from "../../../store/actions";
import { MESSENGER_ENUMS } from "../../../utils/Constant";

// let isDidMount = true
const MessengerList = ({
  isChatBox = true,
  isOpenProfile,
  messengerDetail,
}) => {
  const dispatch = useDispatch();
  const messageList = useSelector((state) => state.MessengerSlice.MessengerList[messengerDetail.chatId]);
  const lastElementRef = useRef("myRef");
  const ContainerRef = useRef("ContainerRed");
  const pageSize = MESSENGER_ENUMS.PAGINATION.PAGE_SIZE
  const [pageNo, setPageNo] = useState(0);
  const [bottomScrollEnable, setBottomScrollEnable] = useState(false);

  useEffect(() => {
    if (bottomScrollEnable) {
      lastElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  // this block manage fetch messages when conversation change & pageNo 1 calls
  useEffect(() => {
    setPageNo(1)
    getMessages()
  }, [messengerDetail]);

  // will call when only pageNo change by pagination
  useEffect(() => {
    if (pageNo > 1) // for only those apis call after 1 pageNo because pageNo 1 api already managed by upper useEffect
      getMessages(pageNo)
  }, [pageNo]);

  const getMessages = async(pageNoInput = 1) => {
    await dispatch(getAllChatMessage({ chatId: messengerDetail.chatId, pageNo: pageNoInput }));
    setBottomScrollEnable(true)
  }

  const scrollTrackFunc = () => {
    // console.log((pageSize * pageNo))
    // console.log(messageList?.length)
    if (ContainerRef !== null && ContainerRef.current.scrollTop == 0) {
      if ((pageSize * pageNo) <= messageList?.length) {
        ContainerRef.current.scrollTop = 10
        setBottomScrollEnable(false)
        setPageNo(pageNo + 1)
      }
    }
  }

  useEffect(() => {
    if (ContainerRef.current)
      ContainerRef.current.addEventListener("scroll", scrollTrackFunc);

    return () => {
      if (ContainerRef.current)
        ContainerRef.current.removeEventListener("scroll", scrollTrackFunc);
    }
  }, [pageNo, messageList])

  return (
    <div
      ref={ContainerRef}
      className={
        "MessengerList " +
        (isChatBox ? "ChatBoxMessages " : " ") +
        (isOpenProfile ? "blur-bg" : "")
      }
    >
      <div>
        {messageList &&
          messageList.map((item, ind) => {
            return (
              <MessengerListItem
                key={ind}
                messgeItem={item}
                messengerDetail={messengerDetail}
                isChatBox={isChatBox}
                previousMessage={messageList[ind - 1]}
              />
            );
          })}
        <div ref={lastElementRef}></div>
      </div>
    </div>
  );
};
export default MessengerList;
