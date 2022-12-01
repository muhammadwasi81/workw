import { Modal, Form, Button } from 'antd';
import React from 'react'
import TextInput from '../Input/TextInput';
import "./style.css"

function ConfirmationRemarkModal({isOpen, onCancel, onFinish}) {
    const [form] = Form.useForm();

  return (
    <div className=''>
        <Modal className='confirmationRemarksModal' visible={isOpen} onCancel={onCancel}  closeIcon={<div />} footer={null} destroyOnClose={true} >
        <Form
          form={form}
          name="addRemarks"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
            <Form.Item
                name="remarks"
                label="Write your remarks"
                labelPosition="top"
                rules={[
                  {
                    required: true,
                    message: "Please give your remarks",
                  },
                ]}
                >
                <TextInput placeholder="Enter remarks here" />
            </Form.Item>
            <div className='buttons'>
            <Form.Item>
              <Button
                type="primary"
                size="medium"
                className="ThemeBtn"
                block
                title="Cancel"
                onClick={onCancel}
              >
                {" "}
                {"Cancel"}{" "}
              </Button>
              </Form.Item>
              <Form.Item>
              <Button
                type="primary"
                size="medium"
                className="ThemeBtn"
                block
                htmlType="submit"
                title="Confirm"
              >
                {" "}
                {"Confirm"}{" "}
              </Button>
          </Form.Item>
            </div>
      </Form>
        </Modal>
  </div>
  )
}

export default ConfirmationRemarkModal