import NewStickyNote from "./NewStickyNote";
import StickyContainer from "./StickyContainer";
import { useSelector } from "react-redux";

function StickyNotes() {
  const stickynote = useSelector((state) => {
    return state.stickySlice.listArray;
  });
  console.log(stickynote, "stickynote");

  return (
    <>
      {stickynote
        .filter((it) => it.isOpen)
        .map((item, index) => (
          <NewStickyNote item={item} index={index} key={item.id} />
        ))}
      <StickyContainer />
    </>
  );
}
export default StickyNotes;
