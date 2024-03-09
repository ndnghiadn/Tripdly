'use client';

import { cloneElement, useState } from "react";
import {Button,Modal, Steps} from 'antd'
import LocationTrip from "./LocationTrip.tsx";
import NameTrip from "./NameTrip.tsx";
import TimeTrip from "./TimeTrip.tsx";
import DescriptinTrip from "./DescriptionTrip.tsx";
import MemberTrip from "./MemberTrip.tsx";

const steps = [
    {
        title: "Name trip",
        component: <NameTrip nextStep={()=>{}} preStep={()=>{}}/>,
    },
    {
      title: "Description trip",
      component: <DescriptinTrip nextStep={()=>{}} preStep={()=>{}}/>,
    },
    {
        title: "Time trip",
        component: <TimeTrip nextStep={()=>{}} preStep={()=>{}}/>,
    },
    {
    title: "Location trip",
    component: <LocationTrip nextStep={()=>{}} preStep={()=>{}}/>
    },
    {
      title: "Member trip",
      component: <MemberTrip preStep={()=>{}}closeModal={()=>{}}/>
    }
];

const MultiStepCreateTrip= () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Button onClick={showModal}>
        Create your own trip
      </Button>
      <Modal footer={null} title="Basic Modal" width={900} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='flex gap-7'>

          <Steps current={current} items={items} direction="vertical" className='grow-0 shrink basis-[10rem]'/>
          <div className='flex-1'>
            { current < steps.length - 1 && cloneElement(steps[current]["component"], { nextStep: next, preStep: prev })}
            { current === steps.length - 1 && cloneElement(steps[current]["component"], { preStep: prev, closeModal: handleCancel })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MultiStepCreateTrip;