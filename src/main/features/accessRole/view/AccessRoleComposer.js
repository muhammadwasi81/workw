import { Button, Form, Input, Tree, Skeleton, message } from "antd";
import { useContext, useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { FormTextArea } from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import { getAllBussinessFeatures } from "../../../../utils/Shared/store/actions";
import Select from "../../../sharedComponents/Select/Select";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import * as S from "../../employee/Styles/employee.style";
import { FormLabel } from "./FormLabel";
import {
  userTypeEnum,
  userTypeList,
} from "../../../../utils/Shared/enums/enums";
import { STRINGS } from "../../../../utils/base";

const initialTreeData = [
  {
    title: "Access Controls",
    key: "Access Controls",
    children: [{ title: "", key: "", children: [] }],
  },
];

function AccessRoleComposer(props) {
  const [expandedKeys, setExpandedKeys] = useState(["Access Controls"]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const { bussinessFeatures } = useSelector((state) => state.sharedSlice);
  const [featuresTreeData, setFeaturesTreeData] = useState(initialTreeData);
  const [loadingTreeData, setLoadingTreeData] = useState(false);
  const [showChecked, setShowChecked] = useState(false);
  const [form] = Form.useForm();
  const [formDataObject, setFormDataObject] = useState({
    name: "",
    description: "",
    roleTypeId: null,
  });
  const [isObjEqual, setIsObjEqual] = useState(false);
  const {
    loader: loading,
    createLoader,
    success,
    singleAccessRole,
    isSingleAccessRoleLoaded,
  } = useSelector((state) => state.accessRolesSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];

  // console.log(selectedKeys, 'featuresTreeData');
  // console.log(featuresTreeData, 'featuresTreeData');
  // console.log(checkedKeys, 'featuresTreeData');

  useEffect(() => {
    getAllBussinessFeatures();
  }, []);

  useEffect(() => {
    setLoadingTreeData(true);

    if (bussinessFeatures && bussinessFeatures.length > 0) {
      let expandedKeysArray = [];
      bussinessFeatures &&
        bussinessFeatures.length > 0 &&
        bussinessFeatures.forEach((element) => {
          expandedKeysArray.push(element.name);
        });
      setExpandedKeys((expandedKeys) => [
        ...expandedKeys,
        ...expandedKeysArray,
      ]);
      // console.log(bussinessFeatures, 'bussinessFeatures');
      const transformObject =
        bussinessFeatures &&
        bussinessFeatures.length > 0 &&
        bussinessFeatures.map((feature) => ({
          key: JSON.stringify({
            name: feature.name,
            permissionId: feature.id,
            permissions: feature.permissions,
          }),
          title: feature.name,
          permissionId: feature.featureId,
          children: [],
        }));
      let transformedChildren;

      for (let i = 0; i < bussinessFeatures.length; i++) {
        transformedChildren =
          bussinessFeatures &&
          bussinessFeatures[i] &&
          bussinessFeatures[i].permissions.map((permission) => ({
            key:
              JSON.stringify(permission) + "_" + bussinessFeatures[i].featureId,
            permissionId: permission.id,
            value: permission.featurePermissionId,
            title: permission.name,
            parentId: bussinessFeatures[i].featureId,
          }));
        transformObject[i].children = transformedChildren;
      }
      let newFeatures = [...featuresTreeData];
      newFeatures[0].children = transformObject;
      setFeaturesTreeData(newFeatures);
      setLoadingTreeData(false);
    }
  }, [bussinessFeatures]);

  useEffect(() => {
    if (singleAccessRole && singleAccessRole?.features?.length > 0) {
      // console.log(singleAccessRole, 'singleAccessRole');
      setFormDataObject((prevObj) => ({
        ...prevObj,
        name: props.formData.name,
        description: props.formData.description,
        roleTypeId: props.formData.roleTypeId,
        features: props.formData.features,
        permissions: props.formData.permissions,
      }));

      let checkedData = [];
      for (let i = 0; i < singleAccessRole.features.length; i++) {
        if (singleAccessRole.features[i].permissions.length > 0) {
          singleAccessRole.features[i].permissions.map((role) => {
            let obj = {
              id: role.permissionId,
              featureId: singleAccessRole.features[i].featureId,
              name: role.permission,
            };
            checkedData.push(
              JSON.stringify(obj) + "_" + singleAccessRole.features[i].featureId
            );
          });
        } else {
          let singleAccessRoleObj = {
            id: "",
            name: "",
            features: [],
            permissions: [],
          };
          singleAccessRoleObj.name = singleAccessRole.features[i].name;
          singleAccessRoleObj.id = singleAccessRole.features[i].id;
          singleAccessRoleObj.features = singleAccessRole.features[i].features;
          checkedData.push(JSON.stringify(singleAccessRoleObj));
        }
      }
      // console.log(checkedData, 'checkedDatacheckedData');
      setCheckedKeys((prevCheckedKeys) => [...prevCheckedKeys, ...checkedData]);
      // "{\"id\":20,\"featureId\":11,\"name\":\"View Travel\"}_11"

      // accessRoleFeatureId: "5524ddd0-d57f-487f-b8d6-774d3514dee8"
      // id: "152a577e-eaa0-402f-b736-6550ed8926e2"
      // permission: "View Feed"
      // permissionId: 1
    }
  }, [singleAccessRole]);

  useEffect(() => {
    if (success) {
      setCheckedKeys([]);
      setSelectedKeys([]);
      props.form.resetFields();
    }
  }, [success]);

  const onExpand = (expandedKeysValue) => {
    // console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeysValue) => {
    // console.log('featuresTreeData', selectedKeysValue);
    setSelectedKeys(selectedKeysValue);
  };

  const onCheck = (checkedKeysValue) => {
    // console.log('featuresTreeData onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    setShowChecked(true);
  };

  const handleTreeForm = (values) => {
    // console.log(handleTreeForm, 'handleTreeForm');
    let finalData = {
      name: values.name,
      description: values.description,
      roleTypeId: values.roleTypeId,
      features: [],
    };
    // console.log(finalData, 'finalData in handleTreeForm');
    for (let i = 0; i < checkedKeys.length; i++) {
      let id = checkedKeys[i].split("_")[1];
      let data = checkedKeys[i].split("_")[0];
      if (id) {
        if (
          finalData.features.length > 0 &&
          finalData.features.some(
            (feature) => Number(feature.id) === Number(id)
          )
        ) {
          finalData.features.forEach((element, index) => {
            if (Number(element.id) === Number(id)) {
              element.permissions.push(JSON.parse(data));
            }
          });
        } else {
          finalData.features.push({
            featureId: Number(id),
            name: JSON.parse(data).name,
            permissions: [JSON.parse(data)].map((permission) => ({
              ...permission,
              permissionId: permission.id,
              id: STRINGS.DEFAULTS.guid,
            })),
          });
        }
      } else {
        if (data !== "Access Controls") {
          const tempData = JSON.parse(data);
          // console.log(data.features, 'data.features');
          if (tempData.permissions.length === 0) {
            finalData.features.push({
              id: Number(tempData.id),
              name: tempData.name,
              permissions: [],
            });
          }
        }
      }
    }
    return finalData;
  };

  const onFinish = (values) => {
    if (checkedKeys.length === 0) {
      return message.error("Please add access role!");
    }
    let finalData = handleTreeForm(values);
    // console.log(finalData, 'finalData onFinish');
    if (props.isEdited) {
      // console.log(props.isEdited, 'props.isEdited');
      finalData.id = props.id;
    }
    props.onSubmitData(finalData);
  };

  useEffect(() => {
    if (props.isEdited) {
      const finalData = handleTreeForm(formDataObject);
      // console.log(finalData, 'finalData in useEffect');
      finalData &&
        finalData.features &&
        finalData.features.sort((a, b) => {
          return a.id - b.id;
        });
      if (
        JSON.stringify(finalData).includes(JSON.stringify(props.defaultData))
      ) {
        setIsObjEqual(true);
      } else {
        setIsObjEqual(false);
      }
    }
  }, [formDataObject, checkedKeys, props.defaultData]);

  useEffect(() => {
    if (!props.openDrawer) {
      setCheckedKeys([]);
      setSelectedKeys([]);
    }
  }, [props.openDrawer]);

  return (
    <div className="ar_container">
      <Form
        onFinish={onFinish}
        className="ar_form"
        layout="vertical"
        form={props.form}
        initialValues={{
          name: props.formData.name,
          description: props.formData.description,
          roleTypeId: props.formData.roleTypeId,
          features: props.formData.features,
        }}
      >
        <div>
          <S.FormItem
            direction={Direction}
            name="name"
            label={
              <FormLabel>
                {administration.accessRole.Drawer.formLabel.AccessRoleName}
              </FormLabel>
            }
            rules={[
              {
                required: true,
                message:
                  administration.accessRole.Drawer.placeholders.EnterName,
              },
            ]}
          >
            <Input
              placeholder={
                administration.accessRole.Drawer.placeholders.EnterName
              }
              // disabled={props.isDefault}
              onChange={(e) => {
                setFormDataObject((prevObj) => ({
                  ...prevObj,
                  name: e.target.value,
                }));
              }}
            />
          </S.FormItem>
          <S.FormItem
            direction={Direction}
            name="roleTypeId"
            label={
              <FormLabel>{administration.accessRole.Drawer.UserType}</FormLabel>
            }
            rules={[
              {
                required: true,
                message:
                  administration.accessRole.Drawer.placeholders.SelectUserType,
              },
            ]}
          >
            <Select
              placeholder={
                administration.accessRole.Drawer.placeholders.SelectUserType
              }
              data={userTypeList.filter((user) =>
                [userTypeEnum.Admin, userTypeEnum.Employee].includes(user.id)
              )}
              defaultValue={props.formData.roleTypeId}
            />
          </S.FormItem>
          <S.FormItem
            direction={Direction}
            name="description"
            rules={[
              {
                required: true,
                message:
                  administration.accessRole.Drawer.placeholders
                    .EnterDescription,
              },
            ]}
            label={<FormLabel>{sharedLabels.description}</FormLabel>}
          >
            <FormTextArea
              direction={Direction}
              placeholder={
                administration.accessRole.Drawer.placeholders.EnterDescription
              }
              // disabled={props.isDefault}
              onChange={(e) => {
                setFormDataObject((prevObj) => ({
                  ...prevObj,
                  description: e.target.value,
                }));
              }}
            />
          </S.FormItem>
          <Skeleton
            loading={loadingTreeData || isSingleAccessRoleLoaded}
            active
          >
            <Tree
              className="ar_tree"
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={featuresTreeData}
            />
          </Skeleton>
        </div>

        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            loading={createLoader}
            // disabled={props.isDefault || (props.isEdited && isObjEqual)}
          >
            {props.isEdited
              ? isObjEqual
                ? administration.accessRole.Button.accessRole
                : administration.accessRole.Button.UpdateAccessRole
              : administration.accessRole.Button.AddAccessRole}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(AccessRoleComposer);
