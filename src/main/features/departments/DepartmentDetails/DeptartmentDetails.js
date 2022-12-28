import React, { useEffect, useState } from 'react';
import { ROUTES } from '../../../../utils/routes';
import { useSelector } from 'react-redux';
import {
  ContBody,
  TabContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import Tab from '../../../sharedComponents/Tab';
import LayoutHeader from '../../../layout/header/index';
import { EditOutlined } from '@ant-design/icons';
import CoverDetail from '../view/CoverDetail';
import CoverImage from '../view/CoverImage';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDepartmentById } from '../store/actions';
import Appraisal from '../appraisal/index';
import { handleParentId } from '../store/slice';
import SubDepartment from './SubDepartment';

function DepartmentDetails() {
  const dispatch = useDispatch();
  let param = useParams();
  const { departmentDetail } = useSelector((state) => state.departmentSlice);
  // const { state } = useLocation();
  // const { data } = state;

  useEffect(() => {
    if (Object.keys(departmentDetail).length > 1) {
      dispatch(handleParentId(departmentDetail.id));
    }
  }, [departmentDetail]);

  const { image, description } = departmentDetail;
  console.log(departmentDetail);
  const panes = [
    {
      featureName: `Sub Departments`,
      content: <SubDepartment />,
      featureId: 0,
    },
    {
      featureName: `Appraisals`,
      content: <Appraisal />,
      featureId: 1,
    },
  ];
  const items = [
    {
      name: 'Department Details',
      to: `${ROUTES.DEPARTMENTS.DEPARTMENT}`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      buttonText: 'Edit Projects',
      icon: <EditOutlined />,
    },
  ];

  useEffect(() => {
    console.log('useEffects works');
    dispatch(getDepartmentById(param.id));
  }, [param.id]);

  return (
    <TabContainer>
      {/* <LayoutHeader items={items} buttons={buttons} /> */}
      <LayoutHeader items={items} />

      <ContBody>
        <div className="flex flex-row gap-5  h-[calc(100vh_-_60px)] w-full">
          <div className="rounded-xl basis-12/12 flex flex-col gap-5 overflow-scroll w-full">
            <CoverImage image={image} />
            <CoverDetail data={departmentDetail} />
            <Tab panes={panes} />
          </div>
        </div>
      </ContBody>
    </TabContainer>
  );
}

export default DepartmentDetails;
