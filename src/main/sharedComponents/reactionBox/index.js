import React, { Component, PropTypes } from "react";
import Icon from "./components/icon";
import IconContainer from "./components/iconContainer";
import appreciateIcon from "../../../content/NewContent/NewsFeed/svg/appreciateIcon.svg";
import likeIcon from "../../../content/NewContent/NewsFeed/svg/likeIcon.svg";
import celebrateIcon from "../../../content/NewContent/NewsFeed/svg/celebrateIcon.svg";
import heartIcon from "../../../content/NewContent/NewsFeed/svg/heartIcon.svg";
import searchIcon from "../../../content/NewContent/NewsFeed/svg/searchIcon.svg";
import { ReactionType } from "../../features/feed/utils/constants";

export default class Reactions extends Component {
  constructor(props) {
    super(props);
  }

  // static propTypes = {
  // 	items: PropTypes.array.isRequired
  // }

  state = {
    open: false,
    // activeReaction: ReactionType.NoReaction,
  };

  toggleOpen(openState) {
    this.setState({
      open: openState,
    });
  }
  // LikeHandler() {
  //   this.setState({
  //     activeReaction: ReactionType.Like,
  //   });
  // }
  images = [
    {
      id: ReactionType.Like,
      description: "Like",
      img: likeIcon,
    },
    {
      id: ReactionType.Love,
      description: "Love",
      img: heartIcon,
    },
    {
      id: ReactionType.Support,
      description: "Appreciate",
      img: appreciateIcon,
    },
    {
      id: ReactionType.Celebrate,
      description: "Celebrate",
      img: celebrateIcon,
    },
    {
      id: ReactionType.Curious,
      description: "Curious",
      img: searchIcon,
    },
  ];

  componentDidUpdate(prevProps, prevState) {}
  render() {
    const { open } = this.state;
    // const items = this.props.items;
    const items = this.images;
    const width = items.length * 45;

    const optionsStyles = {
      position: "relative",
    };

    const elementsStyles = {
      listStyle: "none",
      padding: 0,
      margin: "auto",
      background: "#FFF",
      boxShadow: "0 0 0 1px rgba(0, 0, 0, .08), 0 2px 2px rgba(0, 0, 0, .15)",
      borderRadius: "30px",
      visibility: open ? "visible" : "hidden",
      opacity: open ? 1 : 0,
      transition: "all 0.2s 0.2s",
      display: "inline-block",
      position: "absolute",
      width: `${width}px`,
      left: this.props.direction === "ltr" ? "" : "auto",
      right: this.props.direction === "ltr" ? "auto" : 0,
      bottom: "calc( 100% + 4px )",
      zIndex: "9999",
    };

    const listItems = items.map((item, i) => {
      return (
        <IconContainer
          key={item.id}
          onUpdate={this.props.onUpdate}
          id={item.id}
          index={i}
          img={item.img}
          title={item.description}
          show={open}
          onReactionClick={() => this.toggleOpen(false)}
        ></IconContainer>
      );
    });

    return (
      <span
        className="flex flex-1 justify-center"
        style={optionsStyles}
        onClick={
          // this.toggleOpen(false);
          this.props.onLikeBtnClick
        }
        // onMouseOver={() => {
        // 	setTimeout(() => {
        // 		this.toggleOpen(true);
        // 	}, 1000);
        // }}
        // onMouseOut={() => {
        // 	this.toggleOpen(false);
        // }}
        onMouseEnter={() => this.toggleOpen(true)}
        onMouseLeave={() => this.toggleOpen(false)}
      >
        <ul
          style={elementsStyles}
          className="flex flex-1 justify-center"
          id="reaction"
        >
          {listItems}
        </ul>
        <div>{this.props.children}</div>
      </span>
    );
  }
}
