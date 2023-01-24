import { useState } from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import Chart from './chart/DouhgnatChart';
import ProjectSummaryTable from './view/table';
import {
  approvalData,
  approvalOptions,
  expenseData,
  expenseOptions,
} from './utils';
import BarChart from './chart/BarChart';
import moment from 'moment';
import Budget from './view/Budget';

const ProjectSummary = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LaptopOutlined onClick={() => setOpen(true)} />
      <div className="modalWrapper">
        <Modal
          open={open}
          centered
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1300}
          className="modalStyle"
          bodyStyle={{
            height: 'calc(100vh - 120px)',
            overflow: 'auto',
            minHeight: '200px',
          }}
          footer={null}
        >
          <Row gutter={[16, 16]} className="cursor-pointer">
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="mt-4"
            >
              <div className="shadow hover:shadow-lg hover:transition-all rounded-md py-2 px-5 h-52">
                <div className="flex flex-wrap">
                  <h3 className="font-semibold text-lg">Members</h3>
                  <div className="ml-auto font-semibold text-lg">18</div>
                </div>
                <div className="internalMembers flex justify-start gap-5 mt-5">
                  <div>
                    <h5 className="font-semibold text-gray-500">
                      Internal Members
                    </h5>
                    <h5 className="font-semibold text">09</h5>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-500">
                      External Members
                    </h5>
                    <h5 className="font-semibold text">09</h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="mt-4"
            >
              <div className="shadow hover:shadow-lg hover:transition-all rounded-md py-2 px-5 h-52">
                <Budget />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className="shadow hover:shadow-lg hover:transition-all rounded-md py-2 px-5 h-52">
                <div className="flex flex-wrap">
                  <h3 className="font-semibold text-lg">Approvals</h3>
                  <div className="ml-auto">
                    <span className="font-extrabold text-lg">80</span>
                  </div>
                </div>
                <div>
                  <Chart data={expenseData} options={expenseOptions} />
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className="shadow hover:shadow-lg hover:transition-all rounded-md py-2 px-5 h-52">
                <div className="flex justify-start flex-wrap gap-4">
                  <h3 className="font-semibold text-lg">Total Expense</h3>
                  <span className="font-semibold text-lg">80</span>
                  <div className="flex gap-4 ml-auto">
                    <h3 className="font-semibold text-lg">
                      Total Expense Amount
                    </h3>
                    <span className="font-extrabold text-lg">$800</span>
                  </div>
                </div>
                <div>
                  <ProjectSummaryTable />
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className="shadow hover:shadow-lg hover:transition-all rounded-md py-2 px-5 h-52">
                <div className="flex flex-wrap">
                  <h3 className="font-semibold text-lg">Total Post</h3>
                  <div className="ml-auto">
                    <span className="font-extrabold text-lg">85</span>
                  </div>
                </div>
                <div style={{ marginRight: '23px' }}>
                  <Chart data={approvalData} options={approvalOptions} />
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <div className="shadow hover:shadow-lg hover:transition-all rounded-md py-2 px-5 h-52">
                <div className="flex flex-wrap">
                  <h3 className="font-semibold text-lg">Total Meeting</h3>
                  <div className="ml-auto">
                    <span className="font-extrabold text-lg">43</span>
                  </div>
                </div>
                <div>
                  <BarChart />
                </div>
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    </>
  );
};

export default ProjectSummary;
