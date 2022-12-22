import React from 'react';
import { useStepsForm } from 'sunflower-antd';
import { Steps, Input, Button, Form, Result } from 'antd';
import TextInput from '../../../sharedComponents/Input/TextInput';

const { Step } = Steps;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const StepperFOrm = (props) => {
  const {
    form,
    current,
    gotoStep,
    stepsProps,
    formProps,
    submit,
    formLoading,
  } = useStepsForm({
    async submit(values) {
        console.log(values, "Final VALUES");
      const { username, email, address } = values;
      console.log(username, email, address);
      await new Promise(r => setTimeout(r, 1000));
      return 'ok';
    },
    total: 3,
  });

  const formList = [
    <>
      <Form.Item
        label="username"
        name="username"
        labelPosition="top"
        rules={[
          {
            required: true,
            message: 'Please input username',
          },
        ]}
      >
        <TextInput placeholder="Username" />
      </Form.Item>
      <Form.Item
          label={"Reason"}
          name="reason"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: "Dummy",
            },
          ]}
        >
          <TextInput placeholder={"asdsd"} />
        </Form.Item>
      <Form.Item {...tailLayout}>
        <Button onClick={() => gotoStep(current + 1)}>Next</Button>
      </Form.Item>
    </>,

    <>
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input address',
          },
        ]}
      >
        <Input placeholder="Address" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          loading={formLoading}
          onClick={() => {
            submit().then(result => {
              if (result === 'ok') {
                gotoStep(current + 1);
              }
            });
          }}
        >
          Submit
        </Button>
        <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
      </Form.Item>
    </>,
  ];

  return (
    <div>
      <Steps {...stepsProps}>
        <Step title="Basic Course Details" />
        <Step title="Add Course" />
        <Step title="Submit" />
      </Steps>

      <div style={{ marginTop: 60 }}>
        <Form 
            labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
            {...formProps} style={{ maxWidth: 600 }}
        >
          {formList[current]}
        </Form>

        {current === 2 && (
          <Result
            status="success"
            title="Submit is succeed!"
            extra={
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    form.resetFields();
                    gotoStep(0);
                  }}
                >
                  Buy it again
                </Button>
                <Button>Check detail</Button>
              </>
            }
          />
        )}
      </div>
    </div>
  );
};