import React, { useContext, useEffect, useState } from 'react';
import TopBar from '../../../../sharedComponents/topBar/topBar';
import Header from "../../../../layout/header";
import {
    ContBody,
    TabbableContainer,
  } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Table from './table';

function Signup() {
  return (
    <TabbableContainer>
        
        <div style={{ flexDirection: 'column', width: '100%' }}>
            <Header/>
            <Table/>
        </div>
        
    </TabbableContainer>
  )
}

export default Signup