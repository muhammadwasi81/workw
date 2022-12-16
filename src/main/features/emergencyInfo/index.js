import React from 'react';
import { useParams } from 'react-router-dom';
import EmergencyForm from '../employee/view/emergencyForm';

function Index() {
  const { id } = useParams();
  return <EmergencyForm userId={id} mode="edit" />;
}

export default Index;
