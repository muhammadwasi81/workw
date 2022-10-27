import React, { useEffect, useState } from 'react';
import DashboardContainer from './DashboardContainer';
import Spinner from '../../../../../../sharedComponents/spinner/spinner';
import FlexRow from './FlexRow';
import FlexContainer from './FlexContainer';
import UsersBoard from './UsersBoard';
import './style.css'
import PostsBoard from './PostsBoard';
import MixBoard from './MixBoard';
import DocBoard from './DocBoard';
import ExpenseBoard from './expenseBoard';

const OverAllDashboard = ({ data = true }) => {
    if (!data) return <Spinner />
    return (
        <DashboardContainer>
            <FlexContainer flex="3">
                <FlexRow>
                    <UsersBoard item={{}} />
                    <PostsBoard item={{}} />
                </FlexRow>
                <FlexRow>
                    <ExpenseBoard item={{}} />
                    <DocBoard item={{}} />
                </FlexRow>
            </FlexContainer>
            <FlexContainer flex="1">
                <MixBoard item={data} />
            </FlexContainer>
        </DashboardContainer>
    )
}
export default OverAllDashboard;