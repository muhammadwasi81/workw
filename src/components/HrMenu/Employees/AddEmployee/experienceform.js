import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, DatePicker, Checkbox, Input, Form } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import * as S from "../Styles/employee.style";
const { Option } = Select;
const { RangePicker } = DatePicker;

const validateMessages = {
  required: "${label} is required!",
};
const ExperienceForm = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employees, Direction } = dictionaryList[userLanguage];
  const value = employees.WorkExperienceForm;

  const [present, setPresent] = useState([false]);

  const checkHandler = (i) => {
    const list = [...present];
    list[i] = !list[i];
    setPresent(list);
  };
  return (
    <>
      <S.ContentDivider orientation={Direction === "ltr" ? "left" : "right"}>
        {value.WorkExperienceInfo}
      </S.ContentDivider>

      <>
        <S.AddMoreDiv>
          <Form.List style={{ display: "flex" }} name="experienceform">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, i) => (
                  <S.CustomSpace
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <S.EFormItem
                      direction={Direction}
                      rules={[
                        { required: true, message: "Employer is required" },
                      ]}
                      name={[name, "employer"]}
                      label={value.Employer}
                      // direction={Direction}
                    >
                      <Input placeholder="Employer Name"></Input>
                    </S.EFormItem>
                    <S.EFormItem
                      name={[name, "initialposition"]}
                      rules={[
                        {
                          required: true,
                          message: "Initial Position is required",
                        },
                      ]}
                      label={value.InitialPosition}
                      direction={Direction}

                    >
                      <Input placeholder="Write Initial Postion"></Input>
                    </S.EFormItem>
                    <S.EFormItem
                      rules={[
                        {
                          required: true,
                          message: "Last Position is required",
                        },
                      ]}
                      label={value.LastPosition}
                      nname={[name, "lastposition"]}
                      direction={Direction}
                    >
                      <Input placeholder="Write Last Position"></Input>
                    </S.EFormItem>
                    <S.EFormItem
                      rules={[
                        { required: true, message: "Department is required" },
                      ]}
                      label={value.Department}
                      name={[name, "department"]}
                      direction={Direction}
                    >
                      <Input
                        size="large"
                        placeholder="Write Department"
                      ></Input>
                    </S.EFormItem>

                    {!present[i] && (
                      <S.EFormItem
                        rules={[
                          { required: true, message: "Date is required" },
                        ]}
                        label={value.StartEndDate}
                        name={[name, "start/end"]}
                        direction={Direction}
                      >
                        <RangePicker />
                      </S.EFormItem>
                    )}
                    {present[i] && (
                      <S.EFormItem
                        rules={[
                          { required: true, message: "Date is required" },
                        ]}
                        label={value.StartDate}
                        name={[name, "start"]}
                        direction={Direction}
                      >
                        <DatePicker />
                      </S.EFormItem>
                    )}
                    <S.EFormItem
                      style={{
                        marginBottom: 0,
                        marginTop: "20px",
                        justifySelf: "self-start",
                        alignSelf: "center",
                      }}
                      rules={[{ required: true }]}
                    >
                      <div className="custom-for-attachment-1">
                        <Checkbox onChange={() => checkHandler(i)}>
                          {value.Present}
                        </Checkbox>

                        <MinusCircleOutlined
                          width={50}
                          height={50}
                          onClick={() => remove(name)}
                        />
                      </div>
                    </S.EFormItem>
                  </S.CustomSpace>
                ))}
                <S.ButtonContainer>
                  <S.EButton
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    {value.AddMoreExperience}
                  </S.EButton>
                </S.ButtonContainer>
              </>
            )}
          </Form.List>
        </S.AddMoreDiv>

        <S.FormContainer type="constant"></S.FormContainer>
      </>
    </>
  );
};

export default ExperienceForm;
