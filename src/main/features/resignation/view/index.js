import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrokenPage } from '../../../../utils/base';
import { ROUTES } from '../../../../utils/routes';
import IndividualDetail from './IndividualDetail';

import Resignation from './resignations';
const Index = () => {
  return (
    <Routes>
      <Route exact path={'/'} element={<Resignation />} />
      <Route
        exact
        path={`${ROUTES.RESIGNATION.DETAIL}/:id`}
        element={<IndividualDetail />}
      />
      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
