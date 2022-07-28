import React from "react";
import TaskListItem from "./TaskList/listItem";
import { Collapse, Divider } from "antd";
import { groupByKey } from "../../../../utils/base";
import moment from "moment";
const { Panel } = Collapse;
function MyTask({list}) {
  let filteredList = list.map((item)=>({
    ...item,
    startDateOnly:moment(item.startDate).format("MMM Do YYYY")
  }))
  const groupDate = groupByKey(filteredList, "startDateOnly");
  return (
    <>
      {Object.keys(groupDate).map((item) => {
        return (
          <Collapse
            key={item}
            defaultActiveKey={["1"]}
            className="myTask"
            ghost={true}
            accordion={false}
          >
            <Panel
              header={
                <Divider style={{ margin: "0 0 10px 0" }}>
                  {item}
                  {/* {moment(item).format("MMMM Do YYYY")} */}
                </Divider>
              }
              key="1"
            >
              {groupDate[item].map((task) => {
                return <TaskListItem key={task.id} item={task} />;
              })}
            </Panel>
          </Collapse>
        );
      })}
    </>
  );
}

export default MyTask;
