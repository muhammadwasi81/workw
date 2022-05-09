import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Select,
  Upload,
  Input,
  DatePicker,
  Checkbox,
  Form,
} from "antd";
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
const EducationForm = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employees, Direction } = dictionaryList[userLanguage];
  const value = employees.EducationForm;

  const [present, setPresent] = useState([false]);
  
  const checkHandler = (i) => {
    const list = [...present];
    list[i] = !list[i];
    setPresent(list);
  };
  
  return (
    <>
      <S.ContentDivider orientation={Direction==='ltr'? "left" : "right"}>
        {value.EducationInfo}
      </S.ContentDivider>

      <>
        <S.AddMoreDiv>
          <Form.List style={{ display: "flex" }} name="educationform">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, i) => (
                  <S.CustomSpace
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <S.EFormItem
                    {...restField}
                    direction={Direction}
                    name={[name, 'degree']}
                      rules={[{ required: true ,message: 'Degree is required'}]}
                      label={value.Degree}
                    >
                      <Input placeholder="Enter Degree"></Input>
                    </S.EFormItem>
                    <S.EFormItem
                    {...restField}
                      rules={[{ required: true,message: 'Board is required' }]}
                      label={value.BoardInstitution}
                      name={[name, 'board']}
                      direction={Direction}


                    >
                      <Input placeholder="Enter Board/Institution"></Input>
                    </S.EFormItem>
                    {!present[i] && (
                      <S.EFormItem
                      {...restField}
                        rules={[{ required: true, message: 'Date is required'}]}
                        label={value.StartEndDate}
                        name={[name, 'start/end']}
                      direction={Direction}


                      >
                        <RangePicker />
                      </S.EFormItem>
                    )}
                    {present[i] && (
                      <S.EFormItem
                      {...restField}
                        rules={[{ required: true,message: 'Date is required' }]}
                        label={value.StartDate}
                        name={[name, 'start']}

                      >
                        <DatePicker />
                      </S.EFormItem>
                    )}
                    <S.EFormItem
                      rules={[{ required: true }]}
                      direction={Direction}

                      
                    >
                      <div className="custom-for-attachment-1">
                        <Checkbox onChange={() => checkHandler(i)}>
                          {value.Present}
                        </Checkbox>
                        <div className="custom-for-attachment-2">
                          <S.EFormItem
                            name="Attachments"
                            label={value.Attachments}
                            {...restField}
                          >
                            <Upload>
                              <Button icon={<UploadOutlined />}>
                                {value.Upload}
                              </Button>
                            </Upload>
                          </S.EFormItem>
                        </div>
                        <MinusCircleOutlined onClick={() => remove(name)} />
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
                    {value.AddMoreEducation}
                  </S.EButton>
                </S.ButtonContainer>
              </>
            )}
          </Form.List>
        </S.AddMoreDiv>
      </>
    </>
  );
};

export default EducationForm;
