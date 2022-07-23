import { Mentions } from "antd";
import React, { useEffect, useState } from "react";
import MentionUserItem from "../ListItem/MentionUserItem/MentionUserItem";
function CustomMentions({
  placeholder,
  value,
  onChange,
  onSelect,
  mentions = [],
  ...props
}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...mentions]);
  }, [mentions]);

  return (
    <Mentions
      {...props}
      rows={props.row || 4}
      placeholder={placeholder}
      value={value}
      onChange={(value) => {
        onChange(value);
      }}
      onSelect={(e) => {
        onSelect(e);
      }}
    >
      {data.map(({ id, image, name, designation }) => (
        <Mentions.Option key={id} value={name}>
          <MentionUserItem
            avatar={image}
            name={name}
            designation={designation}
          />
        </Mentions.Option>
      ))}
    </Mentions>
  );
}

export default CustomMentions;
