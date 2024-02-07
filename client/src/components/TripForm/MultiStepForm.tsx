'use client';

import { cloneElement, useState } from "react";
import {Button,Modal, Steps} from 'antd'
import LocationTrip from "./LocationTrip.tsx";
import NameTrip from "./NameTrip";
import TimeTrip from "./TimeTrip";
import DescriptinTrip from "./DescriptionTrip";
import MemberTrip from "./MemberTrip";

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
      component: <MemberTrip preStep={()=>{}}/>
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
            { current === steps.length - 1 && cloneElement(steps[current]["component"], { preStep: prev })}

            {/* <div
              style={{
                marginTop: 24,
              }}
            >
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}
            </div> */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MultiStepCreateTrip;