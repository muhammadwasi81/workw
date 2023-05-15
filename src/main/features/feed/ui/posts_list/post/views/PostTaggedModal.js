import ItemDetailModal from "../../../../../../sharedComponents/ItemDetails";

const PostTaggedModal = ({ tags = [] , isModalOpen=false , setIsModalOpen = () => {}}) => {
  console.log(tags,"tagssss")
  return (
    <div className="tags-member">
    {<ItemDetailModal
      data={tags} //Data of members will pass here in array
      isDeleteDisabled={true} //Pass true to hide delete icon
      addEnabled={false} //Pass false to hide select member
      addFunc={false} // define and pass addMember action of particular members
      onDelete={false} // define and pass onDeletemember actions of particular members
      isSearch={false} //Pass true if you want to search the list
      openModal={true} // pass true if you want to open member details in modal other wise it display in listing
      visible={isModalOpen}
      setVisible={(data) => setIsModalOpen(false)}
    />}
    </div>
  );
};

export default PostTaggedModal;
