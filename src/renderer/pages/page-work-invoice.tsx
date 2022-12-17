/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useParams } from 'react-router-dom';
import WorkEdit from '../components/workEdit';

const workInvoice = () => {
  const { id } = useParams();
  // console.log(id);

  return (
    <WorkEdit
      id={id ? +id : 0}
      onSave={() => {}}
      onClose={() => {}}
      onDelete={() => {}}
    />
  );
};

export default workInvoice;
