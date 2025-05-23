import React, {useContext} from 'react'
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Divider,
    Space 

  } from 'antd';
  import * as S from './form.style'
   

const FilterForm = () => {

    const {userLanguage} = useContext(LanguageChangeContext);
    const {warnings, Direction} = dictionaryList[userLanguage];


    const { RangePicker } = DatePicker;

    return (
        <>
            <div className='WarningFilterForm'>
                <h2>{warnings.filter}</h2>
            </div> 
            <Divider style={{marginTop:0,marginBottom: 0}} />       
            <Form style={{padding:"10px"}}>
                <Form.Item >
                    <Input size='normal' placeholder='Search'/>
                </Form.Item>
                <Form.Item>
                    <Select size='normal' placeholder="Expense Headers">
                    <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Select size='normal' placeholder="Executor Status">
                    <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Select size='normal' placeholder="Approver Status">
                    <Select.Option value="demo">In Process</Select.Option>
                    <Select.Option value="demo">Approve</Select.Option>
                    <Select.Option value="demo">Decline</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Select size='normal' placeholder="Finance Status">
                    <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <S.DateItem>
                    <Space direction="vertical" size={12}>
                        <RangePicker />
                    </Space>
                </S.DateItem>
                <Button.Group style={{justifyContent:"center",alignItems:"center",width:"100%"}}>
                    <Button size='normal' style={{width: '100%'}} className='ThemeBtn'>{warnings.filter}</Button>
                </Button.Group>
            </Form>
        </>

    )
}



export default FilterForm