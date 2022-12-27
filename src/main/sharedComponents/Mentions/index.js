import { Mentions } from "antd";
import React, { useEffect, useRef, useState } from "react";
import MentionUserItem from "../ListItem/MentionUserItem/MentionUserItem";
function CustomMentions({
  placeholder,
  value,
  onChange,
  onSelect,
  initialMentions = [],
  isOpen,
  ...props
}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...initialMentions]);
  }, [initialMentions]);
  let myRef = useRef()

  useEffect(() => {
    if (isOpen)
      myRef.current.focus()
  }, [])
  return (
    <Mentions
      {...props}
      rows={props.row || 4}
      placeholder={placeholder}
      value={value}
      onChange={(value) => onChange(value)}
      onSelect={(e) => onSelect(e)}
      ref={myRef}
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
