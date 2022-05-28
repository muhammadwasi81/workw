import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Checkbox, Typography, Table } from "antd";
import * as S from "../Styles/employee.style";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import NewCustomSelect from "./newCustomSelect";
import TextInput from "../../../sharedComponents/Input/TextInput";
const { RangePicker } = DatePicker;

const EducationForm = ({ onEducationInfo, educationInfo }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, employees, Direction } = dictionaryList[userLanguage];
  const value = employees.EducationForm;
  const placeholder = employees.placeholders;
  const [isSubmit, setIsSubmit] = useState(false);
  const [present, setPresent] = useState(false);
  const [state, setState] = useState({
    degree: "",
    institute: "",
    description: "",
    totalMarks: "",
    obtainedMarks: "",
    endDate: "",
    city: "",
    selectDate: "",
  });
  const [error, setError] = useState({
    degree: false,
    institute: false,
    description: false,
    totalMarks: false,
    obtainedMarks: false,
    endDate: false,
    city: false,
    selectDate: false,
  });
  const handleChange = useCallback((value, name) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);
  const checkValidation = () => {
    if (!state.degree) {
      setError((prevErrors) => ({
        ...prevErrors,
        degree: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        degree: false,
      }));
    }
    if (!state.institute) {
      setError((prevErrors) => ({
        ...prevErrors,
        institute: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        institute: false,
      }));
    }
    if (!state.description) {
      setError((prevErrors) => ({
        ...prevErrors,
        description: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        description: false,
      }));
    }
    if (!state.totalMarks) {
      setError((prevErrors) => ({
        ...prevErrors,
        totalMarks: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        totalMarks: false,
      }));
    }
    if (!state.obtainedMarks) {
      setError((prevErrors) => ({
        ...prevErrors,
        obtainedMarks: true,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        obtainedMarks: false,
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
  const onChange = (value, dateString, name) => {
    setState({
      ...state,
      [name]: dateString,
    });
  };
  const columns = [
    {
      title: value.Degree,
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: value.Institute,
      dataIndex: "institute",
      key: "institute",
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
      title: value.Description,
      dataIndex: "description",
      key: "description",
    },
    {
      title: value.ObtainedMarks,
      dataIndex: "obtainedMarks",
      key: "obtainedMarks",
    },
    {
      title: value.TotalMarks,
      dataIndex: "totalMarks",
      key: "totalMarks",
    },

    {
      title: value.StartEndDate,
      dataIndex: "endDate",
      key: "endDate",
      render: (value, row, index) => {
        return educationInfo[index].endDate.length !== 0
          ? `${educationInfo[index].endDate[0]} - ${educationInfo[index].endDate[1]}`
          : `${educationInfo[index].selectDate} -  Present`;
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
              const index = educationInfo.findIndex((object) => {
                return object === value;
              });
              const filterArray = educationInfo.filter((value, i) => {
                if (index !== i) return value;
              });
              onEducationInfo(filterArray);
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
        !error.degree &&
        !error.description &&
        !error.institute &&
        !error.obtainedMarks &&
        !error.totalMarks &&
        !error.city &&
        (!error.endDate || error.selectDate)
      ) {
        handleInfoArray(true);
      }
    }
  }, [error, isSubmit]);

  const handleInfoArray = (isSubmit) => {
    if (isSubmit) {
      onEducationInfo((preValues) => [...preValues, state]);

      setIsSubmit(false);
      setState({
        degree: "",
        institute: "",
        description: "",
        totalMarks: "",
        obtainedMarks: "",
        endDate: "",
        city: "",
        selectDate: "",
      });
    }
  };

  return (
    <>
      <S.ContentDivider orientation={Direction === "ltr" ? "left" : "right"}>
        {value.EducationInfo}
      </S.ContentDivider>

      <>
        <S.AddMoreDiv>
          <S.CustomSpace align="baseline" direction={Direction}>
            <S.FormItem direction={Direction}>
              <div className="input-row">
                <Typography level={5} className="required_typography">
                  {value.Degree}:
                </Typography>
                <TextInput
                  placeholder={placeholder.degree}
                  name="degree"
                  onChange={(value) => {
                    handleChange(value, "degree");
                  }}
                  error={error.degree}
                  value={state.degree}
                  size="large"
                />
                {error.degree && (
                  <div style={{ color: "red", fontWeight: 400 }}>
                    Please enter Degree.
                  </div>
                )}
              </div>
            </S.FormItem>
            <S.FormItem direction={Direction}>
              <div className="input-row">
                <Typography level={5} className="required_typography">
                  {value.Institute}:
                </Typography>
                <TextInput
                  placeholder={placeholder.institute}
                  name="institute"
                  onChange={(value) => {
                    handleChange(value, "institute");
                  }}
                  error={error.institute}
                  value={state.institute}
                  size="large"
                />
                {error.institute && (
                  <div style={{ color: "red", fontWeight: 400 }}>
                    Please enter Institute.
                  </div>
                )}
              </div>
            </S.FormItem>
            <S.FormItem direction={Direction}>
              <div className="input-row">
                <Typography level={5} className="required_typography">
                  {value.Description}:
                </Typography>
                <TextInput
                  placeholder={placeholder.desc}
                  name="description"
                  onChange={(value) => {
                    handleChange(value, "description");
                  }}
                  error={error.description}
                  value={state.description}
                  size="large"
                />
                {error.description && (
                  <div style={{ color: "red", fontWeight: 400 }}>
                    Please enter Description.
                  </div>
                )}
              </div>
            </S.FormItem>
            <S.FormItem direction={Direction}>
              <div className="input-row">
                <Typography level={5} className="required_typography">
                  {value.TotalMarks}:
                </Typography>
                <TextInput
                  placeholder={placeholder.tMarks}
                  name="totalMarks"
                  type={"number"}
                  onChange={(value) => {
                    handleChange(value, "totalMarks");
                  }}
                  error={error.totalMarks}
                  value={state.totalMarks}
                  size="large"
                />
                {error.totalMarks && (
                  <div style={{ color: "red", fontWeight: 400 }}>
                    Please enter Total Marks.
                  </div>
                )}
              </div>
            </S.FormItem>
            <S.FormItem direction={Direction}>
              <div className="input-row">
                <Typography level={5} className="required_typography">
                  {value.ObtainedMarks}:
                </Typography>
                <TextInput
                  placeholder={placeholder.oMarks}
                  name="obtainedMarks"
                  type={"number"}
                  onChange={(value) => {
                    handleChange(value, "obtainedMarks");
                  }}
                  error={error.obtainedMarks}
                  value={state.obtainedMarks}
                  size="large"
                />
                {error.obtainedMarks && (
                  <div style={{ color: "red", fontWeight: 400 }}>
                    Please enter Obtained Marks.
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
              {value.AddMoreEducation}
            </S.EButton>
          </S.ButtonContainer>
          {educationInfo.length > 0 && (
            <S.Customtable
              direction={Direction}
              dataSource={educationInfo}
              columns={columns}
              pagination={false}
              style={{ margin: "2rem" }}
            />
          )}
        </S.AddMoreDiv>
      </>
    </>
  );
};

export default EducationForm;
