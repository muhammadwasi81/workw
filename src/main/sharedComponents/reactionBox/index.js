import React, { Component, PropTypes } from "react";
import Icon from "./components/icon";
import IconContainer from "./components/iconContainer";
import appreciateIcon from "../../../content/NewContent/NewsFeed/svg/appreciateIcon.svg";
import likeIcon from "../../../content/NewContent/NewsFeed/svg/likeIcon.svg";
import celebrateIcon from "../../../content/NewContent/NewsFeed/svg/celebrateIcon.svg";
import heartIcon from "../../../content/NewContent/NewsFeed/svg/heartIcon.svg";
import searchIcon from "../../../content/NewContent/NewsFeed/svg/searchIcon.svg";
export default class Reactions extends Component {
  constructor(props) {
    super(props);
  }

  // static propTypes = {
  // 	items: PropTypes.array.isRequired
  // }

  state = {
    open: false,
  };

  toggleOpen(openState) {
    this.setState({
      open: openState,
    });
  }
  images = [
    { id: "like", description: "Like", img: likeIcon },
    { id: "love", description: "Love", img: celebrateIcon },
    { id: "haha", description: "Haha", img: appreciateIcon },
    { id: "yay", description: "Yay", img: heartIcon },
    { id: "wow", description: "Wow", img: searchIcon },
  ];
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
      left: this.props.direction === "ltr" ? 0 : "auto",
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
        ></IconContainer>
      );
    });

    return (
      <span
        style={optionsStyles}
        onMouseEnter={() => this.toggleOpen(true)}
        onMouseLeave={() => this.toggleOpen(false)}
      >
        <ul style={elementsStyles}>{listItems}</ul>
        <div>{this.props.children}</div>
      </span>
    );
  }
}
