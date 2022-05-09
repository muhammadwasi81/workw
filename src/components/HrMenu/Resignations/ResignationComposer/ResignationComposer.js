import { Button, Checkbox, DatePicker, Input, Typography, Select } from 'antd'
import React, { useState, useContext } from 'react'
import { dictionaryList } from "../../../../utils/localization/languages"
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { travelCategoryData } from './TravelCategories';
// import "./composer.css"
function ResignationComposer() {
  const [items] = useState(travelCategoryData);

  const { userLanguage } = useContext(LanguageChangeContext);
  const {resignations, sharedLabels} = dictionaryList[userLanguage]; 

  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const options = [
    { label: "Is Termination", value: true },
    // { label: "TADA Application", value: "Pear" },
  ];
  const [selected, setSelected] = useState([]);
  const [position, setPosition] = useState(0);


  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      console.log(id);
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };


    const { Option } = Select;

    function onChange(value) {
      console.log(`selected ${value}`);
    }

    function onSearch(val) {
      console.log('search:', val);
    }

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
      console.log(`selected ${value}`);
    }



    return (
        <form className="travel-composer">
          <div className="input-row">
            <Typography level={5} >
              {resignations.reasonforresignation}
            </Typography>
            <Select
              showSearch
              placeholder={sharedLabels.selectAperson}
              optionFilterProp="children"
              style={{ width: '100%' }}
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Insufficient Work-Life Balance</Option>
              <Option value="lucy">Time Off, and Flexibility</Option>
              <Option value="tom">Unrealistic Goals and Perfomance Objectives</Option>
              <Option value="tom">lack of a Clear Path for Career Advancement</Option>
              <Option value="tom">Feel Unsupported by Manage</Option>
              <Option value="tom">Dont't Field Challenged</Option>
              <Option value="tom">Relocation</Option>
              <Option value="tom">Others</Option> 
            </Select>
          </div>
          <div className="input-row">
            <Typography  level={5}>
              {sharedLabels.description}
            </Typography>
            <TextArea
              style={{ borderRadius: "5px" }}
              placeholder={sharedLabels.enterDescription}
              rows={4}
            />
          </div>
          <div className="task-checkbox-container">
            <Checkbox.Group
              options={options}
              defaultValue={false}
            //   onChange={onChange}
            />
          </div>
          <div className='input-row'>
            <Typography level={5} >
              {sharedLabels.manager}
            </Typography>
            <Select
              mode="multiple"
              disabled
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['Amir Naveed']}
              onChange={handleChange}
            >
              {children}
              </Select>
            </div>
            <div className='input-row'>
              <Typography level={5}>
                {sharedLabels.humanresource}
              </Typography>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={sharedLabels.SelectHumanResource}
                onChange={handleChange}
                optionLabelProp="label"
              >
                <Option value="Fehmida" label="Fehmida">
                  <div className="demo-option-label-item">
                    Fehmida
                  </div>
                </Option>
                <Option value="Fehmida2" label="Fehmida">
                  <div className="demo-option-label-item">
                    Fehmida
                  </div>
                </Option>
                <Option value="Fehmida3" label="Fehmida">
                  <div className="demo-option-label-item">
                  Fehmida
                  </div>
                </Option>
              </Select>
            </div>
            <div className='input-row'>
              <Typography level={5}>
                {sharedLabels.finance}
              </Typography>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={sharedLabels.selectFinance}
                onChange={handleChange}
                optionLabelProp="label"
              >
                <Option value="Finance 1" label="Fehmida">
                  <div className="demo-option-label-item">
                    Finance 1
                  </div>
                </Option>
                <Option value="Finance 2" label="Fehmida">
                  <div className="demo-option-label-item">
                  Finance 2
                  </div>
                </Option>
                <Option value="Finance 3" label="Fehmida">
                  <div className="demo-option-label-item">
                  Finance 3
                  </div>
                </Option>
              </Select>
            </div>
            <div className='input-row'>
              <Typography level={5}>
                {sharedLabels.it}
              </Typography>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={sharedLabels.selectIt}
                onChange={handleChange}
                optionLabelProp="label"
              >
                <Option value="IT 1" label="IT 1">
                  <div className="demo-option-label-item">
                    IT 1
                  </div>
                </Option>
                <Option value="IT 2" label="IT 2">
                  <div className="demo-option-label-item">
                  IT 2
                  </div>
                </Option>
                <Option value="IT 3" label="IT 3">
                  <div className="demo-option-label-item">
                  IT 3
                  </div>
                </Option>
              </Select>
            </div>
            <div className='input-row'>
              <Typography level={5}>
                {sharedLabels.admin}
              </Typography>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={sharedLabels.selectAdmin}
                onChange={handleChange}
                optionLabelProp="label"
              >
                <Option value="Admin 1" label="Admin 1">
                  <div className="demo-option-label-item">
                  Admin 1
                  </div>
                </Option>
                <Option value="Admin 2" label="Admin 2">
                  <div className="demo-option-label-item">
                    Admin 2
                  </div>
                </Option>
                <Option value="Admin 3" label="Admin 3">
                  <div className="demo-option-label-item">
                    Admin 3
                  </div>
                </Option>
              </Select>
            </div>
            <div className='input-row'>
              <Typography level={5}>
                {sharedLabels.othersapprovals}
              </Typography>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={sharedLabels.selectOthersApprovals}
                onChange={handleChange}
                optionLabelProp="label"
              >
                <Option value="Approval 1" label="Approval 1">
                  <div className="demo-option-label-item">
                  Approval 1
                  </div>
                </Option>
                <Option value="Approval 2" label="Approval 2">
                  <div className="demo-option-label-item">
                  Approval 2
                  </div>
                </Option>
                <Option value="Approval 3" label="Approval 3">
                  <div className="demo-option-label-item">
                  Approval 3
                  </div>
                </Option>
              </Select>
            </div>
            <div className='input-row'>
              <Typography level={5}>
                {sharedLabels.exitinterview}
              </Typography>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select Exit Interview"
                defaultValue={"Owais Sheikh"}
                onChange={handleChange}
                optionLabelProp="label"
              >
                <Option value="Exit Interview 1" label="Exit Interview 1">
                  <div className="demo-option-label-item">
                  Exit Interview 1
                  </div>
                </Option>
                <Option value="Exit Interview 2" label="Exit Interview 2">
                  <div className="demo-option-label-item">
                  Exit Interview 2
                  </div>
                </Option>
                <Option value="Exit Interview 3" label="Exit Interview 3">
                  <div className="demo-option-label-item">
                  Exit Interview 3
                  </div>
                </Option>
              </Select>
            </div>
            <Button type="primary" style={{fontWeight:"bold",marginTop:"10px"}} block>
              {resignations.createresignation}
            </Button>
      </form>
    )
}

export default ResignationComposer
  