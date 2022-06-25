import React from "react";
import TaskListItem from "./TaskList/listItem";
import { Collapse, Divider } from "antd";
import { groupByKey } from "../../../../utils/base";
import moment from "moment";
const { Panel } = Collapse;
function MyTask() {
  const data = [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      subject: "string",
      description: "string",
      type: 0,
      referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      referenceType: 0,
      startDate: "2022-06-22T08:13:09.120Z",
      endDate: "2022-06-22T08:13:09.120Z",
      priority: 0,
      members: [
        {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          checklist: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              item: "string",
            },
          ],
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      subject: "string",
      description: "string",
      type: 0,
      referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      referenceType: 0,
      startDate: "2022-06-22T08:13:09.120Z",
      endDate: "2022-06-22T08:13:09.120Z",
      priority: 0,
      members: [
        {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          checklist: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              item: "string",
            },
          ],
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      subject: "string",
      description: "string",
      type: 0,
      referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      referenceType: 0,
      startDate: "2022-06-22T08:13:09.120Z",
      endDate: "2022-06-22T08:13:09.120Z",
      priority: 0,
      members: [
        {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          checklist: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              item: "string",
            },
          ],
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      subject: "string",
      description: "string",
      type: 0,
      referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      referenceType: 0,
      startDate: "2022-06-21T08:13:09.120Z",
      endDate: "2022-06-22T08:13:09.120Z",
      priority: 0,
      members: [
        {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          checklist: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              item: "string",
            },
          ],
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      subject: "string",
      description: "string",
      type: 0,
      referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      referenceType: 0,
      startDate: "2022-06-22T08:13:09.120Z",
      endDate: "2022-06-22T08:13:09.120Z",
      priority: 0,
      members: [
        {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          checklist: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              item: "string",
            },
          ],
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      subject: "string",
      description: "string",
      type: 0,
      referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      referenceType: 0,
      startDate: "2022-06-22T08:13:09.120Z",
      endDate: "2022-06-22T08:13:09.120Z",
      priority: 0,
      members: [
        {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          checklist: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              item: "string",
            },
          ],
        },
      ],
    },
  ];
  const groupDate = groupByKey(data, "startDate");

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
                  {moment(item).format("MMMM Do YYYY")}
                </Divider>
              }
              key="1"
            >
              {groupDate[item].map((item) => {
                return <TaskListItem key={item.id} />;
              })}
            </Panel>
          </Collapse>
        );
      })}
    </>
  );
}

export default MyTask;
