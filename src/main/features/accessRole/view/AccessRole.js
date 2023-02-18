import { useContext, useEffect, useState } from 'react';
import Card from '../../../sharedComponents/Card/AccessRoleCard';
import SideDrawer from '../../../sharedComponents/Drawer/SideDrawer';
import AccessRoleComposer from './AccessRoleComposer';
import { Skeleton, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBussinessFeatures,
  getAllUserTypes,
} from '../../../../utils/Shared/store/actions';
import '../style/accessrole.css';
import {
  addAccessRole,
  getAccessRoleById,
  getAllAccessRoles,
  updateAccessRoleById,
} from '../store/action';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';
import { AdminTable } from '../../../../components/HrMenu/Administration/StyledComponents/adminTable';
import { tableColumns } from './tableColumns';
import { AdminContainer } from '../../../../components/HrMenu/Administration/StyledComponents/admin';

const initialFormData = {
  name: '',
  description: '',
  features: [],
};

function AccessRole() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, Direction, sharedLabels } = dictionaryList[
    userLanguage
  ];
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isEdited, setIsEdited] = useState(false);
  const [defaultData, setDefaultData] = useState();
  const [form] = Form.useForm();
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const {
    loader: loading,
    success,
    accessRoles,
    singleAccessRole,
  } = useSelector((state) => state.accessRolesSlice);

  useEffect(() => {
    dispatch(getAllBussinessFeatures());
    dispatch(getAllAccessRoles());
    dispatch(getAllUserTypes());
  }, [dispatch]);

  const handleSubmit = (finalData) => {
    if (isEdited) {
      dispatch(updateAccessRoleById(finalData));
      form.resetFields();
    } else {
      dispatch(addAccessRole(finalData));
      form.resetFields();
    }
  };

  useEffect(() => {
    if (
      singleAccessRole &&
      singleAccessRole.features &&
      singleAccessRole.features.length > 0
    ) {
      let defaultData = formData;
      defaultData.features = singleAccessRole.features;
      let features = JSON.stringify(defaultData.features);
      features = JSON.parse(features);
      features &&
        features.forEach((data) => {
          if (data.name) {
            delete data.name;
          }
        });
      features.sort((a, b) => {
        return a.id - b.id;
      });
      defaultData.features = features;
      setDefaultData(defaultData);
    }
  }, [singleAccessRole, formData]);

  const handleEdit = (data) => {
    console.log('data', data);
    setId(data.id);
    form.resetFields();
    setIsDefault(data.isDefault);
    setFormData((prevData) => ({
      ...prevData,
      // id: data.id,
      name: data.name,
      roleTypeId: data.roleTypeId,
      description: data.description,
    }));
    dispatch(getAccessRoleById(data.id));
    setOpenDrawer(true);
    setIsEdited(true);
  };

  console.log(defaultData, 'defaultData');
  useEffect(() => {
    if (!openDrawer) {
      setIsEdited(false);
      setIsDefault(false);
      setFormData(initialFormData);
      form.resetFields();
    }
    if (defaultData) {
      form.setFieldsValue(defaultData);
    }
  }, [openDrawer, form, defaultData, initialFormData]);

  return (
    <AdminContainer>
      <div className="access_role_container w-full">
        <Card>
          <div className="w-full">
            <div
              className={`flex ${
                Direction === 'rtl' ? 'justify-start' : 'justify-end'
              }`}
            >
              <SideDrawer
                title={administration.accessRole.Drawer.CreateAccessRole}
                buttonText={administration.accessRole.Button.AddAccessRole}
                success={success}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                setIsEdited={setIsEdited}
                form={form}
                isAccessDrawer={true}
                children={
                  <AccessRoleComposer
                    isDefault={isDefault}
                    onSubmitData={handleSubmit}
                    formData={formData}
                    isEdited={isEdited}
                    openDrawer={openDrawer}
                    id={id}
                    form={form}
                    defaultData={defaultData}
                  />
                }
              />
            </div>
          </div>

          <AdminTable
            bordered
            columns={tableColumns(
              handleEdit,
              // id,
              // accessRoles,
              Direction,
              sharedLabels
            )}
            dataSource={accessRoles}
            pagination={false}
            direction={Direction}
            rowKey="id"
            size="small"
            scroll={{ x: 500 }}
            locale={
              loading && {
                emptyText: (
                  <Skeleton.Input
                    active="true"
                    size="small"
                    block={true}
                    loading={loading}
                    round="true"
                    shape="circle"
                    style={{ width: '100%', marginBottom: 2 }}
                  />
                ),
              }
            }
          />
        </Card>
      </div>
    </AdminContainer>
  );
}

export default AccessRole;
