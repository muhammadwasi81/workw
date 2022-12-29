import React, { useContext, useState } from 'react';
import {
  CalendarOutlined,
  InfoCircleOutlined,
  LaptopOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Modal, Popover, Row, Tag } from 'antd';
import { BiWorld } from 'react-icons/bi';
import { FaLock } from 'react-icons/fa';
import WhiteCard from './WhiteCard';
import moment from 'moment';
import { projectsDictionaryList } from '../localization/index';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import './style.css';
import Budget from './Budget';

function CoverDetail({ detail }) {
  console.log(detail, 'detail');
  const [open, setOpen] = useState(false);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { projectsDictionary } = projectsDictionaryList[userLanguage];
  const { labels } = projectsDictionary;

  return (
    <WhiteCard className={'z-10 sticky top-0 w-full mt-[-87px] shadow-md'}>
      <div className="flex w-full justify-between text-base items-center">
        <div className="flex flex-col text-base">
          <span className="text-black text-base font-bold">{detail?.name}</span>
          <span className="text-gray-500 text-sm font-bold flex items-center gap-1">
            {detail?.privacyId === 1 ? (
              <Popover
                content={labels.publicProject}
                className="cursor-pointer"
              >
                <BiWorld />
              </Popover>
            ) : (
              <Popover
                content={labels.privateProject}
                className="cursor-pointer"
              >
                <FaLock />
              </Popover>
            )}

            {detail?.description}
          </span>
        </div>
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
          >
            <h2 className="text-center font-semibold text-lg">Summary</h2>
            <div className="bg-white mt-5 px-3 rounded-lg h-40 min-h-h">
              <Row gutter={[16, 16]}>
                <Col md={12} sm={24} xs={24} className="pt-3">
                  <Row>
                    <Col md={4} sm={24} xs={24} className="ml-5 px-5 pt-5">
                      <Avatar
                        size={{
                          xs: 24,
                          sm: 32,
                          md: 40,
                          lg: 64,
                          xl: 80,
                          xxl: 100,
                        }}
                        icon={<AntDesignOutlined />}
                      />
                    </Col>
                    <Col md={8} sm={24} xs={24} className="pt-5 mt-3">
                      <div className="flex flex-col text-base">
                        <span className="text-black text-base font-bold">
                          John Doe
                        </span>
                      </div>
                      <div className="flex flex-col text-base mt-4">
                        <span className="text-black text-base font-bold">
                          123 Main Street
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <div className="flex flex-col text-base">test user</div>
                </Col>
                <Col md={6} sm={24} xs={24} lg={6} className="pt-5 mt-9">
                  <div className="bg-white my-5 px-3 rounded-lg h-48">
                    <span className="text-black text-base font-bold">
                      123 Main Street
                    </span>
                  </div>
                  <div className="bg-white px-3 rounded-lg expense-chart">
                    <span className="text-black text-base font-bold">
                      123 Main Street
                    </span>
                  </div>
                </Col>
                <Col md={18} xs={24} sm={24} lg={18} className="pt-5 mt-9">
                  <div className="bg-white my-5 px-3 rounded-lg h-96">
                    <div className="flex justify-end pt-2">
                      <Tag color="green">Task</Tag>
                      <Tag color="blue">Schedule</Tag>
                      <Tag color="black">Expense</Tag>
                      <Tag color="warning">Document</Tag>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Modal>
        </div>
        <div>
          <div className="text-black text-base font-bold flex items-center gap-2">
            <Popover content={`Created by: ${detail?.creator?.name}`}>
              <InfoCircleOutlined className="cursor-pointer" />
            </Popover>
            <span>
              {labels.createdBy}: {detail?.creator.name}
            </span>
          </div>
          <div className="font-bold flex items-center gap-2">
            <CalendarOutlined />
            <p className="!mb-0 text-sm">
              {labels.createdAt}:&nbsp;
              {moment(detail?.createDate).format('MMMM D, YYYY')}
            </p>
          </div>
        </div>
      </div>
    </WhiteCard>
  );
}

export default CoverDetail;
