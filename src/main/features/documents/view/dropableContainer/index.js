import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getTypeOfFile, isValidFileSize, STRINGS } from "../../../../../utils/base";
import { DocsComposerEnums } from "../../constant";
import { handleOpenDocComposer } from "../../store/slice";
import UploadByDrop from "../composer/dropUpload";

const DropableContainer = ({ children }) => {

  const [FileList, setFileList] = useState([]);
  const [isOpenComposer, setIsOpenComposer] = useState(false);
  const dispatch = useDispatch();

  const onDropHandler = (ev) => {
    ev.preventDefault();
    ev.preventDefault();
    const fileList = ev.dataTransfer.files;

    if (fileList.length !== 0) {
      let fileTypeValidation = false;
      const attachment = [...fileList].map(file => Object.assign(file));

      attachment.forEach((item) => {
        if (item.type === "") {
          fileTypeValidation = true;
        }
      });

      if (fileTypeValidation) {
        alert("Folder is not supported.")

      } else {
        const validFile = isValidFileSize(attachment);
        if (validFile.status) {

          attachment.map((item) => Object.defineProperty(item, "type", {
            writable: true,
            value: getTypeOfFile(item.name)
          }));


          attachment.forEach((item, index) => {
            const type = getTypeOfFile(item.name);
            if (type === STRINGS.TYPES.ATTACHMENTS.IMAGE) {
              item.src = URL.createObjectURL(item);
            }
          });

          console.log(attachment, "src add")

          attachment.map((item) => {
            item.isPublic = 1;
            return null;
          });

          attachment.map((item) => Object.defineProperty(item, "name", {
            writable: true,
            value: item.name.split(".")[0]
          }));
          setFileList(attachment);
          setIsOpenComposer(true)
          // dispatch(handleOpenDocComposer(DocsComposerEnums.upload))
          // this.setState({dragOver: false, openDocumentsModal: true, uploadedFiles: attachment})
          console.log([...fileList], this.state.dragOver, "data droped");

        } else {
          alert(validFile.message)
        }
      }
    }
  }
  const onDragStartHandler = (event) => {
  }
  const onDragOverHandler = (event) => {

    event.preventDefault();
  }

  return (
    <div
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}
      onDragStart={onDragStartHandler}
      className="w-full"
    >
      {children}
      <UploadByDrop
        isOpen={isOpenComposer}
        handleClose={() => setIsOpenComposer(false)}
        fileList={FileList}
      />
    </div>
  )
};

export default DropableContainer;
