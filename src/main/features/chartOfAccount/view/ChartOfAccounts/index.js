import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { STRINGS } from '../../../utils/base';
import ChartOfAccounts from './ChartOfAccounts';

const Index = () => {
  return (
    <Switch>
        <Route exact path={`${STRINGS.ROUTES.FINANCE.CHART_OF_ACCOUNTS.DEFAULT}`} component= {ChartOfAccounts} />
    </Switch>
  )
}

export default Index;