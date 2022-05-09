import React from "react";
import { useSelector } from "react-redux";
import { SideChatBar } from "./SideChatBar.style";
import SideBarHead from "./SideBarHead";
import SideBarList from "./SideBarList";
import SideBarSearch from "./SideBarSearch";
import "./style.css";

export const Index = () => {

  const sideBarStatus = useSelector((state) => state.sideBarChatSlice.sideBarChatStatus)
  const sideBarChatIsDefault = useSelector((state) => state.sideBarChatSlice.sideBarChatIsDefault)
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
  let pathName = window.location.pathname
  let isMobileView = window.innerWidth < 800
  return (
    <SideChatBar sideBarStatus={sideBarStatus} isDefault={sideBarChatIsDefault} style={{display:pathName === "/messenger" ? "none" : "block"}} isMobileView={isMobileView}>
      <SideBarHead />
      <SideBarList chatList={chatList} />
      <SideBarSearch />
    </SideChatBar>
  )
}

export default Index;