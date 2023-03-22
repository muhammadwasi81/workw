import { Button, Form, Input, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../sharedComponents/Select/Select";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import * as S from "../../employee/Styles/employee.style";
import { FormLabel } from "./FormLabel";
import { handleEdit } from "../store/slice";
import "../style/style.css";
import { getCountries } from "../../../../utils/Shared/store/actions";
import { useSelector } from "react-redux";
import SlabCreateTable from "./TaxSlabEntryTable";
import { addTaxSlabGroup, updateTaxSlab } from "../store/action";
const { Option } = Select;

function Composer({ editData }) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const [TableData, setTableData] = useState(null);
  const { administration, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];

  const { countries } = useSelector((state) => state.sharedSlice);
  const { createLoader } = useSelector((state) => state.taxSlabGroupSlice);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const onFinish = (values) => {
    if (editData) {
      //console.log(editData, "editDataaa");
      let taxSlab = TableData.taxSlab;
      let data = { ...values, taxSlab, id: editData.id };
      dispatch(updateTaxSlab(data));
    } else {
      let taxSlab = TableData.taxSlab;
      let data = { ...values, taxSlab };
      dispatch(addTaxSlabGroup(data));
    }
  };

  return (
    <div className="ar_container taxSlabComposer">
      <Form
        onFinish={onFinish}
        className="ar_form businessPolicyForm"
        layout="vertical"
        initialValues={editData}
      >
        <div>
          <S.FormItem
            direction={Direction}
            name="name"
            label={<FormLabel>{"Name"}</FormLabel>}
            rules={[
              {
                required: true,
                message: "Please Enter Name",
              },
            ]}
          >
            <Input placeholder={"Enter Name"} size="large" />
          </S.FormItem>
          <S.FormItem
            size="large"
            name="countryId"
            label={"Country"}
            rules={[{ required: true }]}
          >
            <CustomSelect
              showSearch={true}
              data={countries}
              size="large"
              placeholder="Please select country"
              defaultValue={editData?.countryId}
            />
          </S.FormItem>
          <S.FormItem
            label={"Description"}
            name="description"
            rules={[
              {
                required: true,
                message: "Please Enter Description",
              },
            ]}
          >
            <Input.TextArea placeholder={"Enter Description"} />
          </S.FormItem>
        </div>
        <div className="slabTable">
          <SlabCreateTable
            defaultRows={1}
            handleChangeTable={(data) => setTableData(data)}
          />
        </div>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            className="ThemeBtn"
            block
            htmlType="submit"
            title={"Create"}
            loading={createLoader}
          >
            {" "}
            {editData ? "Save" : "Create"}{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Composer;
