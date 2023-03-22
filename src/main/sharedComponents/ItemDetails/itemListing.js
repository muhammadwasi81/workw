import Item from './item';

const ListItem = ({ ListData = [], deleteDisabled = false, onDelete }) => {
  //Data will be passed from parent

  return (
    <>
      <div>
        {ListData.map((it) => {
          return (
            <Item
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
