import React, { useState } from 'react';
import TaskListItem from './TaskList/listItem';
import { Collapse, Divider, Skeleton } from 'antd';
import { groupByKey } from '../../../../utils/base';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Scroll from '../../../sharedComponents/ScrollSelect/infinteScoll';
import TaskComposer from './TaskDetail/TaskComposer';
import { NoDataFound } from '../../../sharedComponents/NoDataIcon';
const { Panel } = Collapse;

function MyTask({ referenceId, referenceType }) {
  const {
    taskList: { loading, list },
  } = useSelector((state) => state.taskSlice);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const handleCard = (id) => {
    setId(id);
    setVisible(true);
  };
  const handleDrawerClose = () => {
    setVisible(false);
  };

  if (loading)
    return (
      <div className="taskItemContainer">
        {[...Array(10)].map(() => (
          <div className="taskListSkeleton">
            <Skeleton avatar />
          </div>
        ))}
      </div>
    );

  let filteredList = list.map((item) => ({
    ...item,
    startDateOnly: moment(item.startDate).format('MMM Do YYYY'),
  }));
  const groupDate = groupByKey(filteredList, 'startDateOnly');
  return (
    <>
      <Scroll
        isLoading={false}
        data={filteredList}
        fetchMoreData={(pageNo) => {
          console.log(pageNo);
          // setPageNo(pageNo);
        }}
        loader={<Skeleton avatar />}
        endMessage={'No more posts...'}
      >
        {Object.keys(groupDate).map((item) => {
          return (
            <Collapse
              key={item}
              defaultActiveKey={['1']}
              className="myTask"
              ghost={true}
              accordion={false}
            >
              <Panel
                header={
                  <Divider style={{ margin: '0 0 10px 0' }}>
                    {item}
                    {/* {moment(item).format("MMMM Do YYYY")} */}
                  </Divider>
                }
                key="1"
              >
                <div className="taskItemContainer">
                  {groupDate[item].map((task) => {
                    return (
                      <TaskListItem
                        key={task.id}
                        item={task}
                        onTask={handleCard}
                      />
                    );
                  })}
                </div>
              </Panel>
            </Collapse>
          );
        })}
      </Scroll>
      <TaskComposer
        id={id}
        visible={visible}
        onClose={handleDrawerClose}
        referenceId={referenceId}
        referenceType={referenceType}
      />
    </>
  );
}

export default MyTask;
