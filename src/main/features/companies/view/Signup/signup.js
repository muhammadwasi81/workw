import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import {TabbableContainer,ContBody} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Table from './table';
import TopBar from '../../../../sharedComponents/topBar/topBar';
import { CardWrapper } from '../../../../sharedComponents/Card/CardStyle';
import ListItem from './ListItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllSignupAction } from '../../companies/store/action';

function Signup() {
  const dispatch = useDispatch()
  const { signup } = useSelector((state) => state.companySlice)

  useEffect(() => {
    dispatch(getAllSignupAction())
  }, [])

  return (
    <TabbableContainer>       
      <Header/>
        <ContBody>
          <div style={{ flexDirection: "column", width: "100%" }}>
            <TopBar style={{ margin: 0, width: "100%" }}/>

            <CardWrapper>
              {signup.map((item, index) => {
                  return (
                    <>
                      <ListItem
                        item={item}
                        id={item.id}
                        key={index}
                        // onClick={() => setDetailId(item.id)}
                      />
                    </>
                  );
                })}
            </CardWrapper>

          </div>
        </ContBody>
       
    </TabbableContainer>
  )
}

export default Signup