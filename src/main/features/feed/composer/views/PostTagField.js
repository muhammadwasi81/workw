import React from "react";
import {Form} from "antd";
import store from "../../../../../store/store";
import {feedSlice} from "../../store/slice";
import UserSearchable from "../../../../sharedComponents/UserSearchable/UserSearchable";

const PostTagField = () => {
    const options = [
        {
            name: "Lucy",
            jobTitle: "HR Manager",
        },
        {
            name: "Jack",
            jobTitle: "UI/UX Designer",
        },
        {
            name: "John",
            jobTitle: "Group CEO",
        },
    ];
    return (
        <div className="select-users">
            <div className="badge">Write</div>
            <Form.Item name={"tagUsers"} className="c-multi-select">
                <UserSearchable data={options} onChange={(e) => store.dispatch(feedSlice.actions.onPostTagsChange(e))}/>
            </Form.Item>
        </div>
    );
};

export default PostTagField;
