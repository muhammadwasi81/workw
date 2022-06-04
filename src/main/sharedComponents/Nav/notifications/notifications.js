import React, { Component } from "react";
import { API, GENERAL_PROXY } from "../../../../utils/services";
import $ from "jquery";
import { getRelativeTime, onRouteChange, STRINGS } from "../../../../utils/base";
import { NavLink } from "react-router-dom";
import { Badge } from "antd";
import Avatar from "../../Avatar/avatar";
import { Spin } from "antd";

class Notifications extends Component {
  notificationsHolder = React.createRef();
  currentPage = 0;
  state = { notifications: [], count: 0, loading: false };

  componentDidMount() {
    this.getNotifications(++this.currentPage);
    this.handleSocket();
  }

  handleSocket = () => {
    GENERAL_PROXY.on(
      STRINGS.SOCKET_ACTIONS.NOTIFY_LISTENER,
      (notification) => { }
    );
  };

  getNotifications = (page) => {
    this.handlePagination(false);
    this.setState({ loading: true });
    API.NOTIFICATION.getAll(page).then(({ status, data }) => {
      if (status) {
        this.setState({ loading: false });
        const { Count, Notification } = data;
        if (Notification.length > 0) {
          this.setState({
            count: Count,
            notifications: this.state.notifications.concat(Notification),
          });
          this.handlePagination(true);
        }
      }
    });
  };

  readAllNotifications = () => {
    API.NOTIFICATION.readAllNotification().then(({ status, error }) => {
      if (status) $(".notification").removeClass("read");
    });
  };

  handlePagination = (doPagination = true) => {
    const _section = $(this.notificationsHolder.current);
    if (doPagination) {
      _section.on("scroll", () => {
        if (
          _section.scrollTop() + _section.innerHeight() >=
          _section[0].scrollHeight
        )
          this.getNotifications(++this.currentPage);
      });
    } else {
      _section.off("scroll");
    }
  };

  onNotificationClick = (notification) => {
    onRouteChange(notification);
    // switch (type) {
    //     case STRINGS.TYPES.NOTIFICATIONS.POST: {
    //         window.location = `${STRINGS.ROUTES.NEWSFEED.DETAILS}/${ref_id}`;
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.POLL: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.POST_MENTION: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.POST_TAG: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.PROJECT_POST: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.PROJECT_POLL: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.PROJECT_POST_MENTION: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.PROJECT_POST_TAG: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.GROUP_POST: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.GROUP_POLL: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.GROUP_POST_MENTION: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.GROUP_POST_TAG: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.TIMELINE_POST: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.VOTE_POLL: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.GROUP_VOTE_POLL: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.PROJECT_VOTE_POLL: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.TIMELINE_VOTE_POLL: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.POST_REACT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.GROUP_POST_REACT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.PROJECT_POST_REACT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.TIMELINE_POST_REACT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.REACT_ON_COMMENT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.COMMENT_ON_POST: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.REPLY_ON_POST: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.MENTION_ON_COMMENT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.MEMBER_ADD_GROUP: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.MEMBER_ADD_PROJECT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.TASK_ASSIGNED: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.TASK_ASSIGNED_GROUP: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.TASK_ASSIGNED_PROJECT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.COMMENT_ON_TASK: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.REPLY_ON_TASK: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.MENTION_IN_TASK_COMMENT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.REACT_ON_TASK_COMMENT: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.UPDATE_TASK: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.GENERAL_EXPENSE: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.PROJECT_EXPENSE: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.GROUP_EXPENSE: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.TRAVEL_EXPENSE: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.EXECUTE_GENERAL_EXPENSE: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.EXECUTE_PROJECT_EXPENSE_EXPENSE: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.EXECUTE_GROUP_EXPENSE: {
    //         break;
    //     }
    //     case STRINGS.TYPES.NOTIFICATIONS.EXECUTE_TRAVEL_EXPENSE: {
    //         break;
    //     }
    //     default: {
    //     }
    // }
  };

  render() {
    const { notifications, loading } = this.state;
    return (
      <div className="toggle-menu a">
        <div className="toggle-label" style={{ marginLeft: "55px" }}>
          <i className="ic-bell" />
          <span style={{ margin: this.props.counter && "4px -4px 16px -10px" }}>
            {this.props.counter > 0 && (
              <Badge
                className="site-badge-count-109"
                count={this.props.counter}
                dot={true}
              ></Badge>
            )}
          </span>
        </div>
        <div className="toggle-panel">
          <div className="toggle-board">
            <div className="board-header">
              <div className="board-label">Notifications</div>
              <div
                className="board-setting"
                onClick={this.readAllNotifications}
              >
                <span>Read All</span>
              </div>
            </div>
            <div ref={this.notificationsHolder} className="board-body ov-des">
              {
                notifications.length > 0 &&
                notifications.map((notification) => {
                  const {
                    notification_id,
                    datetime,
                    username,
                    profile_picture,
                    message,
                    is_read,
                    //ref_id, type,
                  } = notification;

                  return (
                    <div
                      key={notification_id}
                      // to={`${STRINGS.ROUTES.NEWSFEED.DETAILS}/${ref_id}`}
                      className={`notification ${!is_read ? "read" : ""}`}
                      onClick={(e) => {
                        this.onNotificationClick(notification);
                      }}
                    >
                      <div className="icon">
                        <Avatar
                          src={profile_picture}
                          name={username}
                          round={true}
                          height={52}
                          width={52}
                        />
                      </div>
                      <div className="detail">
                        <div className="text">
                          <NavLink to="#">{username}</NavLink>
                          {message}
                        </div>
                        <div className="detail-btm">
                          <div className="time">
                            {getRelativeTime(datetime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
                // : (<div className="note">You Have No Notifications.</div>)
              }
              {loading && (
                <div className="note">
                  <Spin size="small" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;
