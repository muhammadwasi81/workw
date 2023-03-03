import React from 'react'
import Header from '../../../layout/header'
import { ROUTES } from "../../../../utils/routes";
import { ContBody, TabbableContainer } from '../../../sharedComponents/AppComponents/MainFlexContainer'
import GroupContainer from '../components/groupsConatiner/GroupContainer';
import "../styles/style.css"
import RewardContainer from '../components/rewardsConatiner/GroupContainer';
import UserContainer from '../components/usersContainer';

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
          <div className='mainSearchContainer'>
            <GroupContainer />
            <RewardContainer />
            <UserContainer />
          </div>
        </ContBody>
    </TabbableContainer>
    
  )
}

export default Index