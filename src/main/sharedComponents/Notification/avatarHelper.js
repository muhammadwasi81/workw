import Avatar from "../Avatar/avatarOLD";

export const getAvatar = (src, name) => {
  if (src || name) {
    return (
      <Avatar
        src={src}
        name={name || "Anonymous"}
        size={38}
        round={true}
        contStyle={{ marginTop: "-10px", marginLeft: "-10px" }}
      />
    );
  } else {
    return <></>;
  }
};
