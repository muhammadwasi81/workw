import React from 'react';
import PostComposer from './PostComposer/index';
import PostItem from './Post/Index';
import './style.css';
import thor from "../../../../content/thor.jpg"

import ballon from "../../../../content/ballon.png"


const Index = () => {
    return (
        <div className="newsFeed">
            <PostComposer />
            <div className="newsList ">
                {
                    [1,2,3,1,1,1,1,1,1,1,1].map((item)=>{
                        return(
                            <PostItem  post={{
                                image:[thor,ballon],
                              }} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Index;