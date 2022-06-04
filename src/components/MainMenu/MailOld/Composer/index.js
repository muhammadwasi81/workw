import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import "quill/dist/quill.snow.css";
import ComposeMailBox from "./ComposeMailBox";
import {handleMailMinimize, handleMailComposerIsMax} from "../Store/MailSlice";


const Index = () => {
    const {mailComposerInstances} = useSelector(state => state.mailSlice);
    const dispatch = useDispatch();

    const handleMaxToMin = (status, id) => {
        dispatch(handleMailComposerIsMax({status, id}));
    }
    const handleMinimize = (status, id) => {
        dispatch(handleMailMinimize({status, id}));
    }

    return (
        <React.Fragment>
            {
                /*** multiple mail composer instances ***/

                mailComposerInstances.length !== 0 &&
                <div className="mail-composer-box-con">
                    {mailComposerInstances.map((item, ind) => <ComposeMailBox
                        handleMaxToMin={handleMaxToMin}
                        handleMinimize={handleMinimize}
                        instance={item}
                        i={ind}
                    />)}
                </div>

            }
        </React.Fragment>
    )
};

export default Index;