import { Button, Drawer, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import MemberList from "./MemberList";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeShort } from "../../../../../utils/Shared/store/actions";
import { createChat } from "../../store/actions";
import { createGuid, STRINGS } from "../../../../../utils/base";
function CreateChat({ onClose, visible }) {
  const dispatch = useDispatch();
  const { employeeShort: members } = useSelector((state) => state.sharedSlice);
  const loader = useSelector((state) => state.MessengerSlice.loader);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [state, setState] = useState({title:""});
  useEffect(() => {
    dispatch(
      getAllEmployeeShort({
        pageNo: "1",
        search: "",
      })
    );
  }, []);
  useEffect(() => {
    if (!visible)
      setSelectedMembers([])
  }, [visible])
  const onMemberSelect = (member) => {
    setSelectedMembers([
      ...selectedMembers,
      member.id
    ])
  };
  const onMemberRemove = (member) => {
    setSelectedMembers(selectedMembers.filter(it => it !== member.id))
  }
  const handleImageUpload = (images) => {
    let profileImage = null;
    if (images.length > 0) {
      profileImage = images[0].originFileObj
    }
    setState({
      ...state,
      profileImage
    })
  }
  const createPayload = () => {
    let image = state.profileImage ? {
      id: STRINGS.DEFAULTS.guid,
      file: state.profileImage
    } : undefined;
    let members = selectedMembers.map(memberId => ({ memberId }));
    let chatType = members.length > 1 ? 2 : 1;
    let payload = {
      members,
      image,
      name: state.title,
      chatType
    };
    return payload
  }

  const handleSubmit = () => {
    let payload = createPayload();
    if (payload.members.length > 1 && payload.name.length === 0) {
      message.error("Group Name Required", 2)
      return null;
    }
    dispatch(createChat(payload));
  }

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      visible={visible}
      className="createChat"
      width={500}
      destroyOnClose={true}
    >
      <div className="bg-white m-2 rounded-md relative">
        <div className="createChat__header">
          <div className="profileUploader">
            <SingleUpload
              handleImageUpload={handleImageUpload}
              uploadText={""}
              multiple={false}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
          <Input
            placeholder="Name Your Group"
            onChange={(e) => setState({ ...state, title: e.target.value })}
          />
        </div>
        <div className="createChat__body">
          <MemberList
            allMembers={members}
            onMemberSelect={onMemberSelect}
            onMemberRemove={onMemberRemove}
            selectedMembers={selectedMembers}
          />
        </div>
        <div className="fixed bottom-0 w-full" >
          <Button
            className="headerBtn w-[480px] ml-[4px] mb-[4px] flex justify-center"
            loading={loader}
            disabled={selectedMembers.length === 0}
            onClick={handleSubmit} >Create</Button>
        </div>
      </div>
    </Drawer>
  );
}

export default CreateChat;
