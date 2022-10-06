import React, { useState } from "react";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import JobDetails from "../../view/DetailView/DetailComposer/JobDetails";
import ListItem from "./ListItem";
const MyCareersListView = (props) => {
  const [openDetail, setOpenDetail] = useState(false);

  const openJobDetailHandler = () => {
    setOpenDetail(true);
  };
  return (
    <>
      <CardWrapper>
        {openDetail && <JobDetails />}

        <ListItem onClick={() => openJobDetailHandler(props.id)} />

        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </CardWrapper>
    </>
  );
};
export default MyCareersListView;
