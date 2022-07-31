import { DatePicker, Form, Input, Switch } from "antd";
import React, { useState } from "react";
import "./styles/createRoom.css";
import { HomeOutlined, BranchesOutlined } from "@ant-design/icons";

export default function CreateRoom() {
  const [isPassword, setIsPassword] = useState(false);
  const [isMeetingSchedule, setIsMeetingSchedule] = useState(false);
  return (
    <div className="createRoom">
      <div className="createRoom__inner">
        <div>
          <h2>Create Room</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
            aperiam delectus esse numquam, cupiditate, nobis minus, deleniti
            iure tempora non at. Eum ex sit vel sapiente dolore facere nihil ab!
          </p>

          <div className="createRoom__form">
            <Form layout="vertical">
              <Form.Item label="Room Name" name="Room Name">
                <Input placeholder="Room Name" />
              </Form.Item>
              <div className="btnGroup">
                <button className="btn btn-secondary">add member</button>
                <button className="btn btn-secondary">send Invitation</button>
                <Form.Item label="Lock" name="Lock">
                  <Switch size="small" />
                </Form.Item>
                <Form.Item label="Anyone Can Join" name="Anyone Can Join">
                  <Switch size="small" />
                </Form.Item>
              </div>
              <div className="invitations">
                <div className="hosts">
                  <p>Hosts(2)</p>
                </div>
                <div className="members">
                  <p>Members(2)</p>
                </div>
                <div className="external">
                  <p>External Invitations(2)</p>
                </div>
              </div>
              <div className="createRoom__formBottom">
                <Form.Item
                  label="Room Password(External)"
                  name="Room Password(External)"
                >
                  <Switch
                    size="small"
                    onChange={() => setIsPassword((preValue) => !preValue)}
                  />
                </Form.Item>
              </div>
              {isPassword && (
                <div className="createRoom__formBottom__input">
                  <Form.Item label="" name="Room Name">
                    <Input placeholder="Create a Password" />
                  </Form.Item>
                </div>
              )}

              <div className="createRoom__formBottom">
                <Form.Item label="Schedule a Meeting" name="Schedule a Meeting">
                  <Switch
                    size="small"
                    onChange={() =>
                      setIsMeetingSchedule((preValue) => !preValue)
                    }
                  />
                </Form.Item>
              </div>
              {isMeetingSchedule && (
                <div className="createRoom__formBottom__input">
                  <Form.Item label="" name="meeting">
                    <DatePicker />
                  </Form.Item>
                </div>
              )}
            </Form>
          </div>
        </div>
        <div className="btnGroupBottom">
          <button className="btn btn-primary">
            {!isMeetingSchedule ? "Start Now" : "Confirm Schedule"}
          </button>
          <button className="btn btn-secondary">
            <HomeOutlined />
            Main Lobby
          </button>
          <button className="btn btn-secondary">
            <BranchesOutlined />
            Depertment Lobby
          </button>
        </div>
      </div>
    </div>
  );
}
