import { PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import * as S from "../Styles/employee.style";
import SharedSelect from "../../../sharedComponents/Select/Select";
import { relations } from "../../../../utils/Shared/enums/enums";
import TextInput from "../../../sharedComponents/Input/TextInput";
import { employeeDictionaryList } from "../localization/index";

const EmergencyForm = ({ onEmergencyInfo, emergencyInfo }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { employeesDictionary, Direction } =
    employeeDictionaryList[userLanguage];
  const value = employeesDictionary.EmergencyForm;
  const placeholder = employeesDictionary.placeholders;
  const [isSubmit, setIsSubmit] = useState(false);

  const [state, setState] = useState({
    name: "",
    address: "",
    contactNo: "",
    relation: "",
  });
  const [error, setError] = useState({
    name: false,
    address: false,
    contactNo: false,
    relation: false,
  });
  const handleChange = useCallback((value, name) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);
  const checkValidation = () => {
    if (!state.name) {
      setError((prevErrors) => ({
        ...prevErrors,
        name: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        name: false,
      }));
    }
    if (!state.address) {
      setError((prevErrors) => ({
        ...prevErrors,
        address: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        address: false,
      }));
    }
    if (!state.contactNo) {
      setError((prevErrors) => ({
        ...prevErrors,
        contactNo: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        contactNo: false,
      }));
    }
    if (!state.relation) {
      setError((prevErrors) => ({
        ...prevErrors,
        relation: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        relation: false,
      }));
    }
  };
  const columns = [
    {
      title: value.Name,
      dataIndex: "name",
      key: "name",
    },
    {
      title: value.Address,
      dataIndex: "address",
      key: "address",
    },
    {
      title: value.Number,
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: value.Relation,
      dataIndex: "relation",
      key: "relation",
      render: (value) => {
        return relations[value - 1].name;
      },
    },

    {
      title: sharedLabels.action,
      render: (value) => {
        return (
          <a
            href="asdasd"
            onClick={(e) => {
              e.preventDefault();
              const index = emergencyInfo.findIndex((object) => {
                return object === value;
              });
              const filterArray = emergencyInfo.filter((value, i) => {
                if (index !== i) return value;
              });
              onEmergencyInfo(filterArray);
            }}
          >
            {sharedLabels.Delete}
          </a>
        );
      },
    },
  ];
  useEffect(() => {
    if (isSubmit) {
      if (
        !error.name &&
        !error.address &&
        !error.contactNo &&
        !error.relation
      ) {
        handleInfoArray(true);
      }
    }
  }, [error, isSubmit]);

  const handleInfoArray = (isSubmit) => {
    if (isSubmit) {
      onEmergencyInfo((preValues) => [...preValues, state]);
      setIsSubmit(false);
      setState({
        name: "",
        address: "",
        contactNo: "",
        relation: "",
      });
    }
  };
  return (
    <>
      <S.ContentDivider orientation={Direction === "ltr" ? "left" : "right"}>
        {value.EmergencyInfo}
      </S.ContentDivider>

      <S.BasicForm name="emergencyContacts" direction={Direction}>
        <S.FormItem direction={Direction}>
          <div className="input-row">
            <Typography level={5} className="required_typography">
              {value.Name}:
            </Typography>
            <TextInput
              placeholder={placeholder.name}
              name="name"
              onChange={(value) => {
                handleChange(value, "name");
              }}
              error={error.name}
              value={state.name}
              size="large"
            />
            {error.name && (
              <div style={{ color: "red", fontWeight: 400 }}>
                Please enter Name.
              </div>
            )}
          </div>
        </S.FormItem>

        <S.FormItem direction={Direction}>
          <div className="input-row">
            <Typography level={5} className="required_typography">
              {value.Address}:
            </Typography>
            <TextInput
              placeholder={placeholder.address}
              name="address"
              onChange={(value) => {
                handleChange(value, "address");
              }}
              error={error.address}
              value={state.address}
              size="large"
            />
            {error.address && (
              <div style={{ color: "red", fontWeight: 400 }}>
                Please enter Address.
              </div>
            )}
          </div>
        </S.FormItem>

        <S.FormItem direction={Direction}>
          <div className="input-row">
            <Typography level={5} className="required_typography">
              {value.Number}:
            </Typography>
            <TextInput
              placeholder={placeholder.number}
              name="contactNo"
              onChange={(value) => {
                handleChange(value, "contactNo");
              }}
              error={error.contactNo}
              value={state.contactNo}
              size="large"
            />
            {error.contactNo && (
              <div style={{ color: "red", fontWeight: 400 }}>
                Please enter Number.
              </div>
            )}
          </div>
        </S.FormItem>

        <div className="input-row">
          <Typography
            level={5}
            className="required_typography"
            style={{ fontWeight: 600 }}
          >
            {value.Relation}:
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "0px",
              flexDirection: "column",
            }}
          >
            <S.FormItem name="relation" direction={Direction}>
              <SharedSelect
                data={relations}
                placeholder={placeholder.selectRelation}
                size={"large"}
                status={error.relation ? "error" : ""}
                onChange={(value) => {
                  setState((prevValues) => ({
                    ...prevValues,
                    relation: value,
                  }));
                }}
              />

              {error.relation && (
                <div style={{ color: "red", fontWeight: 400 }}>
                  Please select relation.
                </div>
              )}
            </S.FormItem>
          </div>
        </div>
      </S.BasicForm>
      <S.ButtonContainer>
        <S.EButton
          type="dashed"
          onClick={() => {
            checkValidation();
            setIsSubmit(true);
          }}
          block
          icon={<PlusOutlined />}
        >
          {value.AddMoreEmergency}
        </S.EButton>
      </S.ButtonContainer>
      {emergencyInfo.length > 0 && (
        <S.Customtable
          direction={Direction}
          dataSource={emergencyInfo}
          columns={columns}
          pagination={false}
          style={{ margin: "2rem" }}
        />
      )}
    </>
  );
};

export default EmergencyForm;
