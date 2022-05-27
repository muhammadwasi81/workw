import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Select, DatePicker, Checkbox, Input, Form, Typography } from "antd";
import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { employmentType } from "../../../../utils/Shared/enums/enums";
import TextInput from "../../../sharedComponents/Input/TextInput";
import * as S from "../Styles/employee.style";
import NewCustomSelect from "./newCustomSelect";
import SharedSelect from "../../../sharedComponents/Select/Select";

const { Option } = Select;
const { RangePicker } = DatePicker;

const ExperienceForm = ({ experienceInfo, onExperienceInfo }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, employees, Direction } = dictionaryList[userLanguage];
  const value = employees.WorkExperienceForm;
  const placeholder = employees.placeholders;
  const [present, setPresent] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [state, setState] = useState({
    position: "",
    employmentTypeId: "",
    city: "",
    selectDate: "",
    endDate: "",
  });
  const [error, setError] = useState({
    position: false,
    empType: false,
    city: false,
    selectDate: false,
    endDate: false,
  });
  const checkValidation = () => {
    if (!state.position) {
      setError((prevErrors) => ({
        ...prevErrors,
        position: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        position: false,
      }));
    }
    if (!state.employmentTypeId) {
      setError((prevErrors) => ({
        ...prevErrors,
        empType: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        empType: false,
      }));
    }
    if (!state.endDate && !present) {
      setError((prevErrors) => ({
        ...prevErrors,
        endDate: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        endDate: false,
      }));
    }
    if (!state.city) {
      setError((prevErrors) => ({
        ...prevErrors,
        city: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        city: false,
      }));
    }
    if (!state.selectDate && present) {
      setError((prevErrors) => ({
        ...prevErrors,
        selectDate: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        selectDate: false,
      }));
    }
  };
  const handleChange = useCallback((value, name) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);
  const onChange = (value, dateString, name) => {
    setState({
      ...state,
      [name]: dateString,
    });
  };
  const columns = [
    {
      title: value.Position,
      dataIndex: "position",
      key: "position",
    },

    {
      title: value.EmploymentType,
      dataIndex: "employmentTypeId",
      key: "employmentTypeId",
      render: (value) => {
        return employmentType[value - 1].name;
      },
    },
    {
      title: value.City,
      dataIndex: "city",
      key: "city",
      render: (value) => {
        return value.name;
      },
    },
    {
      title: value.StartEndDate,
      dataIndex: "endDate",
      key: "endDate",
      render: (value, row, index) => {
        return experienceInfo[index].endDate.length !== 0
          ? `${experienceInfo[index].endDate[0]} - ${experienceInfo[index].endDate[1]}`
          : `${experienceInfo[index].selectDate} -  Present`;
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
              const index = experienceInfo.findIndex((object) => {
                return object === value;
              });
              const filterArray = experienceInfo.filter((value, i) => {
                if (index !== i) return value;
              });
              onExperienceInfo(filterArray);
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
        !error.position &&
        !error.empType &&
        !error.city &&
        !error.selectDate &&
        (!error.endDate || error.selectDate)
      ) {
        handleInfoArray(true);
      }
    }
  }, [error, isSubmit]);

  const handleInfoArray = (isSubmit) => {
    if (isSubmit) {
      onExperienceInfo((preValues) => [...preValues, state]);
      setIsSubmit(false);
      setState({
        position: "",
        employmentTypeId: "",
        city: "",
        selectDate: "",
        endDate: "",
      });
    }
  };
  return (
    <>
      <S.ContentDivider orientation={Direction === "ltr" ? "left" : "right"}>
        {value.WorkExperienceInfo}
      </S.ContentDivider>

      <>
        <S.AddMoreDiv>
          <S.CustomSpace align="baseline" direction={Direction}>
            <S.FormItem direction={Direction}>
              <div className="input-row">
                <Typography level={5} className="required_typography">
                  {value.Position}:
                </Typography>
                <TextInput
                  placeholder={placeholder.position}
                  name="position"
                  onChange={(value) => {
                    handleChange(value, "position");
                  }}
                  error={error.position}
                  value={state.position}
                  size="large"
                />
                {error.position && (
                  <div style={{ color: "red", fontWeight: 400 }}>
                    Please enter Position.
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
                {value.EmploymentType}:
              </Typography>
              <div
                style={{
                  display: "flex",
                  gap: "0px",
                  flexDirection: "column",
                }}
              >
                <S.FormItem name="employmentTypeId" direction={Direction}>
                  <SharedSelect
                    data={employmentType}
                    placeholder={placeholder.empType}
                    size={"large"}
                    status={error.empType ? "error" : ""}
                    onChange={(value) => {
                      setState((prevValues) => ({
                        ...prevValues,
                        employmentTypeId: value,
                      }));
                    }}
                  />

                  {error.empType && (
                    <div style={{ color: "red", fontWeight: 400 }}>
                      Please select Employment Type.
                    </div>
                  )}
                </S.FormItem>
              </div>
            </div>

            <div className="input-row">
              <Typography
                level={5}
                className="required_typography"
                style={{ fontWeight: 600 }}
              >
                {value.City}:
              </Typography>
              <div
                style={{
                  display: "flex",
                  gap: "0px",
                  flexDirection: "column",
                }}
              >
                <NewCustomSelect
                  valueObject={true}
                  name="city"
                  showSearch={true}
                  status={error.city ? "error" : ""}
                  endPoint="/api/Utility/GetAllCities"
                  placeholder="Select city"
                  requestType="post"
                  onChange={(value) => {
                    const { id, name } = JSON.parse(value);
                    setState((prevValues) => ({
                      ...prevValues,
                      city: {
                        id,
                        name,
                      },
                    }));
                  }}
                />
                {error.city && (
                  <div style={{ color: "red", fontWeight: 400 }}>
                    Please select city.
                  </div>
                )}
              </div>
            </div>
            {!present && (
              <div className="input-row">
                <Typography level={5} style={{ fontWeight: 600 }}>
                  {value.StartEndDate}:
                </Typography>
                <div>
                  <RangePicker
                    format={"DD/MM/YYYY"}
                    placeholder={[placeholder.sDate, placeholder.eDate]}
                    status={error.endDate ? "error" : ""}
                    onChange={(value, dateString) => {
                      onChange(value, dateString, "endDate");
                    }}
                  />
                  {error.endDate && (
                    <div style={{ color: "red", fontWeight: 400 }}>
                      Please enter Start/End Date.
                    </div>
                  )}
                </div>
              </div>
            )}

            {present && (
              <div className="input-row">
                <Typography level={5} style={{ fontWeight: 600 }}>
                  {value.StartDate}:
                </Typography>
                <div>
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    placeholder={value.selectDate}
                    status={error.selectDate ? "error" : ""}
                    onChange={(value, dateString) => {
                      onChange(value, dateString, "selectDate");
                    }}
                  />
                  {error.selectDate && (
                    <div style={{ color: "red", fontWeight: 400 }}>
                      Please enter Start Date.
                    </div>
                  )}
                </div>
              </div>
            )}
            <Checkbox
              checked={present}
              onChange={() => {
                setPresent(!present);
                setState((preValues) => ({
                  ...preValues,
                  endDate: "",
                  selectDate: "",
                }));
              }}
            >
              {value.Present}
            </Checkbox>
          </S.CustomSpace>
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
              {value.AddMoreExperience}
            </S.EButton>
          </S.ButtonContainer>
          {experienceInfo.length > 0 && (
            <S.Customtable
              direction={Direction}
              dataSource={experienceInfo}
              columns={columns}
              pagination={false}
              style={{ margin: "2rem" }}
            />
          )}
        </S.AddMoreDiv>

        {/* <S.FormContainer type="constant"></S.FormContainer> */}
      </>
    </>
  );
};

export default ExperienceForm;
