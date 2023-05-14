import Item from './item';

const ListItem = ({ ListData = [], deleteDisabled = false, onDelete , isReaction=false }) => {
  //Data will be passed from parent

  return (
    <>
      <div>
        {ListData.map((it) => {
          return (
            <Item
              isReaction={isReaction}
              item={it}
              isDeleteDisabled={deleteDisabled}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListItem;
