import React, { useState } from 'react';
import PostFooter from './postFooter';
import PostHeader from './postHeader';
import PostSection from './postSection';
import './post.css';
import thor from "../../../../../content/thor.jpg"

const Index = ({post}) => {


  return (
        <div className="post">
          <PostHeader />
          <PostSection post={post}/>
          <PostFooter />
      
        </div>
    );
};

export default Index;