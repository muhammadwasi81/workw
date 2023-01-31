import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import {TabbableContainer,ContBody} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Table from './table';

function Signup() {
  return (
    <TabbableContainer> 
      <Header/>
        <ContBody>
          <Table/>
        </ContBody>
       
    </TabbableContainer>
  )
}

export default Signup