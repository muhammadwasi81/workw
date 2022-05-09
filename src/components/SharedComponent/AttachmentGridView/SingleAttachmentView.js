import React from "react";

const SingleAttachmentView = ({item}) => {
    let type = 1;
    return (
        <div className="SingleAttachmentView" >
            {
                type === 1 ? (
                    <img alt="" src={item} />
                ) : ""
            }
        </div>
    )
}
export default SingleAttachmentView;