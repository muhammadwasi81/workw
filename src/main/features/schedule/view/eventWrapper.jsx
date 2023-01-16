import React from 'react';
import { useDispatch } from 'react-redux';
import { Skeleton } from 'antd';
import '../styles/event.css';
import Event from './event';
import { toggleEventDetailComposer } from '../store/slice';

function EventWrapper({ data, heading = 'Events', loading = false }) {
  console.log('data', data);

  // if (loading) {
  // 	return <Skeleton.Input active size block />;
  // }
  const dispatch = useDispatch();

  const handleScheduleDetailComposer = (data) => {
    dispatch(
      toggleEventDetailComposer({
        id: data.id,
        scheduleType: data.scheduleType,
      })
    );
  };

  return (
    <div className="eventWrapper ">
      <div className="eventWrapper__header">
        <p>{heading}</p>
      </div>
      <div className="eventWrapper__body">
        {loading ? (
          <Skeleton.Input active size block />
        ) : data?.length > 0 ? (
          data?.map((event) => (
            <Event
              showTag={true}
              data={event}
              handleScheduleDetailComposer={handleScheduleDetailComposer}
            />
          ))
        ) : (
          <span className="font-semibold">No Events on this day.</span>
        )}
      </div>
    </div>
  );
}

export default EventWrapper;
