import { useState } from 'react';
import { Button, Col, Modal, Row, Tag } from 'antd';
import React from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';
import { BiLaptop } from 'react-icons/bi';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { IoEarth } from 'react-icons/io5';
import { InfoCircleOutlined, LaptopOutlined } from '@ant-design/icons';

const ProjectSummary = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="ml-auto pr-3">
        <Button type="primary" onClick={() => setOpen(true)}>
          <LaptopOutlined />
        </Button>
      </div>
      <div className="modalWrapper">
        <Modal
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1300}
          className="modalStyle"
          bodyStyle={{
            height: 'calc(100vh - 150px)',
            overflow: 'auto',
            minHeight: '500px',
          }}
          footer={null}
        >
          <h2 className="text-center font-semibold text-lg">Summary</h2>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <div className="mainWrapper rounded-lgh-64 py-4">
                <div className="flex justify-between px-5">
                  <img
                    src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="global"
                    loading="lazy"
                    className="object-cover h-48 w-96 rounded-lg"
                  />
                  <div className="px-5">
                    <div className="flex flex-no-wrap justify-between">
                      <div className="text-lg font-bold">Konnect V4</div>
                      <div className="mt-1 ml-2">
                        <IoEarth className="cursor-pointer text-lg" />
                      </div>
                      <div className="justify-end ml-auto">
                        <InfoCircleOutlined className="cursor-pointer text-lg" />
                      </div>
                    </div>
                    <div className=" text-gray-500 font-semibold">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatibus ab assumenda, odit corporis quidem repellat
                      harum exercitationem laborum eveniet deserunt quibusdam
                      autem eos soluta sit cumque placeat at iure vitae.
                    </div>
                    <div className="iconsChild flex gap-3">
                      <Button className="barIcon">
                        <AiOutlineBarChart />
                      </Button>
                      <Button className="barIcon">
                        <BiLaptop />
                      </Button>
                      <button className="barIcon font-bold py-2 px-4 rounded inline-flex items-center">
                        <HiOutlineUserAdd className="text-base" />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} sm={24} md={24}>
              <div className="mainWrapper flex flex-wrap py-2 px-2">
                <div className="text-base p-5 bg-neutral-100 flex w-full rounded-lg">
                  <span className="text-primary-color text-base font-semibold">
                    Total Budget
                  </span>
                  <span className="text-black font-semibold ml-auto">500$</span>
                </div>
                <div className="text-base p-5 bg-neutral-100 flex justify-around w-full my-2 rounded-lg font-bold">
                  <div className="flex flex-col gap-3 text-center">
                    <span className="text-red-600">100$</span>
                    <span className="text-gray-500 font-semibold">Spent</span>
                  </div>
                  <div className="border-r-2 border-gray-500" />
                  <div className="flex flex-col gap-3 text-center">
                    <span className="text-green-500">400$</span>
                    <span className="text-gray-500 font-semibold">Balance</span>
                  </div>
                </div>
                <div className="text-base p-5 bg-neutral-100 flex justify-around w-full rounded-lg font-bold">
                  <div className="flex flex-col gap-3 text-center">
                    <span className="text-red-600">100$</span>
                    <span className="text-gray-500 font-semibold">Spent</span>
                  </div>
                  <div className="border-r-2 border-gray-500" />
                  <div className="flex flex-col gap-3 text-center">
                    <span className="text-green-500">400$</span>
                    <span className="text-gray-500 font-semibold">Balance</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="summaryWrapper flex flex-wrap py-2 px-2">
                <div className="summaryChild text-base p-5 bg-neutral-100 flex w-full rounded-lg">
                  <span className="text-primary-color text-base font-semibold">
                    Total Budget
                  </span>
                </div>
              </div>
              <div className="summaryWrapper flex flex-wrap py-2 px-2">
                <div className="summaryChild text-base p-5 bg-neutral-100 flex w-full rounded-lg">
                  <span className="text-primary-color text-base font-semibold">
                    Total Budget
                  </span>
                </div>
              </div>
            </Col>
            <Col lg={18}>
              <div className="tagsWrapper flex flex-wrap">
                <div className="summaryChild text-base p-5 bg-neutral-100 w-full rounded-lg">
                  <div className="flex justify-end">
                    <Tag color="green">Task</Tag>
                    <Tag color="blue">Schedule</Tag>
                    <Tag color="black">Expense</Tag>
                    <Tag color="warning">Document</Tag>
                  </div>
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
