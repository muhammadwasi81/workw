import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Drawer } from 'antd';
import ScheduleComposerDetail from './ScheduleComposerDetail';
import { resetTravelDetail } from '../../../travel/store/slice';
import TaskDetail from '../../../task/view/TaskDetail/TaskDetail';
import TravelDetail from '../../../travel/view/TravelDetail/TravelDetail';
import { ScheduleTypeEnum } from '../../enum/enum';
// import { toggleEventDetailComposer } from "../../store/slice";

function ScheduleComposer({ onClose, id, visible, type, Direction }) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (type === ScheduleTypeEnum.Travel) {
        dispatch(resetTravelDetail());
      }
    };
  }, [id]);
  return (
    <Drawer
      title={
        type === ScheduleTypeEnum.Travel
          ? 'Travel Detail'
          : type === ScheduleTypeEnum.Task
          ? 'Task Detail'
          : 'Schedule Detail'
      }
      placement={Direction === 'ltr' ? 'right' : 'left'}
      width="768"
      onClose={() => {
        onClose();
      }}
      open={visible}
      destroyOnClose={true}
      className=" drawerSecondary"
    >
      {type === ScheduleTypeEnum.Travel ? (
        <TravelDetail travelId={id} />
      ) : type === ScheduleTypeEnum.Task ? (
        <TaskDetail id={id} />
      ) : (
        <ScheduleComposerDetail id={id} shortEvent={false} />
      )}
    </Drawer>
  );
}

export default ScheduleComposer;
