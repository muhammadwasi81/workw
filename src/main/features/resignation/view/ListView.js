import React from "react";
import ListItem from "./ListItem";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";

const ListView = () => {
  return (
    <CardWrapper>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <ListItem items={item} />
      ))}
    </CardWrapper>
  );
};

export default ListView;
