import React from 'react'
import Header from '../../../layout/header'
import { ROUTES } from "../../../../utils/routes";
import { ContBody, TabbableContainer } from '../../../sharedComponents/AppComponents/MainFlexContainer'
import GroupContainer from '../components/groupsConatiner/GroupContainer';
import "../styles/style.css"

function Index() {

  const items = [
    {
      name: "Search",
      to: `${ROUTES.SEARCH.DEFAULT}`,
      renderButton: [1],
    },
  ];

  return (
    <TabbableContainer>
      <Header
          items={items}
        />
        <ContBody>
          <div className='SearchMainContainer'>
            <GroupContainer />
          </div>
        </ContBody>
    </TabbableContainer>
    
  )
}

export default Index