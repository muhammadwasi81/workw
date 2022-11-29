import { useState } from 'react';
import { AdminContainer } from './../../sharedComponents/StyledComponents/admin';
import { FormContainer } from './../../sharedComponents/StyledComponents/adminForm';
import { Collapse, Modal } from 'antd';
import { FormHeader } from '../../../components/HrMenu/Administration/StyledComponents/adminForm';
import { Button } from 'antd';
import './styles.css';

const { Panel } = Collapse;

const defaultApprovers = [
  { label: 'Expense', _id: 1 },
  { label: 'Expense Finance', _id: 2 },
  { label: 'Travel', _id: 3 },
  { label: 'Travel Agent', _id: 4 },
  { label: 'Leave', _id: 5 },
  { label: 'Asset Allocation', _id: 6 },
  { label: 'Salary', _id: 7 },
  { label: 'Payroll', _id: 8 },
  { label: 'Reward', _id: 9 },
  { label: 'Resignation HR', _id: 10 },
  { label: 'Resignation Admin', _id: 11 },
  { label: 'Resignation IT', _id: 12 },
  { label: 'Resignation Finance', _id: 13 },
  { label: 'Resignation Exit', _id: 14 },
  { label: 'Requistion', _id: 15 },
];
const DefaultApprovers = () => {
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

  const handleCollapse = (key) => {
    console.log(key, 'key');
  };
  return (
    <FormContainer>
      <FormHeader>Default Approvers</FormHeader>
      {defaultApprovers.length > 0 ? (
        <AdminContainer>
          {defaultApprovers?.map((item, ind) => {
            return (
              <>
                <div className="collapseWrapper">
                  <Collapse defaultActiveKey={0} onChange={handleCollapse}>
                    <Panel
                      header={item.label}
                      key={ind}
                      extra={[
                        <Button type="primary" onClick={showModal}>
                          Open Modal
                        </Button>,
                      ]}
                    >
                      <div>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Officiis corrupti, a eius exercitationem maiores
                        velit quaerat. Provident reiciendis officia natus error
                        quis, dolores aspernatur nostrum praesentium
                        repellendus, beatae ipsam voluptatem!
                      </div>
                      <Modal
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <div className="flex justify-between space-y-5">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam laboriosam inventore nulla rerum! Eius
                            dolores, voluptas qui officia quo, maxime
                            perferendis ullam necessitatibus deleniti similique
                            voluptates voluptate accusantium cupiditate sequi!
                          </p>
                        </div>
                      </Modal>
                    </Panel>
                  </Collapse>
                </div>
              </>
            );
          })}
        </AdminContainer>
      ) : (
        <div>No result Found</div>
      )}
    </FormContainer>
  );
};

export default DefaultApprovers;
