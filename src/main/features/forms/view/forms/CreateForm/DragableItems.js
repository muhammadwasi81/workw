import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import newsIcon from "../../../content/svg/menu/newNavBarIcon/News Feed.svg";
// import { getNavItemByRights, getUserDataFromStorage, STRINGS } from "../../../utils/base";
// import DragHandleIcon from '@material-ui/icons/DragHandle';
// import { Checkbox } from "@material-ui/core";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "unset" : "unset",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "unset" : "unset",
  // padding: grid,
  // width: 230
});

class DrangableQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentDidMount() {
    let { questions } = this.props;
    console.log(questions, "test");
    this.setState({
      items: questions.map((item) => {
        return {
          ...item,
          sequence: item.sequence.toString(),
        };
      }),
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.questions) !==
      JSON.stringify(this.props.questions)
    ) {
      this.setState({
        items: this.props.questions.map((item) => {
          return {
            ...item,
            sequence: item.sequence.toString(),
          };
        }),
      });
    }
  }

  onDragEnd(result) {
    let { handleChange } = this.props;
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
    handleChange(items);
  }
  render() {
    // console.log(this.state.items, "ITEM RENDER CHILD")
    // console.log(this.props.children)
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable
                  key={item.sequence}
                  draggableId={item.sequence}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {this.props.children[Number(item.sequence)]}
                      {/* <DragHandleIcon /> */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
export default DrangableQuestions;
