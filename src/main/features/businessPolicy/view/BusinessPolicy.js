import { useEffect, useState } from 'react';
import SideDrawer from '../../../sharedComponents/Drawer/SideDrawer';
import Composer from './BusinessPolicyComposer';
import { Form, Collapse, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import '../style/businessPolicy.css';
import '../style/style.css';
import { getAllBusinessPolicy, removeBusinessPolicy } from '../store/action';
import { AdminContainer } from '../../../../components/HrMenu/Administration/StyledComponents/admin';
import '../style/businessPolicy.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormContainer } from './../../../sharedComponents/StyledComponents/adminForm';
import { FormHeader } from '../../../../components/HrMenu/Administration/StyledComponents/adminForm';
import { handleEdit } from '../store/slice';

const { Panel } = Collapse;

const BusinessPolicy = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [defaultData, setDefaultData] = useState('');
  const [form] = Form.useForm();
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBusinessPolicy());
  }, []);

  const handleCollapse = (key) => {
    console.log(key, 'key');
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeBusinessPolicy(id));
  };

  const handleUpdate = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(handleEdit(item));
  };

  return (
    <>
      <FormContainer>
        <FormHeader>Business Policies</FormHeader>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <div className="flex justify-end py-3 mr-3">
              <SideDrawer
                title={editData ? 'Update Policy' : 'Create Policy'}
                buttonText={'Create Policy'}
                success={success}
                openDrawer={openDrawer || !!editData}
                handleClose={() => dispatch(handleEdit(null))}
                setOpenDrawer={setOpenDrawer}
                setIsEdited={setIsEdited}
                form={form}
                isAccessDrawer={true}
                children={
                  <Composer
                    editData={editData}
                    isDefault={isDefault}
                    isEdited={isEdited}
                    openDrawer={openDrawer}
                    id={id}
                    form={form}
                    defaultData={defaultData}
                  />
                }
              />
            </div>
            {businessPolicies.length > 0 ? (
              <AdminContainer>
                {businessPolicies?.map((item, ind) => {
                  return (
                    <>
                      <Collapse defaultActiveKey={0} onChange={handleCollapse}>
                        <Panel
                          header={item.name}
                          key={ind}
                          extra={[
                            <EditOutlined
                              onClick={(e) => handleUpdate(e, item)}
                            />,
                            <DeleteOutlined
                              onClick={(e) => handleRemove(e, item.id)}
                            />,
                          ]}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          ></div>
                        </Panel>
                      </Collapse>
                    </>
                  );
                })}
              </AdminContainer>
            ) : (
              <div className="flex justify-center">
                <strong>No Policy Found...</strong>
              </div>
            )}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default BusinessPolicy;
