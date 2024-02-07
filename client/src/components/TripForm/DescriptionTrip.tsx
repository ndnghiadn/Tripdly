'use client';
import { useTripStore } from '@/lib/zustand';
import { Input, Button, message } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;

const DescriptinTrip = ({ nextStep, preStep }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const setDescriptionStore = useTripStore((state) => state.setDescriptionTrip);// set store

  function handleDescriptionValue() {
    if (!!description) {
      setDescriptionStore(description);
      nextStep();
    } else {
      setError(true);
    }
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError(false);
  };

  return (
    <div style={{ height: "35rem" }}>
      <h1 className="text-3xl font-semibold mb-5">Tell me about your trip</h1>
      <p className="text-sm text-slate-400 mb-6">
        This is the option, the description will make visitors know details of where they go.
      </p>
      <TextArea
        rows={5}
        placeholder="Write your description here"
        value={description}
        onChange={handleDescriptionChange}
        style={{ borderColor: error ? 'red' : null }}
      />
      {error && <p style={{ color: 'red', marginTop: '5px' }}>Description is required.</p>}
      <div className="flex gap-2 mt-6">
        <Button onClick={handleDescriptionValue}>Next</Button>
        <Button onClick={preStep}>Prev</Button>
      </div>
    </div>
  );
};

export default DescriptinTrip;
