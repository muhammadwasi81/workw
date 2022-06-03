import { Button, DatePicker, Form, Input } from "antd";
import Select from "../../../sharedComponents/Select/Select";
import React, { useContext, useEffect } from "react";
import { LoanPurposeList } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { loanDictionaryList } from "../localization/index";
import moment from "moment";
import NewCustomSelect from "../../employee/view/newCustomSelect";
import { approvalDictionaryList } from "../../approval/localization";
import { setLoanForm } from "../store/slice";
import CurrencyInput from "../../../sharedComponents/Input/CurrencyInput";

const Composer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { loanDictionary } = loanDictionaryList[userLanguage];
  const { approvalDictionary, Direction } =
    approvalDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  console.log(form);
  const { loanForm: state } = useSelector((state) => state.loanSlice);
  useEffect(() => {
    console.log();
    form.setFieldsValue({
      deduction: state.deduction,
        purposeId:state.purposeId
    });
  }, [state]);
  const onFinish = (values) => {
    console.log(values, "values");
    // console.log(form.getFieldInstance(values));
    /* let approvers = values.approvers.map(approver => {
            return {
                approverId: approver,
                approverType: 0,
                isDefault: true,
                status: 0,
                email: "",
            };
        });
        let members = values.members.map(approver => {
            return {
                approverId: approver,
                approverType: 0,
                isDefault: true,
                status: 0,
                email: "",
            };
        });

        let payload = { ...values, imageId: photoId, approvers, members };

        dispatch(addReward(payload));
        console.log(payload, "FINALLLLL")*/

    //form.resetFields();

    /*dispatch(uploadImage(profileImage)).then(x => {
            // console.log(
            // 	x.payload.data[0].id,
            // 	"Hurry i got image if from server"
            // );
            console.log(x, "FIRST ONE")
            let photoId = x.payload.data[0].id;


            // console.log(payload, "Final Data");
        });*/
    // const { id, name, reason, categoryId, imageId  } = values;
    // setState(prevState => ({
    // 	...prevState,
    // 	id,
    // 	name,
    // 	reason,
    // 	categoryId,
    // 	imageId,
    // 	members,
    // 	approvers
    // }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        form={form}
        name="addLoan"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={loanDictionary.purpose}
          initialValue={state.purposeId}
          name="purposeId"
          rules={[
            {
              required: true,
              message: loanDictionary.SelectPurpose,
            },
          ]}
        >
          <Select
            value={state.purposeId}
            defaultValue={state.purposeId}
            placeholder={loanDictionary.selectPurpose}
            data={LoanPurposeList()}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>
          <div className="flex gap15">
        <Form.Item
          label={loanDictionary.amount}
          name="amount"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: loanDictionary.pleaseEnterAmount,
            },
          ]}
          initialValue={state.amount}
        >
          <Input
            placeholder={loanDictionary.amount}
            name="amount"
            value={state.amount}
            type="number"
            onChange={(e) => {
              /* form.setFieldsValue({
                               deduction: parseFloat(e.target.value).toFixed(2) / state.loanTenure
                           });*/

              dispatch(
                setLoanForm({
                  ...state,
                  amount: parseFloat(e.target.value).toFixed(2),
                  deduction:
                    parseFloat(e.target.value).toFixed(2) / state.loanTenure,
                })
              );
              //setState({);
            }}
          />
        </Form.Item>
        <Form.Item
          label={loanDictionary.loanTenureInMonths}
          name="loanTenure"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: loanDictionary.pleaseEnterloanTenureInMonths,
            },
          ]}
          initialValue={state.loanTenure}
        >
          <Input
            placeholder={loanDictionary.loanTenureInMonths}
            name="loanTenure"
            type="number"
            value={state.loanTenure}
            onChange={(e) => {
              /* form.setFieldsValue({
                               deduction: state.amount / parseFloat(e.target.value).toFixed(2)
                           });*/
              dispatch(
                setLoanForm({
                  ...state,
                  loanTenure: parseFloat(e.target.value).toFixed(2),
                  deduction:
                    state.amount / parseFloat(e.target.value).toFixed(2),
                })
              );
              /*  setState({
                       ...state,
                        loanTenure: parseFloat(e.target.value).toFixed(2),
                        deduction: state.amount / parseFloat(e.target.value).toFixed(2)
                    });*/
            }}
          />
        </Form.Item>
        <Form.Item
          label={loanDictionary.deductionPerMonth}
          name="deduction"
          labelPosition="top"
          initialValue={state.deduction}
          /*rules={[
                    {
                        maxLength: 6,
                        message: "Value should be less than 50 character",
                    },
                ]}*/
        >
          <Input
            placeholder={loanDictionary.loanTenureInMonths}
            type="number"
            disabled={true}
          />
        </Form.Item>
          </div>
        {/* <Form.Item
          label={loanDictionary.deductionPerMonth}
          name={"currency"}
          labelPosition="top"
        >
          <CurrencyInput
            placeholder={loanDictionary.loanTenureInMonths}
            type="number"
            disabled={true}
            defaultValue="150"
            value="100"
          />
        </Form.Item> */}
        <Form.Item
          name="approvers"
          label={approvalDictionary.approvers}
          showSearch={true}
          direction={Direction}
          //rules={[{required: true}]}
        >
          <NewCustomSelect
            name="approvers"
            label={approvalDictionary.approvers}
            showSearch={true}
            direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={approvalDictionary.approvers}
          />
        </Form.Item>
        <Form.Item
          label={loanDictionary.deadline}
          name="deadline"
          labelPosition="top"
          initialValue={moment(state.deadline)}
        >
          <DatePicker
            placeholder={loanDictionary.deadline}
            size="large"
            format={"DD/MM/YYYY"}
            getPopupContainer={(trigger) => trigger.parentNode}
            showTime={{
              defaultValue: moment(state.deadline),
            }}
            disabledDate={(current) => {
              return current && current < moment().add(-1, "day");
            }}
          />
        </Form.Item>
        <Form.Item
          label={loanDictionary.description}
          name="description"
          initialValue={state.description}
        >
          <Input.TextArea placeholder={loanDictionary.description} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            title={loanDictionary.createLoan}
          >
            {" "}
            {loanDictionary.createLoan}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
