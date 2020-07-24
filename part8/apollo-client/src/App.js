import React from 'react';
import { useQuery } from '@apollo/client';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import { ALL_PERSONS } from './utils/querys';


const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Persons persons =  {result.data.allPersons} />
      <PersonForm />
      <PhoneForm />
    </div>
  );
}

export default App;
