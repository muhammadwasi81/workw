import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import {TabbableContainer} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
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