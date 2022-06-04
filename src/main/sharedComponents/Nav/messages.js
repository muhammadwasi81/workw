import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import {
  addChatInChatRoom,
  getChats,
  toggleChatComposer,
} from "../../../redux/chat/actions";
import MessageListItem from "./messageList/messageListItem";
import { API } from "../../../utils/services";
import Badge from "@material-ui/core/Badge";
import { Spinner } from "../../../utils/base";

class Messages extends Component {
  messagesHolder = React.createRef();
  currentPage = 1;
  pageSize = 20;
  state = {
    isReply: false,
    conversations: [],
  };

  componentDidMount() {
    this.getConversations();
  }

  getConversations = () => {
    // this.handlePagination(false);
    const obj = {
      pageNo: this.currentPage,
      search: "",
      getContacts: false,
    };
    console.log("before call");

    API.CHAT.getAllChats(obj)
      .then(({ status, data }) => {
        console.log(data);
        if (status) {
          let { conversations } = this.state;
          const newStates = {
            conversations:
              this.currentPage === 1 ? data : [...conversations, ...data],
          };

          this.setState(newStates, () => {
            // this.handlePagination(this.state.conversations.length === (this.conversationsPage * 20));
          });
        }
      })
      .catch((error) => console.log("catch_error", error));
  };

  // doPagination = (doPagination = true) => {
  //     const {getChats} = this.props;
  //     const obj = {
  //         page:++this.currentPage,
  //         search:"",
  //         getContacts:true
  //     }

  //     const _section = $(this.messagesHolder.current);
  //     if (doPagination) {
  //         _section.on("scroll", () => {
  //             if (_section.scrollTop() + _section.innerHeight() >= _section[0].scrollHeight)
  //                 getChats(obj);
  //         });
  //     } else {
  //         _section.off("scroll")
  //     }
  // };

  handleChatRooms = ({ target }, chat) => {
    const { addChatInChatRoom } = this.props;

    $(".toggle-menu").removeClass("on");
    $(".nav").css({
      "z-index": 0,
    });

    const _thisElem = $(target);
    if (_thisElem.hasClass("contact")) {
      _thisElem.find(".cnt-tile").remove();
    } else {
      const parents = $(target).parentsUntil(".chatList");
      $(parents.filter((i) => $(parents[i]).hasClass("contact"))[0])
        .find(".cnt-tile")
        .remove();
    }
    _thisElem.hasClass("messageReply");

    addChatInChatRoom(chat);
  };

  sendMessage = (message, chat) => {
    const { chat_id, members } = chat;
    const attachments = [];
    if (message !== "") {
      API.CHAT.sendMessage({
        chat_id,
        message,
        members,
        attachments,
      });
    } else {
    }
  };

  render() {
    const { chats, requestPending } = this.props;
    // if (!requestPending && (conversations.length === (this.pageSize * this.currentPage))) {
    //     this.doPagination(true);
    // } else {
    //     this.doPagination(false);
    // }
    const { conversations } = this.state;

    if (requestPending) {
      return (
        <div style={{ marginTop: "130px" }}>
          <Spinner />
        </div>
      );
    }

    return (
      <div className="toggle-menu">
        <div className="toggle-label">
          <i className="ic-chat" id="ic-chat" />
          <span style={{ margin: this.props.counter && "0 7px 10px 5px" }}>
            <Badge
              color="secondary"
              badgeContent={this.props.counter}
              max={10}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            ></Badge>
          </span>
        </div>
        <div className="toggle-panel">
          <div className="toggle-board">
            <div className="board-header">
              <div className="board-label">Messages</div>
              <div className="board-setting">
                <span
                  className="anc"
                  onClick={() => {
                    $(".toggle-menu").removeClass("on");
                    $(".nav").css({ "z-index": 0 });
                    this.props.toggleChatComposer(true);
                  }}
                >
                  New Chat
                </span>
              </div>
            </div>
            <div ref={this.messagesHolder} className="board-body ov-des">
              {!requestPending && chats.length > 0 ? (
                conversations.map((chat) => (
                  <MessageListItem
                    key={chat.chat_id}
                    chat={chat}
                    handleChatRooms={this.handleChatRooms}
                    sendMessage={this.sendMessage}
                  />
                ))
              ) : (
                <div className="note">You Have No Messages.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chats }) => ({
  chats: chats.all,
  requestPending: chats.pending,
});

const mapDispatchToProps = (dispatch) => ({
  getChats: (page) => dispatch(getChats(page)),
  addChatInChatRoom: (chat) => dispatch(addChatInChatRoom(chat)),
  toggleChatComposer: (open) => dispatch(toggleChatComposer(open)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
