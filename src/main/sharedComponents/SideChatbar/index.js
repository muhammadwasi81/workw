import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SideChatBar } from "./SideChatBar.style";
import SideBarHead from "./SideBarHead";
import SideBarList from "./SideBarList";
import SideBarSearch from "./SideBarSearch";
import "./style.css";
import { useLocation } from "react-router-dom";
export const Index = () => {
  const sideBarStatus = useSelector((state) => state.sideBarChatSlice.sideBarChatStatus)
  const sideBarChatIsDefault = useSelector((state) => state.sideBarChatSlice.sideBarChatIsDefault)
  const [isHide, setIsHide] = useState(false)
  let chatList = [
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },
    {
      name: "User1",
      src: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
    },

  ]
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === "/messenger") {
      setIsHide(true)
    }
    else
      setIsHide(false)
  }, [location])

  let isMobileView = window.innerWidth < 800;
  return (
    <SideChatBar sideBarStatus={sideBarStatus} isDefault={sideBarChatIsDefault} style={{ display: isHide ? "none" : "block" }} isMobileView={isMobileView}>
      <SideBarHead />
      <SideBarList chatList={chatList} />
      <SideBarSearch />
    </SideChatBar>
  )
}

export default Index;