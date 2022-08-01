import React, { Component, PropTypes } from "react";
import Icon from "./components/icon";
import IconContainer from "./components/iconContainer";

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
    { id: "like", description: "Like", img: "http://i.imgur.com/LwCYmcM.gif" },
    { id: "love", description: "Love", img: "http://i.imgur.com/k5jMsaH.gif" },
    { id: "haha", description: "Haha", img: "http://i.imgur.com/f93vCxM.gif" },
    { id: "yay", description: "Yay", img: "http://i.imgur.com/a44ke8c.gif" },
    { id: "wow", description: "Wow", img: "http://i.imgur.com/9xTkN93.gif" },
    { id: "sad", description: "Sad", img: "http://i.imgur.com/tFOrN5d.gif" },
    {
      id: "angry",
      description: "Angry",
      img: "http://i.imgur.com/1MgcQg0.gif",
    },
  ];
  render() {
    const { open } = this.state;
    // const items = this.props.items;
    const items = this.images;
    const width = items.length * 52;

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
