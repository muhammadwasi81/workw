import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DocsComposerEnums } from "../../constant";
import { handleCloseDocComposer } from "../../store/slice";
import CreateFolder from "./folder";
import MileBoard from "./mileBoard";
import MileGrid from "./mileGrid";
import MilePad from "./milePad";
import Mileshow from "./mileshow";
import UploadDocuments from "./uploadDocuments";

const DocumentComposers = () => {
    const dispatch = useDispatch();
    const composerState = useSelector(state => state.documentSlice.isOpenComposers);
    let { folder, mileboard, milegrid, milepad, mileshow, upload } = composerState;
    const handleCloseComposer = (key) => {
        dispatch(handleCloseDocComposer(key))
    }
    return (
        <>
            <MileBoard
                isOpen={mileboard}
                handleClose={() => handleCloseComposer(DocsComposerEnums.mileboard)}
            />
            <MilePad
                isOpen={milepad}
                handleClose={() => handleCloseComposer(DocsComposerEnums.milepad)}
            />
            <MileGrid
                isOpen={milegrid}
                handleClose={() => handleCloseComposer(DocsComposerEnums.milegrid)}
            />
            <Mileshow
                isOpen={mileshow}
                handleClose={() => handleCloseComposer(DocsComposerEnums.mileshow)}
            />
            <UploadDocuments
                isOpen={upload}
                handleClose={() => handleCloseComposer(DocsComposerEnums.upload)}
            />
            <CreateFolder
                isOpen={folder}
                handleClose={() => handleCloseComposer(DocsComposerEnums.folder)}
            />

        </>
    );
};

export default DocumentComposers;