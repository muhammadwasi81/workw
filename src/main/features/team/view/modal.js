import React,{useState} from 'react'
import { Button, Modal } from 'antd';

export default function ModalComponent(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false)
      };
  return (
    <div>
    <Modal 
      showModal={props}
      //open={props.showModal} 
      title={null}
      onCancel={handleCancel}   
      footer={null}
      className="close-modal"
      
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>


    </div>
  )
}
