'use client';

import { FC, cloneElement, useState } from "react";
import {Button,Modal, Steps} from 'antd'
import LocationTrip from "./LocationTrip";
import NameTrip from "./NameTrip";
import TimeTrip from "./TimeTrip";
import DescriptionTrip from "./DescriptionTrip";
import MemberTrip from "./MemberTrip";

const steps = [
    {
        title: "Name trip",
        component: <NameTrip handleNextStep={()=>{}} handlePreStep={()=>{}}/>,
    },
    {
      title: "Description trip",
      component: <DescriptionTrip handleNextStep={()=>{}} handlePreStep={()=>{}}/>,
    },
    {
        title: "Time trip",
        component: <TimeTrip handleNextStep={()=>{}} handlePreStep={()=>{}}/>,
    },
    {
    title: "Location trip",
    component: <LocationTrip handleNextStep={()=>{}} handlePreStep={()=>{}}/>
    },
    {
      title: "Member trip",
      component: <MemberTrip handlePreStep={()=>{}} handleCloseModal={()=>{}}/>
    }
];
type TProps = {
  handleFinish: () => void
}

const MultiStepCreateTrip:FC<TProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrent(0)
    
  };
  const handlesSaveTrip = () => {
    setIsModalOpen(false);
    props.handleFinish()
    setCurrent(0)
  };

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
            { current < steps.length - 1 && cloneElement(steps[current]["component"], { handleNextStep: next, handlePreStep: prev })}
            { current === steps.length - 1 && cloneElement(steps[current]["component"], { handlePreStep: prev, handleCloseModal: handlesSaveTrip })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MultiStepCreateTrip;