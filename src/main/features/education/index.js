import React from 'react';
import { useParams } from 'react-router-dom';
import EducationForm from '../employee/view/educationForm';

function Index() {
  const { id } = useParams();
  console.log('id', id);
  return <EducationForm mode={'edit'} id={id} />;
}

export default Index;
